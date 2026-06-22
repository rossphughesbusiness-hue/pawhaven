'use client';

import { useState, useEffect } from 'react';

function ReviewCard({ review }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < review.rating ? 'text-amber-400' : 'text-gray-200'}>★</span>
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
        "{review.text}"
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-sm font-bold text-brand-600">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-navy-900 text-sm">{review.name}</div>
          <div className="text-gray-400 text-xs">{review.date} · Verified Purchase</div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicReviews({ slug }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.reviews)) setReviews(data.reviews);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading || reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-black text-navy-900 mb-4">
        Community Reviews ({reviews.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <ReviewCard key={review.ts ?? i} review={review} />
        ))}
      </div>
    </div>
  );
}
