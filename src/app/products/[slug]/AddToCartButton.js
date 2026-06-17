'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variants = product.variants || [];
  const [selected, setSelected] = useState(() =>
    Object.fromEntries(variants.map((v) => [v.type, v.options[0]]))
  );

  const missingVariant = variants.find((v) => !selected[v.type]);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        gradientFrom: product.gradientFrom,
        gradientTo: product.gradientTo,
        variants: selected,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Variant selectors */}
      {variants.map((v) => (
        <div key={v.type}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-navy-700">{v.type}:</span>
            <span className="text-sm text-gray-500">{selected[v.type]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {v.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected((s) => ({ ...s, [v.type]: opt }))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  selected[v.type] === opt
                    ? 'border-brand-500 bg-brand-50 text-brand-600'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Qty selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-navy-700">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-navy-700 hover:bg-gray-100 transition-colors font-bold text-lg"
          >
            −
          </button>
          <span className="px-4 py-2 font-bold text-navy-900 min-w-[2.5rem] text-center">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="px-4 py-2 text-navy-700 hover:bg-gray-100 transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAdd}
        disabled={!!missingVariant}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 ${
          added
            ? 'bg-emerald-500 text-white'
            : 'bg-brand-500 hover:bg-brand-400 text-white hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5'
        }`}
      >
        {added ? '✓ Added to Cart!' : `Add to Cart — $${(product.price * qty).toFixed(2)}`}
      </button>

      {/* Buy now */}
      <button
        onClick={handleAdd}
        disabled={!!missingVariant}
        className="w-full py-4 rounded-2xl font-bold text-lg bg-navy-900 hover:bg-navy-800 text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        Buy Now
      </button>
    </div>
  );
}
