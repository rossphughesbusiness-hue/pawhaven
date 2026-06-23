/**
 * GET /api/cron/daily-digest
 * Runs daily at 07:00 UTC. Sends Ross a morning email with yesterday's
 * business performance: revenue, orders, AOV, new subscribers, page views,
 * abandoned carts, and top-viewed product.
 *
 * Data sources:
 *  - Stripe: payment_intents (yesterday's succeeded charges)
 *  - Upstash Redis: page views (views:{slug} keys), abandoned carts (cart_recovery:*)
 *  - Resend: audience contact count
 */
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = 'rossphughes@gmail.com';
const BASE = 'https://pawhavenpets.org';
const DASHBOARD_URL = 'https://hughes-financials.vercel.app';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt$(cents) {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

async function getStripeRevenue() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { revenue: 0, orders: 0, aov: 0 };
  try {
    // Pull last 100 succeeded payment intents and filter to yesterday
    const res = await fetch('https://api.stripe.com/v1/payment_intents?limit=100&expand[]=data.charges', {
      headers: { Authorization: `Bearer ${key}` },
      cache: 'no-store',
    });
    const json = await res.json();
    const intents = json.data || [];

    const now = Date.now();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yStartTs = Math.floor(yesterdayStart.getTime() / 1000);
    const yEndTs = Math.floor(todayStart.getTime() / 1000);

    const yesterday = intents.filter(
      (p) => p.status === 'succeeded' && p.created >= yStartTs && p.created < yEndTs
    );

    const revenue = yesterday.reduce((sum, p) => sum + (p.amount_received || p.amount || 0), 0);
    const orders = yesterday.length;
    const aov = orders > 0 ? Math.round(revenue / orders) : 0;

    return { revenue, orders, aov };
  } catch { return { revenue: 0, orders: 0, aov: 0 }; }
}

