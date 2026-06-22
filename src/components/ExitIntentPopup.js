'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ph_exit_intent_dismissed';
// Don't show again for 3 days after dismissal
const COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;

export default function ExitIntentPopup({ onApplyCoupon }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const shouldShow = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return true;
      const dismissed = parseInt(stored, 10);
      return Date.now() - dismissed > COOLDOWN_MS;
    } catch {
      return false;
    }
  }, []);

  const dismiss = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    // Desktop: fire when cursor exits toward the top of the viewport
    function onMouseLeave(e) {
      if (e.clientY < 20 && shouldShow()) {
        setVisible(true);
      }
    }

    // Mobile fallback: show after 40s of inactivity (page open)
    let mobileTimer;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        if (shouldShow()) setVisible(true);
      }, 40_000);
    }

    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [shouldShow]);

  function handleApply() {
    if (onApplyCoupon) onApplyCoupon('WELCOME10');
    dismiss();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText('WELCOME10');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: just show as copied anyway
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-brand-500 to-orange-400 px-7 pt-8 pb-7 text-center">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-light leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>
          <div className="text-5xl mb-3">🛒</div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Wait — don't forget your 10% off!
          </h2>
          <p className="text-orange-100 text-sm mt-1.5">
            Your cart is saved. Use this code before you go:
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-6 space-y-4">
          {/* Code display */}
          <div className="flex items-center gap-3 bg-brand-50 border-2 border-dashed border-brand-300 rounded-2xl px-5 py-4">
            <span className="text-xl font-black text-brand-600 tracking-widest flex-1 text-center">
              WELCOME10
            </span>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white border border-brand-200 text-brand-500 hover:border-brand-400'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Apply button (if cart context available) */}
          {onApplyCoupon && (
            <button
              onClick={handleApply}
              className="w-full bg-brand-500 hover:bg-brand-400 text-white font-black py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40 active:scale-95"
            >
              Apply & Save 10% →
            </button>
          )}

          <p className="text-center text-xs text-gray-400 leading-relaxed">
            Applies to your first order. Can't be combined with other offers.
          </p>

          <button
            onClick={dismiss}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
