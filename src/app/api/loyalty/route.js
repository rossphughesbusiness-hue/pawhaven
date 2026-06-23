import { NextResponse } from 'next/server';

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
  } catch {
    return null;
  }
}

/**
 * GET /api/loyalty?email=xxx
 * Returns the customer's current PawPoints balance.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = (searchParams.get('email') || '').trim().toLowerCase();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const data = await redisGet(`loyalty:${email}`);
  return NextResponse.json({
    points: data?.points || 0,
    totalEarned: data?.totalEarned || 0,
    nextRewardAt: 100,
    lastPurchase: data?.lastPurchase || null,
  });
}
