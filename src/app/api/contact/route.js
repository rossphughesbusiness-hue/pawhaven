import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// ─── helpers ─────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('[contact] Resend error:', text);
  }
}

// ─── store knowledge base for Claude ─────────────────────────────────────────

const STORE_CONTEXT = `
You are the AI customer service agent for PawHaven (pawhavenpets.org), a premium pet accessories store.

STORE POLICIES:
- Shipping: Free on orders over $50. Standard shipping $5.99. Delivery in 7–15 business days (we dropship from suppliers).
- Returns: 30-day no-hassle return window. Customer mails item back. No restocking fee. Refund processed within 5 business days. Policy URL: pawhavenpets.org/legal/refund
- Order tracking: Customers can track at pawhavenpets.org/order-tracking
- Discount code: WELCOME10 gives 10% off (use for goodwill gestures on complaints)
- Contact: support@pawhavenpets.org

PRODUCT CATALOG (35 products):
Dogs: Maze Slow Feeder Bowl ($24.99), Calming Lick Mat ($19.99), Portable Paw Cleaner ($27.99), SafeGlow LED Collar ($29.99), Orthopedic Memory Foam Dog Bed ($79.99), Self-Cleaning Slicker Brush ($22.99), Retractable Pro Dog Leash ($34.99), Crinkle Squeaky Toy Bundle ($21.99), IQ Puzzle Feeder Toy ($26.99), Dog Car Seat Hammock ($44.99), Collapsible Travel Bowl Set ($18.99), Reflective Step-In Harness ($32.99), Dog Cooling Gel Mat ($38.99), Dog Treat Training Pouch ($16.99), Heavy-Duty Rope Tug Toy ($14.99), Leakproof Dog Water Bottle ($23.99), Rechargeable Pet Nail Grinder ($36.99), Reflective Waterproof Dog Raincoat ($42.99), Dog Snuffle Mat ($28.99), Dog Paw Balm Stick ($12.99), Dog Reflective Safety Vest ($24.99)
Cats: Silent Cat Water Fountain ($39.99), Feather Wand Cat Teaser ($13.99), Cat Window Perch Hammock ($34.99), Interactive Automatic Laser Toy ($29.99), Premium Cat Carrier Backpack ($59.99), Cat Deshedding Grooming Glove ($17.99), Cozy Cat Cave Hideaway ($44.99), Cat Interactive Feeder Bowl ($22.99), Cat Tunnel Crinkle Play Tube ($19.99), Sisal Cat Scratching Post ($31.99), Curved Cat Scratcher Board ($26.99), Cat Circuit Ball Track Toy ($24.99), Cat Self-Groomer Corner Brush ($15.99), Cat Puzzle Slow Feeder ($23.99)

COMMON QUESTIONS & ANSWERS:
Q: Where is my order?
A: Direct them to pawhavenpets.org/order-tracking. Orders ship within 1-2 business days, then take 7-15 business days to arrive. If they have an order ID in their message, reference it.

Q: How do I return something?
A: 30-day window from delivery. Email support@pawhavenpets.org with order ID. Mail item back. Refund within 5 business days. No questions asked, no restocking fee.

Q: What payment methods do you accept?
A: All major credit/debit cards and PayPal via Stripe's secure checkout.

Q: Is the food/product safe for my pet?
A: All products are pet-safe and tested. Slow feeders and lick mats are BPA-free, dishwasher safe.

Q: Do you ship internationally?
A: Currently US only. We're working on expanding.

Q: Can I change or cancel my order?
A: Orders can be cancelled within 1 hour of placement. After that they're sent to our supplier. Email us immediately.

Q: My item arrived damaged.
A: We're sorry! Email a photo to support@pawhavenpets.org with your order ID and we'll send a replacement or full refund immediately.
`;

// ─── AI triage via Claude API ─────────────────────────────────────────────────

