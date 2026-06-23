/**
 * GET /api/cron/transit-upsell
 * Fires daily at 9:00 UTC. Sends "your order is on its way + you might love these"
 * emails to customers 3 days after purchase — highest open rate window when
 * customers are actively waiting for their package.
 */
import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { FBT_MAP } from '@/lib/fbt';

const BASE = 'https://pawhavenpets.org';

// ─── Redis helpers ─────────────────────────────────────────────────────────────

async function redisGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const json = await res.json();
    if (!json.result) return null;
    return JSON.parse(decodeURIComponent(json.result));
  } catch { return null; }
}

async function redisSave(key, value, exSeconds) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  const encoded = encodeURIComponent(JSON.stringify(value));
  await fetch(`${url}/set/${encodeURIComponent(key)}/${encoded}/ex/${exSeconds}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

async function redisZRangeByScore(key, min, max, limit = 50) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return [];
  try {
    const res = await fetch(
      `${url}/zrangebyscore/${encodeURIComponent(key)}/${min}/${max}/LIMIT/0/${limit}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    );
    const json = await res.json();
    return Array.isArray(json.result) ? json.result : [];
  } catch { return []; }
}

async function redisZRem(key, member) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/zrem/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([member]),
    cache: 'no-store',
  });
}

// ─── Upsell product selection ──────────────────────────────────────────────────

function getUpsells(purchasedSlugs = []) {
  const purchasedSet = new Set(purchasedSlugs);
  const suggestions = new Set();

  // First: try FBT pairings for each purchased product
  for (const slug of purchasedSlugs) {
    const companions = FBT_MAP[slug] || [];
    for (const c of companions) {
      if (!purchasedSet.has(c)) suggestions.add(c);
    }
  }

  // Resolve slugs to product objects
  const resolved = [...suggestions]
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

  // Fallback: bestsellers not already purchased
  if (resolved.length < 3) {
    const fallbacks = products
      .filter((p) => !purchasedSet.has(p.slug) && !suggestions.has(p.slug))
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 3 - resolved.length);
    resolved.push(...fallbacks);
  }

  return resolved.slice(0, 3);
}

// ─── Email builder ─────────────────────────────────────────────────────────────

function buildTransitEmail(customerName, orderRef, upsells) {
  const firstName = (customerName || '').split(' ')[0] || 'there';

  const productCards = upsells.map((p) => `
    <td style="text-align:center;padding:0 6px;vertical-align:top;width:33%;">
      <a href="${BASE}/products/${p.slug}" style="text-decoration:none;display:block;">
        <div style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;background:#fff;">
          <img src="${p.images?.[0] || p.image || ''}"
               alt="${p.name}"
               width="150" height="150"
               style="width:100%;height:150px;object-fit:cover;display:block;" />
          <div style="padding:10px;">
            <div style="font-size:12px;font-weight:700;color:#1a2b4a;line-height:1.3;margin-bottom:4px;">${p.name}</div>
            <div style="font-size:13px;font-weight:800;color:#f97316;">$${p.price.toFixed(2)}</div>
          </div>
        </div>
      </a>
    </td>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#059669,#10b981);padding:32px 40px;text-align:center;">
            <div style="font-size:40px;margin-bottom:8px;">🚚</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">Your order is on its way, ${firstName}!</div>
            <div style="color:rgba(255,255,255,0.85);font-size:14px;margin-top:6px;">Order #${orderRef} · Estimated arrival: 7–14 business days</div>
          </td>
        </tr>

        <!-- Order status -->
        <tr>
          <td style="padding:28px 40px 0;">
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px 24px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div>
                  <div style="font-weight:700;color:#065f46;font-size:14px;margin-bottom:4px;">✅ Order confirmed & processing</div>
                  <div style="color:#6b7280;font-size:13px;">Your items are being picked and packed at our fulfillment center.</div>
                </div>
              </div>
              <div style="margin-top:16px;padding-top:16px;border-top:1px solid #d1fae5;">
                <a href="${BASE}/order-tracking" style="color:#059669;font-size:13px;font-weight:700;text-decoration:none;">
                  Track your order →
                </a>
              </div>
            </div>
          </td>
        </tr>

        <!-- Upsell section -->
        <tr>
          <td style="padding:28px 40px 0;">
            <div style="font-size:17px;font-weight:800;color:#1a2b4a;margin-bottom:6px;text-align:center;">
              While you wait — complete your pet's setup
            </div>
            <div style="font-size:13px;color:#94a3b8;text-align:center;margin-bottom:20px;">
              Customers who bought your items also loved these:
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>${productCards}</tr>
            </table>
          </td>
        </tr>

        <!-- Bundle CTA -->
        <tr>
          <td style="padding:24px 40px 28px;">
            <div style="text-align:center;">
              <a href="${BASE}/bundles"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
                🎁 Save more with a Bundle →
              </a>
            </div>
          </td>
        </tr>

        <!-- Trust bar -->
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <div style="font-size:12px;color:#94a3b8;">
              ✓ Free shipping on orders over $50 &nbsp;·&nbsp; ✓ 30-day returns &nbsp;·&nbsp; ✓ Secure checkout
            </div>
            <div style="font-size:11px;color:#c4c9d4;margin-top:8px;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a>
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Cron handler ──────────────────────────────────────────────────────────────

export async function GET(req) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!process.env.UPSTASH_REDIS_REST_URL || !apiKey) {
    return NextResponse.json({ skipped: 'missing env vars' });
  }

  const now = Date.now();
  const due = await redisZRangeByScore('transit_queue', '-inf', now, 50);

  let sent = 0;
  let skipped = 0;

  for (const email of due) {
    await redisZRem('transit_queue', email);

    const pending = await redisGet(`transit_pending:${email}`);
    if (!pending) { skipped++; continue; }

    const upsells = getUpsells(pending.purchasedSlugs || []);
    if (upsells.length === 0) { skipped++; continue; }

    const firstName = (pending.customerName || '').split(' ')[0] || 'there';
    const html = buildTransitEmail(pending.customerName, pending.orderRef, upsells);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: 'PawHaven <orders@pawhavenpets.org>',
        to: [email],
        subject: `${firstName}, your PawHaven order is on its way! 🚚`,
        html,
      }),
    });

    if (res.ok) {
      sent++;
      console.log(`[transit-upsell] 🚚 Sent to ${email}`);
    } else {
      console.error(`[transit-upsell] Failed for ${email}:`, JSON.stringify(await res.json()));
    }
  }

  return NextResponse.json({ ok: true, sent, skipped, processed: due.length });
}
