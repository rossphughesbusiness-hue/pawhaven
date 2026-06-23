'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

const CATEGORIES = ['All', 'Dogs', 'Cats'];
const TAGS = ['All', ...Array.from(new Set(products.map((p) => p.tag))).sort()];

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Best Rated' },
  { value: 'popular',    label: 'Best Selling' },
];

function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating':     return arr.sort((a, b) => b.rating - a.rating);
    case 'popular':    return arr.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
    default:           return arr;
  }
}

export default function ProductsClient() {
  const [category, setCategory] = useState('All');
  const [tag, setTag] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (tag !== 'All')      list = list.filter((p) => p.tag === tag);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.tag?.toLowerCase().includes(q)
      );
    }
    return sortProducts(list, sort);
  }, [category, tag, sort, search]);

  function handleCategory(cat) {
    setCategory(cat);
    setTag('All');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-black text-navy-900 mb-1">
            {category === 'All' ? 'All Products' : `${category} Accessories`}
            {tag !== 'All' && <span className="text-brand-500"> · {tag}</span>}
          </h1>
          <p className="text-gray-500">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Filters bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  category === cat
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-white text-navy-700 border border-gray-200 hover:border-brand-300 hover:text-brand-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">×</button>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Tag chips ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                tag === t
                  ? 'bg-brand-500 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-300 hover:text-brand-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Product grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">No products found</h2>
            <p className="text-gray-500 mb-4">Try a different category or filter.</p>
            <button
              onClick={() => { setCategory('All'); setTag('All'); setSearch(''); }}
              className="text-brand-500 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
