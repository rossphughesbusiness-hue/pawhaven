/**
 * GET /api/affiliates/stats?code=SARAH4829
 * Returns affiliate stats for the dashboard.
 */
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
  } catch { return null; }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code')?.toUpperCase();

  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 });

  const data = await redisGet(`affiliate:${code}`);
  if (!data) return NextResponse.json({ error: 'not found' }, { status: 404 });

  // Don\'t expose internal fields
  const { email, ...safe } = data;
  return NextResponse.json(safe);
}
