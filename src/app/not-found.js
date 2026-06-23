import Link from 'next/link';
import { products } from '@/lib/products';

export const metadata = { title: 'Page Not Found — PawHaven' };

const popular = [...products]
  .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
  .slice(0, 3);

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="text-7xl mb-4">🐾</div>
      <h1 className="text-6xl font-black text-navy-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-navy-700 mb-3">Oops — this page ran away!</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10">
        The page you're looking for doesn't exist (maybe your pet knocked it off the table).
        Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-16">
        <Link
          href="/"
          className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          Shop All Products
        </Link>
        <Link
          href="/quiz"
          className="border-2 border-navy-200 text-navy-700 hover:border-brand-400 hover:text-brand-500 font-bold px-6 py-3 rounded-full transition-colors"
        >
          ✨ Take the Quiz
        </Link>
      </div>

      {/* Popular products */}
      <div className="w-full max-w-xl">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Right Now</p>
        <div className="grid grid-cols-3 gap-3">
          {popular.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group bg-gray-50 hover:bg-brand-50 rounded-2xl p-3 text-center transition-colors border border-transparent hover:border-brand-100"
            >
              <div className="text-2xl mb-1">{p.emoji}</div>
              <p className="text-xs font-bold text-navy-900 group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug">
                {p.name}
              </p>
              <p className="text-brand-500 font-black text-xs mt-1">${p.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
