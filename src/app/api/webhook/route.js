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

function buildConfirmationEmail({ customerName, orderRef, sessionId, lineItems, shipping, total, shippingLabel }) {
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

            <!-- Order ref + track button -->
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
              <div>
                <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Order Reference</span><br>
                <span style="font-size:14px;font-weight:700;color:#1a2b4a;font-family:monospace;">${orderRef}</span>
              </div>
              ${sessionId ? `<a href="https://pawhavenpets.org/order-tracking?session_id=${sessionId}" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:50px;text-decoration:none;white-space:nowrap;">📦 Track Order →</a>` : ''}
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

async function sendConfirmationEmail({ to, customerName, orderRef, sessionId, lineItems, shipping, total, shippingLabel }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[webhook] RESEND_API_KEY not set — skipping confirmation email');
    return;
  }

  const html = buildConfirmationEmail({ customerName, orderRef, sessionId, lineItems, shipping, total, shippingLabel });

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

// ─── Loyalty reward email ─────────────────────────────────────────────────────

async function sendLoyaltyRewardEmail({ to, customerName, pointsEarned }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const firstName = customerName.split(' ')[0] || 'there';
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#f59e0b,#f97316);padding:32px 40px;text-align:center;">
            <div style="font-size:40px;margin-bottom:8px;">🏆</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">You unlocked a reward!</div>
            <div style="color:rgba(255,255,255,0.85);font-size:14px;margin-top:4px;">100 PawPoints reached — enjoy your $10 off</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;text-align:center;">
            <p style="margin:0 0 24px;font-size:16px;color:#64748b;line-height:1.7;">
              Amazing, ${firstName}! 🎉 You've reached <strong style="color:#1a2b4a;">100 PawPoints</strong> and unlocked a <strong style="color:#f97316;">$10 discount</strong> on your next order. Use this code at checkout:
            </p>
            <div style="background:#fffbeb;border:2px dashed #f59e0b;border-radius:14px;padding:20px 30px;margin:0 auto 28px;display:inline-block;">
              <div style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Your Reward Code</div>
              <div style="font-size:34px;font-weight:900;color:#f97316;font-family:monospace;letter-spacing:4px;">LOYAL10</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:6px;">$10 off your next order · No minimum</div>
            </div>
            <div>
              <a href="https://pawhavenpets.org/products"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:16px;padding:16px 36px;border-radius:50px;text-decoration:none;">
                Redeem My Reward →
              </a>
            </div>
            <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">
              Your PawPoints balance has been reset to 0 — keep shopping to earn your next reward! ⭐
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="https://pawhavenpets.org" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [to],
      subject: '🏆 You earned a $10 reward — 100 PawPoints reached!',
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    console.error('[webhook] Loyalty reward email error:', JSON.stringify(err));
  }
}

// ─── Referral reward email ────────────────────────────────────────────────────

async function sendReferralRewardEmail({ to, friendName }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:32px 40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:8px;">🎁</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">You earned a reward!</div>
            <div style="color:rgba(255,255,255,0.85);font-size:14px;margin-top:4px;">Your friend just made their first PawHaven purchase</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;text-align:center;">
            <p style="margin:0 0 24px;font-size:16px;color:#64748b;line-height:1.7;">
              Great news — <strong style="color:#1a2b4a;">${friendName || 'Your friend'}</strong> just completed their first PawHaven order using your referral link. As a thank-you, here's <strong>10% off</strong> your next order!
            </p>
            <div style="background:#fff7ed;border:2px dashed #fed7aa;border-radius:14px;padding:20px 30px;margin:0 auto 28px;display:inline-block;">
              <div style="font-size:11px;font-weight:700;color:#9a3412;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Your Reward Code</div>
              <div style="font-size:32px;font-weight:900;color:#f97316;font-family:monospace;letter-spacing:4px;">REFER10</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:6px;">10% off your next order · No minimum</div>
            </div>
            <div>
              <a href="https://pawhavenpets.org/products"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:16px;padding:16px 36px;border-radius:50px;text-decoration:none;">
                Shop Now →
              </a>
            </div>
            <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">
              Keep sharing your link — you earn a reward for every friend who shops. 🐾
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="https://pawhavenpets.org" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [to],
      subject: '🎁 Your referral reward is here — 10% off!',
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    console.error('[webhook] Referral reward email error:', JSON.stringify(err));
  }
}

// ─── Abandoned cart email ─────────────────────────────────────────────────────

