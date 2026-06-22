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

    const promoCodes = await stripe.promotionCodes.list({
      code: code.trim().toUpperCase(),
      active: true,
      limit: 1,
    });

    if (promoCodes.data.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired coupon code' }, { status: 404 });
    }

    const promo = promoCodes.data[0];
    const coupon = promo.coupon;

    // Check coupon is still valid
    if (!coupon.valid) {
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
