'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import WishlistButton from './WishlistButton';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 ${
            star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e) {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const savings = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 shadow-sm">
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full z-10`}
            >
              {product.badge}
            </div>
          )}

          {/* Savings badge */}
          {savings > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              -{savings}%
            </div>
          )}

          {/* Product photo */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Stock warning */}
          {product.stock < 30 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
              <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full border border-red-100">
                Only {product.stock} left!
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-brand-500 font-semibold uppercase tracking-wide">
              {product.tag}
            </span>
            <WishlistButton product={product} size="sm" />
          </div>

          <h3 className="font-bold text-navy-900 text-base mb-2 group-hover:text-brand-600 transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 font-medium">
              {product.rating} ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-navy-900">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-3 w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              added
                ? 'bg-emerald-500 text-white scale-95'
                : 'bg-navy-900 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/30 active:scale-95'
            }`}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
