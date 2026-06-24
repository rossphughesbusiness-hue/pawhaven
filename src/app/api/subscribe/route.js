import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

// Same scoring logic as the quiz page
function getQuizRecommendations(answers) {
  if (!answers) return [];
  const { pet, goal, budget } = answers;
  const budgetRange = { low: [0, 25], mid: [25, 50], high: [50, 999] }[budget] || [0, 999];
  const scored = products.map((p) => {
    let score = 0;
    if (pet === 'dog' && p.category === 'Dogs') score += 3;
    if (pet === 'cat' && p.category === 'Cats') score += 3;
    if (pet === 'both') score += 1;
    const tag = (p.tag || '').toLowerCase();
    const name = (p.name || '').toLowerCase();
    if (goal === 'health' && (tag.includes('feeding') || name.includes('feeder') || name.includes('fountain') || name.includes('bowl'))) score += 4;
    if (goal === 'calm' && (name.includes('calming') || name.includes('lick') || name.includes('orthopedic') || name.includes('puzzle') || name.includes('cave'))) score += 4;
    if (goal === 'play' && (tag.includes('play') || name.includes('toy') || name.includes('puzzle') || name.includes('laser') || name.includes('feather'))) score += 4;
    if (goal === 'walks' && (name.includes('harness') || name.includes('leash') || name.includes('collar'))) score += 4;
    if (goal === 'travel' && (name.includes('travel') || name.includes('carrier') || name.includes('portable'))) score += 4;
    if (goal === 'groom' && (name.includes('brush') || name.includes('grooming') || name.includes('deshed'))) score += 4;
    if (p.price >= budgetRange[0] && p.price <= budgetRange[1]) score += 2;
    score += Math.min((p.soldCount || 0) / 500, 1);
    return { product: p, score };
  });
  return scored.filter(({ score }) => score > 3).sort((a, b) => b.score - a.score).slice(0, 3).map(({ product }) => product);
}

function buildQuizResultEmail(recs, answers) {
  const petLabel = answers.pet === 'dog' ? 'your dog' : answers.pet === 'cat' ? 'your cat' : 'your pets';
  const BASE = 'https://pawhavenpets.org';
  const recRows = recs.map((p) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="64" style="padding-right:12px;vertical-align:top;">
              <div style="width:64px;height:64px;border-radius:10px;overflow:hidden;background:#f1f5f9;font-size:28px;display:flex;align-items:center;justify-content:center;">
                ${p.emoji}
              </div>
            </td>
            <td style="vertical-align:top;">
              <div style="font-size:14px;font-weight:700;color:#1a2b4a;margin-bottom:2px;">${p.name}</div>
              <div style="font-size:13px;color:#64748b;margin-bottom:6px;">$${p.price.toFixed(2)}${p.comparePrice ? ` <span style="text-decoration:line-through;color:#94a3b8;">$${p.comparePrice.toFixed(2)}</span>` : ''}</div>
              <a href="${BASE}/products/${p.slug}"
                 style="display:inline-block;background:#f97316;color:#fff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;text-decoration:none;">
                View Product →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:32px 40px;text-align:center;">
            <div style="font-size:32px;margin-bottom:4px;">🎯</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">Your personalized picks</div>
            <div style="color:rgba(255,255,255,0.85);font-size:14px;margin-top:4px;">Curated just for ${petLabel}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;font-size:17px;font-weight:700;color:#1a2b4a;">Here are your top matches! 🐾</p>
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
              Based on your quiz answers, these are the products best suited for ${petLabel}. Use <strong style="color:#f97316;">WELCOME10</strong> for 10% off your first order.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">${recRows}</table>
            <div style="margin-top:28px;text-align:center;">
              <a href="${BASE}/quiz"
                 style="display:inline-block;background:#1a2b4a;color:#fff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:50px;text-decoration:none;">
                Retake the Quiz →
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

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
              Here\'s your exclusive discount 🎉
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">
              Thanks for joining PawHaven! As a welcome gift, here\'s 10% off your entire first order:
            </p>

            <!-- Coupon block -->
            <div style="background:#fff7ed;border:2px dashed #f97316;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
              <div style="font-size:12px;color:#9a3412;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:8px;">Your discount code</div>
              <div style="font-size:36px;font-weight:900;color:#f97316;letter-spacing:4px;font-family:monospace;">WELCOME10</div>
              <div style="font-size:13px;color:#9a3412;margin-top:8px;">10% off your entire order · No minimum · One use</div>
            </div>

            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">
              Just enter <strong style="color:#1a2b4a;">WELCOME10</strong> at checkout and the discount will apply automatically. It doesn\'t expire, so use it whenever you\'re ready.
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
    const { email, quizAnswers } = await req.json();
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

    // 2. Send email — personalized quiz results OR generic welcome
    const recs = quizAnswers ? getQuizRecommendations(quizAnswers) : [];
    const isQuizEmail = recs.length > 0;
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'PawHaven <orders@pawhavenpets.org>',
        to: [email],
        subject: isQuizEmail ? '🎯 Your personalized PawHaven picks are here!' : '🐾 Your 10% discount code is here!',
        html: isQuizEmail ? buildQuizResultEmail(recs, quizAnswers) : WELCOME_HTML,
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
