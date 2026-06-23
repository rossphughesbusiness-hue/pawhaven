'use client';
/**
 * RefTracker — detects ?ref=CODE on any page, saves it to localStorage,
 * and fires a click event to the affiliate tracking API.
 * Rendered in the root layout so it runs on every page.
 */
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const REF_KEY = 'pawhaven_ref';
const REF_EXPIRES_KEY = 'pawhaven_ref_exp';
// 90-day cookie window in ms
const COOKIE_MS = 90 * 24 * 60 * 60 * 1000;

export default function RefTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const incomingRef = searchParams.get('ref')?.toUpperCase();

    if (incomingRef) {
      // Save ref + expiry to localStorage
      try {
        localStorage.setItem(REF_KEY, incomingRef);
        localStorage.setItem(REF_EXPIRES_KEY, String(Date.now() + COOKIE_MS));
      } catch { /* private browsing */ }

      // Fire click tracking (fire-and-forget)
      fetch(`/api/affiliates/track-click?code=${encodeURIComponent(incomingRef)}`).catch(() => {});
    }

    // Prune expired ref
    try {
      const exp = parseInt(localStorage.getItem(REF_EXPIRES_KEY) || '0', 10);
      if (exp && Date.now() > exp) {
        localStorage.removeItem(REF_KEY);
        localStorage.removeItem(REF_EXPIRES_KEY);
      }
    } catch { /* ignore */ }
  }, [searchParams]);

  return null;
}
