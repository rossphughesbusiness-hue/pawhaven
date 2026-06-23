/**
 * GET /api/admin/affiliates/quick-approve?token=...
 *
 * One-click affiliate approval from the admin notification email.
 * Token = base64url(JSON { email, name, commissionPct, ts }) + "." + HMAC-SHA256 signature.
 * Validates token, calls the approve logic, returns a confirmation HTML page.
 */
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const BASE = 'https://pawhavenpets.org';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7-day window to click approve

// ─── Token helpers ────────────────────────────────────────────────────────────

function b64url(str) {
  return Buffer.from(str).toString('base64url');
}

function fromB64url(str) {
  return Buffer.from(str, 'base64url').toString('utf8');
}

export function buildApproveToken(email, name, commissionPct = 15) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  const payload = b64url(JSON.stringify({ email, name, commissionPct, ts: Date.now() }));
  const sig = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  // Constant-time comparison
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  if (diff !== 0) return null;
  try {
    const data = JSON.parse(fromB64url(payload));
    if (Date.now() - data.ts > TOKEN_MAX_AGE_MS) return null;
    return data;
  } catch {
    return null;
  }
}

// ─── Redis + Resend helpers ───────────────────────────────────────────────────

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

function generateCode(name) {
  const first = name.split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 8);
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${first}${digits}`;
}

async function approveAffiliate(email, name, commissionPct) {
  const code = generateCode(name);
  const affiliateData = {
    email: email.toLowerCase(),
    name,
    code,
    commissionPct,
    clicks: 0,
    conversions: 0,
    earned: 0,
    approvedAt: Date.now(),
    status: 'active',
  };

  const ttl = 3 * 365 * 24 * 60 * 60;
  await redisSave(`affiliate:${code}`, affiliateData, ttl);
  await redisSave(`affiliate_email:${email.toLowerCase()}`, code, ttl);
  await redisSave(`affiliate_app:${email.toLowerCase()}`, { ...affiliateData, status: 'approved' }, 365 * 24 * 60 * 60);

  // Send approval email to affiliate
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const dashUrl = `${BASE}/affiliates/stats?code=${code}`;
    const refUrl = `${BASE}/?ref=${code}`;
    const firstName = name.split(' ')[0];
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: 'PawHaven <orders@pawhavenpets.org>',
        to: [email],
        subject: `🎉 You're in! Your PawHaven affiliate code is ${code}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:32px 40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:6px;">🎉</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">Welcome to the team, ${firstName}!</div>
            <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:4px;">Your affiliate account is active</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;font-size:16px;color:#64748b;line-height:1.7;">
              You've been approved! Here's everything you need to start earning <strong>${commissionPct}% commission</strong> on every sale you refer.
            </p>
            <div style="background:#f8fafc;border:2px dashed #e2e8f0;border-radius:14px;padding:24px;text-align:center;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Your Affiliate Code</div>
              <div style="font-size:40px;font-weight:900;color:#f97316;font-family:monospace;letter-spacing:4px;">${code}</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:8px;">Your audience enters this at checkout for 10% off</div>
            </div>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Your Referral Link</div>
              <div style="font-size:13px;color:#15803d;font-family:monospace;word-break:break-all;">${refUrl}</div>
            </div>
            <div style="text-align:center;margin-bottom:16px;">
              <a href="${dashUrl}" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
                View Your Stats Dashboard →
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">© ${new Date().getFullYear()} PawHaven · <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
    });
  }

  return code;
}

// ─── HTML response helpers ────────────────────────────────────────────────────

function htmlPage(title, body) {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} — PawHaven Admin</title>
  <style>
    body { margin: 0; padding: 0; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: #1e293b; border-radius: 16px; padding: 40px 48px; max-width: 480px; width: 90%; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.4); }
    h1 { margin: 0 0 12px; font-size: 22px; font-weight: 800; color: #f1f5f9; }
    p { margin: 0 0 24px; font-size: 15px; color: #94a3b8; line-height: 1.6; }
    .code { font-family: monospace; font-size: 32px; font-weight: 900; color: #f97316; letter-spacing: 4px; margin: 16px 0; }
    .btn { display: inline-block; background: #f97316; color: #fff; font-weight: 700; font-size: 14px;
      padding: 12px 28px; border-radius: 50px; text-decoration: none; margin-top: 8px; }
    .icon { font-size: 48px; margin-bottom: 16px; }
    .error { color: #f87171; }
  </style>
</head>
<body>
  <div class="card">${body}</div>
</body>
</html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  const data = verifyToken(token);

  if (!data) {
    return htmlPage('Invalid Link', `
      <div class="icon">⚠️</div>
      <h1 class="error">Invalid or Expired Link</h1>
      <p>This approval link is invalid or has expired (links expire after 7 days).</p>
      <p>Re-send the application or approve manually via the API.</p>
    `);
  }

  const { email, name, commissionPct } = data;

  try {
    const code = await approveAffiliate(email, name, commissionPct);
    return htmlPage('Affiliate Approved', `
      <div class="icon">🎉</div>
      <h1>Affiliate Approved!</h1>
      <p><strong style="color:#f1f5f9;">${name}</strong> (${email}) is now active.</p>
      <div class="code">${code}</div>
      <p style="font-size:13px;">Their approval email with code and dashboard link has been sent automatically.</p>
      <p style="font-size:12px;color:#64748b;">${commissionPct}% commission · 90-day cookie · Dashboard: /affiliates/stats?code=${code}</p>
      <a href="https://pawhavenpets.org" class="btn">Back to PawHaven →</a>
    `);
  } catch (err) {
    console.error('[quick-approve] Error:', err.message);
    return htmlPage('Error', `
      <div class="icon">❌</div>
      <h1 class="error">Approval Failed</h1>
      <p>${err.message}</p>
    `);
  }
}
