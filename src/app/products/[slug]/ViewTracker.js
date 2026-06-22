'use client';
import { useEffect } from 'react';
import { trackView } from './RecentlyViewed';
import { trackViewItem } from '@/lib/analytics';

export default function ViewTracker({ id, name, product }) {
  useEffect(() => {
    // Track in Redis for dashboard analytics
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product_view', id, name }),
    }).catch(() => {});
    // Track in localStorage for Recently Viewed
    trackView(id);
    // Fire GA4 / Meta / TikTok view_item events
    if (product) trackViewItem(product);
  }, [id, name, product]);

  return null;
}
