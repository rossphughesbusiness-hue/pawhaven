import { NextResponse } from 'next/server';
import { getSeededReviews } from '@/lib/seeded-reviews';

const REDIS_URL   = () => process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN;

function redisKey(slug) {
  return `reviews:${slug}`;
}

async function redisPush(key, value) {
  const res = await fetch(`${REDIS_URL()}/lpush/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([JSON.stringify(value)]),
  });
  return res.json();
}

async function redisLRange(key, start, stop) {
  const res = await fetch(
    `${REDIS_URL()}/lrange/${encodeURIComponent(key)}/${start}/${stop}`,
    { headers: { Authorization: `Bearer ${REDIS_TOKEN()}` }, cache: 'no-store' }
  );
  const json = await res.json();
  if (!Array.isArray(json.result)) return [];
  return json.result
    .map((r) => { try { return JSON.parse(r); } catch { return null; } })
    .filter(Boolean);
}

// GET /api/reviews?slug=maze-slow-feeder-bowl
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  // User-submitted reviews from Redis (always shown first)
  let userReviews = [];
  if (REDIS_URL() && REDIS_TOKEN()) {
    userReviews = await redisLRange(redisKey(slug), 0, 49);
  }

  // Seeded reviews shown after user reviews (as social proof baseline)
  const seeded = getSeededReviews(slug);

  // Deduplicate by timestamp to avoid showing seeded reviews that were also manually pushed
  const userTs = new Set(userReviews.map((r) => r.ts));
  const filteredSeeded = seeded.filter((r) => !userTs.has(r.ts));

  const reviews = [...userReviews, ...filteredSeeded];
  return NextResponse.json({ reviews });
}

// POST /api/reviews
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { slug, name, rating, text } = body;

  // Validation
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
  }
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 60) {
    return NextResponse.json({ error: 'Name must be 2–60 characters' }, { status: 400 });
  }
  if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be 1–5 stars' }, { status: 400 });
  }
  if (!text || typeof text !== 'string' || text.trim().length < 10 || text.trim().length > 1000) {
    return NextResponse.json({ error: 'Review must be 10–1000 characters' }, { status: 400 });
  }

  if (!REDIS_URL() || !REDIS_TOKEN()) {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });
  }

  const review = {
    name: name.trim().slice(0, 60),
    rating: Math.round(rating),
    text: text.trim().slice(0, 1000),
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    ts: Date.now(),
  };

  await redisPush(redisKey(slug), review);
  return NextResponse.json({ ok: true, review });
}
