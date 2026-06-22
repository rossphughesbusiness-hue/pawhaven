'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

const KEY = 'ph_recently_viewed';
const MAX = 8;

export function trackView(productId) {
  if (typeof window === 'undefined') return;
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
    const updated = [productId, ...stored.filter((id) => id !== productId)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {}
}

export default function RecentlyViewed({ currentId }) {
  const [recentIds, setRecentIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
      setRecentIds(stored.filter((id) => id !== currentId));
    } catch {}
  }, [currentId]);

  const recent = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-black text-navy-900 mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {recent.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              {p.images?.[0] ? (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">{p.emoji}</div>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-navy-900 line-clamp-2 leading-snug mb-1">{p.name}</p>
              <p className="text-brand-500 font-black text-sm">${p.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
