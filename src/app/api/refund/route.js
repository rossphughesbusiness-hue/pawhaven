import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const AUTO_APPROVE_LIMIT = 50;   // USD — orders under this get instant refunds
const AUTO_APPROVE_DAYS  = 30;   // orders older than this go to manual review
const OWNER_EMAIL        = 'rossphughes@gmail.com';
const STORE_EMAIL        = 'support@pawhavenpets.org';
const STORE_NAME         = 'PawHaven';
const BASE_URL           = 'https://pawhavenpets.org';

// ─── helpers ─────────────────────────────────────────────────────────────────

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
}

function getRedis() {
  return new Redis({
    url:   process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) { console.log('[refund] email skipped — no RESEND_API_KEY'); return; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error('[refund] Resend error:', await res.text());
}

/** Resolve an orderId (session cs_… or payment intent pi_…) → PaymentIntent object */
async function resolvePaymentIntent(stripe, orderId) {
  if (!orderId) return null;
  if (orderId.startsWith('pi_')) {
    return stripe.paymentIntents.retrieve(orderId);
  }
  if (orderId.startsWith('cs_')) {
    const session = await stripe.checkout.sessions.retrieve(orderId, {
      expand: ['payment_intent'],
    });
    return session.payment_intent ?? null;
  }
  return null;
}

// ─── POST — submit refund request ────────────────────────────────────────────

export async function POST(req) {
  try {
    const { orderId, reason, email, notes } = await req.json();

    if (!orderId || !reason || !email) {
      return NextResponse.json({ error: 'orderId, reason, and email are required.' }, { status: 400 });
    }

    const stripe = getStripe();
    const redis  = getRedis();

    // ── Check for duplicate request ──────────────────────────────────────────
    const existing = await redis.get(`refund:${orderId}`);
    if (existing) {
      return NextResponse.json({ ok: true, status: existing.status, duplicate: true });
    }

    // ── Resolve PaymentIntent ────────────────────────────────────────────────
    let pi = null;
    try {
      pi = await resolvePaymentIntent(stripe, orderId.trim());
    } catch (e) {
      console.error('[refund] Stripe lookup error:', e.message);
    }

    const amount    = pi ? pi.amount / 100 : null;          // convert cents → dollars
    const currency  = pi ? pi.currency.toUpperCase() : 'USD';
    const createdAt = pi ? new Date(pi.created * 1000) : null;
    const ageMs     = createdAt ? Date.now() - createdAt.getTime() : Infinity;
    const ageDays   = ageMs / (1000 * 60 * 60 * 24);

    const piId      = pi?.id ?? null;
    const alreadyRefunded = pi?.status === 'canceled' ||
      (pi?.charges?.data?.[0]?.refunded === true);

    if (alreadyRefunded) {
      return NextResponse.json({ error: 'This order has already been refunded.' }, { status: 409 });
    }

    // ── Decision logic ───────────────────────────────────────────────────────
    const autoApprove = pi !== null
      && amount !== null
      && amount < AUTO_APPROVE_LIMIT
      && ageDays <= AUTO_APPROVE_DAYS;

    // ── AUTO-APPROVE path ────────────────────────────────────────────────────
    if (autoApprove) {
      let refundId = null;
      try {
        const refund = await stripe.refunds.create({ payment_intent: piId });
        refundId = refund.id;
      } catch (e) {
        console.error('[refund] Stripe refund error:', e.message);
        // Fall through to manual review if refund fails
        return await manualReview({ orderId, piId, amount, currency, ageDays, reason, email, notes, redis, errorNote: e.message });
      }

      const record = {
        status: 'approved',
        reason,
        email,
        notes: notes || '',
        amount,
        currency,
        refundId,
        piId,
        timestamp: new Date().toISOString(),
        auto: true,
      };
      await redis.set(`refund:${orderId}`, record, { ex: 60 * 60 * 24 * 90 }); // 90-day TTL

      // Email customer
      await sendEmail({
        from: `${STORE_NAME} Support <${STORE_EMAIL}>`,
        to: [email],
        subject: '✅ Your refund has been processed — PawHaven',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <div style="background:#2d6a4f;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
              <span style="font-size:36px">✅</span>
              <h1 style="color:#fff;margin:10px 0 4px;font-size:22px">Your refund is on its way</h1>
              <p style="color:#b7e4c7;margin:0;font-size:14px">We're sorry the product didn't work out</p>
            </div>
            <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
              <p style="color:#374151;margin:0 0 16px">Hi there,</p>
              <p style="color:#374151;margin:0 0 16px">We've issued a full refund of <strong>${currency} $${amount.toFixed(2)}</strong> for order <strong>${esc(orderId)}</strong>. Refunds typically appear on your statement within 5–10 business days depending on your bank.</p>
              <div style="background:#f0fdf4;border-left:4px solid #2d6a4f;padding:14px 16px;border-radius:4px;margin:0 0 20px">
                <p style="margin:0;font-size:13px;color:#166534"><strong>Refund reason:</strong> ${esc(reason)}</p>
                ${notes ? `<p style="margin:8px 0 0;font-size:13px;color:#166534"><strong>Your notes:</strong> ${esc(notes)}</p>` : ''}
              </div>
              <p style="color:#6b7280;font-size:13px;margin:0">Questions? Reply to this email or visit <a href="${BASE_URL}/contact" style="color:#2d6a4f">${BASE_URL}/contact</a>.</p>
            </div>
            <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
              ${STORE_NAME} · <a href="mailto:${STORE_EMAIL}" style="color:#2d6a4f">${STORE_EMAIL}</a>
            </div>
          </div>`,
      });

      return NextResponse.json({ ok: true, status: 'approved', auto: true, amount, currency });
    }

    // ── MANUAL REVIEW path ───────────────────────────────────────────────────
    return await manualReview({ orderId, piId, amount, currency, ageDays, reason, email, notes, redis });

  } catch (err) {
    console.error('[refund] Unhandled error:', err.message);
    return NextResponse.json({ error: 'Something went wrong. Please email support@pawhavenpets.org.' }, { status: 500 });
  }
}

async function manualReview({ orderId, piId, amount, currency, ageDays, reason, email, notes, redis, errorNote }) {
  // Generate a one-time token for approve/deny actions
  const token = crypto.randomBytes(32).toString('hex');

  const record = {
    status: 'pending',
    reason,
    email,
    notes: notes || '',
    amount,
    currency,
    piId,
    token,
    ageDays: Math.round(ageDays),
    timestamp: new Date().toISOString(),
    auto: false,
    errorNote: errorNote || null,
  };

  const redis2 = redis ?? getRedis();
  await redis2.set(`refund:${orderId}`, record, { ex: 60 * 60 * 24 * 90 });
  // Also store token → orderId for the action endpoint
  await redis2.set(`refund-token:${token}`, orderId, { ex: 60 * 60 * 24 * 14 }); // 14-day action window

  const approveUrl = `${BASE_URL}/api/refund?token=${token}&action=approve`;
  const denyUrl    = `${BASE_URL}/api/refund?token=${token}&action=deny`;

  const amountStr  = amount != null ? `${currency} $${amount.toFixed(2)}` : 'Unknown';
  const ageStr     = isFinite(ageDays) ? `${Math.round(ageDays)} days` : 'Unknown';

  // Email store owner
  await sendEmail({
    from: `${STORE_NAME} Refunds <${STORE_EMAIL}>`,
    to: [OWNER_EMAIL],
    subject: `🔴 Refund Review Required — Order ${orderId}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a1a2e;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#f97316;margin:0;font-size:18px">🔴 PawHaven — Refund Needs Your Review</h1>
        </div>
        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
            <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;width:140px;border:1px solid #e5e7eb">Order ID</td><td style="padding:8px 12px;border:1px solid #e5e7eb;font-family:monospace">${esc(orderId)}</td></tr>
            <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;border:1px solid #e5e7eb">Customer</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${esc(email)}</td></tr>
            <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;border:1px solid #e5e7eb">Amount</td><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:700;color:#dc2626">${esc(amountStr)}</td></tr>
            <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;border:1px solid #e5e7eb">Order Age</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${esc(ageStr)}</td></tr>
            <tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;border:1px solid #e5e7eb">Reason</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${esc(reason)}</td></tr>
            ${notes ? `<tr><td style="padding:8px 12px;background:#f9fafb;font-weight:600;border:1px solid #e5e7eb">Notes</td><td style="padding:8px 12px;border:1px solid #e5e7eb;font-style:italic">${esc(notes)}</td></tr>` : ''}
            ${errorNote ? `<tr><td style="padding:8px 12px;background:#fef2f2;font-weight:600;border:1px solid #fca5a5;color:#dc2626">Error</td><td style="padding:8px 12px;border:1px solid #fca5a5;color:#dc2626">${esc(errorNote)}</td></tr>` : ''}
          </table>
          <p style="font-size:13px;color:#6b7280;margin:0 0 20px">This refund requires manual review — click a button below to action it. Links expire in 14 days.</p>
          <div style="display:flex;gap:12px">
            <a href="${approveUrl}" style="display:inline-block;background:#2d6a4f;color:#fff;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px">✅ Approve Refund</a>
            <a href="${denyUrl}" style="display:inline-block;background:#dc2626;color:#fff;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px">✖ Deny Refund</a>
          </div>
          <p style="font-size:12px;color:#9ca3af;margin:20px 0 0">Or manage manually in <a href="https://dashboard.stripe.com" style="color:#f97316">Stripe Dashboard</a>.</p>
        </div>
        <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;font-size:12px;color:#9ca3af">
          PawHaven Automated Refund System
        </div>
      </div>`,
  });

  // Auto-reply to customer
  await sendEmail({
    from: `${STORE_NAME} Support <${STORE_EMAIL}>`,
    to: [email],
    subject: '📋 We received your refund request — PawHaven',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#2d6a4f;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
          <span style="font-size:36px">📋</span>
          <h1 style="color:#fff;margin:10px 0 4px;font-size:22px">Refund request received</h1>
          <p style="color:#b7e4c7;margin:0;font-size:14px">We'll review it within 1–2 business days</p>
        </div>
        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
          <p style="color:#374151;margin:0 0 16px">Hi there,</p>
          <p style="color:#374151;margin:0 0 16px">We've received your refund request for order <strong>${esc(orderId)}</strong> and our team will review it within 1–2 business days. We'll email you here once a decision has been made.</p>
          <div style="background:#f0fdf4;border-left:4px solid #2d6a4f;padding:14px 16px;border-radius:4px;margin:0 0 20px">
            <p style="margin:0;font-size:13px;color:#166534"><strong>Reason:</strong> ${esc(reason)}</p>
          </div>
          <p style="color:#6b7280;font-size:13px;margin:0">Questions? Reply to this email or contact us at <a href="mailto:${STORE_EMAIL}" style="color:#2d6a4f">${STORE_EMAIL}</a>.</p>
        </div>
        <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
          ${STORE_NAME} · <a href="mailto:${STORE_EMAIL}" style="color:#2d6a4f">${STORE_EMAIL}</a>
        </div>
      </div>`,
  });

  return NextResponse.json({ ok: true, status: 'pending', message: 'Your request is under review. We\'ll email you within 1–2 business days.' });
}

// ─── GET — one-click approve / deny via token ─────────────────────────────────

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token  = searchParams.get('token');
  const action = searchParams.get('action'); // 'approve' | 'deny'

  const html = (title, body, color = '#2d6a4f') => new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
     <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f9fafb}
     .card{max-width:460px;width:100%;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.08);padding:40px;text-align:center}
     h1{margin:0 0 12px;font-size:24px;color:#111827}.sub{color:#6b7280;font-size:15px;margin:0 0 24px}
     .badge{display:inline-block;padding:10px 28px;border-radius:8px;font-weight:700;font-size:16px;color:#fff;background:${color}}</style></head>
     <body><div class="card"><div style="font-size:52px;margin-bottom:16px">${body.icon}</div>
     <h1>${title}</h1><p class="sub">${body.msg}</p>
     <span class="badge">${body.badge}</span></div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );

  if (!token || !action || !['approve', 'deny'].includes(action)) {
    return html('Invalid Link', { icon: '❌', msg: 'This link is invalid or missing parameters.', badge: 'Error' }, '#dc2626');
  }

  try {
    const redis  = getRedis();
    const orderId = await redis.get(`refund-token:${token}`);

    if (!orderId) {
      return html('Link Expired', { icon: '⏳', msg: 'This action link has expired or already been used.', badge: 'Expired' }, '#f59e0b');
    }

    const record = await redis.get(`refund:${orderId}`);
    if (!record) {
      return html('Not Found', { icon: '🔍', msg: `No refund record found for order ${orderId}.`, badge: 'Not Found' }, '#6b7280');
    }

    if (record.status !== 'pending') {
      return html('Already Actioned', { icon: '✅', msg: `This refund was already ${record.status}.`, badge: record.status }, '#6b7280');
    }

    // Consume the token
    await redis.del(`refund-token:${token}`);

    if (action === 'approve') {
      // Issue the Stripe refund
      const stripe = getStripe();
      let refundId = null;
      try {
        const refund = await stripe.refunds.create({ payment_intent: record.piId });
        refundId = refund.id;
      } catch (e) {
        return html('Stripe Error', { icon: '⚠️', msg: `Refund failed: ${e.message}. Please process manually in Stripe Dashboard.`, badge: 'Error' }, '#dc2626');
      }

      const updated = { ...record, status: 'approved', refundId, approvedAt: new Date().toISOString() };
      await redis.set(`refund:${orderId}`, updated, { ex: 60 * 60 * 24 * 90 });

      // Email customer
      const amt = record.amount != null ? `${record.currency} $${record.amount.toFixed(2)}` : 'your payment';
      await sendEmail({
        from: `${STORE_NAME} Support <${STORE_EMAIL}>`,
        to: [record.email],
        subject: '✅ Your refund has been approved — PawHaven',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <div style="background:#2d6a4f;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
              <span style="font-size:36px">✅</span>
              <h1 style="color:#fff;margin:10px 0 4px;font-size:22px">Refund approved!</h1>
            </div>
            <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
              <p style="color:#374151">Great news — we've approved and issued a refund of <strong>${esc(amt)}</strong> for order <strong>${esc(orderId)}</strong>. It will appear on your statement within 5–10 business days.</p>
              <p style="color:#6b7280;font-size:13px;margin:16px 0 0">Thank you for shopping with PawHaven. We hope to serve you again!</p>
            </div>
            <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
              ${STORE_NAME} · <a href="mailto:${STORE_EMAIL}" style="color:#2d6a4f">${STORE_EMAIL}</a>
            </div>
          </div>`,
      });

      return html('Refund Approved', { icon: '✅', msg: `Refund of ${amt} issued for order ${orderId}. Customer has been emailed.`, badge: 'Done' });

    } else {
      // deny
      const updated = { ...record, status: 'denied', deniedAt: new Date().toISOString() };
      await redis.set(`refund:${orderId}`, updated, { ex: 60 * 60 * 24 * 90 });

      await sendEmail({
        from: `${STORE_NAME} Support <${STORE_EMAIL}>`,
        to: [record.email],
        subject: 'Update on your refund request — PawHaven',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <div style="background:#1a1a2e;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
              <span style="font-size:36px">📋</span>
              <h1 style="color:#fff;margin:10px 0 4px;font-size:22px">Update on your refund request</h1>
            </div>
            <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
              <p style="color:#374151">Hi there,</p>
              <p style="color:#374151">We've reviewed your refund request for order <strong>${esc(orderId)}</strong> and unfortunately we're unable to process it at this time based on our <a href="${BASE_URL}/legal/refund" style="color:#2d6a4f">refund policy</a>.</p>
              <p style="color:#374151">If you believe this is an error or have additional information to share, please reply to this email and we'll take another look.</p>
              <p style="color:#6b7280;font-size:13px;margin:16px 0 0">We appreciate your patience and are sorry we couldn't do more.</p>
            </div>
            <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
              ${STORE_NAME} · <a href="mailto:${STORE_EMAIL}" style="color:#2d6a4f">${STORE_EMAIL}</a>
            </div>
          </div>`,
      });

      return html('Refund Denied', { icon: '✖', msg: `Refund for order ${orderId} has been denied. Customer has been notified.`, badge: 'Denied' }, '#dc2626');
    }

  } catch (err) {
    console.error('[refund/action] Error:', err.message);
    return html('Error', { icon: '⚠️', msg: 'An unexpected error occurred. Please check Stripe Dashboard.', badge: 'Error' }, '#dc2626');
  }
}
