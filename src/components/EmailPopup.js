'use client';

import { useState, useEffect } from 'react';

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  useEffect(() => {
    try {
      if (localStorage.getItem('ph_popup_dismissed')) return;
    } catch {}

    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    try { localStorage.setItem('ph_popup_dismissed', '1'); } catch {}
    setVisible(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('done');
      try { localStorage.setItem('ph_popup_dismissed', '1'); } catch {}
      setTimeout(dismiss, 2500);
    } catch {
      setStatus('error');
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 px-8 pt-8 pb-6 text-center">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-light leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <div className="text-5xl mb-3">🐾</div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Get 10% Off Your First Order
          </h2>
          <p className="text-orange-100 text-sm mt-1">
            Join 10,000+ happy pet owners
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {status === 'done' ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-bold text-navy-900 text-lg">You\'re in!</p>
              <p className="text-gray-500 text-sm mt-1">
                Use code{' '}
                <span className="font-black text-orange-500 tracking-wider">WELCOME10</span>
                {' '}at checkout.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm text-center mb-5">
                Enter your email and we\'ll send you an exclusive discount code — plus early access to new arrivals and pet care tips.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-70 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/40"
                >
                  {status === 'loading' ? 'Saving…' : 'Claim My 10% Off →'}
                </button>
              </form>
              {status === 'error' && (
                <p className="text-red-500 text-xs text-center mt-2">Something went wrong. Please try again.</p>
              )}
              <button
                onClick={dismiss}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
              >
                No thanks, I\'ll pay full price
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