async function triageWithClaude(name, email, message, anthropicKey) {
  const prompt = `${STORE_CONTEXT}

A customer named ${name} (${email}) sent this message:
"""
${message}
"""

Your job:
1. Categorize this message as one of: ORDER_STATUS, RETURN_REFUND, PRODUCT_QUESTION, SHIPPING_QUESTION, COMPLAINT, DAMAGED_ITEM, CANCELLATION, ESCALATE
   - Use ESCALATE for: legal threats, fraud claims, extremely angry/abusive messages, anything you can't confidently resolve, or topics not covered above.
2. Extract any order ID mentioned (format like letters+numbers, e.g. "PAY123456789" or "CS_xxx"). Return null if none found.
3. Extract any dollar amount mentioned for refund requests. Return null if none found.
4. Write a warm, helpful reply email body (plain text, no HTML). Be concise (3-5 sentences). Sign off as "The PawHaven Team". Do NOT invent order details you don't have.

Respond in this exact JSON format (no markdown, just raw JSON):
{
  "category": "ORDER_STATUS",
  "orderId": "ABC123" or null,
  "refundAmount": 29.99 or null,
  "reply": "Hi [Name],\\n\\nThank you for reaching out!..."
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('[contact] Claude API error:', err);
    return null;
  }

  const data = await response.json();
  const text = data.content?.[0]?.text?.trim();

  try {
    return JSON.parse(text);
  } catch {
    console.error('[contact] Claude returned non-JSON:', text);
    return null;
  }
}

// ─── Stripe refund ─────────────────────────────────────────────────────────────

async function issueStripeRefund(orderId) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey || !orderId) return { success: false, reason: 'missing credentials or order ID' };

  try {
    const stripe = new Stripe(stripeKey);

    // Search for the payment intent by metadata or recent charges
    // Order IDs in PawHaven are the last 12 chars of payment_intent uppercased
    // We search recent payment intents to find a match
    const paymentIntents = await stripe.paymentIntents.list({ limit: 100 });
    const match = paymentIntents.data.find(
      (pi) => pi.id.slice(-12).toUpperCase() === orderId.toUpperCase() ||
               (pi.metadata?.order_id || '').toUpperCase() === orderId.toUpperCase()
    );

    if (!match) return { success: false, reason: `No payment intent found for order ${orderId}` };

    // Only auto-refund if amount is under $40
    const amountUsd = match.amount / 100;
    if (amountUsd > 40) {
      return { success: false, reason: `Order value $${amountUsd.toFixed(2)} exceeds $40 auto-refund threshold` };
    }

    const refund = await stripe.refunds.create({ payment_intent: match.id });
    return { success: true, refundId: refund.id, amount: amountUsd };
  } catch (err) {
    console.error('[contact] Stripe refund error:', err.message);
    return { success: false, reason: err.message };
  }
}

// ─── email templates ──────────────────────────────────────────────────────────

function customerReplyHtml(name, bodyText, category, refundIssued) {
  const safeBody = esc(bodyText).replace(/\n/g, '<br>');
  const refundBanner = refundIssued
    ? `<div style="margin:20px 0;background:#d1fae5;border-radius:10px;padding:16px 20px;border-left:4px solid #2d6a4f">
        <p style="margin:0;font-weight:700;color:#065f46;font-size:14px">✅ Refund Processed</p>
        <p style="margin:4px 0 0 0;color:#065f46;font-size:13px">Your refund has been issued and will appear in 3-5 business days.</p>
       </div>`
    : '';

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <div style="background:#1a1a2e;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center">
        <span style="font-size:36px">🐾</span>
        <h1 style="color:#ffffff;margin:10px 0 4px 0;font-size:22px">Hi ${esc(name)}!</h1>
        <p style="color:#9ca3af;margin:0;font-size:14px">PawHaven Support</p>
      </div>
      <div style="background:#ffffff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
        ${refundBanner}
        <div style="color:#374151;font-size:14px;line-height:1.7">${safeBody}</div>
        <div style="margin:24px 0 0 0;background:#f9fafb;border-radius:10px;padding:16px 20px">
          <p style="margin:0 0 8px 0;font-weight:700;color:#374151;font-size:13px">Helpful links</p>
          <ul style="margin:0;padding-left:18px;color:#374151;font-size:13px;line-height:2">
            <li><a href="https://pawhavenpets.org/order-tracking" style="color:#2d6a4f">Track your order</a></li>
            <li><a href="https://pawhavenpets.org/legal/refund" style="color:#2d6a4f">Return &amp; refund policy</a></li>
            <li><a href="https://pawhavenpets.org" style="color:#2d6a4f">Continue shopping</a></li>
          </ul>
        </div>
      </div>
      <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
        PawHaven · <a href="mailto:support@pawhavenpets.org" style="color:#2d6a4f">support@pawhavenpets.org</a>
      </div>
    </div>`;
}

