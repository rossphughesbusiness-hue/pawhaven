'use client';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();

  const wishlisted = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-black text-navy-900">
            Your Wishlist
            {wishlisted.length > 0 && (
              <span className="ml-3 text-lg font-semibold text-gray-400">
                ({wishlisted.length} {wishlisted.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Save products to come back to later.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlisted.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-2xl font-black text-navy-900 mb-2">Nothing saved yet</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              href="/products"
              className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <>
            {/* Quick clear */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => ids.forEach((id) => toggle(id))}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {wishlisted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* CTA strip */}
            <div className="mt-16 text-center">
              <Link
                href="/products"
                className="text-brand-500 font-semibold text-sm hover:underline"
              >
                ← Keep shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
