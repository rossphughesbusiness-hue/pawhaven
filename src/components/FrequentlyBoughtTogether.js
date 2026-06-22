'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function PlusIcon() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
      +
    </div>
  );
}

function ProductThumb({ product, checked, onToggle }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${checked ? 'border-brand-400 bg-brand-50' : 'border-gray-100 bg-white'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4 accent-orange-500 flex-shrink-0 cursor-pointer"
      />
      <Link href={`/products/${product.slug}`} className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.slug}`} className="font-semibold text-navy-900 text-xs leading-snug hover:text-brand-500 transition-colors line-clamp-2 block">
          {product.name}
        </Link>
        <div className="text-brand-500 font-bold text-sm mt-0.5">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default function FrequentlyBoughtTogether({ mainProduct, companions }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState(
    // main product is always checked; companions checked by default
    new Set([mainProduct.id, ...companions.map((p) => p.id)])
  );
  const [added, setAdded] = useState(false);

  if (companions.length === 0) return null;

  const allProducts = [mainProduct, ...companions];
  const selectedProducts = allProducts.filter((p) => selected.has(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  function toggle(id) {
    if (id === mainProduct.id) return; // main product always stays selected
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addAll() {
    selectedProducts.forEach((p) => {
      addItem({
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        emoji: p.emoji,
      });
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-16 pt-16 border-t border-gray-100">
      <h2 className="text-2xl font-black text-navy-900 mb-6">Frequently Bought Together</h2>

      {/* Product row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {allProducts.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3 flex-1 min-w-0">
            {i > 0 && <PlusIcon />}
            <div className="flex-1 min-w-0">
              <ProductThumb
                product={p}
                checked={selected.has(p.id)}
                onToggle={() => toggle(p.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total + CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 rounded-2xl p-5">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-0.5">
            {selectedProducts.length} item{selectedProducts.length !== 1 ? 's' : ''} selected
          </div>
          <div className="text-2xl font-black text-navy-900">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <button
          onClick={addAll}
          disabled={selectedProducts.length === 0}
          className={`flex-shrink-0 px-7 py-3.5 rounded-2xl font-black text-base transition-all duration-200 active:scale-95 ${
            added
              ? 'bg-emerald-500 text-white'
              : 'bg-brand-500 hover:bg-brand-400 text-white hover:shadow-xl hover:shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {added ? '✓ Added to Cart!' : `Add ${selectedProducts.length > 1 ? 'All' : ''} to Cart →`}
        </button>
      </div>
    </div>
  );
}
