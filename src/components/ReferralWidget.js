'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const BASE_URL = 'https://pawhavenpets.org';

/**
 * Shown on the success page.
 * Derives the customer\'s referral code from the Stripe session ID and renders
 * a shareable link + copy / social share buttons.
 */
export default function ReferralWidget() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [refLink, setRefLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    // Strip the cs_test_ / cs_live_ prefix, take first 8 chars, uppercase
    const code = sessionId.replace(/^cs_(test|live)_/, '').slice(0, 8).toUpperCase();
    setRefLink(`${BASE_URL}/?ref=${code}`);
    // Clear any incoming referral now that this customer has completed a purchase
    try { localStorage.removeItem('ph_ref'); } catch {}
  }, [sessionId]);

  async function copyLink() {
    if (!refLink) return;
    try {
      await navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for Safari
      const el = document.createElement('textarea');
      el.value = refLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function shareText() {
    return encodeURIComponent(`I just found the best pet accessories store! Use my link for 10% off your first order 🐾 ${refLink}`);
  }

  if (!refLink) return null;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-8 mt-10 max-w-xl mx-auto text-center">
      {/* Heading */}
      <div className="text-3xl mb-3">🎁</div>
      <h2 className="text-xl font-black text-navy-900 mb-2">
        Share PawHaven, Earn Rewards
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        Give friends <strong className="text-orange-500">10% off</strong> their first order.
        When they buy, you get <strong className="text-orange-500">10% off</strong> your next one — forever.
      </p>

      {/* Link box */}
      <div className="flex items-center gap-2 bg-white border border-orange-200 rounded-2xl overflow-hidden shadow-sm mb-4">
        <span className="flex-1 px-4 py-3 text-sm text-gray-600 font-mono truncate text-left">
          {refLink}
        </span>
        <button
          onClick={copyLink}
          className={`flex-shrink-0 px-5 py-3 font-bold text-sm transition-all duration-200 ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-orange-500 hover:bg-orange-400 text-white'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Social share */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-xs text-gray-400 font-medium">Share via</span>
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          aria-label="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Share on X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        {/* SMS / iMessage */}
        <a
          href={`sms:?body=${shareText()}`}
          className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
          aria-label="Share via text"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
