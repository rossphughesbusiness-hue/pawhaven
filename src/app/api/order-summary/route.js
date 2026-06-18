import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Returns only what the client needs for pixel conversion events.
// Never exposes full session data.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Not paid' }, { status: 400 });
    }

    return NextResponse.json({
      orderId: (session.payment_intent || session.id).slice(-12).toUpperCase(),
      total: (session.amount_total / 100).toFixed(2),
      currency: session.currency.toUpperCase(),
      itemCount: session.line_items?.data?.reduce((s, i) => s + i.quantity, 0) ?? 1,
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
