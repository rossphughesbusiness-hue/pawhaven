import { NextResponse } from 'next/server';

const CJ_BASE = 'https://developers.cjdropshipping.com/api2.0/v1';

async function redisGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const json = await res.json();
  if (!json.result) return null;
  try { return JSON.parse(decodeURIComponent(json.result)); } catch { return null; }
}

async function getCJToken() {
  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: process.env.CJ_API_KEY,
    }),
  });
  const data = await res.json();
  if (data.code !== 200 || !data.data?.accessToken) return null;
  return data.data.accessToken;
}

async function getCJOrderStatus(cjOrderId, token) {
  const res = await fetch(
    `${CJ_BASE}/shopping/order/getOrderDetail?orderNum=${encodeURIComponent(cjOrderId)}`,
    { headers: { 'CJ-Access-Token': token }, cache: 'no-store' }
  );
  const data = await res.json();
  if (data.code !== 200 || !data.data) return null;
  const order = data.data;

  // Map CJ status codes to friendly labels
  const STATUS_MAP = {
    CREATED: 'Order Placed',
    UNSHIPPED: 'Being Prepared',
    SHIPPING: 'Shipped',
    DELIVERED: 'Delivered',
    UNPAID: 'Pending Payment',
    CANCELLED: 'Cancelled',
  };

  const rawStatus = order.orderStatus || 'CREATED';
  return {
    status: STATUS_MAP[rawStatus] || rawStatus,
    rawStatus,
    trackingNumber: order.trackNumber || order.trackingNumber || null,
    trackingCarrier: order.logisticsName || null,
    trackingUrl: order.trackNumber
      ? `https://t.17track.net/en#nums=${order.trackNumber}`
      : null,
    shippingTo: order.shippingCustomerName || null,
  };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let sessionId = searchParams.get('session_id');
  const ref = searchParams.get('ref');

  // Support lookup by short order reference (e.g. the last-12-char orderRef)
  if (!sessionId && ref) {
    const sid = await redisGet(`order:ref:${ref.trim().toUpperCase()}`);
    if (typeof sid === 'string') sessionId = sid;
  }

  if (!sessionId) {
    return NextResponse.json({ error: 'session_id or ref required' }, { status: 400 });
  }

  // Look up order data from Redis
  const orderData = await redisGet(`order:${sessionId}`);
  if (!orderData) {
    return NextResponse.json({ error: 'Order not found. It may still be processing.' }, { status: 404 });
  }

  // Try to get live CJ status
  let cjStatus = null;
  if (process.env.CJ_API_KEY) {
    try {
      const token = await getCJToken();
      if (token && orderData.cjOrderId) {
        cjStatus = await getCJOrderStatus(orderData.cjOrderId, token);
      }
    } catch (err) {
      console.error('[track-order] CJ status fetch error:', err.message);
    }
  }

  return NextResponse.json({
    orderRef: orderData.orderRef,
    cjOrderId: orderData.cjOrderId,
    customerName: orderData.customerName,
    createdAt: orderData.createdAt,
    status: cjStatus?.status || 'Order Placed',
    rawStatus: cjStatus?.rawStatus || 'CREATED',
    trackingNumber: cjStatus?.trackingNumber || null,
    trackingCarrier: cjStatus?.trackingCarrier || null,
    trackingUrl: cjStatus?.trackingUrl || null,
  });
}
