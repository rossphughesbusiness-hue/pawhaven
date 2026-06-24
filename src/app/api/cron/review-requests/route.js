import { NextResponse } from 'next/server';

const REDIS_URL   = () => process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN;
const BASE = 'https://pawhavenpets.org';
const QUEUE_KEY = 'review_queue';

// ─── Redis helpers ────────────────────────────────────────────────────────────

async function redisRequest(path, method = 'GET', body) {
  const res = await fetch(`${REDIS_URL()}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN()}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: 'no-store',
  });
  return res.json();
}

async function zRangeByScore(key, min, max, limit = 50) {
  const res = await redisRequest(
    `zrangebyscore/${encodeURIComponent(key)}/${min}/${max}/LIMIT/0/${limit}`
  );
  return Array.isArray(res.result) ? res.result : [];
}

async function zRem(key, ...members) {
  await redisRequest(`zrem/${encodeURIComponent(key)}`, 'POST', members);
}

async function redisGet(key) {
  const res = await redisRequest(`get/${encodeURIComponent(key)}`);
  if (!res.result) return null;
  try { return JSON.parse(decodeURIComponent(res.result)); } catch { return null; }
}

async function redisDel(key) {
  await redisRequest(`del/${encodeURIComponent(key)}`, 'POST');
}

// ─── Review request email ─────────────────────────────────────────────────────

function buildReviewEmail({ customerName, orderRef, productNames, sessionId }) {
  const firstName = customerName.split(' ')[0] || customerName;

  // Pick the first product for the primary review CTA (others shown as links)
  const primaryProduct = productNames[0] || 'your recent purchase';

  const productLinks = productNames.slice(0, 3).map((name) => {
    // We stored product names from line items — try to reconstruct a slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<li style="padding:5px 0;font-size:14px;color:#1a2b4a;">
      <a href="${BASE}/products/${slug}?review=1" style="color:#f97316;text-decoration:none;font-weight:600;">${name}</a>
    </li>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:28px 40px;text-align:center;">
            <div style="font-size:28px;margin-bottom:4px;">🐾</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">PawHaven</div>
            <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:2px;">How\'s your order?</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a2b4a;">
              Hey ${firstName}, we\'d love your feedback! ⭐
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
              It\'s been about a week since your order <strong style="color:#1a2b4a;">#${orderRef}</strong> arrived.
              We hope your pet is loving their new gear! Would you mind taking 60 seconds to leave a review?
              It helps other pet owners find the right products.
            </p>

            <!-- Star graphic -->
            <div style="text-align:center;margin-bottom:24px;">
              <div style="font-size:36px;letter-spacing:4px;">⭐⭐⭐⭐⭐</div>
              <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">Tap a product below to leave your review</p>
            </div>

            <!-- Product links -->
            <div style="background:#f8fafc;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
                Products from your order
              </p>
              <ul style="margin:0;padding:0;list-style:none;">
                ${productLinks}
              </ul>
            </div>

            <!-- Primary CTA -->
            <div style="text-align:center;margin-bottom:20px;">
              <a href="${BASE}/products/${primaryProduct.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}?review=1"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:15px;padding:14px 36px;border-radius:50px;text-decoration:none;">
                Write a Review →
              </a>
            </div>

            <p style="margin:0;font-size:13px;color:#94a3b8;text-align:center;line-height:1.6;">
              Takes less than a minute. Your review means the world to us and helps other pet owners 🐾
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">
              You\'re receiving this because you ordered from PawHaven.<br>
              Questions? <a href="mailto:support@pawhavenpets.org" style="color:#f97316;text-decoration:none;">support@pawhavenpets.org</a>
              · <a href="${BASE}" style="color:#94a3b8;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendReviewEmail({ to, customerName, orderRef, productNames, sessionId }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [to],
      subject: `${customerName.split(' ')[0]}, how\'s your PawHaven order? ⭐`,
      html: buildReviewEmail({ customerName, orderRef, productNames, sessionId }),
    }),
  });
  return res.ok;
}

// ─── Cron handler ─────────────────────────────────────────────────────────────

export async function GET(req) {
  // Verify Vercel cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!REDIS_URL() || !REDIS_TOKEN()) {
    return NextResponse.json({ error: 'Redis not configured' }, { status: 503 });
  }

  const now = Date.now();
  let sent = 0;
  let failed = 0;

  try {
    // Fetch all due review requests (score <= now)
    const dueIds = await zRangeByScore(QUEUE_KEY, '-inf', now);
    console.log(`[cron/review-requests] ${dueIds.length} due requests`);

    for (const sessionId of dueIds) {
      try {
        const data = await redisGet(`review_pending:${sessionId}`);
        if (!data?.email) {
          // No data or no email — just remove from queue
          await zRem(QUEUE_KEY, sessionId);
          continue;
        }

        const ok = await sendReviewEmail({
          to: data.email,
          customerName: data.customerName || 'there',
          orderRef: data.orderRef,
          productNames: data.productNames || [],
          sessionId,
        });

        if (ok) {
          sent++;
          console.log(`[cron/review-requests] ✉️ Sent review request to ${data.email}`);
        } else {
          failed++;
          console.error(`[cron/review-requests] ❌ Failed to send to ${data.email}`);
        }

        // Remove from queue and delete data regardless of send success
        // (avoid hammering customers with repeated failures)
        await zRem(QUEUE_KEY, sessionId);
        await redisDel(`review_pending:${sessionId}`);
      } catch (err) {
        console.error(`[cron/review-requests] Error for ${sessionId}:`, err.message);
        failed++;
      }
    }
  } catch (err) {
    console.error('[cron/review-requests] Queue fetch error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ sent, failed, ts: new Date().toISOString() });
}
