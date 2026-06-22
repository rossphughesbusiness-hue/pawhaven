'use client';
import { createContext, useContext, useState } from 'react';

const CompareContext = createContext(null);
const MAX = 3;

export function CompareProvider({ children }) {
  const [ids, setIds] = useState([]);

  function toggle(id) {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX) return prev; // already at max
      return [...prev, id];
    });
  }

  function isComparing(id) {
    return ids.includes(id);
  }

  function canAdd(id) {
    return ids.includes(id) || ids.length < MAX;
  }

  function clear() {
    setIds([]);
  }

  return (
    <CompareContext.Provider value={{ ids, toggle, isComparing, canAdd, clear, count: ids.length }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
