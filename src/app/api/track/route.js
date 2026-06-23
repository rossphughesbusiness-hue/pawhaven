export async function POST(req) {
  try {
    const { type, id, name } = await req.json();
    if (!type || !id) return new Response('ok', { status: 200 });

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return new Response('ok', { status: 200 });

    const today = new Date().toISOString().slice(0, 10);

    // Increment total views and daily views for this product
    await Promise.all([
      fetch(`${url}/hincrby/product:${id}/views/1`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${url}/zincrby/daily:${today}/1/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      // Store product name for display
      fetch(`${url}/hset/product:${id}/name/${encodeURIComponent(name || id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    return new Response('ok', { status: 200 });
  } catch {
    return new Response('ok', { status: 200 });
  }
}
