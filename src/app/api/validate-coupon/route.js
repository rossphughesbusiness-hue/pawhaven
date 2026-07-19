import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 });
  }

  try {
    const { code } = await req.json();
    if (!code || !code.trim()) {
      return NextResponse.json({ error: 'Please enter a coupon code' }, { status: 400 });
    }

    // WELCOME10 is fulfilled natively at checkout (10% off, applied server-side
    // to line-item prices) so it does not depend on a Stripe coupon object.
    if (code.trim().toUpperCase() === 'WELCOME10') {
      return NextResponse.json({
        id: 'LOCAL_WELCOME10',
        code: 'WELCOME10',
        percentOff: 10,
        amountOff: null,
        name: 'Welcome 10% Off',
      });
    }

    const promoCodes = await stripe.promotionCodes.list({
      code: code.trim().toUpperCase(),
      active: true,
      limit: 1,
    });

    if (promoCodes.data.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired coupon code' }, { status: 404 });
    }

    const promo = promoCodes.data[0];
    let coupon = promo.coupon;

    // coupon may arrive as an ID string or be missing if it was deleted in Stripe
    if (typeof coupon === 'string') {
      coupon = await stripe.coupons.retrieve(coupon).catch(() => null);
    }
    if (!coupon || coupon.deleted || !coupon.valid) {
      return NextResponse.json({ error: 'This coupon is no longer valid' }, { status: 404 });
    }

    return NextResponse.json({
      id: promo.id,
      code: promo.code,
      percentOff: coupon.percent_off || null,
      amountOff: coupon.amount_off ? coupon.amount_off / 100 : null,
      name: coupon.name || promo.code,
    });
  } catch (err) {
    console.error('Coupon validation error:', err);
    return NextResponse.json({ error: 'Could not validate coupon. Please try again.' }, { status: 500 });
  }
}
