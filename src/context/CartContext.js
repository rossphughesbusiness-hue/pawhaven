'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 50;

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case 'UPDATE_QTY': {
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.qty } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Persist to localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pawhaven-cart');
      if (stored) {
        dispatch({ type: 'LOAD_CART', items: JSON.parse(stored) });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pawhaven-cart', JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  function addItem(item) {
    dispatch({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE_ITEM', id });
  }

  function updateQty(id, qty) {
    dispatch({ type: 'UPDATE_QTY', id, qty });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        shipping,
        total,
        amountToFreeShipping,
        addItem,
        removeItem,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
