'use client';
import { useState } from 'react';

export default function BundleCheckoutButton({ bundle }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    const items = bundle.products.map((p) => ({
      id: p.id,
      name: p.name,
      price: bundle.itemPrices[p.id],
      quantity: 1,
      image: p.images?.[0] || p.image || null,
      supplierProductId: p.supplierProductId || '',
      variants: {},
    }));

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Checkout failed. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 24px',
          backgroundColor: loading ? '#d1d5db' : bundle.accentColor,
          color: '#fff',
          fontWeight: 800,
          fontSize: '16px',
          borderRadius: '12px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.15s, transform 0.15s',
          transform: loading ? 'none' : undefined,
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        {loading ? 'Redirecting to checkout…' : `Get This Bundle — $${bundle.bundleTotal.toFixed(2)}`}
      </button>
      {error && (
        <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
}
