'use client';

import { useState, useEffect } from 'react';

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl leading-none transition-transform hover:scale-110 active:scale-95"
          aria-label={`${s} star${s !== 1 ? 's' : ''}`}
        >
          <span className={(hovered || value) >= s ? 'text-amber-400' : 'text-gray-200'}>★</span>
        </button>
      ))}
    </div>
  );
}

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function ReviewForm({ slug, productName }) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  // Auto-open when ?review=1 is in the URL (from review request email)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('review') === '1') {
          setOpen(true);
          // Scroll to form after a brief delay
          setTimeout(() => {
            document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 400);
        }
      }
    } catch {}
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) { setError('Please select a star rating.'); return; }
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, rating, text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('idle');
      } else {
        setStatus('done');
      }
    } catch {
      setError('Could not submit review. Please try again.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div className="mt-8 text-center py-10 bg-emerald-50 rounded-3xl border border-emerald-100">
        <div className="text-4xl mb-3">🎉</div>
        <p className="font-black text-emerald-800 text-lg">Thank you for your review!</p>
        <p className="text-emerald-600 text-sm mt-1">Your feedback helps other pet owners make the right choice.</p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="mt-8 text-center">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-white border-2 border-brand-200 hover:border-brand-400 text-brand-600 hover:text-brand-700 font-bold px-6 py-3 rounded-2xl transition-all duration-200 hover:shadow-md"
        >
          <span className="text-lg">✍️</span>
          Write a Review
        </button>
      </div>
    );
  }

  return (
    <div id="review-form" className="mt-8 bg-gray-50 rounded-3xl border border-gray-100 p-6 sm:p-8">
      <h3 className="text-xl font-black text-navy-900 mb-6">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star rating */}
        <div>
          <label className="block text-sm font-bold text-navy-900 mb-2">Your Rating *</label>
          <div className="flex items-center gap-3">
            <StarPicker value={rating} onChange={setRating} />
            {rating > 0 && (
              <span className="text-sm font-semibold text-amber-600">{LABELS[rating]}</span>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-navy-900 mb-2" htmlFor="review-name">
            Your Name *
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah M."
            maxLength={60}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-navy-900 placeholder-gray-400 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
          />
        </div>

        {/* Review text */}
        <div>
          <label className="block text-sm font-bold text-navy-900 mb-2" htmlFor="review-text">
            Your Review *
          </label>
          <textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Share your experience with the ${productName}…`}
            rows={4}
            minLength={10}
            maxLength={1000}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-400 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
          />
          <div className="text-right text-xs text-gray-400 mt-1">{text.length}/1000</div>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-70 text-white font-black px-7 py-3 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95"
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Review →'}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-400">
          ✓ Reviews are verified and publicly visible. By submitting you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>.
        </p>
      </form>
    </div>
  );
}
