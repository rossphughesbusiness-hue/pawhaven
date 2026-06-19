'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import TrustBadges from '@/components/TrustBadges';

function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-0">
      {/* Product thumbnail */}
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            {item.emoji}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-bold text-navy-900 hover:text-brand-500 transition-colors line-clamp-1"
        >
          {item.name}
        </Link>
        <div className="text-brand-500 font-semibold text-sm mt-0.5">
          ${item.price.toFixed(2)} each
        </div>
        {item.variants && Object.keys(item.variants).length > 0 && (
          <div className="text-gray-400 text-xs mt-0.5">
            {Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(' · ')}
          </div>
        )}

        {/* Qty controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQty(item.id, item.quantity - 1)}
              className="px-3 py-1 text-navy-700 hover:bg-gray-100 transition-colors font-bold"
            >
              −
            </button>
            <span className="px-3 py-1 font-bold text-navy-900 text-sm min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.id, item.quantity + 1)}
              className="px-3 py-1 text-navy-700 hover:bg-gray-100 transition-colors font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors text-sm ml-2"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right flex-shrink-0">
        <div className="font-black text-navy-900 text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, itemCount, subtotal, shipping, total, amountToFreeShipping, clearCart } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  async function handleCheckout() {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError('Something went wrong. Please try again.');
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutError('Something went wrong. Please try again.');
      setCheckoutLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-7xl mb-6">🛒</div>
          <h1 className="text-3xl font-black text-navy-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything yet. Your pet is waiting!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40"
          >
            Start Shopping
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-navy-900 mb-2">Your Cart</h1>
        <p className="text-gray-500 mb-10">
          {itemCount} item{itemCount !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart items */}
          <div className="lg:col-span-2">
            {/* Free shipping progress */}
            {amountToFreeShipping > 0 && (
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-6">
                <p className="text-brand-700 text-sm font-semibold mb-2">
                  🚚 Add <span className="font-black">${amountToFreeShipping.toFixed(2)}</span> more for FREE shipping!
                </p>
                <div className="w-full bg-brand-100 rounded-full h-2">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {amountToFreeShipping === 0 && subtotal > 0 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
                <p className="text-emerald-700 text-sm font-semibold">
                  🎉 You've unlocked free shipping!
                </p>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <button
                onClick={clearCart}
                className="mt-4 text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear cart
              </button>
            </div>

            {/* Continue shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600 font-semibold mt-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-black text-navy-900 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-navy-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : 'text-navy-900'}`}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-black text-navy-900 text-lg">Total</span>
                <span className="font-black text-navy-900 text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 active:scale-95"
            >
              {checkoutLoading ? 'Redirecting to Checkout…' : 'Proceed to Checkout →'}
            </button>

            {checkoutError && (
              <p className="text-red-500 text-sm text-center mt-2">{checkoutError}</p>
            )}

            <p className="text-center text-xs text-gray-400 mt-4">
              🔒 Secure checkout powered by Stripe
            </p>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <TrustBadges />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
