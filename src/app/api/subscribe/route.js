import { NextResponse } from 'next/server';

const WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:32px 40px;text-align:center;">
            <div style="font-size:32px;margin-bottom:4px;">🐾</div>
            <div style="color:#ffffff;font-size:24px;font-weight:800;">PawHaven</div>
            <div style="color:rgba(255,255,255,0.85);font-size:14px;margin-top:2px;">Welcome to the family!</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:18px;font-weight:700;color:#1a2b4a;">
              Here's your exclusive discount 🎉
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">
              Thanks for joining PawHaven! As a welcome gift, here's 10% off your entire first order:
            </p>

            <!-- Coupon block -->
            <div style="background:#fff7ed;border:2px dashed #f97316;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
              <div style="font-size:12px;color:#9a3412;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:8px;">Your discount code</div>
              <div style="font-size:36px;font-weight:900;color:#f97316;letter-spacing:4px;font-family:monospace;">WELCOME10</div>
              <div style="font-size:13px;color:#9a3412;margin-top:8px;">10% off your entire order · No minimum · One use</div>
            </div>

            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">
              Just enter <strong style="color:#1a2b4a;">WELCOME10</strong> at checkout and the discount will apply automatically. It doesn't expire, so use it whenever you're ready.
            </p>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:24px;">
              <a href="https://pawhavenpets.org/products"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:700;font-size:16px;padding:16px 36px;border-radius:50px;text-decoration:none;">
                Shop Now and Save 10% →
              </a>
            </div>

            <!-- Top picks -->
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Popular with pet owners right now</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#1a2b4a;">🥣 Maze Slow Feeder Bowl — <strong>$24.99</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#1a2b4a;">🐾 Calming Lick Mat — <strong>$19.99</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#1a2b4a;">💡 SafeGlow LED Collar — <strong>$24.99</strong></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
              Questions? Visit <a href="https://pawhavenpets.org/contact" style="color:#f97316;text-decoration:none;">pawhavenpets.org/contact</a>
              or email <a href="mailto:support@pawhavenpets.org" style="color:#f97316;text-decoration:none;">support@pawhavenpets.org</a>
              <br>© ${new Date().getFullYear()} PawHaven · <a href="https://pawhavenpets.org" style="color:#94a3b8;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      // Resend not configured yet — succeed silently
      return NextResponse.json({ ok: true });
    }

    // 1. Add to audience (if audience ID is set)
    if (audienceId) {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });

      if (!res.ok) {
        const err = await res.json();
        if (!err.message?.includes('already')) {
          console.error('[subscribe] Audience add error:', err);
        }
      }
    }

    // 2. Send welcome email with WELCOME10 code
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'PawHaven <orders@pawhavenpets.org>',
        to: [email],
        subject: '🐾 Your 10% discount code is here!',
        html: WELCOME_HTML,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error('[subscribe] Welcome email error:', err);
    } else {
      console.log(`[subscribe] ✉️ Welcome email sent to ${email}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] Error:', err.message);
    return NextResponse.json({ ok: true });
  }
}
