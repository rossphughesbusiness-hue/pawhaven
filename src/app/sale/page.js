'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

// Only products with a comparePrice (discount)
const saleProducts = [...products]
  .filter((p) => p.comparePrice && p.comparePrice > p.price)
  .sort((a, b) => {
    const savA = (a.comparePrice - a.price) / a.comparePrice;
    const savB = (b.comparePrice - b.price) / b.comparePrice;
    return savB - savA; // highest % savings first
  });

const SALE_END_KEY = 'ph_flash_sale_end';
const SALE_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

function getOrCreateSaleEnd() {
  if (typeof window === 'undefined') return Date.now() + SALE_DURATION_MS;
  try {
    const stored = parseInt(localStorage.getItem(SALE_END_KEY) || '0', 10);
    if (stored > Date.now()) return stored;
    const newEnd = Date.now() + SALE_DURATION_MS;
    localStorage.setItem(SALE_END_KEY, String(newEnd));
    return newEnd;
  } catch {
    return Date.now() + SALE_DURATION_MS;
  }
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function Countdown() {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const endTime = getOrCreateSaleEnd();

    function tick() {
      const remaining = Math.max(0, endTime - Date.now());
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      setTime({ h: pad(h), m: pad(m), s: pad(s) });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 justify-center">
      {[
        { value: time.h, label: 'HRS' },
        { value: time.m, label: 'MIN' },
        { value: time.s, label: 'SEC' },
      ].map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[64px]">
            <div className="text-3xl font-black text-white tabular-nums leading-none">{value}</div>
            <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">{label}</div>
          </div>
          {i < 2 && <span className="text-white/60 text-2xl font-black">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function SalePage() {
  const totalSavings = saleProducts.reduce(
    (sum, p) => sum + (p.comparePrice - p.price),
    0
  );
  const maxSavingsPct = Math.round(
    Math.max(...saleProducts.map((p) => ((p.comparePrice - p.price) / p.comparePrice) * 100))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Flash Sale — Limited Time
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-3 leading-tight">
            Up to {maxSavingsPct}% Off 🔥
          </h1>
          <p className="text-white/80 text-lg mb-8">
            {saleProducts.length} products on sale · Combined savings of ${totalSavings.toFixed(0)}+
          </p>
          <div className="mb-6">
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-widest">
              Sale ends in
            </p>
            <Countdown />
          </div>
          <p className="text-white/60 text-xs">
            Use code{' '}
            <span className="font-black text-white bg-white/20 px-2 py-0.5 rounded-lg">
              WELCOME10
            </span>{' '}
            for an extra 10% off your first order
          </p>
        </div>
      </div>

      {/* Sale products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-navy-900">
              {saleProducts.length} Sale Items
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">Sorted by biggest savings</p>
          </div>
          <Link
            href="/products"
            className="text-brand-500 text-sm font-semibold hover:underline"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {saleProducts.map((p) => (
            <div key={p.id} className="relative">
              {/* Savings badge overlay */}
              <div className="absolute -top-2 -left-2 z-10 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                -{Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)}%
              </div>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 text-center">
          <p className="text-2xl font-black text-navy-900 mb-2">Still looking?</p>
          <p className="text-gray-500 mb-6 text-sm">
            Take our pet quiz to find the perfect product for your pet's specific needs.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-3 rounded-full transition-colors"
          >
            ✨ Find My Pet's Perfect Match
          </Link>
        </div>
      </div>
    </div>
  );
}
