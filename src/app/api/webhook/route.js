import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CJ_BASE = 'https://developers.cjdropshipping.com/api2.0/v1';

// ─── CJDropshipping helpers ──────────────────────────────────────────────────

async function getCJToken() {
  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.CJ_EMAIL,
      password: process.env.CJ_PASSWORD,
    }),
  });
  const data = await res.json();
  if (data.code !== 200 || !data.data?.accessToken) {
    throw new Error(`CJ auth failed: ${data.message || JSON.stringify(data)}`);
  }
  return data.data.accessToken;
}

/**
 * Fetch CJ product variants and attempt to match the customer's selected
 * variant options (color, size, etc.). Falls back to the first variant.
 */
async function resolveVariantId(pid, selectedVariants, token) {
  try {
    const res = await fetch(
      `${CJ_BASE}/product/variant/query?pid=${encodeURIComponent(pid)}`,
      { headers: { 'CJ-Access-Token': token } }
    );
    const data = await res.json();
    const variants = data.data;
    if (!Array.isArray(variants) || variants.length === 0) return null;

    if (selectedVariants && Object.keys(selectedVariants).length > 0) {
      // Build a lowercase match string from the customer's selections
      const customerChoices = Object.values(selectedVariants)
        .map((v) => v.toLowerCase())
        .join(' ');

      // Try to find a variant whose label contains all chosen values
      const match = variants.find((v) => {
        const label = (v.variantNameEn || v.variantName || '').toLowerCase();
        return Object.values(selectedVariants).every((val) =>
          label.includes(val.toLowerCase())
        );
      });
      if (match) return match.vid;

      // Partial match: at least one value matches
      const partial = variants.find((v) => {
        const label = (v.variantNameEn || v.variantName || '').toLowerCase();
        return Object.values(selectedVariants).some((val) =>
          label.includes(val.toLowerCase())
        );
      });
      if (partial) return partial.vid;
    }

    // Default to first available (in-stock) variant
    const inStock = variants.find((v) => v.isSku !== 0) || variants[0];
    return inStock.vid;
  } catch (err) {
    console.error(`[webhook] resolveVariantId error for pid=${pid}:`, err.message);
    return null;
  }
}

/**
 * Submit the order to CJDropshipping.
 */
async function createCJOrder({ orderNumber, shipping, phone, products, token }) {
  const addr = shipping.address;

  // Map country code → display name for common countries
  const countryNames = { US: 'United States', CA: 'Canada', GB: 'United Kingdom', AU: 'Australia' };

  const body = {
    orderNumber,
    shippingCustomerName: shipping.name || 'Customer',
    shippingPhone: phone || '0000000000',
    shippingAddress: addr.line1 || '',
    shippingAddress2: addr.line2 || '',
    shippingCity: addr.city || '',
    shippingProvince: addr.state || '',
    shippingZip: addr.postal_code || '',
    shippingCountryCode: addr.country || 'US',
    shippingCountry: countryNames[addr.country] || addr.country || 'United States',
    fromCountryCode: 'CN',
    products,
  };

  const res = await fetch(`${CJ_BASE}/shopping/order/createOrderV2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CJ-Access-Token': token,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
}

// ─── Webhook handler ─────────────────────────────────────────────────────────

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;

  // Skip sessions that weren't paid
  if (session.payment_status !== 'paid') {
    console.log(`[webhook] Session ${session.id} not paid yet — skipping.`);
    return NextResponse.json({ received: true });
  }

  console.log(`[webhook] Processing fulfilled order for session ${session.id}`);

  // ── Parse fulfillment items from session metadata ──────────────────────────
  const itemCount = parseInt(session.metadata?.item_count || '0', 10);
  if (itemCount === 0) {
    console.warn(`[webhook] No fulfillment metadata on session ${session.id}`);
    return NextResponse.json({ received: true });
  }

  const cartItems = [];
  for (let i = 0; i < itemCount; i++) {
    try {
      const raw = session.metadata[`item_${i}`];
      if (raw) cartItems.push(JSON.parse(raw));
    } catch {
      console.error(`[webhook] Failed to parse item_${i} metadata`);
    }
  }

  const itemsWithSupplier = cartItems.filter((it) => it.pid);
  if (itemsWithSupplier.length === 0) {
    console.warn(`[webhook] No supplier product IDs found in metadata for session ${session.id}`);
    return NextResponse.json({ received: true });
  }

  // ── Authenticate with CJDropshipping ──────────────────────────────────────
  let cjToken;
  try {
    cjToken = await getCJToken();
  } catch (err) {
    console.error('[webhook] CJ authentication failed:', err.message);
    // Return 200 so Stripe doesn't retry — we'll handle this via Vercel logs
    return NextResponse.json({ received: true });
  }

  // ── Resolve CJ variant IDs for each product ───────────────────────────────
  const cjProducts = [];
  for (const item of itemsWithSupplier) {
    const vid = await resolveVariantId(item.pid, item.v, cjToken);
    if (!vid) {
      console.error(`[webhook] Could not resolve variant for pid=${item.pid} — skipping`);
      continue;
    }
    cjProducts.push({ vid, quantity: item.qty });
  }

  if (cjProducts.length === 0) {
    console.error(`[webhook] No resolvable CJ variants for session ${session.id}`);
    return NextResponse.json({ received: true });
  }

  // ── Create CJDropshipping order ────────────────────────────────────────────
  const shipping = session.shipping_details;
  const phone = session.customer_details?.phone;
  const orderNumber = session.payment_intent || session.id;

  try {
    const result = await createCJOrder({
      orderNumber,
      shipping,
      phone,
      products: cjProducts,
      token: cjToken,
    });

    if (result.code === 200) {
      console.log(
        `[webhook] ✅ CJ order created for session ${session.id}:`,
        JSON.stringify(result.data)
      );
    } else {
      console.error(
        `[webhook] ❌ CJ order creation failed for session ${session.id}:`,
        JSON.stringify(result)
      );
    }
  } catch (err) {
    console.error(`[webhook] CJ order error for session ${session.id}:`, err.message);
  }

  return NextResponse.json({ received: true });
}
