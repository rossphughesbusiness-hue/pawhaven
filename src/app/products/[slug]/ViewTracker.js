'use client';
import { useEffect } from 'react';
import { trackView } from './RecentlyViewed';

export default function ViewTracker({ id, name }) {
  useEffect(() => {
    // Track in Redis for dashboard analytics
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product_view', id, name }),
    }).catch(() => {});
    // Track in localStorage for Recently Viewed
    trackView(id);
  }, [id, name]);

  return null;
}
