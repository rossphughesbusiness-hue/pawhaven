import { NextResponse } from 'next/server';

const BASE = 'https://pawhavenpets.org';

// ─── Redis helpers ────────────────────────────────────────────────────────────

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

async function redisZAdd(key, score, member) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/zadd/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([score, member]),
    cache: 'no-store',
  });
}

// ─── Email builder ────────────────────────────────────────────────────────────

function buildWinBackEmail(customerName) {
  const firstName = (customerName || '').split(' ')[0] || 'there';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:32px 40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:6px;">🐾</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">We miss you, ${firstName}!</div>
            <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:4px;">It\'s been a while — here\'s a treat to bring you back</div>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 40px;text-align:center;">
            <p style="margin:0 0 24px;font-size:16px;color:#64748b;line-height:1.7;">
              We haven\'t seen you in a bit and we wanted to check in on you — and your pet! As a welcome-back gift, here\'s <strong style="color:#f97316;">15% off your next order</strong>:
            </p>

            <!-- Coupon -->
            <div style="background:#f8fafc;border:2px dashed #e2e8f0;border-radius:14px;padding:20px 30px;margin:0 auto 28px;display:inline-block;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Welcome Back Code</div>
              <div style="font-size:34px;font-weight:900;color:#f97316;font-family:monospace;letter-spacing:4px;">WIN15</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:6px;">15% off your entire order · No minimum · Expires in 7 days</div>
            </div>

            <!-- Top picks CTA -->
            <div style="margin-bottom:28px;">
              <a href="${BASE}/products"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:16px;padding:16px 36px;border-radius:50px;text-decoration:none;">
                Shop Now — 15% Off →
              </a>
            </div>

            <!-- Quick links -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f0f0;padding-top:24px;margin-top:4px;">
              <tr>
                <td style="text-align:center;padding:0 8px;">
                  <a href="${BASE}/quiz" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-decoration:none;">
                    <div style="font-size:20px;margin-bottom:4px;">🎯</div>
                    <div style="font-size:12px;font-weight:700;color:#1a2b4a;">Take the Quiz</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Find perfect picks</div>
                  </a>
                </td>
                <td style="text-align:center;padding:0 8px;">
                  <a href="${BASE}/bundles" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-decoration:none;">
                    <div style="font-size:20px;margin-bottom:4px;">🎁</div>
                    <div style="font-size:12px;font-weight:700;color:#1a2b4a;">Bundle Deals</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Save up to 20%</div>
                  </a>
                </td>
                <td style="text-align:center;padding:0 8px;">
                  <a href="${BASE}/sale" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-decoration:none;">
                    <div style="font-size:20px;margin-bottom:4px;">🔥</div>
                    <div style="font-size:12px;font-weight:700;color:#1a2b4a;">Flash Sale</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Limited time deals</div>
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.7;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a><br>
              You\'re receiving this because you\'re a valued PawHaven customer.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendWinBackEmail({ to, customerName }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const html = buildWinBackEmail(customerName);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [to],
      subject: `We miss you, ${(customerName || '').split(' ')[0] || 'friend'}! Here\'s 15% off 🐾`,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    console.error('[win-back cron] Email error:', JSON.stringify(err));
    return false;
  }
  return true;
}

// ─── Cron handler ─────────────────────────────────────────────────────────────

export async function GET(req) {
  // Auth check
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = Date.now();
  const due = await redisZRangeByScore('winback_queue', '-inf', now, 50);

  let sent = 0;
  let skipped = 0;

  for (const email of due) {
    // Remove from queue first (re-added on next purchase)
    await redisZRem('winback_queue', email);

    // Check if they\'ve bought recently (loyalty key updated on each purchase)
    const loyalty = await redisGet(`loyalty:${email}`);
    if (loyalty?.lastPurchase && now - loyalty.lastPurchase < 43 * 24 * 60 * 60 * 1000) {
      // Bought within the last 43 days — skip, queue them again 45 days from now
      await redisZAdd('winback_queue', loyalty.lastPurchase + 45 * 24 * 60 * 60 * 1000, email);
      skipped++;
      continue;
    }

    // Check if we already sent a win-back recently (60-day cooldown)
    const sentKey = `winback_sent:${email}`;
    const recentlySent = await redisGet(sentKey);
    if (recentlySent) { skipped++; continue; }

    // Fetch name for personalization
    const customerName = await redisGet(`winback_name:${email}`) || '';

    const ok = await sendWinBackEmail({ to: email, customerName });
    if (ok) {
      // Mark as sent with 60-day cooldown
      await redisSave(sentKey, { sentAt: now }, 60 * 24 * 60 * 60);
      sent++;
      console.log(`[win-back cron] ✉️ Win-back sent to ${email}`);
    }
  }

  console.log(`[win-back cron] Done — sent: ${sent}, skipped: ${skipped}`);
  return NextResponse.json({ ok: true, sent, skipped, processed: due.length });
}
