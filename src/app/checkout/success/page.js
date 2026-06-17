import Link from 'next/link';

export const metadata = {
  title: 'Order Confirmed — PawHaven',
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-4xl font-black text-navy-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-500 mb-2">
          Thank you for your order. You'll receive a confirmation email shortly.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Your pet accessories are on their way — estimated delivery in 5–8 business days.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40"
        >
          Continue Shopping
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
