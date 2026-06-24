/**
 * GET /api/cron/recommendations
 * Fires daily at 12:00 UTC. Sends "you might also like" emails to customers
 * 14 days after their purchase — peak re-engagement window.
 *
 * Logic:
 * - Pull due emails from rec_queue (sorted set, score = send timestamp)
 * - Load what they bought (rec_pending:{email})
 * - Find top-rated products they HAVEN\'T bought yet, biased toward complementary categories
 * - Send personalized HTML email with 3 product picks
 * - 90-day cooldown per email (rec_sent:{email})
 */

import { NextResponse } from 'next/server';
import { products } from '@/lib/products';

const BASE = 'https://pawhavenpets.org';

// ─── Redis helpers ─────────────────────────────────────────────────────────────

async function redisGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const json = await res.json();
    if (!json.result) return null;
    return JSON.parse(decodeURIComponent(json.result));
  } catch { return null; }
}

async function redisSave(key, value, exSeconds) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  const encoded = encodeURIComponent(JSON.stringify(value));
  await fetch(`${url}/set/${encodeURIComponent(key)}/${encoded}/ex/${exSeconds}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

async function redisZRangeByScore(key, min, max, limit = 50) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return [];
  try {
    const res = await fetch(
      `${url}/zrangebyscore/${encodeURIComponent(key)}/${min}/${max}/LIMIT/0/${limit}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    );
    const json = await res.json();
    return Array.isArray(json.result) ? json.result : [];
  } catch { return []; }
}

async function redisZRem(key, member) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/zrem/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([member]),
    cache: 'no-store',
  });
}

// ─── Recommendation logic ──────────────────────────────────────────────────────

function getRecommendations(purchasedSlugs = []) {
  const purchasedSet = new Set(purchasedSlugs);

  // Find categories of purchased products
  const purchasedProducts = products.filter(p => purchasedSet.has(p.slug));
  const purchasedCategories = new Set(purchasedProducts.map(p => p.category));
  const purchasedTags = new Set(purchasedProducts.map(p => p.tag).filter(Boolean));

  // Score each non-purchased product
  const scored = products
    .filter(p => !purchasedSet.has(p.slug))
    .map(p => {
      let score = (p.rating || 4) * 10 + Math.log(1 + (p.reviewCount || 0));

      // Boost same category (cross-sell within pet type)
      if (purchasedCategories.has(p.category)) score += 20;

      // Boost complementary tags
      const complementary = {
        Feeding:          ['Play', 'Comfort', 'Enrichment'],
        Comfort:          ['Anxiety Relief', 'Feeding', 'Grooming'],
        'Anxiety Relief': ['Comfort', 'Enrichment', 'Feeding'],
        Play:             ['Enrichment', 'Training', 'Feeding'],
        Walking:          ['Safety', 'Travel', 'Grooming'],
        Grooming:         ['Comfort', 'Feeding', 'Walking'],
        Travel:           ['Walking', 'Feeding', 'Comfort'],
        Safety:           ['Walking', 'Travel', 'Training'],
        Enrichment:       ['Play', 'Anxiety Relief', 'Feeding'],
        Training:         ['Play', 'Walking', 'Safety'],
      };
      for (const tag of purchasedTags) {
        if ((complementary[tag] || []).includes(p.tag)) score += 15;
      }

      // Boost bestsellers and highly reviewed
      if (p.badge === 'Best Seller') score += 10;
      if ((p.reviewCount || 0) > 500) score += 5;

      return { product: p, score };
    });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.product);
}

// ─── Email builder ─────────────────────────────────────────────────────────────

