'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { products } from '@/lib/products';

const FIRST_NAMES = [
  'Sarah', 'Emma', 'Madison', 'Olivia', 'Chloe', 'Hannah', 'Ava', 'Grace',
  'Jessica', 'Lauren', 'Megan', 'Ashley', 'Kayla', 'Brittany', 'Nicole',
  'Tyler', 'Jordan', 'Chase', 'Ryan', 'Alex', 'Jake', 'Dylan', 'Chris',
  'Nathan', 'Logan', 'Ethan', 'Luke', 'Noah', 'Mason', 'Liam',
];

const CITIES = [
  'Austin, TX', 'Denver, CO', 'Nashville, TN', 'Portland, OR', 'Charlotte, NC',
  'Atlanta, GA', 'Phoenix, AZ', 'Seattle, WA', 'Chicago, IL', 'Miami, FL',
  'Dallas, TX', 'San Diego, CA', 'Boston, MA', 'Minneapolis, MN', 'Tampa, FL',
  'Raleigh, NC', 'Las Vegas, NV', 'Salt Lake City, UT', 'Richmond, VA', 'Boise, ID',
];

const TIME_PHRASES = [
  'just now', '2 minutes ago', '4 minutes ago', '7 minutes ago',
  '10 minutes ago', '12 minutes ago', '18 minutes ago', '25 minutes ago',
];

// Only show for products that seem "purchasable" (in stock)
const SHOW_PRODUCTS = products.filter((p) => p.stock > 5).slice(0, 20);

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildNotification() {
  const product = pickRandom(SHOW_PRODUCTS);
  return {
    id: Date.now(),
    name: pickRandom(FIRST_NAMES),
    city: pickRandom(CITIES),
    timeAgo: pickRandom(TIME_PHRASES),
    product,
  };
}

const INITIAL_DELAY_MS = 8_000;   // first toast appears after 8s
const INTERVAL_MS = 28_000;        // then every 28s
const TOAST_DURATION_MS = 6_000;   // each toast visible for 6s

export default function SocialProofToast() {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const showNext = useCallback(() => {
    const notif = buildNotification();
    setNotification(notif);
    setVisible(true);

    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    // Initial delay before first toast
    timerRef.current = setTimeout(() => {
      showNext();
      // Then repeat on an interval
      timerRef.current = setInterval(showNext, INTERVAL_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, [showNext]);

  function dismiss() {
    setVisible(false);
    clearTimeout(hideTimerRef.current);
  }

  if (!notification) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-50 max-w-[320px] w-full
        transition-all duration-500 ease-in-out
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      role="status"
      aria-live="polite"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex items-center gap-3 p-3 pr-4">
        {/* Product thumbnail */}
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          {notification.product.images?.[0] ? (
            <Image
              src={notification.product.images[0]}
              alt={notification.product.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {notification.product.emoji}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-800 leading-snug">
            <span className="font-bold">{notification.name}</span>
            {' '}from{' '}
            <span className="font-semibold">{notification.city}</span>
            {' '}purchased
          </p>
          <p className="text-xs font-bold text-navy-900 truncate mt-0.5">
            {notification.product.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Verified Purchase
            </span>
            <span className="text-[10px] text-gray-400">{notification.timeAgo}</span>
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors ml-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
