import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import ClearCart from './ClearCart';
import PurchaseEvents from './PurchaseEvents';
import TrackOrderLink from './TrackOrderLink';
import ReferralWidget from '@/components/ReferralWidget';

export const metadata = {
  title: 'Order Confirmed — PawHaven',
};

// Pick the 4 best-sellers for the upsell grid
const upsellProducts = [...products]
  .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
  .slice(0, 4);

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client components: clear cart + fire pixel purchase events */}
      <ClearCart />
      <Suspense fallback={null}>
        <PurchaseEvents />
      </Suspense>

      {/* Confirmation hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-navy-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 mb-1">
            Thank you for your order. A confirmation email is on its way to your inbox.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Estimated delivery: 5–8 business days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40"
            >
              Continue Shopping →
            </Link>
            <Suspense fallback={null}>
              <TrackOrderLink />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Referral widget */}
      <div className="max-w-xl mx-auto px-4 -mt-6">
        <Suspense fallback={null}>
          <ReferralWidget />
        </Suspense>
      </div>

      {/* Post-purchase upsell */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2">While you wait…</p>
          <h2 className="text-2xl font-black text-navy-900">Treat them to a little more 🐾</h2>
          <p className="text-gray-500 text-sm mt-2">
            Our best-sellers — loved by 10,000+ pet owners.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {upsellProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {p.comparePrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    -{Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="font-bold text-navy-900 text-sm leading-snug mb-1 group-hover:text-brand-500 transition-colors line-clamp-2">
                  {p.name}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-amber-400 text-xs">{'★'.repeat(Math.round(p.rating))}</span>
                  <span className="text-gray-400 text-xs">({p.reviewCount.toLocaleString()})</span>
                </div>
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="font-black text-navy-900">${p.price.toFixed(2)}</span>
                  {p.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">${p.comparePrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-brand-500 font-semibold hover:underline text-sm"
          >
            ✨ Not sure what to get? Take the Pet Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
