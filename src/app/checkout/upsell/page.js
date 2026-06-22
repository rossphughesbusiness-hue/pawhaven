'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/products';

// Upsell discount: 20% off the offer price
const UPSELL_DISCOUNT = 0.20;

// Priority upsell slugs — ordered by margin/complementarity
const UPSELL_PRIORITY = [
  'calming-lick-mat',
  'iq-puzzle-feeder-toy',
  'retractable-pro-dog-leash',
  'feather-wand-cat-teaser',
  'portable-paw-cleaner',
  'crinkle-squeaky-toy-bundle',
  'cat-deshedding-grooming-glove',
  'collapsible-travel-bowl-set',
  'interactive-automatic-laser-toy',
  'self-cleaning-slicker-brush',
];

function pickUpsell(cartItems) {
  const cartIds = new Set(cartItems.map((i) => i.id));
  const cartSlugs = new Set(cartItems.map((i) => i.slug));
  const hasDog = cartItems.some((i) => {
    const p = products.find((p) => p.id === i.id);
    return p?.category === 'Dogs';
  });
  const hasCat = cartItems.some((i) => {
    const p = products.find((p) => p.id === i.id);
    return p?.category === 'Cats';
  });

  // Try priority list first, filtered by pet type if possible
  for (const slug of UPSELL_PRIORITY) {
    if (cartSlugs.has(slug)) continue;
    const product = products.find((p) => p.slug === slug);
    if (!product) continue;
    if (hasDog && !hasCat && product.category === 'Cats') continue;
    if (hasCat && !hasDog && product.category === 'Dogs') continue;
    return product;
  }
  // Fallback: first product not in cart
  return products.find((p) => !cartIds.has(p.id)) || null;
}

export default function UpsellPage() {
  const { items } = useCart();
  const [promoCodeId, setPromoCodeId] = useState(null);
  const router = useRouter();
  const [upsell, setUpsell] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart');
      return;
    }
    setUpsell(pickUpsell(items));
    try {
      const pid = sessionStorage.getItem('ph_promo_id');
      if (pid) setPromoCodeId(pid);
    } catch {}
  }, [items, router]);

  const upsellPrice = upsell ? parseFloat((upsell.price * (1 - UPSELL_DISCOUNT)).toFixed(2)) : 0;
  const savedAmount = upsell ? (upsell.price - upsellPrice).toFixed(2) : '0';

  async function proceed(withUpsell) {
    setLoading(true);
    let checkoutItems = [...items];

    if (withUpsell && upsell) {
      setAccepted(true);
      checkoutItems = [
        ...items,
        {
          id: upsell.id,
          slug: upsell.slug,
          name: upsell.name,
          price: upsellPrice,
          image: upsell.images?.[0] || null,
          emoji: upsell.emoji,
          quantity: 1,
          variants: {},
          supplierProductId: upsell.supplierProductId || null,
        },
      ];
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: checkoutItems, promoCodeId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (!upsell) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  const cartSubtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-400">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">✓</span>
              Cart
            </div>
            <div className="flex-1 h-0.5 bg-brand-500 rounded" />
            <div className="flex items-center gap-1.5 text-sm font-bold text-brand-600">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Special Offer
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 rounded" />
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-400">
              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-xs flex items-center justify-center font-bold">3</span>
              Payment
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        {/* Headline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            ⚡ One-Time Offer — Only Available Now
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-900 mb-3">
            Wait — customers who bought this also grabbed…
          </h1>
          <p className="text-gray-500">
            Add this to your order at a special 20% discount. You won't see this price anywhere else.
          </p>
        </div>

        {/* Offer card */}
        <div className={`bg-white rounded-3xl border-2 shadow-lg overflow-hidden transition-all duration-300 ${accepted ? 'border-emerald-400' : 'border-brand-300'}`}>
          <div className="flex flex-col sm:flex-row">
            {/* Product image */}
            <div className="relative w-full sm:w-56 h-52 sm:h-auto flex-shrink-0 bg-gray-50 overflow-hidden">
              {upsell.images?.[0] ? (
                <Image
                  src={upsell.images[0]}
                  alt={upsell.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">{upsell.emoji}</div>
              )}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                20% OFF
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-6 sm:p-8">
              <div className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">{upsell.tag}</div>
              <h2 className="text-xl font-black text-navy-900 mb-2 leading-tight">{upsell.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{upsell.shortDescription}</p>

              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={s <= Math.round(upsell.rating) ? 'text-amber-400' : 'text-gray-200'}>★</span>
                  ))}
                </div>
                <span className="text-gray-400 text-xs">({upsell.reviewCount.toLocaleString()})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-black text-navy-900">${upsellPrice.toFixed(2)}</span>
                <span className="text-lg text-gray-400 line-through">${upsell.price.toFixed(2)}</span>
                <span className="bg-red-50 text-red-600 text-sm font-bold px-2.5 py-0.5 rounded-full">
                  Save ${savedAmount}
                </span>
              </div>

              {/* Accept CTA */}
              <button
                onClick={() => proceed(true)}
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-70 text-white font-black py-3.5 rounded-2xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95 mb-3"
              >
                {loading && accepted
                  ? 'Adding to order…'
                  : `Yes! Add ${upsell.name.split(' ').slice(0, 3).join(' ')} for $${upsellPrice.toFixed(2)} →`}
              </button>

              <button
                onClick={() => proceed(false)}
                disabled={loading}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors py-1 disabled:opacity-50"
              >
                {loading && !accepted ? 'Going to checkout…' : 'No thanks, continue without this offer'}
              </button>
            </div>
          </div>
        </div>

        {/* Order summary strip */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 px-6 py-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</span>
          <span className="font-black text-navy-900 text-base">${cartSubtotal.toFixed(2)}</span>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Secure checkout powered by Stripe · 30-day hassle-free returns
        </p>
      </div>
    </div>
  );
}
