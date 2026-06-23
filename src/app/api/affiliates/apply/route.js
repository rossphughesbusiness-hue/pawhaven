/**
 * POST /api/affiliates/apply
 * Stores affiliate application in Redis and notifies admin.
 */
import { NextResponse } from 'next/server';

const BASE = 'https://pawhavenpets.org';
const ADMIN_EMAIL = 'rossphughes@gmail.com';

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

async function redisLPush(key, value) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  const encoded = encodeURIComponent(JSON.stringify(value));
  await fetch(`${url}/lpush/${encodeURIComponent(key)}/${encoded}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: 'PawHaven <orders@pawhavenpets.org>', to: [to], subject, html }),
  });
}

export async function POST(req) {
  const { name, email, handle, platform, audience, why } = await req.json();

  if (!name || !email || !handle || !platform || !audience) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const application = {
    name,
    email: email.toLowerCase(),
    handle,
    platform,
    audience,
    why: why || '',
    appliedAt: Date.now(),
    status: 'pending',
  };

  // Store individual application (keyed by email, 1-year TTL)
  await redisSave(`affiliate_app:${email.toLowerCase()}`, application, 365 * 24 * 60 * 60);

  // Add to pending list
  await redisLPush('affiliate_applications', application);

  // Confirmation email to applicant
  await sendEmail({
    to: email,
    subject: '🐾 We received your PawHaven affiliate application!',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:32px 40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:6px;">🐾</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">Application Received, ${name.split(' ')[0]}!</div>
            <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:4px;">We'll review and respond within 48 hours</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#64748b;line-height:1.7;">
              Thanks for applying to the PawHaven Affiliate Program! We review every application personally and will email you within <strong>48 hours</strong> with our decision.
            </p>
            <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:20px;">
              <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">Your Application</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="font-size:13px;color:#64748b;padding:4px 0;">Platform:</td><td style="font-size:13px;color:#1a2b4a;font-weight:600;text-align:right;">${platform}</td></tr>
                <tr><td style="font-size:13px;color:#64748b;padding:4px 0;">Handle:</td><td style="font-size:13px;color:#1a2b4a;font-weight:600;text-align:right;">${handle}</td></tr>
                <tr><td style="font-size:13px;color:#64748b;padding:4px 0;">Audience:</td><td style="font-size:13px;color:#1a2b4a;font-weight:600;text-align:right;">${audience}</td></tr>
              </table>
            </div>
            <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.7;">
              If approved, you'll receive your unique affiliate link, discount code, and a free product bundle to kick off your partnership.
            </p>
            <div style="text-align:center;">
              <a href="${BASE}/affiliates" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
                View Program Details →
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">
              © ${new Date().getFullYear()} PawHaven · <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  // Notify admin
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🤝 New affiliate application: ${name} (${platform}, ${audience})`,
    html: `<p>New affiliate application received:</p>
<ul>
<li><strong>Name:</strong> ${name}</li>
<li><strong>Email:</strong> ${email}</li>
<li><strong>Platform:</strong> ${platform}</li>
<li><strong>Handle:</strong> ${handle}</li>
<li><strong>Audience:</strong> ${audience}</li>
<li><strong>Why:</strong> ${why || '(not provided)'}</li>
</ul>
<p>To approve: <code>curl -X POST https://pawhavenpets.org/api/admin/affiliates/approve -H "Authorization: Bearer YOUR_ADMIN_SECRET" -H "Content-Type: application/json" -d '{"email":"${email}","name":"${name}","commissionPct":15}'</code></p>`,
  });

  return NextResponse.json({ ok: true });
}
