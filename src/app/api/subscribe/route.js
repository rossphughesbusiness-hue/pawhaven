import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      // Silently succeed if Resend isn't configured yet
      return NextResponse.json({ ok: true });
    }

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
      // "Contact already exists" is fine — treat as success
      if (err.name === 'validation_error' && err.message?.includes('already')) {
        return NextResponse.json({ ok: true });
      }
      console.error('[subscribe] Resend error:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] Error:', err.message);
    return NextResponse.json({ ok: true }); // Never show errors to the user
  }
}
