'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const STATUS_STEPS = ['Order Placed', 'Being Prepared', 'Shipped', 'Delivered'];

// Map our internal Redis status strings to the display step
function stepIndex(status) {
  const map = {
    'Order Placed': 0,
    'Being Prepared': 1,
    'Shipped': 2,
    'Delivered': 3,
    'processing': 0,
    'preparing': 1,
    'shipped': 2,
    'in_transit': 2,
    'out_for_delivery': 2,
    'delivered': 3,
  };
  return map[status] ?? 0;
}

// Map internal status to friendly display label
function friendlyStatus(status) {
  const map = {
    processing: 'Order Placed',
    preparing: 'Being Prepared',
    shipped: 'Shipped',
    in_transit: 'Shipped',
    out_for_delivery: 'Shipped',
    delivered: 'Delivered',
  };
  return map[status] || 'Order Placed';
}

function ProgressBar({ status }) {
  const current = stepIndex(status);
  return (
    <div style={{ margin: '32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
        {STATUS_STEPS.map((step, i) => {
          const done = i <= current;
          const isLast = i === STATUS_STEPS.length - 1;
          return (
            <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {i > 0 && (
                  <div style={{
                    flex: 1, height: 3, background: i <= current ? '#f97316' : '#e2e8f0',
                    transition: 'background 0.3s',
                  }} />
                )}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: done ? '#f97316' : '#f1f5f9',
                  border: done ? '2px solid #f97316' : '2px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: done ? '#fff' : '#94a3b8', fontWeight: 700,
                  transition: 'all 0.3s',
                }}>
                  {done ? '✓' : i + 1}
                </div>
                {!isLast && (
                  <div style={{
                    flex: 1, height: 3, background: i < current ? '#f97316' : '#e2e8f0',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
              <span style={{
                marginTop: 8, fontSize: 11, color: done ? '#f97316' : '#94a3b8',
                fontWeight: done ? 700 : 400, textAlign: 'center',
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrackingResult({ result }) {
  // Normalise: API may return internal status strings like 'processing'
  const displayStatus = friendlyStatus(result.status);
  const hasTracking = result.trackingNumber && result.trackingUrl;
  const isDelivered = result.status === 'delivered' || result.status === 'Delivered';
  const isCancelled = result.status === 'cancelled' || result.rawStatus === 'CANCELLED';

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{
        background: isDelivered ? '#f0fdf4' : isCancelled ? '#fef2f2' : '#fff7ed',
        border: `1px solid ${isDelivered ? '#86efac' : isCancelled ? '#fca5a5' : '#fed7aa'}`,
        borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{ fontSize: 28 }}>{isDelivered ? '🎉' : isCancelled ? '❌' : '📦'}</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1a2b4a' }}>{displayStatus}</div>
          {result.customerName && (
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>For {result.customerName}</div>
          )}
          {result.estimatedDelivery && !isDelivered && (
            <div style={{ fontSize: 13, color: '#f97316', marginTop: 2, fontWeight: 600 }}>
              Est. delivery: {result.estimatedDelivery}
            </div>
          )}
        </div>
      </div>

      {!isCancelled && <ProgressBar status={displayStatus} />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Order Reference</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a2b4a', fontFamily: 'monospace' }}>{result.orderRef}</div>
        </div>
        <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Order Placed</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a2b4a' }}>
            {result.createdAt ? new Date(result.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
          </div>
        </div>
      </div>

      {hasTracking ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#15803d', fontWeight: 700, marginBottom: 8 }}>📬 Your package is on the way!</div>
          <div style={{ fontSize: 14, color: '#1a2b4a', marginBottom: 4 }}>
            Tracking #: <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{result.trackingNumber}</span>
            {result.trackingCarrier && <span style={{ color: '#64748b', marginLeft: 8 }}>via {result.trackingCarrier}</span>}
          </div>
          <a
            href={result.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', marginTop: 12, padding: '10px 22px',
              background: '#16a34a', color: '#fff', borderRadius: 50, fontSize: 14,
              fontWeight: 700, textDecoration: 'none',
            }}
          >
            Track on 17Track →
          </a>
        </div>
      ) : (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#64748b' }}>
          {result.rawStatus === 'CREATED' || result.rawStatus === 'UNSHIPPED'
            ? '⏳ Tracking info will appear here once your order ships (usually 2–5 business days).'
            : 'Tracking information is not yet available.'}
        </div>
      )}

      <div style={{ textAlign: 'center', paddingTop: 8 }}>
        <Link href="/products" style={{
          display: 'inline-block', padding: '12px 28px',
          background: '#f97316', color: '#fff', borderRadius: 50,
          fontSize: 15, fontWeight: 700, textDecoration: 'none',
        }}>
          Shop More for Your Pet →
        </Link>
        <div style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>
          Need help?{' '}
          <Link href="/contact" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Contact support</Link>
        </div>
      </div>
    </div>
  );
}

function OrderTrackingInner() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Auto-lookup if session_id is in the URL (coming from success page)
  useEffect(() => {
    const sid = searchParams.get('session_id');
    if (sid) {
      setSessionId(sid);
      lookup(sid);
    }
  }, []);

  async function lookup(sid) {
    const id = (sid || sessionId).trim();
    if (!id) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // session IDs start with cs_; everything else treated as short order ref
      const param = id.startsWith('cs_')
        ? `session_id=${encodeURIComponent(id)}`
        : `ref=${encodeURIComponent(id)}`;
      const res = await fetch(`/api/order-status?${param}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to find order. Please check your order number and try again.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', padding: '60px 16px' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, color: '#1a2b4a' }}>Track Your Order</h1>
          <p style={{ margin: 0, fontSize: 15, color: '#64748b' }}>
            Enter your order ID below to see the latest status.
          </p>
        </div>

        {/* Search box */}
        {!result && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px 28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a2b4a', marginBottom: 8 }}>
              Order ID
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookup()}
                placeholder="Order ref (e.g. A1B2C3D4E5F6) or cs_live_…"
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                  fontSize: 14, outline: 'none', fontFamily: 'monospace',
                }}
              />
              <button
                onClick={() => lookup()}
                disabled={loading || !sessionId.trim()}
                style={{
                  padding: '12px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: loading || !sessionId.trim() ? '#e2e8f0' : '#f97316',
                  color: loading || !sessionId.trim() ? '#94a3b8' : '#fff',
                  fontSize: 14, fontWeight: 700, transition: 'background 0.2s',
                }}
              >
                {loading ? '...' : 'Track'}
              </button>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: 12, color: '#94a3b8' }}>
              Find your order reference number in your confirmation email.
            </p>
            {error && (
              <div style={{ marginTop: 14, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 14, color: '#dc2626' }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1a2b4a' }}>Order Status</h2>
              <button
                onClick={() => { setResult(null); setSessionId(''); }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }}
              >
                ← Look up another
              </button>
            </div>
            <TrackingResult result={result} />
          </div>
        )}

        {/* Helper text */}
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#94a3b8' }}>
          Can\'t find your order?{' '}
          <Link href="/contact" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>
            Contact us
          </Link>{' '}
          and we\'ll help right away.
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        Loading...
      </div>
    }>
      <OrderTrackingInner />
    </Suspense>
  );
}
