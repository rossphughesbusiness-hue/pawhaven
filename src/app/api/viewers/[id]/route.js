import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Default: plausible range seeded by product id
  const seed = parseInt(id, 10) || 1;
  const base = 3 + (seed % 11); // 3–13

  if (!url || !token) {
    return NextResponse.json({ viewers: base });
  }

  try {
    const res = await fetch(`${url}/hget/product:${id}/views`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    const totalViews = parseInt(data.result, 10) || 0;

    // Derive a plausible "live viewer" count from total views.
    // ~2% of daily traffic is viewing concurrently; minimum 3, max 24.
    const derived = Math.min(24, Math.max(base, Math.floor(totalViews * 0.02) + base));
    return NextResponse.json({ viewers: derived });
  } catch {
    return NextResponse.json({ viewers: base });
  }
}
