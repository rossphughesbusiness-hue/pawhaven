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
    const data = await res.json();
    if (!data.result) return null;
    return JSON.parse(decodeURIComponent(data.result));
  } catch {
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ref = (searchParams.get('ref') || '').trim().toUpperCase();
  const sessionId = (searchParams.get('session') || '').trim();

  if (!ref && !sessionId) {
    return NextResponse.json({ error: 'Provide an order reference or session ID' }, { status: 400 });
  }

  try {
    let order = null;

    if (sessionId) {
      // Direct lookup by Stripe session ID
      order = await redisGet(`order:${sessionId}`);
    } else {
      // Look up session ID by short order reference
      const sid = await redisGet(`order:ref:${ref}`);
      if (sid && typeof sid === 'string') {
        order = await redisGet(`order:${sid}`);
      }
    }

    if (!order) {
      return NextResponse.json(
        { error: 'No order found. Check your reference number or contact support@pawhavenpets.org.' },
        { status: 404 }
      );
    }

    // Return safe subset (no internal CJ IDs)
    return NextResponse.json({
      orderRef: order.orderRef,
      status: order.status || 'processing',
      customerName: order.customerName,
      createdAt: order.createdAt,
    });
  } catch (err) {
    console.error('[order-status] Error:', err.message);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
