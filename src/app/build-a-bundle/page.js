'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/products';
import { trackAddToCart } from '@/lib/analytics';

// Tiered discount by bundle size
const TIERS = [
  { count: 1, pct: 0,  label: null },
  { count: 2, pct: 10, label: '10% off' },
  { count: 3, pct: 15, label: '15% off' },
  { count: 4, pct: 20, label: '20% off' },
];

const MAX_ITEMS = 4;

function getTier(count) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (count >= TIERS[i].count) return TIERS[i];
  }
  return TIERS[0];
}

function ProgressBar({ count }) {
  const steps = [
    { n: 1, label: 'Pick 1', sub: 'Get started' },
    { n: 2, label: 'Pick 2', sub: '10% off' },
    { n: 3, label: 'Pick 3', sub: '15% off' },
    { n: 4, label: 'Pick 4', sub: '20% off' },
  ];

  return (
    <div className="flex items-center justify-between gap-1 mb-6">
      {steps.map((step, i) => {
        const reached = count >= step.n;
        const active = count === step.n;
        return (
          <div key={step.n} className="flex-1 flex flex-col items-center">
            <div className="w-full flex items-center">
              {i > 0 && (
                <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${reached ? 'bg-brand-500' : 'bg-gray-200'}`} />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 flex-shrink-0
                ${reached ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' : 'bg-gray-100 text-gray-400'}
                ${active ? 'scale-110' : ''}`}>
                {reached && step.n < count ? '✓' : step.n}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${count > step.n ? 'bg-brand-500' : 'bg-gray-200'}`} />
              )}
            </div>
            <div className="mt-1.5 text-center">
              <div className={`text-xs font-bold ${reached ? 'text-brand-500' : 'text-gray-400'}`}>{step.label}</div>
              <div className={`text-xs ${reached && step.n > 1 ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>{step.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BuildABundlePage() {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('All');
  const [adding, setAdding] = useState(false);
  const { dispatch } = useCart();
  const router = useRouter();

  const tier = getTier(selected.length);
  const discountPct = tier.pct;

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

  const isSelected = useCallback((id) => selected.some(p => p.id === id), [selected]);

  function toggle(product) {
    if (isSelected(product.id)) {
      setSelected(prev => prev.filter(p => p.id !== product.id));
    } else {
      if (selected.length >= MAX_ITEMS) return;
      setSelected(prev => [...prev, product]);
    }
  }

  // Original total and discounted total
  const originalTotal = selected.reduce((sum, p) => sum + p.price, 0);
  const discountedTotal = originalTotal * (1 - discountPct / 100);
  const savings = originalTotal - discountedTotal;

  async function addBundleToCart() {
    if (selected.length < 2) return;
    setAdding(true);
    const multiplier = 1 - discountPct / 100;
    for (const product of selected) {
      const discountedPrice = parseFloat((product.price * multiplier).toFixed(2));
      const cartItem = {
        ...product,
        price: discountedPrice,
        bundleDiscount: discountPct,
        name: `${product.name} (Bundle ${discountPct}% off)`,
      };
      dispatch({ type: 'ADD_ITEM', item: cartItem });
      trackAddToCart(product, 1);
    }
    router.push('/cart');
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-brand-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            🎁 Mix & Match Bundle Builder
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Build Your Own Bundle
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto">
            Pick any 2–4 products and save up to <span className="text-emerald-400 font-bold">20% off</span>. More items = bigger discount.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: product picker */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-1">
              {['All', 'Dogs', 'Cats'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    filter === cat
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-300'
                  }`}
                >
                  {cat === 'All' ? '🐾 All' : cat === 'Dogs' ? '🐶 Dogs' : '🐱 Cats'}
                </button>
              ))}
              <span className="text-sm text-gray-400 ml-auto flex-shrink-0">
                {selected.length}/{MAX_ITEMS} selected
              </span>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => {
                const sel = isSelected(product.id);
                const disabled = !sel && selected.length >= MAX_ITEMS;
                const discounted = discountPct > 0 && sel;

                return (
                  <button
                    key={product.id}
                    onClick={() => toggle(product)}
                    disabled={disabled}
                    className={`relative text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden group
                      ${sel
                        ? 'border-brand-500 shadow-lg shadow-brand-500/20 scale-[1.02]'
                        : disabled
                          ? 'border-gray-100 opacity-40 cursor-not-allowed'
                          : 'border-gray-100 hover:border-brand-300 hover:shadow-md bg-white'
                      }`}
                  >
                    {/* Selection badge */}
                    {sel && (
                      <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white text-xs font-black shadow">
                        ✓
                      </div>
                    )}

                    {/* Badge */}
                    {product.badge && !sel && (
                      <div className={`absolute top-2 left-2 z-10 ${product.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                        {product.badge}
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative w-full aspect-square bg-gray-50">
                      <Image
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>

                    {/* Info */}
                    <div className={`p-3 ${sel ? 'bg-brand-50' : 'bg-white'}`}>
                      <div className="text-xs font-bold text-gray-900 leading-snug mb-1 line-clamp-2">
                        {product.shortName || product.name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {discounted ? (
                          <>
                            <span className="text-sm font-black text-brand-500">
                              ${(product.price * (1 - discountPct / 100)).toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-black text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: sticky bundle summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-black text-navy-900 mb-1">Your Bundle</h2>
                <p className="text-sm text-gray-500 mb-5">Add {Math.max(0, 2 - selected.length)} more product{selected.length < 1 ? 's' : selected.length < 2 ? '' : ''} to unlock savings</p>

                {/* Progress */}
                <ProgressBar count={selected.length} />

                {/* Selected items */}
                <div className="space-y-3 mb-5 min-h-[80px]">
                  {selected.length === 0 ? (
                    <div className="text-center text-gray-300 text-sm py-6 border-2 border-dashed border-gray-100 rounded-2xl">
                      Pick products from the left →
                    </div>
                  ) : (
                    selected.map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                          <Image
                            src={p.images?.[0] || p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-gray-900 truncate">{p.shortName || p.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {discountPct > 0 ? (
                              <>
                                <span className="text-xs font-black text-brand-500">
                                  ${(p.price * (1 - discountPct / 100)).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-300 line-through">${p.price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-xs font-bold text-gray-700">${p.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => toggle(p)}
                          className="text-gray-300 hover:text-red-400 text-lg leading-none flex-shrink-0"
                          aria-label="Remove"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                {selected.length >= 2 && (
                  <div className="border-t border-gray-100 pt-4 mb-4 space-y-1.5">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>${originalTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-600 font-bold">
                      <span>Bundle discount ({discountPct}% off)</span>
                      <span>−${savings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-navy-900 pt-1 border-t border-gray-100">
                      <span>Total</span>
                      <span>${discountedTotal.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-400 text-center">Free shipping on orders over $50</div>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={addBundleToCart}
                  disabled={selected.length < 2 || adding}
                  className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-200 ${
                    selected.length >= 2
                      ? 'bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/30 hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {adding
                    ? 'Adding to Cart…'
                    : selected.length < 2
                      ? `Pick ${2 - selected.length} more to unlock`
                      : `Add ${selected.length} Items to Cart${discountPct > 0 ? ` (${discountPct}% off)` : ''}`
                  }
                </button>

                {selected.length >= 2 && (
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-emerald-600 font-semibold">
                    <span>🎉</span>
                    You save ${savings.toFixed(2)} with this bundle!
                  </div>
                )}

                {selected.length < MAX_ITEMS && selected.length > 0 && (
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Add {MAX_ITEMS - selected.length} more product{MAX_ITEMS - selected.length > 1 ? 's' : ''} for {TIERS.find(t => t.count === selected.length + 1)?.pct || 20}% off
                  </p>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: '🚚', text: 'Free shipping $50+' },
                  { icon: '↩️', text: '30-day returns' },
                  { icon: '🔒', text: 'Secure checkout' },
                ].map(b => (
                  <div key={b.text} className="bg-white rounded-xl p-3 border border-gray-100">
                    <div className="text-lg mb-1">{b.icon}</div>
                    <div className="text-[10px] text-gray-500 font-medium leading-tight">{b.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
