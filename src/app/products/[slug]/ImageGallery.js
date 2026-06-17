'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ product }) {
  const images = product.images?.length >= 2
    ? product.images
    : [product.image, product.image, product.image];

  const savings = product.comparePrice
    ? (product.comparePrice - product.price).toFixed(2)
    : null;

  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-3xl aspect-square overflow-hidden bg-gray-50">
        {product.badge && (
          <div className={`absolute top-5 left-5 ${product.badgeColor} text-white text-sm font-bold px-3 py-1.5 rounded-full z-10`}>
            {product.badge}
          </div>
        )}
        {savings && (
          <div className="absolute top-5 right-5 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full z-10">
            Save ${savings}
          </div>
        )}
        <Image
          src={images[active]}
          alt={`${product.name} — view ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-200"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 mt-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all focus:outline-none ${
              i === active
                ? 'border-brand-500 shadow-md shadow-brand-500/20'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={src}
              alt={`${product.name} thumbnail ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
