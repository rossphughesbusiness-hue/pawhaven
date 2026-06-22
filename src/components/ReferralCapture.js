'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Invisible component mounted in the layout.
 * Reads ?ref=XXX from URL → persists to localStorage so /api/checkout can pick it up.
 */
export default function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;
    try {
      localStorage.setItem('ph_ref', ref);
    } catch {}
  }, [searchParams]);

  return null;
}
