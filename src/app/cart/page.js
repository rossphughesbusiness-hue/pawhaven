'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { trackBeginCheckout } from '@/lib/analytics';
import TrustBadges from '@/components/TrustBadges';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { products } from '@/lib/products';

function CartUpsell({ cartItems }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState({});

  const cartIds = new Set(cartItems.map((i) => i.id));
  // Pick up to 3 products not in cart, sorted by soldCount desc
  const suggestions = products
    .filter((p) => !cartIds.has(p.id))
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 3);

  if (suggestions.length === 0) return null;

  function quickAdd(p) {
    addItem({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      emoji: p.emoji,
      image: p.images?.[0] || null,
      gradientFrom: p.gradientFrom,
      gradientTo: p.gradientTo,
      supplierProductId: p.supplierProductId || null,
      variants: {},
    });
    setAdded((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [p.id]: false })), 2000);
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-black text-navy-900 mb-4">🐾 Frequently Bought Together</h2>
      <div className="space-y-3">
        {suggestions.map((p) => (
          <div key={p.id} className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
            <Link href={`/products/${p.slug}`} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 block">
              {p.images?.[0] ? (
                <Image src={p.images[0]} alt={p.name} fill sizes="64px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">{p.emoji}</div>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${p.slug}`} className="font-bold text-navy-900 text-sm hover:text-brand-500 transition-colors line-clamp-1">
                {p.name}
              </Link>
              <div className="text-brand-500 font-semibold text-sm">${p.price.toFixed(2)}</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={`w-3 h-3 ${s <= Math.round(p.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-400 text-xs ml-1">({p.reviewCount})</span>
              </div>
            </div>
            <button
              onClick={() => quickAdd(p)}
              disabled={added[p.id]}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                added[p.id]
                  ? 'bg-emerald-500 text-white'
                  : 'bg-brand-500 hover:bg-brand-400 text-white hover:shadow-lg hover:shadow-brand-500/30'
              }`}
            >
              {added[p.id] ? '✓ Added' : '+ Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { id, code, percentOff, amountOff, name }
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState(null);

  const discount = appliedCoupon
    ? appliedCoupon.percentOff
      ? subtotal * (appliedCoupon.percentOff / 100)
      : Math.min(appliedCoupon.amountOff, subtotal)
    : 0;
  const discountedTotal = total - discount;

  async function applyCoupon() {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const res = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || 'Invalid coupon code');
      } else {
        setAppliedCoupon(data);
        setCouponInput('');
        setCouponError(null);
      }
    } catch {
      setCouponError('Could not validate coupon. Please try again.');
    } finally {
      setCouponLoading(false);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponError(null);
  }

  // Called by ExitIntentPopup to auto-apply a code
  async function applyExitCoupon(code) {
    if (appliedCoupon) return; // already have a coupon
    setCouponLoading(true);
    setCouponError(null);
    try {
      const res = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok) setAppliedCoupon(data);
    } catch {}
    finally { setCouponLoading(false); }
  }

  function handleCheckout() {
    setCheckoutLoading(true);
    trackBeginCheckout(items, discountedTotal);
    // Save coupon to sessionStorage so the upsell page can access it
    try {
      if (appliedCoupon?.id) {
        sessionStorage.setItem('ph_promo_id', appliedCoupon.id);
        sessionStorage.setItem('ph_promo_code', appliedCoupon.code || '');
      } else {
        sessionStorage.removeItem('ph_promo_id');
        sessionStorage.removeItem('ph_promo_code');
      }
    } catch {}
    router.push('/checkout/upsell');
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <ExitIntentPopup />
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
      <ExitIntentPopup onApplyCoupon={applyExitCoupon} />
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

            {/* Upsell */}
            <CartUpsell cartItems={items} />
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
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span className="font-semibold">
                    Coupon ({appliedCoupon.code})
                    {appliedCoupon.percentOff ? ` −${appliedCoupon.percentOff}%` : ''}
                  </span>
                  <span className="font-semibold">−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-black text-navy-900 text-lg">Total</span>
                <span className="font-black text-navy-900 text-xl">${discountedTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon code */}
            <div className="mb-5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">🏷 {appliedCoupon.code}</span>
                    <span className="text-emerald-600 text-xs">
                      {appliedCoupon.percentOff
                        ? `${appliedCoupon.percentOff}% off`
                        : `$${appliedCoupon.amountOff.toFixed(2)} off`}
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-400 hover:text-emerald-700 text-xs font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponError(null); }}
                      onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                      placeholder="Coupon code"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-900 placeholder-gray-400 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-2.5 bg-navy-900 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      {couponLoading ? '…' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{couponError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 active:scale-95"
            >
              {checkoutLoading ? 'Redirecting to Checkout…' : 'Proceed to Checkout →'}
            </button>



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
