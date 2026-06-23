import { NextResponse } from 'next/server';

const REDIS_URL = () => process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisSet(key, value, ttlSeconds) {
  const url = REDIS_URL();
  const token = REDIS_TOKEN();
  if (!url || !token) return;
  await fetch(`${url}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(value))}?ex=${ttlSeconds}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

async function redisZAdd(key, score, member) {
  const url = REDIS_URL();
  const token = REDIS_TOKEN();
  if (!url || !token) return;
  await fetch(`${url}/zadd/${encodeURIComponent(key)}/${score}/${encodeURIComponent(member)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

// POST /api/cart/save
// Body: { email, items: [{id, name, price, quantity, image, slug}] }
export async function POST(req) {
  try {
    const { email, items } = await req.json();
    if (!email || !items?.length) {
      return NextResponse.json({ ok: true }); // silent no-op
    }

    const now = Date.now();
    const cartData = { email, items, savedAt: now };

    // Store cart with 48h TTL
    await redisSet(`abandoned_cart:${email}`, cartData, 48 * 60 * 60);

    // Add to sorted set (score = timestamp) so cron can scan by time
    await redisZAdd('abandoned_carts', now, email);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[cart/save]', err.message);
    return NextResponse.json({ ok: true }); // never error to client
  }
}
