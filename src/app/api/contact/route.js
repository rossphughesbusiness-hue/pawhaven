import { NextResponse } from 'next/server';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendEmail(apiKey, payload) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
}

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log(`[contact] From: ${name} <${email}> — ${message}`);
      return NextResponse.json({ ok: true });
    }

    const preview = esc(message.slice(0, 300)) + (message.length > 300 ? '…' : '');

    // 1. Notify support
    await sendEmail(apiKey, {
      from: 'PawHaven Contact <support@pawhavenpets.org>',
      to: ['support@pawhavenpets.org'],
      reply_to: email,
      subject: `New message from ${esc(name)}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a1a2e;padding:24px 32px;border-radius:12px 12px 0 0">
            <h1 style="color:#f97316;margin:0;font-size:18px">🐾 PawHaven — New Support Message</h1>
          </div>
          <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 4px 0;color:#6b7280;font-size:13px">From</p>
            <p style="margin:0 0 20px 0;font-weight:700;color:#111827">${esc(name)} &lt;${esc(email)}&gt;</p>
            <p style="margin:0 0 8px 0;font-weight:700;color:#374151">Message</p>
            <div style="background:#f9fafb;border-left:3px solid #f97316;padding:14px 16px;border-radius:4px;color:#374151;font-size:14px;white-space:pre-wrap;line-height:1.6">${esc(message)}</div>
          </div>
          <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;font-size:12px;color:#9ca3af">
            Reply directly to this email to respond to ${esc(name)}.
          </div>
        </div>`,
    });

    // 2. Auto-reply to customer
    await sendEmail(apiKey, {
      from: 'PawHaven Support <support@pawhavenpets.org>',
      to: [email],
      subject: "We got your message! 🐾",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#1a1a2e;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
            <span style="font-size:36px">🐾</span>
            <h1 style="color:#ffffff;margin:10px 0 4px 0;font-size:22px">We got your message, ${esc(name)}!</h1>
            <p style="color:#9ca3af;margin:0;font-size:14px">Our team typically replies within 24 hours</p>
          </div>
          <div style="background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
            <p style="color:#374151;margin:0 0 16px 0">Here's a copy of what you sent us:</p>
            <div style="background:#f9fafb;border-left:3px solid #f97316;padding:14px 16px;border-radius:4px;font-size:13px;color:#6b7280;font-style:italic;line-height:1.6">"${preview}"</div>
            <div style="margin:24px 0 0 0;background:#fff7ed;border-radius:10px;padding:16px 20px">
              <p style="margin:0 0 8px 0;font-weight:700;color:#c2410c;font-size:13px">While you wait…</p>
              <ul style="margin:0;padding-left:18px;color:#374151;font-size:13px;line-height:2">
                <li><a href="https://pawhavenpets.org/order-tracking" style="color:#f97316">Track your order</a></li>
                <li><a href="https://pawhavenpets.org/blog" style="color:#f97316">Browse our pet care blog</a></li>
                <li><a href="https://pawhavenpets.org/quiz" style="color:#f97316">Take our pet product quiz</a></li>
              </ul>
            </div>
          </div>
          <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
            PawHaven · <a href="mailto:support@pawhavenpets.org" style="color:#f97316">support@pawhavenpets.org</a>
          </div>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err.message);
    return NextResponse.json({ ok: true }); // degrade gracefully
  }
}
