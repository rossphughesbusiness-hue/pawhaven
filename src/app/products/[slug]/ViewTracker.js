'use client';
import { useEffect } from 'react';

export default function ViewTracker({ id, name }) {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product_view', id, name }),
    }).catch(() => {});
  }, [id, name]);

  return null;
}
