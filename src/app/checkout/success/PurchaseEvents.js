'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PurchaseEvents() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/order-summary?session_id=${sessionId}`)
      .then((r) => r.json())
      .then(({ orderId, total, currency, itemCount }) => {
        if (!total) return;

        // ── Google Analytics 4 purchase event ──
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'purchase', {
            transaction_id: orderId,
            value: parseFloat(total),
            currency,
            items: [{ quantity: itemCount }],
          });
        }

        // ── Meta Pixel Purchase event ──
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Purchase', {
            value: parseFloat(total),
            currency,
            content_type: 'product',
            num_items: itemCount,
          });
        }

        // ── TikTok Pixel CompletePayment event ──
        if (typeof window.ttq !== 'undefined') {
          window.ttq.track('CompletePayment', {
            value: parseFloat(total),
            currency,
          });
        }

        // ── Google Ads conversion event ──
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18269545115/xQLDCO7Og8UcEJvFzIdE',
            value: parseFloat(total),
            currency,
            transaction_id: orderId,
          });
        }
      })
      .catch(() => {});
  }, [sessionId]);

  return null;
}