function ownerNotificationHtml(name, email, message, category, triage) {
  const needsAction = category === 'ESCALATE';
  const headerColor = needsAction ? '#dc2626' : '#f97316';
  const headerLabel = needsAction ? '🚨 Escalation Required' : '📬 AI-Handled — FYI';

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1a1a2e;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:${headerColor};margin:0;font-size:18px">${headerLabel}</h1>
        <p style="color:#9ca3af;margin:6px 0 0 0;font-size:13px">Category: ${category}</p>
      </div>
      <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">
        <p style="margin:0 0 4px 0;color:#6b7280;font-size:13px">From</p>
        <p style="margin:0 0 20px 0;font-weight:700;color:#111827">${esc(name)} &lt;${esc(email)}&gt;</p>
        <p style="margin:0 0 8px 0;font-weight:700;color:#374151">Customer message</p>
        <div style="background:#f9fafb;border-left:3px solid #f97316;padding:14px 16px;border-radius:4px;color:#374151;font-size:14px;white-space:pre-wrap;line-height:1.6">${esc(message)}</div>
        ${triage?.reply ? `
        <p style="margin:20px 0 8px 0;font-weight:700;color:#374151">AI reply sent to customer</p>
        <div style="background:#f0fdf4;border-left:3px solid #2d6a4f;padding:14px 16px;border-radius:4px;color:#374151;font-size:14px;white-space:pre-wrap;line-height:1.6">${esc(triage.reply)}</div>
        ` : ''}
        ${triage?.orderId ? `<p style="margin:16px 0 0 0;font-size:13px;color:#6b7280">Order ID detected: <strong>${esc(triage.orderId)}</strong></p>` : ''}
      </div>
      <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;font-size:12px;color:#9ca3af">
        Reply to this email to respond directly to ${esc(name)}.
      </div>
    </div>`;
}

// ─── main handler ─────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const ownerEmail = 'rossphughes@gmail.com';

    // ── No API keys: just log ──────────────────────────────────────────────────
    if (!resendKey) {
      console.log(`[contact] From: ${name} <${email}> — ${message}`);
      return NextResponse.json({ ok: true });
    }

    // ── AI triage ─────────────────────────────────────────────────────────────
    let triage = null;
    if (anthropicKey) {
      triage = await triageWithClaude(name, email, message, anthropicKey);
    }

    const category = triage?.category || 'ESCALATE';
    const shouldEscalate = !triage || category === 'ESCALATE' || category === 'COMPLAINT';
    let refundIssued = false;

    // ── Auto-refund for RETURN_REFUND under $40 ───────────────────────────────
    if (category === 'RETURN_REFUND' && triage?.orderId) {
      const refundResult = await issueStripeRefund(triage.orderId);
      if (refundResult.success) {
        refundIssued = true;
        console.log(`[contact] Auto-refunded order ${triage.orderId}: $${refundResult.amount}`);
        // Append refund confirmation to reply
        if (triage.reply) {
          triage.reply += '\n\nGreat news — we\'ve already processed your refund automatically. You\'ll see it back on your card within 3-5 business days. No need to ship anything back for orders under $40!';
        }
      } else {
        console.log(`[contact] Auto-refund skipped for ${triage.orderId}: ${refundResult.reason}`);
        shouldEscalate === false; // still send AI reply, just no auto-refund
      }
    }

    // ── Send AI reply to customer ─────────────────────────────────────────────
    if (triage?.reply) {
      await sendEmail(resendKey, {
        from: 'PawHaven Support <support@pawhavenpets.org>',
        to: [email],
        reply_to: 'support@pawhavenpets.org',
        subject: `Re: Your message to PawHaven 🐾`,
        html: customerReplyHtml(name, triage.reply, category, refundIssued),
      });
    } else {
      // Fallback generic reply if AI failed
      await sendEmail(resendKey, {
        from: 'PawHaven Support <support@pawhavenpets.org>',
        to: [email],
        reply_to: 'support@pawhavenpets.org',
        subject: `We got your message! 🐾`,
        html: customerReplyHtml(
          name,
          `Hi ${name},\n\nThank you for reaching out to PawHaven! We've received your message and our team will get back to you within 24 hours.\n\nIn the meantime, you can track your order at pawhavenpets.org/order-tracking or review our return policy at pawhavenpets.org/legal/refund.\n\nThe PawHaven Team`,
          'GENERAL',
          false,
        ),
      });
    }

    // ── Notify owner (always for escalations/complaints, optional for others) ──
    if (shouldEscalate) {
      await sendEmail(resendKey, {
        from: 'PawHaven Contact <support@pawhavenpets.org>',
        to: [ownerEmail],
        reply_to: email,
        subject: category === 'ESCALATE'
          ? `🚨 Escalation needed — ${name}`
          : `⚠️ Complaint received — ${name}`,
        html: ownerNotificationHtml(name, email, message, category, triage),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err.message);
    return NextResponse.json({ ok: true }); // degrade gracefully
  }
}
