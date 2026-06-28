import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, id, name, path } = body;

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const today = new Date().toISOString().slice(0, 10);

    if (type === 'product_view' && id) {
      // Product-level tracking
      await Promise.all([
        redis.hincrby(`product:${id}`, 'views', 1),
        redis.zincrby(`daily:${today}`, 1, String(id)),
        redis.hset(`product:${id}`, { name: name || String(id) }),
      ]);
    }

    if (type === 'pageview' && path) {
      // Site-wide page view tracking
      await Promise.all([
        redis.incr('pageviews:total'),
        redis.incr(`pageviews:daily:${today}`),
        redis.zincrby('pageviews:pages', 1, path),
      ]);
    }

    return new Response('ok', { status: 200 });
  } catch (err) {
    console.error('[track] error:', err);
    return new Response('ok', { status: 200 });
  }
}
