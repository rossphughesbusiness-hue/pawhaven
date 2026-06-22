'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const NEXT_REWARD_AT = 100;

/**
 * Shown on the success page. Fetches the customer's PawPoints balance
 * from Redis (via /api/loyalty) using the email from the Stripe session.
 */
export default function LoyaltyWidget() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }

    // Fetch the order summary to get the customer email
    fetch(`/api/order-summary?session_id=${sessionId}`)
      .then((r) => r.json())
      .then(async ({ email }) => {
        if (!email) { setLoading(false); return; }
        const res = await fetch(`/api/loyalty?email=${encodeURIComponent(email)}`);
        const json = await res.json();
        setData({ ...json, email });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading || !data || data.points === undefined) return null;

  const { points, totalEarned } = data;
  const pct = Math.min(100, Math.round((points / NEXT_REWARD_AT) * 100));
  const remaining = NEXT_REWARD_AT - points;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-3xl p-6 mt-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">
          ⭐
        </div>
        <div>
          <h3 className="font-black text-navy-900 text-base leading-tight">PawPoints Rewards</h3>
          <p className="text-xs text-gray-500">Earn 1 point per $1 spent · 100 points = $10 off</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs font-semibold mb-1.5">
          <span className="text-amber-700">
            <span className="text-lg font-black text-amber-600">{points}</span> / {NEXT_REWARD_AT} pts
          </span>
          <span className="text-gray-400">{remaining} more for $10 off</span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-700 bg-gradient-to-r from-amber-400 to-orange-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100">
        <div className="text-center">
          <div className="text-xl font-black text-navy-900">{points}</div>
          <div className="text-xs text-gray-500">Current Balance</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-navy-900">{NEXT_REWARD_AT - points}</div>
          <div className="text-xs text-gray-500">Until Reward</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-black text-navy-900">{totalEarned}</div>
          <div className="text-xs text-gray-500">Total Earned</div>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4">
        Keep shopping to earn your <strong className="text-amber-600">$10 reward</strong>. Points never expire. 🐾
      </p>
    </div>
  );
}
