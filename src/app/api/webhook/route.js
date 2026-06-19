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

  return res.json();
}

// ─── Email helpers ────────────────────────────────────────────────────────────

function buildConfirmationEmail({ customerName, orderRef, lineItems, shipping, total, shippingLabel }) {
  const addr = shipping?.address;
  const addrLine = addr
    ? [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
        .filter(Boolean)
        .join(', ')
    : 'N/A';

  const itemRows = lineItems
    .map(
      (li) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#1a2b4a;">
          ${li.description || li.price?.product?.name || 'Item'}
          ${li.quantity > 1 ? `<span style="color:#888;font-size:13px;"> × ${li.quantity}</span>` : ''}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;color:#1a2b4a;text-align:right;white-space:nowrap;">
          $${((li.amount_total ?? li.amount_subtotal ?? 0) / 100).toFixed(2)}
        </td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:32px 40px;text-align:center;">
            <div style="font-size:28px;margin-bottom:4px;">🐾</div>
            <div style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">PawHaven</div>
            <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:2px;">Order Confirmed</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a2b4a;">
              Thanks for your order, ${customerName}! 🎉
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">
              We've received your payment and your order is on its way to our fulfillment team.
              You'll receive a shipping update once your package is on the move.
            </p>

            <!-- Order ref -->
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
              <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Order Reference</span><br>
              <span style="font-size:14px;font-weight:700;color:#1a2b4a;font-family:monospace;">${orderRef}</span>
            </div>

            <!-- Items -->
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Items Ordered</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
              ${itemRows}
              <tr>
                <td style="padding:14px 0 0;font-size:15px;font-weight:800;color:#1a2b4a;">Total</td>
                <td style="padding:14px 0 0;font-size:15px;font-weight:800;color:#f97316;text-align:right;">$${(total / 100).toFixed(2)}</td>
              </tr>
            </table>

            <!-- Shipping -->
            <div style="margin-top:28px;padding-top:24px;border-top:1px solid #f0f0f0;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Shipping To</p>
              <p style="margin:0;font-size:15px;color:#1a2b4a;line-height:1.6;">
                <strong>${shipping?.name || customerName}</strong><br>${addrLine}
              </p>
              ${shippingLabel ? `<p style="margin:10px 0 0;font-size:13px;color:#64748b;">🚚 ${shippingLabel} (5–12 business days)</p>` : ''}
            </div>

            <!-- CTA -->
            <div style="margin-top:32px;text-align:center;">
              <a href="https://pawhavenpets.org/products"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">
                Shop More for Your Pet →
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
              Questions? Reply to this email or visit
              <a href="https://pawhavenpets.org" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a>
              <br>© ${new Date().getFullYear()} PawHaven. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendConfirmationEmail({ to, customerName, orderRef, lineItems, shipping, total, shippingLabel }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[webhook] RESEND_API_KEY not set — skipping confirmation email');
    return;
  }

  const html = buildConfirmationEmail({ customerName, orderRef, lineItems, shipping, total, shippingLabel });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'PawHaven Orders <orders@pawhavenpets.org>',
      to: [to],
      subject: `Your PawHaven order is confirmed! 🐾`,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('[webhook] Resend error:', JSON.stringify(data));
  } else {
    console.log(`[webhook] ✉️ Confirmation email sent to ${to} (id: ${data.id})`);
  }
}

// ─── Redis helper ────────────────────────────────────────────────────────────

async function redisSave(key, value, exSeconds = 7776000) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  const encoded = encodeURIComponent(JSON.stringify(value));
  await fetch(`${url}/set/${encodeURIComponent(key)}/${encoded}/ex/${exSeconds}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
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

  if (session.payment_status !== 'paid') {
    console.log(`[webhook] Session ${session.id} not paid yet — skipping.`);
    return NextResponse.json({ received: true });
  }

  console.log(`[webhook] Processing fulfilled order for session ${session.id}`);

  // ── Retrieve session with expanded line items (needed for email) ───────────
  let fullSession;
  try {
    fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });
  } catch (err) {
    console.error('[webhook] Failed to expand session:', err.message);
    fullSession = session;
  }

  const lineItems = fullSession.line_items?.data || [];
  const customerEmail = session.customer_details?.email;
  const customerName = session.shipping_details?.name || session.customer_details?.name || 'there';
  const orderRef = (session.payment_intent || session.id).slice(-12).toUpperCase();
  const shippingOption = session.shipping_cost?.shipping_rate;
  const shippingLabel = fullSession.shipping_cost?.amount_total > 0
    ? 'Express Shipping'
    : 'Standard Shipping';

  // ── Parse fulfillment items from session metadata ──────────────────────────
  const itemCount = parseInt(session.metadata?.item_count || '0', 10);
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

  // ── CJDropshipping fulfillment ─────────────────────────────────────────────
  if (itemsWithSupplier.length > 0) {
    let cjToken;
    try {
      cjToken = await getCJToken();
    } catch (err) {
      console.error('[webhook] CJ authentication failed:', err.message);
      cjToken = null;
    }

    if (cjToken) {
      const cjProducts = [];
      for (const item of itemsWithSupplier) {
        const vid = await resolveVariantId(item.pid, item.v, cjToken);
        if (!vid) {
          console.error(`[webhook] Could not resolve variant for pid=${item.pid} — skipping`);
          continue;
        }
        cjProducts.push({ vid, quantity: item.qty });
      }

      if (cjProducts.length > 0) {
        const orderNumber = session.payment_intent || session.id;
        const shipping = session.shipping_details;
        const phone = session.customer_details?.phone;

        try {
          const result = await createCJOrder({ orderNumber, shipping, phone, products: cjProducts, token: cjToken });
          if (result.code === 200) {
            const cjOrderId = result.data?.orderId || result.data?.orderNum || orderNumber;
            console.log(`[webhook] ✅ CJ order created for session ${session.id}:`, JSON.stringify(result.data));
            // Save CJ order ID to Redis for order tracking (90-day TTL)
            await redisSave(`order:${session.id}`, {
              cjOrderId,
              orderRef,
              customerEmail,
              customerName,
              status: 'processing',
              createdAt: Date.now(),
            });
          } else {
            console.error(`[webhook] ❌ CJ order failed for session ${session.id}:`, JSON.stringify(result));
          }
        } catch (err) {
          console.error(`[webhook] CJ order error for session ${session.id}:`, err.message);
        }
      }
    }
  } else {
    console.warn(`[webhook] No supplier product IDs found in metadata for session ${session.id}`);
  }

  // ── Send customer confirmation email ───────────────────────────────────────
  if (customerEmail) {
    try {
      await sendConfirmationEmail({
        to: customerEmail,
        customerName,
        orderRef,
        lineItems,
        shipping: session.shipping_details,
        total: session.amount_total,
        shippingLabel,
      });
    } catch (err) {
      console.error('[webhook] Email send error:', err.message);
    }
  } else {
    console.warn(`[webhook] No customer email for session ${session.id} — skipping confirmation`);
  }

  return NextResponse.json({ received: true });
}
