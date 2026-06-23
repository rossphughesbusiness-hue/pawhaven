'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';

const MAX_RESULTS = 6;

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '');
}

function searchProducts(query) {
  if (!query || query.trim().length < 2) return [];
  const q = normalize(query.trim());
  const tokens = q.split(' ').filter(Boolean);

  return products
    .map((p) => {
      const haystack = normalize(
        `${p.name} ${p.shortDescription || ''} ${p.category} ${p.tag || ''}`
      );
      const score = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
      return { product: p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // Exact name match gets priority
      const aName = normalize(a.product.name).includes(q) ? 1 : 0;
      const bName = normalize(b.product.name).includes(q) ? 1 : 0;
      return bName - aName || b.score - a.score || (b.product.soldCount || 0) - (a.product.soldCount || 0);
    })
    .slice(0, MAX_RESULTS)
    .map(({ product }) => product);
}

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setActiveIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search on query change
  useEffect(() => {
    setResults(searchProducts(query));
    setActiveIdx(-1);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navigate = useCallback(
    (slug) => {
      router.push(`/products/${slug}`);
      onClose();
    },
    [router, onClose]
  );

  function handleKeyDown(e) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIdx >= 0) {
        navigate(results[activeIdx].slug);
      } else if (results.length > 0) {
        navigate(results[0].slug);
      }
    }
  }

  if (!isOpen) return null;

  const popular = [...products]
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal panel */}
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: '80vh' }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-navy-900 text-base outline-none placeholder-gray-400 bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium ml-2"
          >
            Esc
          </button>
        </div>

        {/* Results area */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 73px)' }}>
          {query.length >= 2 ? (
            results.length > 0 ? (
              <ul role="listbox">
                {results.map((p, idx) => (
                  <li
                    key={p.id}
                    role="option"
                    aria-selected={idx === activeIdx}
                  >
                    <button
                      onClick={() => navigate(p.slug)}
                      className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                        idx === activeIdx ? 'bg-brand-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {p.images?.[0] ? (
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            {p.emoji}
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy-900 text-sm truncate">{p.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.category} · {p.tag}</p>
                      </div>
                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-black text-brand-500 text-sm">${p.price.toFixed(2)}</p>
                        {p.comparePrice && (
                          <p className="text-gray-400 text-xs line-through">${p.comparePrice.toFixed(2)}</p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-10 text-center">
                <p className="text-3xl mb-3">🔍</p>
                <p className="text-navy-900 font-semibold text-sm">No results for "{query}"</p>
                <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
              </div>
            )
          ) : (
            /* Default: popular products */
            <div className="px-5 py-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Popular Products
              </p>
              <ul>
                {popular.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => navigate(p.slug)}
                      className="w-full flex items-center gap-3 py-2.5 text-left hover:bg-gray-50 rounded-xl px-2 transition-colors group"
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {p.images?.[0] ? (
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">{p.emoji}</div>
                        )}
                      </div>
                      <span className="text-sm text-navy-800 font-medium group-hover:text-brand-500 transition-colors flex-1 min-w-0 truncate">
                        {p.name}
                      </span>
                      <span className="text-sm font-bold text-brand-500">${p.price.toFixed(2)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => { router.push('/products'); onClose(); }}
                  className="w-full text-center text-brand-500 text-sm font-semibold hover:text-brand-600 transition-colors"
                >
                  View all products →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
