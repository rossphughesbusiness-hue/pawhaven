/**
 * POST /api/admin/broadcast
 * Send a promotional email to all Resend audience contacts.
 *
 * Auth: Authorization: Bearer {ADMIN_SECRET}
 *
 * Body:
 * {
 *   subject: "🔥 Flash Sale — 20% off everything this weekend",
 *   headline: "Weekend Flash Sale",
 *   subheadline: "20% off sitewide — this weekend only",
 *   body: "Your pets deserve a treat...",
 *   ctaText: "Shop Now →",
 *   ctaUrl: "https://pawhavenpets.org/sale",
 *   coupon: "FLASH20",           // optional
 *   couponDesc: "20% off, no minimum, expires Sunday midnight",  // optional
 *   fromName: "PawHaven",        // optional, defaults to PawHaven
 * }
 *
 * Returns: { ok: true, sent: N, failed: N }
 *
 * Resend broadcasts contacts in pages of 100; this handler pages through all.
 * Rate limit: Resend free tier sends ~100/day; Pro is 50k/month.
 */

import { NextResponse } from 'next/server';

const BASE = 'https://pawhavenpets.org';

function buildEmail({ headline, subheadline, body, ctaText, ctaUrl, coupon, couponDesc }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:32px 40px;text-align:center;">
            <div style="font-size:32px;margin-bottom:8px;">🐾</div>
            <div style="color:#ffffff;font-size:24px;font-weight:800;line-height:1.2;">${headline}</div>
            ${subheadline ? `<div style="color:rgba(255,255,255,0.75);font-size:15px;margin-top:8px;">${subheadline}</div>` : ''}
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;text-align:center;">
            ${body ? `<p style="margin:0 0 28px;font-size:16px;color:#64748b;line-height:1.7;text-align:left;">${body}</p>` : ''}

            ${coupon ? `
            <!-- Coupon -->
            <div style="background:#f8fafc;border:2px dashed #e2e8f0;border-radius:14px;padding:20px 30px;margin:0 auto 28px;">
              <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Your Exclusive Code</div>
              <div style="font-size:36px;font-weight:900;color:#f97316;font-family:monospace;letter-spacing:4px;">${coupon}</div>
              ${couponDesc ? `<div style="font-size:12px;color:#94a3b8;margin-top:6px;">${couponDesc}</div>` : ''}
            </div>
            ` : ''}

            <!-- CTA -->
            <a href="${ctaUrl || BASE}"
               style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:16px;padding:16px 40px;border-radius:50px;text-decoration:none;margin-bottom:28px;">
              ${ctaText || 'Shop Now →'}
            </a>

            <!-- Quick links -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f0f0;padding-top:24px;">
              <tr>
                <td style="text-align:center;padding:0 6px;">
                  <a href="${BASE}/products" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 8px;text-decoration:none;">
                    <div style="font-size:18px;margin-bottom:3px;">🛍</div>
                    <div style="font-size:11px;font-weight:700;color:#1a2b4a;">All Products</div>
                  </a>
                </td>
                <td style="text-align:center;padding:0 6px;">
                  <a href="${BASE}/bundles" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 8px;text-decoration:none;">
                    <div style="font-size:18px;margin-bottom:3px;">🎁</div>
                    <div style="font-size:11px;font-weight:700;color:#1a2b4a;">Bundles</div>
                  </a>
                </td>
                <td style="text-align:center;padding:0 6px;">
                  <a href="${BASE}/sale" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 8px;text-decoration:none;">
                    <div style="font-size:18px;margin-bottom:3px;">🔥</div>
                    <div style="font-size:11px;font-weight:700;color:#1a2b4a;">Flash Sale</div>
                  </a>
                </td>
                <td style="text-align:center;padding:0 6px;">
                  <a href="${BASE}/quiz" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 8px;text-decoration:none;">
                    <div style="font-size:18px;margin-bottom:3px;">🎯</div>
                    <div style="font-size:11px;font-weight:700;color:#1a2b4a;">Take the Quiz</div>
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.7;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a><br>
              You\'re receiving this because you subscribed to PawHaven updates.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function getAudienceContacts(audienceId, apiKey) {
  // Resend lists contacts in pages of 100
  const contacts = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    if (!res.ok) break;
    const json = await res.json();
    const page = json.data || [];
    contacts.push(...page);
    if (page.length < limit) break;
    offset += limit;
  }

  return contacts;
}

export async function POST(req) {
  // Auth
  const auth = req.headers.get('Authorization');
  if (!auth || auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY or RESEND_AUDIENCE_ID' }, { status: 500 });
  }

  const body = await req.json();
  const { subject, headline, subheadline, body: bodyText, ctaText, ctaUrl, coupon, couponDesc, fromName } = body;

  if (!subject || !headline) {
    return NextResponse.json({ error: 'subject and headline are required' }, { status: 400 });
  }

  const html = buildEmail({ headline, subheadline, body: bodyText, ctaText, ctaUrl, coupon, couponDesc });
  const from = `${fromName || 'PawHaven'} <orders@pawhavenpets.org>`;

  // Fetch all subscribers
  const contacts = await getAudienceContacts(audienceId, apiKey);
  const subscribed = contacts.filter(c => c.unsubscribed !== true && c.email);

  console.log(`[broadcast] Sending to ${subscribed.length} contacts`);

  let sent = 0;
  let failed = 0;

  // Send in batches of 10 to avoid overwhelming Resend rate limits
  for (let i = 0; i < subscribed.length; i += 10) {
    const batch = subscribed.slice(i, i + 10);
    await Promise.all(batch.map(async (contact) => {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ from, to: [contact.email], subject, html }),
        });
        if (res.ok) { sent++; } else { failed++; }
      } catch { failed++; }
    }));
    // Small delay between batches
    if (i + 10 < subscribed.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`[broadcast] Done — sent: ${sent}, failed: ${failed}`);
  return NextResponse.json({ ok: true, sent, failed, total: subscribed.length });
}
