'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);
const KEY = 'ph_wishlist';

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
      setIds(stored);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {}
  }, [ids, hydrated]);

  function toggle(id) {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function isWishlisted(id) {
    return ids.includes(id);
  }

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
