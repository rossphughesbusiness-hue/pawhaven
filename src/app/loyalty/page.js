'use client';
import { useState } from 'react';
import Link from 'next/link';

const HOW_IT_WORKS = [
  { icon: '🛍️', title: 'Shop PawHaven', desc: 'Earn 1 PawPoint for every $1 spent on any order.' },
  { icon: '⭐', title: 'Earn Points', desc: 'Points are added automatically after your payment is confirmed.' },
  { icon: '🏆', title: 'Unlock Rewards', desc: 'Hit 100 points and get an automatic $10 off coupon by email.' },
];

const PERKS = [
  { icon: '🎯', label: '1 pt per $1 spent' },
  { icon: '💸', label: '$10 reward at 100 pts' },
  { icon: '♾️', label: 'Points never expire' },
  { icon: '🔄', label: 'Resets after each reward' },
];

function ProgressRing({ points, goal = 100 }) {
  const pct = Math.min(points / goal, 1);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="#f97316" strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-black text-navy-900">{points}</div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">PawPoints</div>
      </div>
    </div>
  );
}

export default function LoyaltyPage() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLookup(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/loyalty?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || 'No account found for that email.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  const pointsToNext = data ? Math.max(0, 100 - (data.points || 0)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-orange-950 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3">PawPoints</h1>
          <p className="text-lg text-white/75 mb-2">
            Earn points every time you shop. Hit 100 points and get <span className="text-emerald-400 font-bold">$10 off</span> your next order — automatically.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.title} className="text-center">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="font-black text-navy-900 mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {PERKS.map((p) => (
              <div key={p.label} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-navy-900 shadow-sm">
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Balance lookup */}
      <section className="py-14 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-2">Check Your Balance</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Enter the email you used to place your order.</p>

          {!data ? (
            <form onSubmit={handleLookup} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy-900 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-400 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? 'Looking up…' : 'Check My Points →'}
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Points card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <ProgressRing points={data.points || 0} />
                <div className="mt-4">
                  {data.points >= 100 ? (
                    <div className="text-emerald-600 font-black text-lg">🏆 Reward unlocked! Check your email for your $10 code.</div>
                  ) : (
                    <div>
                      <div className="text-navy-900 font-bold text-base">
                        <span className="text-brand-500 font-black">{pointsToNext} more points</span> until your $10 reward
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        That's just ${pointsToNext} more spent at PawHaven
                      </div>
                    </div>
                  )}
                </div>

                {data.totalEarned > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
                    Total PawPoints earned all-time: <strong className="text-navy-900">{data.totalEarned}</strong>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setData(null); setEmail(''); setError(''); }}
                  className="flex-1 border border-gray-200 text-navy-900 font-bold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Check Another Email
                </button>
                <Link
                  href="/products"
                  className="flex-1 bg-brand-500 hover:bg-brand-400 text-white font-bold py-3 rounded-xl text-sm text-center transition-colors"
                >
                  Earn More Points →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Already a customer CTA */}
      <section className="py-10 px-4 bg-brand-500 text-white text-center">
        <p className="font-bold text-lg mb-3">Haven't placed your first order yet?</p>
        <Link
          href="/products"
          className="inline-block bg-white text-brand-500 font-black px-8 py-3 rounded-full hover:bg-orange-50 transition-colors"
        >
          Start Shopping — Earn Points Instantly →
        </Link>
      </section>

    </div>
  );
}
