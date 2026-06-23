'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const REF_KEY = 'ph_ref';
const REF_EXP_KEY = 'ph_ref_exp';
// 90-day attribution window
const WINDOW_MS = 90 * 24 * 60 * 60 * 1000;

/**
 * Invisible component mounted in the layout.
 * Reads ?ref=XXX from URL → persists to localStorage (90-day window)
 * and fires affiliate click tracking.
 */
export default function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref')?.toUpperCase();

    if (ref) {
      try {
        localStorage.setItem(REF_KEY, ref);
        localStorage.setItem(REF_EXP_KEY, String(Date.now() + WINDOW_MS));
      } catch {}

      // Fire click tracking for affiliate codes (fire-and-forget)
      fetch(`/api/affiliates/track-click?code=${encodeURIComponent(ref)}`).catch(() => {});
    }

    // Prune expired attribution
    try {
      const exp = parseInt(localStorage.getItem(REF_EXP_KEY) || '0', 10);
      if (exp && Date.now() > exp) {
        localStorage.removeItem(REF_KEY);
        localStorage.removeItem(REF_EXP_KEY);
      }
    } catch {}
  }, [searchParams]);

  return null;
}
