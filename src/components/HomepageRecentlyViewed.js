'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

const KEY = 'ph_recently_viewed';

export default function HomepageRecentlyViewed() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem(KEY) || '[]');
      const resolved = ids
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 6);
      setRecent(resolved);
    } catch {}
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-navy-900">Pick Up Where You Left Off</h2>
            <p className="text-gray-500 text-sm mt-1">Your recently viewed products</p>
          </div>
          <Link
            href="/products"
            className="text-brand-500 text-sm font-semibold hover:underline underline-offset-2 hidden sm:block"
          >
            Browse all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recent.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group block bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {p.images?.[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {p.emoji}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-navy-900 line-clamp-2 leading-snug mb-1">
                  {p.name}
                </p>
                <p className="text-brand-500 font-black text-sm">${p.price.toFixed(2)}</p>
                {p.comparePrice && (
                  <p className="text-gray-400 text-xs line-through">${p.comparePrice.toFixed(2)}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/products" className="text-brand-500 text-sm font-semibold hover:underline">
            Browse all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