function buildAbandonedCartEmail({ items, sessionId }) {
  const BASE = 'https://pawhavenpets.org';
  const restoreUrl = `${BASE}/cart/recover?sid=${sessionId}`;

  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
        <div style="font-size:14px;font-weight:600;color:#1a2b4a;">${item.name}</div>
        ${item.quantity > 1 ? `<div style="font-size:12px;color:#94a3b8;">Qty: ${item.quantity}</div>` : ''}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-size:14px;font-weight:700;color:#f97316;white-space:nowrap;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>`).join('');

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:32px 40px;text-align:center;">
            <div style="font-size:28px;margin-bottom:4px;">🛒</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">You left something behind</div>
            <div style="color:rgba(255,255,255,0.7);font-size:14px;margin-top:4px;">Your cart is saved — pick up where you left off</div>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
              Hey there — you had some great items in your cart! We saved everything for you.
              Come back and complete your order before your items sell out.
            </p>

            <!-- Items -->
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Items in your cart</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              ${itemRows}
              <tr>
                <td style="padding:14px 0 0;font-size:15px;font-weight:700;color:#1a2b4a;">Subtotal</td>
                <td style="padding:14px 0 0;font-size:15px;font-weight:800;color:#f97316;text-align:right;">$${subtotal.toFixed(2)}</td>
              </tr>
            </table>

            <!-- Coupon nudge -->
            <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px 18px;margin-bottom:28px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#9a3412;">
                🏷 Use code <strong style="font-family:monospace;font-size:16px;color:#f97316;letter-spacing:2px;">WELCOME10</strong> for 10% off!
              </p>
            </div>

            <!-- CTA -->
            <div style="text-align:center;">
              <a href="${restoreUrl}"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:16px;padding:16px 40px;border-radius:50px;text-decoration:none;">
                Complete My Order →
              </a>
            </div>

            <p style="margin:20px 0 0;font-size:13px;color:#94a3b8;text-align:center;line-height:1.6;">
              Your cart is saved for 24 hours. After that, items may sell out.<br>
              Questions? <a href="mailto:support@pawhavenpets.org" style="color:#f97316;text-decoration:none;">support@pawhavenpets.org</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="${BASE}" style="color:#94a3b8;text-decoration:none;">pawhavenpets.org</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendAbandonedCartEmail({ to, items, sessionId }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const html = buildAbandonedCartEmail({ items, sessionId });
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [to],
      subject: "🛒 You left something behind — your cart is saved!",
      html,
    }),
  });
  if (res.ok) {
    console.log(`[webhook] 🛒 Abandoned cart email sent to ${to}`);
  } else {
    const err = await res.json();
    console.error('[webhook] Abandoned cart email error:', JSON.stringify(err));
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

async function redisZAdd(key, score, member) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/zadd/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([score, member]),
    cache: 'no-store',
  });
}

async function redisGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const json = await res.json();
  if (!json.result) return null;
  try { return JSON.parse(decodeURIComponent(json.result)); } catch { return null; }
}

