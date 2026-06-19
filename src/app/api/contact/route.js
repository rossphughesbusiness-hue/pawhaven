import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Resend not configured yet — log and succeed silently
      console.log(`[contact] Message from ${name} <${email}>: ${message}`);
      return NextResponse.json({ ok: true });
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'PawHaven Contact <orders@pawhavenpets.org>',
        to: ['support@pawhavenpets.org'],
        reply_to: email,
        subject: `Contact form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err.message);
    return NextResponse.json({ ok: true });
  }
}
