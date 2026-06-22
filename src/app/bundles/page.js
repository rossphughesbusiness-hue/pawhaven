import Image from 'next/image';
import Link from 'next/link';
import { getBundles } from '@/lib/bundles';
import BundleCheckoutButton from './BundleCheckoutButton';

export const metadata = {
  title: 'Bundle Deals — PawHaven',
  description: 'Save up to 19% with our curated pet bundles. Hand-picked product combinations at exclusive bundle pricing.',
  alternates: { canonical: 'https://pawhavenpets.org/bundles' },
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 flex-shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function BundlesPage() {
  const bundles = getBundles();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-brand-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Exclusive Bundle Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            Save More, Spoil More 🐾
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Hand-picked product combinations your pet will love — at up to 19% off individual prices.
          </p>
        </div>
      </div>

      {/* Bundles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {bundles.map((bundle, idx) => (
          <div
            key={bundle.id}
            className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Bundle header */}
            <div
              className="px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ background: bundle.gradient }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{bundle.emoji}</span>
                  <h2 className="text-2xl font-black text-navy-900">{bundle.name}</h2>
                </div>
                <p className="text-gray-600 text-sm">{bundle.tagline}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div
                  className="inline-block text-white text-sm font-bold px-4 py-1.5 rounded-full mb-1"
                  style={{ backgroundColor: bundle.accentColor }}
                >
                  Save {bundle.savingsPct}% — ${bundle.savings.toFixed(2)} off
                </div>
                <div className="text-xs text-gray-500">vs. buying individually</div>
              </div>
            </div>

            {/* Products grid */}
            <div className="bg-white px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {bundle.products.map((product, pIdx) => (
                  <div key={product.id} className="flex flex-col items-center text-center">
                    {/* Product image */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3 max-w-[180px]">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="180px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          {product.emoji}
                        </div>
                      )}
                    </div>

                    {/* Connector dot/plus */}
                    {pIdx < bundle.products.length - 1 && (
                      <div
                        className="hidden sm:block absolute"
                        aria-hidden="true"
                      />
                    )}

                    <Link
                      href={`/products/${product.slug}`}
                      className="font-bold text-navy-900 text-sm hover:text-brand-500 transition-colors line-clamp-2 mb-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="font-black text-sm" style={{ color: bundle.accentColor }}>
                        ${bundle.itemPrices[product.id].toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Plus connectors between products */}
              <div className="hidden sm:flex justify-around -mt-4 mb-4 px-[calc(100%/6)]">
                {bundle.products.slice(0, -1).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg flex-shrink-0"
                  >
                    +
                  </div>
                ))}
              </div>

              {/* Pricing summary + CTA */}
              <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-400 text-lg line-through">
                      ${bundle.originalTotal.toFixed(2)}
                    </span>
                    <span className="text-3xl font-black text-navy-900">
                      ${bundle.bundleTotal.toFixed(2)}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${bundle.accentColor}20`, color: bundle.accentColor }}
                    >
                      -{bundle.savingsPct}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                      <CheckIcon /> Free shipping included
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                      <CheckIcon /> 30-day returns
                    </div>
                  </div>
                </div>

                <div className="sm:w-72">
                  <BundleCheckoutButton bundle={bundle} />
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Secure checkout · Free US shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ / reassurance strip */}
      <div className="bg-gray-50 border-t border-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-navy-900 text-center mb-8">
            Bundle FAQ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I mix bundle items with other products?',
                a: "Not in a single order — bundles go through their own checkout. But you can place a separate order for other items anytime.",
              },
              {
                q: 'Are bundle items the same quality as individual listings?',
                a: "Yes — every bundle item is the same product you'd find in our shop, just at an exclusive bundled price.",
              },
              {
                q: 'How fast will my bundle arrive?',
                a: 'Same as individual orders: standard shipping is 5–8 business days, express is 2–3 business days.',
              },
              {
                q: 'Can I return a bundle item separately?',
                a: "Yes — each item in your bundle is covered by our standard 30-day return policy. Contact us and we'll sort it out.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-navy-900 text-sm mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to shop */}
      <div className="text-center py-8">
        <Link
          href="/products"
          className="text-brand-500 font-semibold text-sm hover:underline"
        >
          ← Browse all products
        </Link>
      </div>
    </div>
  );
}