function buildRecommendationEmail(customerName, recommendations) {
  const firstName = (customerName || '').split(' ')[0] || 'there';

  const productCards = recommendations.map(p => {
    const savings = p.comparePrice
      ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)
      : 0;
    return `
      <td style="text-align:center;padding:0 8px;vertical-align:top;">
        <a href="${BASE}/products/${p.slug}" style="text-decoration:none;display:block;">
          <div style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;background:#fff;">
            <img src="${p.images?.[0] || p.image || ''}"
                 alt="${p.name}"
                 width="160" height="160"
                 style="width:100%;height:160px;object-fit:cover;display:block;"
            />
            <div style="padding:12px;">
              ${savings > 0 ? `<div style="display:inline-block;background:#fef2f2;color:#ef4444;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;margin-bottom:6px;">${savings}% OFF</div>` : ''}
              <div style="font-size:13px;font-weight:700;color:#1a2b4a;line-height:1.3;margin-bottom:4px;">${p.name}</div>
              <div style="font-size:12px;color:#94a3b8;margin-bottom:6px;">⭐ ${p.rating} (${(p.reviewCount || 0).toLocaleString()})</div>
              <div style="font-size:14px;font-weight:800;color:#f97316;">$${p.price.toFixed(2)}</div>
              ${p.comparePrice ? `<div style="font-size:11px;color:#94a3b8;text-decoration:line-through;">$${p.comparePrice.toFixed(2)}</div>` : ''}
            </div>
          </div>
        </a>
      </td>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <tr>
          <td style="background:linear-gradient(135deg,#1a2b4a,#2d3f6b);padding:32px 40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:6px;">🐾</div>
            <div style="color:#ffffff;font-size:22px;font-weight:800;">Your pet might love these too, ${firstName}</div>
            <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:4px;">Hand-picked based on what you bought</div>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 24px;">
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.7;text-align:center;">
              Based on your recent order, here are 3 products other PawHaven customers always buy next:
            </p>

            <!-- Product cards -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>${productCards}</tr>
            </table>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:28px;">
              <a href="${BASE}/products"
                 style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:16px;padding:16px 36px;border-radius:50px;text-decoration:none;">
                Shop All Products →
              </a>
            </div>

            <!-- Social proof nudge -->
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;text-align:center;">
              <div style="font-size:13px;color:#166534;font-weight:600;">
                ⭐ Join 10,000+ happy pet owners — free shipping on orders over $50
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#f8fafc;padding:18px 40px;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.7;">
              © ${new Date().getFullYear()} PawHaven ·
              <a href="${BASE}" style="color:#f97316;text-decoration:none;">pawhavenpets.org</a><br>
              You\'re receiving this because you made a purchase at PawHaven.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendRecommendationEmail({ to, customerName, recommendations }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const firstName = (customerName || '').split(' ')[0] || 'there';
  const html = buildRecommendationEmail(customerName, recommendations);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'PawHaven <orders@pawhavenpets.org>',
      to: [to],
      subject: `${firstName}, your pet will love these 🐾`,
      html,
    }),
  });
  if (!res.ok) {
    console.error('[rec cron] Email error:', JSON.stringify(await res.json()));
    return false;
  }
  return true;
}

// ─── Cron handler ──────────────────────────────────────────────────────────────

export async function GET(req) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = Date.now();
  const due = await redisZRangeByScore('rec_queue', '-inf', now, 50);

  let sent = 0;
  let skipped = 0;

  for (const email of due) {
    await redisZRem('rec_queue', email);

    // 90-day cooldown — don\'t bombard repeat buyers
    const alreadySent = await redisGet(`rec_sent:${email}`);
    if (alreadySent) { skipped++; continue; }

    const pending = await redisGet(`rec_pending:${email}`);
    if (!pending?.purchasedSlugs) { skipped++; continue; }

    const recs = getRecommendations(pending.purchasedSlugs);
    if (recs.length === 0) { skipped++; continue; }

    const ok = await sendRecommendationEmail({
      to: email,
      customerName: pending.customerName,
      recommendations: recs,
    });

    if (ok) {
      await redisSave(`rec_sent:${email}`, { sentAt: now }, 90 * 24 * 60 * 60);
      sent++;
      console.log(`[rec cron] 💌 Sent recommendations to ${email}`);
    }
  }

  console.log(`[rec cron] Done — sent: ${sent}, skipped: ${skipped}`);
  return NextResponse.json({ ok: true, sent, skipped, processed: due.length });
}
