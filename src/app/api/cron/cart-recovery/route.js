import { NextResponse } from 'next/server';

const REDIS_URL = () => process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCommand(path) {
  const url = REDIS_URL();
  const token = REDIS_TOKEN();
  if (!url || !token) return null;
  const res = await fetch(`${url}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const json = await res.json();
  return json.result ?? null;
}

async function redisGet(key) {
  const raw = await redisCommand(`get/${encodeURIComponent(key)}`);
  if (!raw) return null;
  try { return JSON.parse(decodeURIComponent(raw)); } catch { return null; }
}

async function redisZRangeByScore(key, min, max) {
  // Returns array of members with scores between min and max
  const res = await redisCommand(`zrangebyscore/${encodeURIComponent(key)}/${min}/${max}`);
  return Array.isArray(res) ? res : [];
}

async function redisZRemRangeByScore(key, min, max) {
  await redisCommand(`zremrangebyscore/${encodeURIComponent(key)}/${min}/${max}`);
}

async function redisDel(key) {
  await redisCommand(`del/${encodeURIComponent(key)}`);
}

function buildRecoveryEmail(items, cartUrl) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="64" style="padding-right:14px;vertical-align:top;">
              ${item.image
                ? `<img src="${item.image}" width="64" height="64" style="border-radius:10px;object-fit:cover;display:block;" alt="${item.name}" />`
                : `<div style="width:64px;height:64px;background:#f3f4f6;border-radius:10px;"></div>`}
            </td>
            <td style="vertical-align:top;">
              <div style="font-weight:700;color:#0f172a;font-size:14px;margin-bottom:4px;">${item.name}</div>
              <div style="color:#6b7280;font-size:13px;">Qty: ${item.quantity} · $${(item.price * item.quantity).toFixed(2)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" border="0" width="560" style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:36px 40px;text-align:center;">
            <div style="font-size:40px;margin-bottom:12px;">🛒</div>
            <div style="font-size:28px;font-weight:900;color:white;margin-bottom:8px;line-height:1.2;">
              You left something behind!
            </div>
            <div style="font-size:15px;color:rgba(255,255,255,0.85);">
              Your cart is saved. Come back and complete your order.
            </div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="color:#374151;font-size:15px;margin:0 0 24px;line-height:1.6;">
              Hey there 👋 — your PawHaven cart is still waiting for you.
              Here's what you left behind:
            </p>

            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              ${itemRows}
            </table>

            <div style="background:#f8fafc;border-radius:12px;padding:16px 20px;margin:24px 0;display:flex;justify-content:space-between;">
              <span style="color:#6b7280;font-size:14px;">Cart total</span>
              <span style="color:#0f172a;font-weight:700;font-size:16px;">$${total.toFixed(2)}</span>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin:28px 0;">
              <a href="${cartUrl}" style="display:inline-block;background:#f97316;color:white;font-weight:900;font-size:16px;padding:16px 36px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
                Complete My Order →
              </a>
            </div>

            <!-- Coupon nudge -->
            <div style="background:#fff7ed;border:2px dashed #fb923c;border-radius:14px;padding:16px 20px;text-align:center;margin-bottom:24px;">
              <div style="font-size:13px;color:#9a3412;margin-bottom:6px;">Still need a reason? Use code:</div>
              <div style="font-size:22px;font-weight:900;color:#f97316;letter-spacing:4px;">WELCOME10</div>
              <div style="font-size:12px;color:#9a3412;margin-top:4px;">10% off your first order</div>
            </div>

            <div style="border-top:1px solid #f3f4f6;padding-top:20px;text-align:center;">
              <div style="font-size:13px;color:#9ca3af;">✓ Free shipping over $50 &nbsp;·&nbsp; ✓ 30-day returns &nbsp;·&nbsp; ✓ Secure checkout</div>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;">
            <div style="font-size:12px;color:#9ca3af;">
              PawHaven · <a href="https://pawhavenpets.org" style="color:#9ca3af;">pawhavenpets.org</a><br />
              You're receiving this because you signed up at pawhavenpets.org.
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// GET /api/cron/cart-recovery — runs hourly via Vercel Cron
export async function GET(req) {
  // Verify cron secret
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!REDIS_URL() || !apiKey) {
    return NextResponse.json({ skipped: 'missing env vars' });
  }

  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const twentyThreeHoursAgo = now - 23 * 60 * 60 * 1000;

  // Find carts saved 1–23 hours ago (not too fresh, not expired)
  const emails = await redisZRangeByScore('abandoned_carts', twentyThreeHoursAgo, oneHourAgo);

  if (!emails.length) {
    return NextResponse.json({ processed: 0 });
  }

  let sent = 0;
  for (const email of emails) {
    try {
      const cartData = await redisGet(`abandoned_cart:${email}`);
      if (!cartData?.items?.length) continue;

      const cartUrl = 'https://pawhavenpets.org/cart';

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: 'PawHaven <orders@pawhavenpets.org>',
          to: [email],
          subject: `🛒 You left something in your cart, ${email.split('@')[0]}!`,
          html: buildRecoveryEmail(cartData.items, cartUrl),
        }),
      });

      // Remove from sorted set so we don't re-send
      await redisZRemRangeByScore('abandoned_carts', cartData.savedAt, cartData.savedAt);
      // Keep cart data in Redis briefly in case they click back
      sent++;
    } catch (err) {
      console.error(`[cart-recovery] Failed for ${email}:`, err.message);
    }
  }

  console.log(`[cart-recovery] Sent ${sent}/${emails.length} recovery emails`);
  return NextResponse.json({ processed: emails.length, sent });
}
