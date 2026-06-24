/**
 * POST /api/admin/affiliates/approve
 * Creates an affiliate account and sends their code.
 *
 * Auth: Authorization: Bearer {ADMIN_SECRET}
 *
 * Body: { email, name, commissionPct (default 15) }
 */
import { NextResponse } from 'next/server';

const BASE = 'https://pawhavenpets.org';

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
  // FIRSTNAME + 4 random digits, uppercase e.g. SARAH4829
  const first = name.split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 8);
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${first}${digits}`;
}

export async function POST(req) {
  const auth = req.headers.get('Authorization');
  if (!auth || auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, name, commissionPct = 15 } = await req.json();
  if (!email || !name) {
    return NextResponse.json({ error: 'email and name required' }, { status: 400 });
  }

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

  // Store by code (for webhook lookup) and by email (for stats page)
  await redisSave(`affiliate:${code}`, affiliateData, 3 * 365 * 24 * 60 * 60);
  await redisSave(`affiliate_email:${email.toLowerCase()}`, code, 3 * 365 * 24 * 60 * 60);
  // Update application status
  await redisSave(`affiliate_app:${email.toLowerCase()}`, { ...affiliateData, status: 'approved' }, 365 * 24 * 60 * 60);

  // Send approval email with code and dashboard link
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const dashUrl = `${BASE}/affiliates/stats?code=${code}`;
    const refUrl = `${BASE}/?ref=${code}`;
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: 'PawHaven <orders@pawhavenpets.org>',
        to: [email],
        subject: `🎉 You\'re in! Your PawHaven affiliate code is ${code}`,
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
            <div style="color:#ffffff;font-size:22px;font-weight:800;">Welcome to the team, ${name.split(' ')[0]}!</div>
            <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:4px;">Your affiliate account is active</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;font-size:16px;color:#64748b;line-height:1.7;">
              You\'ve been approved! Here\'s everything you need to start earning <strong>${commissionPct}% commission</strong> on every sale you refer.
            </p>

            <!-- Code box -->
            <div style="background:#f8fafc;border:2px dashed #e2e8f0;border-radius:14px;padding:24px;text-align:center;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Your Affiliate Code</div>
              <div style="font-size:40px;font-weight:900;color:#f97316;font-family:monospace;letter-spacing:4px;">${code}</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:8px;">Your audience enters this at checkout for 10% off</div>
            </div>

            <!-- Link box -->
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Your Referral Link</div>
              <div style="font-size:13px;color:#15803d;font-family:monospace;word-break:break-all;">${refUrl}</div>
              <div style="font-size:12px;color:#4ade80;margin-top:4px;">Share this link in your bio, captions, and stories</div>
            </div>

            <!-- How it works -->
            <table width="100%" cellpadding="0" cellspacing="4" style="margin-bottom:24px;">
              <tr>
                <td style="background:#f8fafc;border-radius:10px;padding:12px 16px;width:33%;">
                  <div style="font-size:18px;margin-bottom:4px;">🔗</div>
                  <div style="font-size:12px;font-weight:700;color:#1a2b4a;">Share your link</div>
                  <div style="font-size:11px;color:#94a3b8;">Any post, story, or bio</div>
                </td>
                <td style="width:4px;"></td>
                <td style="background:#f8fafc;border-radius:10px;padding:12px 16px;width:33%;">
                  <div style="font-size:18px;margin-bottom:4px;">🛒</div>
                  <div style="font-size:12px;font-weight:700;color:#1a2b4a;">Follower buys</div>
                  <div style="font-size:11px;color:#94a3b8;">They save 10%</div>
                </td>
                <td style="width:4px;"></td>
                <td style="background:#f8fafc;border-radius:10px;padding:12px 16px;width:33%;">
                  <div style="font-size:18px;margin-bottom:4px;">💸</div>
                  <div style="font-size:12px;font-weight:700;color:#1a2b4a;">You earn ${commissionPct}%</div>
                  <div style="font-size:11px;color:#94a3b8;">Paid monthly</div>
                </td>
              </tr>
            </table>

            <div style="text-align:center;margin-bottom:16px;">
              <a href="${dashUrl}" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
                View Your Stats Dashboard →
              </a>
            </div>

            <p style="margin:0;font-size:13px;color:#94a3b8;text-align:center;">
              Bookmark your dashboard: <a href="${dashUrl}" style="color:#f97316;">${dashUrl}</a>
            </p>
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

  return NextResponse.json({ ok: true, code, affiliate: affiliateData });
}
