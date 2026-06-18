import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const line_items = items.map((item) => {
      // Build variant description string
      const variantDesc = item.variants && Object.keys(item.variants).length > 0
        ? Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(' · ')
        : null;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            ...(variantDesc && { description: variantDesc }),
            ...(item.image && { images: [item.image] }),
          },
          unit_amount: Math.round(item.price * 100), // cents
        },
        quantity: item.quantity,
      };
    });

    // Build fulfillment metadata: store each cart item's supplier info as a
    // numbered key so the webhook can create the CJDropshipping order.
    // Each value stays well under Stripe's 500-char-per-key limit.
    const fulfillmentMeta = { item_count: String(items.length) };
    items.forEach((item, idx) => {
      fulfillmentMeta[`item_${idx}`] = JSON.stringify({
        id: item.id,
        pid: item.supplierProductId || '',
        qty: item.quantity,
        v: item.variants || {},
      });
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      metadata: fulfillmentMeta,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 8 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 999, currency: 'usd' },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
