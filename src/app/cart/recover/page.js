'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RecoverCart() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  const [status, setStatus] = useState('loading'); // loading | restoring | error

  useEffect(() => {
    if (!sid) { setStatus('error'); return; }

    async function restore() {
      try {
        const res = await fetch(`/api/cart-recovery?sid=${encodeURIComponent(sid)}`);
        if (!res.ok) { setStatus('error'); return; }
        const { items } = await res.json();

        // Write items into the cart localStorage key
        const cartItems = items.map((item) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          price: item.price,
          image: item.image || null,
          emoji: item.emoji || '🐾',
          quantity: item.quantity,
          variants: item.variants || {},
          supplierProductId: item.supplierProductId || null,
        }));

        try {
          localStorage.setItem('pawhaven-cart', JSON.stringify(cartItems));
        } catch {}

        setStatus('restoring');
        // Small delay so user sees the "Restoring" message before redirect
        setTimeout(() => router.replace('/cart'), 800);
      } catch {
        setStatus('error');
      }
    }

    restore();
  }, [sid, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {status === 'loading' && (
          <>
            <div className="text-6xl mb-5 animate-bounce">🛒</div>
            <h1 className="text-2xl font-black text-navy-900 mb-2">Retrieving your cart…</h1>
            <p className="text-gray-500 text-sm">Just a moment while we restore your items.</p>
          </>
        )}
        {status === 'restoring' && (
          <>
            <div className="text-6xl mb-5">✅</div>
            <h1 className="text-2xl font-black text-navy-900 mb-2">Cart restored!</h1>
            <p className="text-gray-500 text-sm">Taking you back to your cart now…</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-6xl mb-5">😔</div>
            <h1 className="text-2xl font-black text-navy-900 mb-2">Link expired</h1>
            <p className="text-gray-500 text-sm mb-6">
              This cart recovery link has expired (72 hours). Start fresh below!
            </p>
            <a
              href="/products"
              className="inline-block bg-brand-500 hover:bg-brand-400 text-white font-bold px-7 py-3.5 rounded-full transition-all"
            >
              Browse Products →
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function CartRecoverPage() {
  return (
    <Suspense>
      <RecoverCart />
    </Suspense>
  );
}
