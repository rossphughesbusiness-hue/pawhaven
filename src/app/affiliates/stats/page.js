'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const BASE = 'https://pawhavenpets.org';

function StatCard({ label, value, sub, color = '#1a2b4a' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
      {sub && <div className="text-sm text-gray-400">{sub}</div>}
    </div>
  );
}

function StatsContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code')?.toUpperCase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!code) { setLoading(false); return; }
    fetch(`/api/affiliates/stats?code=${code}`)
      .then(r => r.ok ? r.json() : null)
      .then(json => { setData(json); setLoading(false); })
      .catch(() => setLoading(false));
  }, [code]);

  function copyLink() {
    navigator.clipboard.writeText(`${BASE}/?ref=${code}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!code) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-black text-navy-900 mb-3">Enter Your Affiliate Code</h1>
        <p className="text-gray-500 mb-6">Check your approval email for your unique code and dashboard link.</p>
        <Link href="/affiliates" className="inline-block bg-brand-500 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-400 transition-colors">
          Apply to Join →
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading your stats…</div>;
  }

  if (!data) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-5xl mb-4">❓</div>
        <h1 className="text-2xl font-black text-navy-900 mb-3">Code Not Found</h1>
        <p className="text-gray-500 mb-4">The code <strong>{code}</strong> wasn't found. Check your approval email for the correct code.</p>
        <Link href="/affiliates" className="text-brand-500 font-bold hover:underline">Back to affiliate program →</Link>
      </div>
    );
  }

  const refLink = `${BASE}/?ref=${code}`;
  const conversionRate = data.clicks > 0 ? ((data.conversions / data.clicks) * 100).toFixed(1) : '0.0';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🐾</span>
          <div>
            <h1 className="text-2xl font-black text-navy-900">{data.name} — Affiliate Dashboard</h1>
            <p className="text-gray-400 text-sm">{data.commissionPct}% commission · Code: <strong className="text-navy-900 font-mono">{code}</strong></p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Clicks" value={data.clicks || 0} sub="Unique visits via your link" />
        <StatCard label="Conversions" value={data.conversions || 0} sub="Completed purchases" />
        <StatCard label="Conv. Rate" value={`${conversionRate}%`} sub="Clicks → purchases" color="#6366f1" />
        <StatCard label="Total Earned" value={`$${(data.earned || 0).toFixed(2)}`} sub="Pending payout" color="#34d399" />
      </div>

      {/* Your link */}
      <div className="bg-gradient-to-r from-brand-50 to-orange-50 rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-black text-navy-900 mb-1">Your Referral Link</h2>
        <p className="text-sm text-gray-500 mb-4">Share this in your bio, captions, and stories. Tracked automatically.</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white border border-brand-200 rounded-xl px-4 py-3 font-mono text-sm text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {refLink}
          </div>
          <button
            onClick={copyLink}
            className="flex-shrink-0 bg-brand-500 text-white font-bold px-5 py-3 rounded-xl hover:bg-brand-400 transition-colors text-sm"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-black text-navy-900 mb-1">Your Discount Code</h2>
        <p className="text-sm text-gray-500 mb-4">Your followers enter this at checkout for 10% off. You earn {data.commissionPct}% on each sale.</p>
        <div className="text-4xl font-black font-mono text-brand-500 tracking-widest">{code}</div>
      </div>

      {/* Payout info */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h2 className="font-black text-navy-900 mb-3">💸 Payout Information</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✓ Commissions are paid <strong>monthly</strong>, net-15 days after month end</li>
          <li>✓ Minimum payout: $25</li>
          <li>✓ Payment via PayPal or Venmo</li>
          <li>✓ Questions? Email <a href="mailto:orders@pawhavenpets.org" className="text-brand-500 font-medium">orders@pawhavenpets.org</a></li>
        </ul>
      </div>
    </div>
  );
}

export default function AffiliateStatsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white py-8 px-4 text-center">
        <Link href="/affiliates" className="text-brand-400 text-sm font-medium hover:text-brand-300">← Affiliate Program</Link>
        <h1 className="text-2xl font-black mt-2">Your Affiliate Dashboard</h1>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading…</div>}>
        <StatsContent />
      </Suspense>
    </div>
  );
}
