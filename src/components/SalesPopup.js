'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';

const FIRST_NAMES = [
  'Sarah', 'Emma', 'Jake', 'Olivia', 'Liam', 'Ava', 'Noah', 'Sophia',
  'Mason', 'Isabella', 'Ethan', 'Mia', 'Lucas', 'Charlotte', 'Aiden',
  'Amelia', 'Logan', 'Harper', 'Jackson', 'Evelyn', 'Chloe', 'Ryan',
  'Lily', 'Michael', 'Grace', 'James', 'Zoe', 'Daniel', 'Riley', 'Jack',
];

const CITIES = [
  'Austin, TX', 'Denver, CO', 'Nashville, TN', 'Portland, OR', 'Seattle, WA',
  'Atlanta, GA', 'Chicago, IL', 'Phoenix, AZ', 'Miami, FL', 'Boston, MA',
  'San Diego, CA', 'Dallas, TX', 'Brooklyn, NY', 'Minneapolis, MN', 'Columbus, OH',
  'Charlotte, NC', 'Las Vegas, NV', 'Sacramento, CA', 'Pittsburgh, PA', 'Tampa, FL',
];

const TIMES = ['Just now', '2 min ago', '4 min ago', '7 min ago', '11 min ago', '15 min ago'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildNotification() {
  const product = pick(products);
  return {
    id: Math.random(),
    name: pick(FIRST_NAMES),
    city: pick(CITIES),
    time: pick(TIMES),
    product,
  };
}

export default function SalesPopup() {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don\'t show immediately — wait a bit so page loads first
    const initialDelay = setTimeout(() => {
      show();
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  function show() {
    setNotification(buildNotification());
    setVisible(true);

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
      // Show next one after a pause
      const nextTimer = setTimeout(() => {
        show();
      }, pick([12000, 16000, 20000, 24000]));
      return () => clearTimeout(nextTimer);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }

  if (!notification) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 9999,
        maxWidth: 300,
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Link
        href={`/products/${notification.product.slug}`}
        style={{ textDecoration: 'none' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          padding: '12px 14px',
          border: '1px solid #f0f0f0',
          cursor: 'pointer',
        }}>
          {/* Product image */}
          <div style={{
            width: 52, height: 52, borderRadius: 10, overflow: 'hidden',
            flexShrink: 0, background: '#f1f5f9', position: 'relative',
          }}>
            {notification.product.images?.[0] ? (
              <Image
                src={notification.product.images[0]}
                alt={notification.product.name}
                fill
                sizes="52px"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {notification.product.emoji}
              </div>
            )}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a2b4a', lineHeight: 1.3 }}>
              <span style={{ color: '#f97316' }}>{notification.name}</span> from {notification.city}
            </div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              purchased <strong style={{ color: '#1a2b4a' }}>{notification.product.name}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#94a3b8' }}>{notification.time}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