async function getRedisStats() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { views: 0, abandonedCarts: 0, topProduct: null };

  try {
    // Total page views (all-time key, we'll show it as "total")
    const viewRes = await fetch(`${url}/get/${encodeURIComponent('views:total')}`, {
      headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const viewJson = await viewRes.json();
    const views = parseInt(viewJson.result || '0', 10);

    // Abandoned cart count
    const cartRes = await fetch(`${url}/keys/cart_recovery:*`, {
      headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const cartJson = await cartRes.json();
    const abandonedCarts = Array.isArray(cartJson.result) ? cartJson.result.length : 0;

    // Top product by views — get a sample of view keys
    const topRes = await fetch(`${url}/keys/views:*`, {
      headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const topJson = await topRes.json();
    const viewKeys = (topRes.ok && Array.isArray(topJson.result))
      ? topJson.result.filter(k => k !== 'views:total').slice(0, 20)
      : [];

    let topProduct = null;
    if (viewKeys.length > 0) {
      const counts = await Promise.all(
        viewKeys.map(async (k) => {
          const r = await fetch(`${url}/get/${encodeURIComponent(k)}`, {
            headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
          });
          const j = await r.json();
          return { key: k, count: parseInt(j.result || '0', 10) };
        })
      );
      const best = counts.sort((a, b) => b.count - a.count)[0];
      if (best) {
        const slug = best.key.replace('views:', '');
        topProduct = { slug, count: best.count };
      }
    }

    return { views, abandonedCarts, topProduct };
  } catch { return { views: 0, abandonedCarts: 0, topProduct: null }; }
}

async function getSubscriberCount() {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return 0;
  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts?limit=100`, {
      headers: { Authorization: `Bearer ${apiKey}` }, cache: 'no-store',
    });
    const json = await res.json();
    return json.data?.length || 0;
  } catch { return 0; }
}

// ─── Email builder ────────────────────────────────────────────────────────────

function buildDigestEmail({ date, stripe, redis, subscribers }) {
  const { revenue, orders, aov } = stripe;
  const { views, abandonedCarts, topProduct } = redis;

  const noOrders = orders === 0;
  const statusColor = noOrders ? '#64748b' : '#16a34a';
  const statusBg = noOrders ? '#f8fafc' : '#f0fdf4';
  const statusBorder = noOrders ? '#e2e8f0' : '#86efac';
  const statusEmoji = noOrders ? '📊' : orders >= 3 ? '🚀' : '✅';

  const statCard = (label, value, color = '#1a2b4a') =>
    `<td style="padding:0 8px 0 0;width:25%;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;text-align:center;">
        <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">${label}</div>
        <div style="font-size:20px;font-weight:900;color:${color};">${value}</div>
      </div>
    </td>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:28px 36px;text-align:center;">
            <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;">PawHaven Morning Digest</div>
            <div style="font-size:20px;font-weight:800;color:#ffffff;">${date}</div>
          </td>
        </tr>

        <!-- Status banner -->
        <tr>
          <td style="padding:20px 36px 0;">
            <div style="background:${statusBg};border:1px solid ${statusBorder};border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:12px;">
              <span style="font-size:28px;">${statusEmoji}</span>
              <div>
                <div style="font-size:15px;font-weight:700;color:${statusColor};">
                  ${noOrders ? 'No orders yesterday — keep driving traffic!' : `${orders} order${orders !== 1 ? 's' : ''} yesterday — great work!`}
                </div>
                ${revenue > 0 ? `<div style="font-size:13px;color:#64748b;margin-top:2px;">${fmt$(revenue)} in revenue</div>` : ''}
              </div>
            </div>
          </td>
        </tr>

        <!-- Stats grid -->
        <tr>
          <td style="padding:20px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                ${statCard('Revenue', fmt$(revenue), revenue > 0 ? '#16a34a' : '#94a3b8')}
                ${statCard('Orders', orders, orders > 0 ? '#1a2b4a' : '#94a3b8')}
                ${statCard('Avg Order', orders > 0 ? fmt$(aov) : '—')}
                ${statCard('Subscribers', subscribers, '#6366f1')}
              </tr>
            </table>
          </td>
        </tr>

        <!-- Secondary stats -->
        <tr>
          <td style="padding:16px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 8px 0 0;width:50%;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">
                    <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Total Page Views</div>
                    <div style="font-size:20px;font-weight:900;color:#1a2b4a;">${views.toLocaleString()}</div>
                  </div>
                </td>
                <td style="width:50%;">
                  <div style="background:${abandonedCarts > 0 ? '#fef9ec' : '#f8fafc'};border:1px solid ${abandonedCarts > 0 ? '#fde68a' : '#e2e8f0'};border-radius:10px;padding:14px 16px;">
                    <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Abandoned Carts</div>
                    <div style="font-size:20px;font-weight:900;color:${abandonedCarts > 0 ? '#d97706' : '#94a3b8'};">${abandonedCarts}</div>
                    ${abandonedCarts > 0 ? `<div style="font-size:11px;color:#92400e;margin-top:2px;">Recovery emails auto-sent ✓</div>` : ''}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${topProduct ? `
        <!-- Top product -->
        <tr>
          <td style="padding:16px 36px 0;">
            <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px 16px;">
              <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">🔥 Most Viewed Product</div>
              <div style="font-size:14px;font-weight:700;color:#1a2b4a;">${topProduct.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:2px;">${topProduct.count.toLocaleString()} total views</div>
            </div>
          </td>
        </tr>` : ''}

        <!-- Actions -->
        <tr>
          <td style="padding:24px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;">
                  <a href="${DASHBOARD_URL}" style="display:block;background:#1a2b4a;color:#ffffff;text-align:center;font-weight:700;font-size:13px;padding:12px 16px;border-radius:10px;text-decoration:none;">
                    📊 Open Dashboard
                  </a>
                </td>
                <td>
                  <a href="${BASE}/affiliates" style="display:block;background:#f97316;color:#ffffff;text-align:center;font-weight:700;font-size:13px;padding:12px 16px;border-radius:10px;text-decoration:none;">
                    🤝 View Affiliates
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:16px 36px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">
              PawHaven Daily Digest · <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a><br>
              Sent every morning at 7am UTC · <a href="${DASHBOARD_URL}" style="color:#64748b;text-decoration:none;">Hughes Financials Dashboard</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(req) {
  // Verify cron secret
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'RESEND_API_KEY not set' });
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateLabel = fmtDate(yesterday);

  // Gather all data in parallel
  const [stripe, redis, subscribers] = await Promise.all([
    getStripeRevenue(),
    getRedisStats(),
    getSubscriberCount(),
  ]);

  const html = buildDigestEmail({ date: dateLabel, stripe, redis, subscribers });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [ADMIN_EMAIL],
      subject: `📊 PawHaven Digest — ${dateLabel}${stripe.orders > 0 ? ` · ${stripe.orders} order${stripe.orders !== 1 ? 's' : ''} · ${fmt$(stripe.revenue)}` : ''}`,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('[daily-digest] Resend error:', JSON.stringify(data));
    return NextResponse.json({ ok: false, error: data });
  }

  console.log(`[daily-digest] ✅ Digest sent for ${dateLabel}`);
  return NextResponse.json({
    ok: true,
    date: dateLabel,
    orders: stripe.orders,
    revenue: stripe.revenue,
    subscribers,
  });
}
