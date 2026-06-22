'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function StickyAddToCart({ product }) {
  const { addItem } = useCart();
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function handleAdd() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      image: product.images?.[0] || null,
      gradientFrom: product.gradientFrom,
      gradientTo: product.gradientTo,
      supplierProductId: product.supplierProductId || null,
      variants: {},
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      {/* Sentinel placed right after the main Add to Cart button */}
      <div ref={sentinelRef} style={{ height: 1, pointerEvents: 'none' }} />

      {/* Sticky bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          background: '#fff',
          borderTop: '1px solid #e2e8f0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        }}
      >
        {/* Thumbnail */}
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          overflow: 'hidden', flexShrink: 0,
          background: '#f1f5f9', position: 'relative',
        }}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="48px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              {product.emoji}
            </div>
          )}
        </div>

        {/* Name + price */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: '#1a2b4a',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {product.name}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#f97316' }}>
            ${product.price.toFixed(2)}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          style={{
            flexShrink: 0,
            padding: '12px 20px',
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            background: added ? '#22c55e' : '#f97316',
            color: '#fff',
            fontSize: 14,
            fontWeight: 800,
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </>
  );
}
