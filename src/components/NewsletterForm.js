'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  }

  if (submitted) {
    return (
      <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 max-w-md mx-auto text-center">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-white font-bold text-lg">You\'re in! Check your inbox.</p>
        <p className="text-gray-400 text-sm mt-1">Your 10% discount code is on its way.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email..."
        required
        className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400 focus:bg-white/15 transition-all"
      />
      <button
        type="submit"
        className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40 whitespace-nowrap active:scale-95"
      >
        Get 10% Off
      </button>
    </form>
  );
}
