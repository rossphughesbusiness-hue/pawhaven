'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AddBtn({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  function handle() {
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, emoji: product.emoji });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  return (
    <button
      onClick={handle}
      className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${added ? 'bg-emerald-500 text-white' : 'bg-navy-900 hover:bg-brand-500 text-white'}`}
    >
      {added ? '✓ Added!' : 'Add to Cart'}
    </button>
  );
}

// Row definition: label, render fn (receives product)
const ROWS = [
  { label: 'Image', key: 'image', render: (p) => (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50">
      {p.images?.[0]
        ? <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 768px) 33vw, 25vw" className="object-cover" />
        : <div className="w-full h-full flex items-center justify-center text-5xl">{p.emoji}</div>}
    </div>
  )},
  { label: 'Name', key: 'name', render: (p) => (
    <Link href={`/products/${p.slug}`} className="font-black text-navy-900 hover:text-brand-500 transition-colors text-sm text-center block">
      {p.name}
    </Link>
  )},
  { label: 'Price', key: 'price', render: (p) => (
    <div className="text-center">
      <div className="text-2xl font-black text-navy-900">${p.price.toFixed(2)}</div>
      {p.comparePrice && <div className="text-sm text-gray-400 line-through">${p.comparePrice.toFixed(2)}</div>}
    </div>
  )},
  { label: 'Rating', key: 'rating', render: (p) => (
    <div className="text-center">
      <StarRow rating={p.rating} />
      <div className="text-xs text-gray-500 mt-1">{p.rating} · {p.reviewCount.toLocaleString()} reviews</div>
    </div>
  )},
  { label: 'Category', key: 'category', render: (p) => <div className="text-center text-sm text-gray-600">{p.category}</div> },
  { label: 'Type', key: 'tag', render: (p) => (
    <span className="inline-block text-xs font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded-full">{p.tag}</span>
  )},
  { label: 'In Stock', key: 'stock', render: (p) => (
    <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full ${p.stock > 20 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
      {p.stock > 20 ? '✓ In Stock' : `Only ${p.stock} left`}
    </span>
  )},
  { label: 'Ships In', key: 'shipping', render: (p) => <div className="text-center text-sm text-gray-600">{p.shippingDays}</div> },
  { label: 'Action', key: 'action', render: (p) => <AddBtn product={p} /> },
];

function CompareContent() {
  const searchParams = useSearchParams();
  const rawIds = searchParams.get('ids') || '';
  const ids = rawIds.split(',').map(Number).filter(Boolean);
  const selected = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (selected.length < 2) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="text-5xl mb-4">⚖️</div>
        <h1 className="text-2xl font-black text-navy-900 mb-3">Select products to compare</h1>
        <p className="text-gray-500 mb-6 max-w-sm">Use the "Compare" button on any product card to select 2–3 products, then click "Compare" to see them side by side.</p>
        <Link href="/products" className="bg-brand-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-400 transition-colors">Browse Products</Link>
      </div>
    );
  }

  const colWidth = selected.length === 2 ? 'w-1/2' : 'w-1/3';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-navy-900">Compare Products</h1>
              <p className="text-gray-500 text-sm mt-0.5">Comparing {selected.length} products side by side</p>
            </div>
            <Link href="/products" className="text-brand-500 text-sm font-semibold hover:underline">
              ← Back to shop
            </Link>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {ROWS.map((row, rowIdx) => (
            <div
              key={row.key}
              className={`flex border-b border-gray-50 last:border-0 ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              {/* Label cell */}
              <div className="w-28 sm:w-36 flex-shrink-0 px-4 py-4 flex items-center border-r border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{row.label}</span>
              </div>

              {/* Product cells */}
              {selected.map((p) => (
                <div key={p.id} className={`${colWidth} px-4 py-4 flex items-center justify-center border-r border-gray-100 last:border-0`}>
                  {row.render(p)}
                </div>
              ))}
            </div>
          ))}

          {/* Features comparison */}
          <div className={`flex border-t border-gray-100 bg-gray-50/50`}>
            <div className="w-28 sm:w-36 flex-shrink-0 px-4 py-4 flex items-start border-r border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Features</span>
            </div>
            {selected.map((p) => (
              <div key={p.id} className={`${colWidth} px-4 py-4 border-r border-gray-100 last:border-0`}>
                <ul className="space-y-1.5">
                  {(p.features || []).map((f) => (
                    <li key={f.title} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="flex-shrink-0">{f.icon}</span>
                      <span><span className="font-semibold">{f.title}</span> — {f.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Links back */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {selected.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="text-brand-500 text-sm font-semibold hover:underline"
            >
              See full details: {p.name} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading comparison…</div></div>}>
      <CompareContent />
    </Suspense>
  );
}