async function redisDel(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/del/${encodeURIComponent(key)}`, {
    method: 'POST',
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

  // ── Abandoned cart: session expired without payment ────────────────────────
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    const email = session.customer_details?.email;
    if (email) {
      const cartData = await redisGet(`cart_recovery:${session.id}`);
      if (cartData?.items?.length > 0) {
        try {
          await sendAbandonedCartEmail({ to: email, items: cartData.items, sessionId: session.id });
        } catch (err) {
          console.error('[webhook] Abandoned cart email error:', err.message);
        }
      }
    }
    await redisDel(`cart_recovery:${session.id}`);
    return NextResponse.json({ received: true });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;

  if (session.payment_status !== 'paid') {
    console.log(`[webhook] Session ${session.id} not paid yet — skipping.`);
    return NextResponse.json({ received: true });
  }

  // Remove the abandoned cart entry now that the order is paid
  await redisDel(`cart_recovery:${session.id}`);

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
            const orderData = {
              cjOrderId,
              orderRef,
              customerEmail,
              customerName,
              status: 'processing',
              createdAt: Date.now(),
            };
            await redisSave(`order:${session.id}`, orderData);
            // Secondary index: look up by short order reference
            await redisSave(`order:ref:${orderRef}`, session.id);
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
        sessionId: session.id,
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

  // ── Referral: store mapping + send reward to referrer ────────────────────────
  if (customerEmail) {
    // Derive this customer's own referral code from the session ID
    const myRefCode = session.id.replace(/^cs_(test|live)_/, '').slice(0, 8).toUpperCase();
    try {
      await redisSave(`referral:${myRefCode}`, { email: customerEmail }, 365 * 24 * 60 * 60);
    } catch (err) {
      console.error('[webhook] Failed to store referral mapping:', err.message);
    }

    // If this purchase was referred, look up the referrer and reward them
    const incomingRef = session.metadata?.referral_code;
    if (incomingRef) {
      try {
        const referrerData = await redisGet(`referral:${incomingRef}`);
        const referrerEmail = referrerData?.email;
        if (referrerEmail && referrerEmail !== customerEmail) {
          await sendReferralRewardEmail({ to: referrerEmail, friendName: customerName });
          console.log(`[webhook] 🎁 Referral reward sent to ${referrerEmail} (referred by: ${incomingRef})`);
        }
      } catch (err) {
        console.error('[webhook] Referral reward error:', err.message);
      }

      // ── Affiliate conversion tracking ─────────────────────────────────────
      try {
        const affiliateData = await redisGet(`affiliate:${incomingRef.toUpperCase()}`);
        if (affiliateData) {
          const orderAmount = (session.amount_total || 0) / 100;
          const commission = parseFloat((orderAmount * (affiliateData.commissionPct / 100)).toFixed(2));
          const updated = {
            ...affiliateData,
            conversions: (affiliateData.conversions || 0) + 1,
            earned: parseFloat(((affiliateData.earned || 0) + commission).toFixed(2)),
          };
          await redisSave(`affiliate:${incomingRef.toUpperCase()}`, updated, 3 * 365 * 24 * 60 * 60);
          console.log(`[webhook] 🤝 Affiliate conversion: code=${incomingRef}, commission=$${commission}`);
        }
      } catch (err) {
        console.error('[webhook] Affiliate conversion tracking error:', err.message);
      }
    }
  }

  // ── Loyalty points ─────────────────────────────────────────────────────────
  if (customerEmail) {
    try {
      const pointsEarned = Math.max(1, Math.floor(session.amount_total / 100));
      const loyaltyKey = `loyalty:${customerEmail.toLowerCase()}`;
      const existing = await redisGet(loyaltyKey) || { points: 0, totalEarned: 0 };
      const newPoints = (existing.points || 0) + pointsEarned;
      const newTotal = (existing.totalEarned || 0) + pointsEarned;

      let savedPoints = newPoints;
      if (newPoints >= 100) {
        savedPoints = newPoints - 100;
        await sendLoyaltyRewardEmail({ to: customerEmail, customerName, pointsEarned });
        console.log(`[webhook] 🏆 Loyalty reward sent to ${customerEmail} (${newPoints} pts → reward issued, ${savedPoints} pts remaining)`);
      }

      await redisSave(loyaltyKey, {
        points: savedPoints,
        totalEarned: newTotal,
        lastPurchase: Date.now(),
        lastOrderRef: orderRef,
      }, 730 * 24 * 60 * 60); // 2-year TTL
      console.log(`[webhook] ⭐ ${customerEmail} earned ${pointsEarned} pts (balance: ${savedPoints}/100)`);
    } catch (err) {
      console.error('[webhook] Loyalty points error:', err.message);
    }
  }

  // ── Win-back queue: track last purchase, re-queue 45 days out ────────────────
  if (customerEmail) {
    try {
      const winBackAt = Date.now() + 45 * 24 * 60 * 60 * 1000;
      // Store customer info (email is the member, score = when to send win-back)
      await redisZAdd('winback_queue', winBackAt, customerEmail.toLowerCase());
      // Store customer name for personalization
      await redisSave(`winback_name:${customerEmail.toLowerCase()}`, customerName, 60 * 24 * 60 * 60);
    } catch (err) {
      console.error('[webhook] Win-back queue error:', err.message);
    }
  }

  // ── Queue review request email for 7 days from now ─────────────────────────
  if (customerEmail) {
    try {
      const reviewAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      const productNames = lineItems
        .map((li) => li.description || li.price?.product?.name)
        .filter(Boolean);
      await redisSave(`review_pending:${session.id}`, {
        email: customerEmail,
        customerName,
        orderRef,
        productNames,
        scheduledAt: reviewAt,
      }, 30 * 24 * 60 * 60); // 30-day TTL
      await redisZAdd('review_queue', reviewAt, session.id);
      console.log(`[webhook] 📅 Review request queued for ${customerEmail} at ${new Date(reviewAt).toISOString()}`);
    } catch (err) {
      console.error('[webhook] Review queue error:', err.message);
    }
  }

  // ── Queue "you might also like" recommendation email for 14 days ──────────
  if (customerEmail) {
    try {
      const recAt = Date.now() + 14 * 24 * 60 * 60 * 1000;
      // Store the slugs/categories purchased so the cron can compute complementary picks
      const purchasedSlugs = cartItems.map((it) => it.slug).filter(Boolean);
      await redisSave(`rec_pending:${customerEmail.toLowerCase()}`, {
        email: customerEmail,
        customerName,
        purchasedSlugs,
        scheduledAt: recAt,
      }, 30 * 24 * 60 * 60);
      await redisZAdd('rec_queue', recAt, customerEmail.toLowerCase());
      console.log(`[webhook] 💌 Recommendation email queued for ${customerEmail}`);
    } catch (err) {
      console.error('[webhook] Recommendation queue error:', err.message);
    }
  }

  // ── Queue day-3 transit upsell email ──────────────────────────────────────
  if (customerEmail) {
    try {
      const transitAt = Date.now() + 3 * 24 * 60 * 60 * 1000;
      const purchasedSlugs = cartItems.map((it) => it.slug).filter(Boolean);
      await redisSave(`transit_pending:${customerEmail.toLowerCase()}`, {
        email: customerEmail,
        customerName,
        orderRef,
        purchasedSlugs,
        scheduledAt: transitAt,
      }, 7 * 24 * 60 * 60); // 7-day TTL
      await redisZAdd('transit_queue', transitAt, customerEmail.toLowerCase());
      console.log(`[webhook] 🚚 Transit upsell queued for ${customerEmail}`);
    } catch (err) {
      console.error('[webhook] Transit upsell queue error:', err.message);
    }
  }

  return NextResponse.json({ received: true });
}
