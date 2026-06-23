/**
 * GET /api/affiliates/track-click?code=SARAH4829
 * Increments the click counter on an affiliate record.
 * Called client-side when a visitor arrives via ?ref=CODE.
 * Deduplicates within the same session using a 1-hour cooldown key.
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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code')?.toUpperCase();
  if (!code) return NextResponse.json({ ok: false }, { status: 400 });

  // Look up affiliate
  const affiliateData = await redisGet(`affiliate:${code}`);
  if (!affiliateData) {
    // Not a known affiliate code — silently ignore
    return NextResponse.json({ ok: true });
  }

  // Deduplicate: use IP + code as cooldown key (1-hour window)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const dedupeKey = `aff_click_dedup:${code}:${ip}`;
  const alreadyCounted = await redisGet(dedupeKey);
  if (alreadyCounted) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  // Increment clicks
  const updated = {
    ...affiliateData,
    clicks: (affiliateData.clicks || 0) + 1,
  };
  await redisSave(`affiliate:${code}`, updated, 3 * 365 * 24 * 60 * 60);
  // Set dedupe flag for 1 hour
  await redisSave(dedupeKey, 1, 3600);

  return NextResponse.json({ ok: true });
}
