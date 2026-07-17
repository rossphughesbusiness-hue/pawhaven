
export const dynamic = 'force-dynamic';
/**
 * GET /api/track/health
 * Verifies Redis connection and returns current pageview + product view counts.
 * Useful for debugging the view tracking pipeline.
 */

export const runtime = 'nodejs';

async function redisGet(url, token, key) {
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result ?? null;
}

async function redisZRevRange(url, token, key, start = 0, stop = 9) {
  const res = await fetch(`${url}/zrevrange/${encodeURIComponent(key)}/${start}/${stop}/withscores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result || [];
}

export async function GET() {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return Response.json({
      ok: false,
      error: 'UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set in this environment',
      envVarsPresent: { url: !!url, token: !!token },
    }, { status: 500 });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    const [totalViews, todayViews, topPagesRaw, topProductsRaw] = await Promise.all([
      redisGet(url, token, 'pageviews:total'),
      redisGet(url, token, `pageviews:daily:${today}`),
      redisZRevRange(url, token, 'pageviews:pages', 0, 9),
      redisZRevRange(url, token, `daily:${today}`, 0, 9),
    ]);

    // Parse withscores format: [member, score, member, score, ...]
    const parseWithScores = (arr) => {
      const result = [];
      for (let i = 0; i < arr.length; i += 2) {
        result.push({ key: arr[i], score: parseInt(arr[i + 1], 10) });
      }
      return result;
    };

    return Response.json({
      ok: true,
      redis: 'connected',
      date: today,
      pageviews: {
        allTime: parseInt(totalViews || '0', 10),
        today:   parseInt(todayViews || '0', 10),
        topPages: parseWithScores(topPagesRaw),
      },
      productViews: {
        today: parseWithScores(topProductsRaw),
      },
    });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
