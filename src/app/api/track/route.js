export const runtime = 'nodejs';

/**
 * POST /api/track — pageview + product view counters.
 * Uses Upstash REST directly (same transport as /api/track/health,
 * which is proven to work) instead of the @upstash/redis SDK, whose
 * writes were silently failing in this runtime.
 */

async function redisCmd(url, token, parts) {
  const res = await fetch(`${url}/${parts.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${parts[0]} failed: ${res.status}`);
  return res.json();
}

export async function POST(req) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return new Response('redis not configured', { status: 500 });
  }

  try {
    const body = await req.json();
    const { type, id, name, path } = body;
    const today = new Date().toISOString().slice(0, 10);

    if (type === 'product_view' && id) {
      await Promise.all([
        redisCmd(url, token, ['hincrby', `product:${id}`, 'views', '1']),
        redisCmd(url, token, ['zincrby', `daily:${today}`, '1', String(id)]),
        redisCmd(url, token, ['hset', `product:${id}`, 'name', name || String(id)]),
      ]);
    }

    if (type === 'pageview' && path) {
      await Promise.all([
        redisCmd(url, token, ['incr', 'pageviews:total']),
        redisCmd(url, token, ['incr', `pageviews:daily:${today}`]),
        redisCmd(url, token, ['zincrby', 'pageviews:pages', '1', path]),
      ]);
    }

    return new Response('ok', { status: 200 });
  } catch (err) {
    console.error('[track] error:', err);
    return new Response('track failed', { status: 500 });
  }
}
