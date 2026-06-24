import Link from 'next/link';

export const metadata = {
  title: 'Checkout Cancelled — PawHaven',
};

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-4xl font-black text-navy-900 mb-3">No worries!</h1>
        <p className="text-gray-500 mb-8">
          Your cart is still saved. Head back whenever you\'re ready to complete your order.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40"
          >
            Back to Cart
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-navy-900 font-bold px-8 py-4 rounded-full transition-all duration-200"
          >
            Keep Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
