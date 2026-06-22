'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'ph_cookie_consent';

export function useConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no prior decision
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {}
  }, []);

  function accept(level) {
    try {
      localStorage.setItem(STORAGE_KEY, level); // 'all' | 'necessary'
    } catch {}

    if (level === 'all') {
      // Fire analytics now that we have consent
      if (typeof window !== 'undefined') {
        if (window.gtag) window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
        });
        if (window.fbq) window.fbq('consent', 'grant');
        if (window.ttq) window.ttq.enableCookie();
      }
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[300] px-4 py-4 sm:px-6 lg:px-8"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-5xl mx-auto bg-navy-900 text-white rounded-2xl shadow-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Cookie icon + text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0 mt-0.5">🍪</span>
          <div>
            <p className="font-bold text-white text-sm mb-0.5">We use cookies</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              We use cookies for analytics, personalisation, and to improve your shopping experience.
              See our{' '}
              <Link href="/legal/privacy" className="text-brand-400 hover:underline" onClick={() => setVisible(false)}>
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => accept('necessary')}
            className="text-gray-400 hover:text-white text-xs font-medium transition-colors whitespace-nowrap"
          >
            Necessary Only
          </button>
          <button
            onClick={() => accept('all')}
            className="bg-brand-500 hover:bg-brand-400 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap active:scale-95"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
