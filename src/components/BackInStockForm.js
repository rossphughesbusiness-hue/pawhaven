'use client';
import { useState } from 'react';

export default function BackInStockForm({ product }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      // Subscribe them to the Resend audience with a tag, or just send an email to support
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tag: `back-in-stock:${product.slug}`,
          productName: product.name,
        }),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl">✅</span>
        <div>
          <p className="font-bold text-emerald-800 text-sm">You're on the list!</p>
          <p className="text-emerald-600 text-xs mt-0.5">We'll email you the moment {product.name} is restocked.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">🔔</span>
        <div>
          <p className="font-bold text-navy-900 text-sm">Get notified when it's back</p>
          <p className="text-gray-500 text-xs mt-0.5">
            Enter your email and we'll alert you the moment this item is restocked.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap active:scale-95"
        >
          {status === 'loading' ? '…' : 'Notify Me'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2">Something went wrong — try again.</p>
      )}
    </div>
  );
}
