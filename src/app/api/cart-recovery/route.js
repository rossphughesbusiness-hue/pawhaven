import { NextResponse } from 'next/server';

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

// GET /api/cart-recovery?sid=cs_live_xxx
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sid = searchParams.get('sid');
  if (!sid) return NextResponse.json({ error: 'sid required' }, { status: 400 });

  const cartData = await redisGet(`cart_recovery:${sid}`);
  if (!cartData || !cartData.items) {
    return NextResponse.json({ error: 'Cart not found or expired' }, { status: 404 });
  }

  return NextResponse.json({ items: cartData.items });
}
