/**
 * /api/cron/performance
 * Weekly product performance report. Runs every Monday at 8am.
 * - Reads per-product order counts from Redis
 * - Computes 30-day + all-time revenue
 * - Emails a ranked product report to the owner
 * - Flags zero-order products for review
 */

import { products } from '@/lib/products';

export const runtime = 'nodejs';
export const maxDuration = 30;

const RESEND_KEY  = process.env.RESEND_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;
const OWNER_EMAIL = 'rossphughes@gmail.com';

async function redisGet(key) {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (data.result === null || data.result === undefined) return null;
  try { return JSON.parse(data.result); } catch { return data.result; }
}

async function redisKeys(pattern) {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return [];
  const res  = await fetch(`${url}/keys/${encodeURIComponent(pattern)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result || [];
}

// Get last N days of daily revenue
async function getDailyRevenue(days = 30) {
  const totals = [];
  const now    = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = `revenue:daily:${d.toISOString().slice(0, 10)}`;
    const val = await redisGet(key);
    totals.push({ date: d.toISOString().slice(0, 10), revenue: parseFloat(val || 0) });
  }
  return totals;
}

export async function GET(req) {
  const secret = req.headers.get('x-cron-secret') || new URL(req.url).searchParams.get('secret');
  if (secret !== CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // ── 1. Gather per-product performance data ────────────────────────────────
    const perfKeys = await redisKeys('product_perf:*');
    const perfData = [];
    for (const key of perfKeys) {
      const data = await redisGet(key);
      if (data) perfData.push(data);
    }

    // Build a lookup map: store product id → product info
    const productMap = {};
    for (const p of products) {
      productMap[String(p.id)] = p;
    }

    // Merge perf data with product catalog
    const ranked = perfData
      .map((d) => ({
        ...d,
        name:  productMap[String(d.id)]?.name || `Product #${d.id}`,
        price: productMap[String(d.id)]?.price || 0,
        revenue: (d.units || 0) * (productMap[String(d.id)]?.price || 0),
      }))
      .sort((a, b) => b.orders - a.orders);

    // Products with zero orders ever
    const zeroOrderProducts = products
      .filter((p) => !perfData.find((d) => String(d.id) === String(p.id)))
      .map((p) => ({ id: p.id, name: p.name, price: p.price, category: p.category }));

    // ── 2. Last 30 days revenue ───────────────────────────────────────────────
    const dailyRevenue = await getDailyRevenue(30);
    const totalRevenue30 = dailyRevenue.reduce((s, d) => s + d.revenue, 0);
    const totalOrders    = ranked.reduce((s, d) => s + d.orders, 0);

    // ── 3. Build email ────────────────────────────────────────────────────────
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const topRows = ranked.slice(0, 10).map((p, i) => `
      <tr style="border-bottom:1px solid #f3f4f6">
        <td style="padding:10px 12px;font-weight:700;color:#6b7280">#${i + 1}</td>
        <td style="padding:10px 12px;color:#111827">${p.name}</td>
        <td style="padding:10px 12px;text-align:center;color:#2d6a4f;font-weight:700">${p.orders}</td>
        <td style="padding:10px 12px;text-align:center;color:#374151">${p.units || p.orders}</td>
        <td style="padding:10px 12px;text-align:right;color:#2d6a4f;font-weight:700">$${p.revenue.toFixed(2)}</td>
      </tr>
    `).join('');

    const zeroRows = zeroOrderProducts.slice(0, 10).map((p) => `
      <tr style="border-bottom:1px solid #fef3c7">
        <td style="padding:8px 12px;color:#374151">${p.name}</td>
        <td style="padding:8px 12px;text-align:center;color:#9ca3af">${p.category}</td>
        <td style="padding:8px 12px;text-align:right;color:#374151">$${p.price.toFixed(2)}</td>
        <td style="padding:8px 12px;text-align:center"><span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700">0 orders</span></td>
      </tr>
    `).join('');

    const html = `
      <div style="font-family:sans-serif;max-width:680px;margin:0 auto">
        <div style="background:#1a1a2e;padding:28px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#ffffff;margin:0;font-size:22px">📊 PawHaven Weekly Performance Report</h1>
          <p style="color:#9ca3af;margin:6px 0 0 0;font-size:13px">${today}</p>
        </div>

        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none">

          <!-- Summary stats -->
          <div style="display:flex;gap:16px;margin-bottom:28px">
            <div style="flex:1;background:#f0fdf4;border-radius:10px;padding:16px 20px;text-align:center">
              <div style="font-size:28px;font-weight:900;color:#2d6a4f">$${totalRevenue30.toFixed(2)}</div>
              <div style="font-size:12px;color:#6b7280;margin-top:4px">30-Day Revenue</div>
            </div>
            <div style="flex:1;background:#eff6ff;border-radius:10px;padding:16px 20px;text-align:center">
              <div style="font-size:28px;font-weight:900;color:#1d4ed8">${totalOrders}</div>
              <div style="font-size:12px;color:#6b7280;margin-top:4px">Total Orders</div>
            </div>
            <div style="flex:1;background:#fdf4ff;border-radius:10px;padding:16px 20px;text-align:center">
              <div style="font-size:28px;font-weight:900;color:#7e22ce">${ranked.length}</div>
              <div style="font-size:12px;color:#6b7280;margin-top:4px">Products Sold</div>
            </div>
            <div style="flex:1;background:#fff7ed;border-radius:10px;padding:16px 20px;text-align:center">
              <div style="font-size:28px;font-weight:900;color:#ea580c">${zeroOrderProducts.length}</div>
              <div style="font-size:12px;color:#6b7280;margin-top:4px">Dead Products</div>
            </div>
          </div>

          <!-- Top sellers -->
          <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 12px 0">🏆 Top-Selling Products</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px">
            <thead>
              <tr style="background:#f9fafb">
                <th style="padding:10px 12px;text-align:left;color:#6b7280;font-weight:600">#</th>
                <th style="padding:10px 12px;text-align:left;color:#6b7280;font-weight:600">Product</th>
                <th style="padding:10px 12px;text-align:center;color:#6b7280;font-weight:600">Orders</th>
                <th style="padding:10px 12px;text-align:center;color:#6b7280;font-weight:600">Units</th>
                <th style="padding:10px 12px;text-align:right;color:#6b7280;font-weight:600">Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${topRows || '<tr><td colspan="5" style="padding:20px;text-align:center;color:#9ca3af">No orders recorded yet</td></tr>'}
            </tbody>
          </table>

          ${zeroOrderProducts.length > 0 ? `
          <!-- Dead products -->
          <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 12px 0">⚠️ Products With Zero Orders</h2>
          <p style="font-size:13px;color:#6b7280;margin:0 0 12px 0">Consider removing or replacing these from the catalog.</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px">
            <thead>
              <tr style="background:#fef9c3">
                <th style="padding:8px 12px;text-align:left;color:#92400e;font-weight:600">Product</th>
                <th style="padding:8px 12px;text-align:center;color:#92400e;font-weight:600">Category</th>
                <th style="padding:8px 12px;text-align:right;color:#92400e;font-weight:600">Price</th>
                <th style="padding:8px 12px;text-align:center;color:#92400e;font-weight:600">Status</th>
              </tr>
            </thead>
            <tbody>${zeroRows}</tbody>
          </table>
          ` : '<p style="color:#2d6a4f;font-weight:700">✅ All products have at least one order!</p>'}

          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #f3f4f6;text-align:center">
            <a href="https://pawhaven-dashboard.vercel.app" style="background:#2d6a4f;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">
              Open Hughes Financials Dashboard →
            </a>
          </div>
        </div>

        <div style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;text-align:center;font-size:12px;color:#9ca3af">
          PawHaven automated weekly report · <a href="https://pawhavenpets.org" style="color:#2d6a4f">pawhavenpets.org</a>
        </div>
      </div>
    `;

    if (RESEND_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'PawHaven Analytics <noreply@pawhavenpets.org>',
          to:   [OWNER_EMAIL],
          subject: `📊 PawHaven Weekly Report — $${totalRevenue30.toFixed(2)} / 30 days · ${totalOrders} orders`,
          html,
        }),
      });
      if (!res.ok) console.error('[performance] Resend error:', await res.text());
    }

    return Response.json({
      ok: true,
      totalRevenue30: totalRevenue30.toFixed(2),
      totalOrders,
      topSellers: ranked.slice(0, 5).map((p) => ({ id: p.id, name: p.name, orders: p.orders })),
      zeroOrderCount: zeroOrderProducts.length,
    });

  } catch (err) {
    console.error('[performance] Error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
