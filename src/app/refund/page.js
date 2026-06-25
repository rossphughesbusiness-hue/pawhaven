'use client';

import { useState } from 'react';
import Link from 'next/link';

const REASONS = [
  { value: 'damaged',          label: 'Item arrived damaged' },
  { value: 'wrong item',       label: 'Wrong item received' },
  { value: 'not as described', label: 'Not as described' },
  { value: 'changed mind',     label: 'Changed my mind' },
  { value: 'other',            label: 'Other' },
];

export default function RefundPage() {
  const [form, setForm]     = useState({ orderId: '', email: '', reason: '', notes: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | done | error | duplicate
  const [result, setResult] = useState(null);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.reason) return;
    setStatus('loading');
    try {
      const res  = await fetch('/api/refund', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
      if (!res.ok) {
        setStatus('error');
      } else if (data.duplicate) {
        setStatus('duplicate');
      } else {
        setStatus('done');
      }
    } catch {
      setStatus('error');
      setResult(null);
    }
  }

  const inputCls = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-[#2d6a4f]';
  const labelCls = 'block text-sm font-semibold text-gray-800 mb-1.5';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="text-5xl mb-4">↩️</div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Request a Refund</h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            We offer 30-day hassle-free returns. Fill out the form below and we'll handle the rest.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Policy summary */}
        <div className="bg-[#f0fdf4] border border-[#86efac] rounded-2xl p-5 mb-8">
          <h2 className="font-bold text-[#166534] text-sm mb-2">Our refund policy</h2>
          <ul className="text-sm text-[#166534] space-y-1 list-none m-0 p-0">
            <li>✅ Orders under $50 are refunded automatically within minutes</li>
            <li>✅ Orders over $50 or older than 30 days are reviewed within 1–2 business days</li>
            <li>✅ Approved refunds appear on your statement within 5–10 business days</li>
            <li>📋 Full details in our <Link href="/legal/refund" className="underline font-semibold">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">

          {status === 'done' && result && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">{result.status === 'approved' ? '✅' : '📋'}</div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                {result.status === 'approved' ? 'Refund issued!' : 'Request received'}
              </h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                {result.status === 'approved'
                  ? `A full refund of ${result.currency} $${parseFloat(result.amount).toFixed(2)} has been issued. It'll appear on your statement within 5–10 business days. We've sent you a confirmation email.`
                  : `We'll review your request and email you at ${form.email} within 1–2 business days.`}
              </p>
              <Link
                href="/"
                className="inline-block bg-[#2d6a4f] hover:bg-[#1e4d38] text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Back to Shop
              </Link>
            </div>
          )}

          {status === 'duplicate' && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🔁</div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Already submitted</h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                We already have a refund request for that order — status: <strong>{result?.status}</strong>. Check your email for updates, or contact us if you have questions.
              </p>
              <Link href="/contact" className="text-[#2d6a4f] font-semibold hover:underline">Contact support →</Link>
            </div>
          )}

          {(status === 'idle' || status === 'loading' || status === 'error') && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelCls}>Order ID</label>
                <input
                  type="text"
                  required
                  value={form.orderId}
                  onChange={set('orderId')}
                  className={inputCls}
                  placeholder="cs_… or pi_… (from your confirmation email)"
                />
                <p className="text-xs text-gray-400 mt-1">Found in your order confirmation email subject line.</p>
              </div>

              <div>
                <label className={labelCls}>Email address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  className={inputCls}
                  placeholder="The email you used to order"
                />
              </div>

              <div>
                <label className={labelCls}>Reason for return</label>
                <select
                  required
                  value={form.reason}
                  onChange={set('reason')}
                  className={inputCls + ' bg-white'}
                >
                  <option value="" disabled>Select a reason…</option>
                  {REASONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>
                  Additional notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={set('notes')}
                  className={inputCls + ' resize-none'}
                  placeholder="Any details that will help us process your request faster…"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium">
                    {result?.error || 'Something went wrong. Please email us at support@pawhavenpets.org.'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !form.reason}
                className="w-full bg-[#2d6a4f] hover:bg-[#1e4d38] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors text-base"
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Refund Request →'}
              </button>

              <p className="text-center text-xs text-gray-400">
                Need help first?{' '}
                <Link href="/contact" className="text-[#2d6a4f] hover:underline">Contact support</Link>
                {' '}or see our{' '}
                <Link href="/legal/refund" className="text-[#2d6a4f] hover:underline">refund policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
