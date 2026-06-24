'use client';
import { useState } from 'react';
import Link from 'next/link';

const PERKS = [
  { icon: '💸', title: '15% Commission', desc: 'Earn 15% on every sale your link generates — paid monthly via PayPal or Venmo.' },
  { icon: '🔗', title: 'Unique Link + Code', desc: 'Your own trackable link and discount code. Your audience gets 10% off; you earn 15%.' },
  { icon: '📊', title: 'Real-Time Stats', desc: 'See clicks, conversions, and earnings in your personal dashboard anytime.' },
  { icon: '🎁', title: 'Free Products', desc: 'All accepted affiliates receive a product bundle to create authentic content.' },
  { icon: '⚡', title: '90-Day Cookie', desc: 'If someone clicks your link and buys within 90 days, you get credit.' },
  { icon: '🤝', title: 'Dedicated Support', desc: 'A real person helps you create content that converts. No bots, no auto-replies.' },
];

const STEPS = [
  { n: '1', title: 'Apply below', desc: 'Takes 2 minutes. We review all applications within 48 hours.' },
  { n: '2', title: 'Get your kit', desc: 'Approved affiliates receive free products + your unique link and code.' },
  { n: '3', title: 'Post & earn', desc: 'Share with your audience. Every sale earns 15% — tracked automatically.' },
];

const FAQS = [
  { q: 'Who qualifies?', a: 'Pet content creators on any platform — Instagram, TikTok, YouTube, Pinterest, or a blog. No minimum follower requirement, but we look for genuine engagement with a pet-focused audience.' },
  { q: 'When do I get paid?', a: 'Commissions are paid monthly (net-15) for the previous month\'s confirmed sales. We pay via PayPal or Venmo.' },
  { q: 'What\'s the 90-day cookie?', a: 'If someone clicks your affiliate link, we track that click for 90 days. If they purchase anytime within that window, you earn the commission — even if they don\'t use your code.' },
  { q: 'Can I promote on multiple platforms?', a: 'Yes. Use the same link everywhere. Your stats dashboard shows total clicks and conversions across all your content.' },
  { q: 'Do I need to disclose the partnership?', a: 'Yes — FTC guidelines require disclosure. We\'ll help you craft compliant language that sounds natural. Most affiliates say "gifted by PawHaven" or "#ad".' },
];

export default function AffiliatesPage() {
  const [form, setForm] = useState({ name: '', email: '', handle: '', platform: '', audience: '', why: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/affiliates/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-brand-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🐾 Affiliate & Influencer Program
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Turn Your Pet Content<br className="hidden sm:block" /> Into Income
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8">
            Earn <span className="text-emerald-400 font-bold">15% commission</span> on every sale you refer. Your audience saves 10%. Free products for all accepted affiliates.
          </p>
          <a href="#apply" className="inline-block bg-brand-500 hover:bg-brand-400 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
            Apply Now — It\'s Free →
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-brand-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-black">15%</div>
            <div className="text-xs text-white/75 font-medium">Commission rate</div>
          </div>
          <div>
            <div className="text-2xl font-black">90 days</div>
            <div className="text-xs text-white/75 font-medium">Cookie window</div>
          </div>
          <div>
            <div className="text-2xl font-black">Monthly</div>
            <div className="text-xs text-white/75 font-medium">Payouts</div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy-900 mb-3">Why PawHaven Affiliates Love the Program</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We built this program for real creators, not click farms.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(p => (
              <div key={p.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-black text-navy-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy-900 text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            {STEPS.map(step => (
              <div key={step.n} className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-black text-lg flex items-center justify-center flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-black text-navy-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-navy-900 mb-3">Apply to Join</h2>
            <p className="text-gray-500">We review all applications within 48 hours and notify you by email.</p>
          </div>

          {status === 'success' ? (
            <div className="text-center bg-emerald-50 border border-emerald-200 rounded-3xl p-12">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-black text-navy-900 mb-3">Application Received!</h3>
              <p className="text-gray-600 mb-2">We\'ll review your application and email you within 48 hours.</p>
              <p className="text-gray-400 text-sm">Check your spam folder if you don\'t hear back.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Your Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Main Platform *</label>
                  <select
                    required
                    value={form.platform}
                    onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                  >
                    <option value="">Select platform…</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>YouTube</option>
                    <option>Pinterest</option>
                    <option>Blog / Website</option>
                    <option>Facebook</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-1.5">Handle / URL *</label>
                  <input
                    required
                    type="text"
                    value={form.handle}
                    onChange={e => setForm(f => ({ ...f, handle: e.target.value }))}
                    placeholder="@yourhandle or website.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy-900 mb-1.5">Approximate Audience Size *</label>
                <select
                  required
                  value={form.audience}
                  onChange={e => setForm(f => ({ ...f, audience: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                >
                  <option value="">Select range…</option>
                  <option>Under 1k</option>
                  <option>1k – 10k</option>
                  <option>10k – 50k</option>
                  <option>50k – 250k</option>
                  <option>250k+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy-900 mb-1.5">Why are you a good fit? (optional)</label>
                <textarea
                  rows={3}
                  value={form.why}
                  onChange={e => setForm(f => ({ ...f, why: e.target.value }))}
                  placeholder="Tell us about your audience, your pets, or content you\'ve made that performed well…"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-base py-4 rounded-2xl transition-all duration-200 hover:shadow-lg disabled:opacity-60"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit Application →'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By submitting you agree to our <Link href="/terms" className="underline">Terms</Link>. We respond within 48 hours.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Already an affiliate? */}
      <section className="py-12 px-4 text-center border-t border-gray-100">
        <p className="text-gray-500 text-sm">
          Already an affiliate?{' '}
          <Link href="/affiliates/stats" className="text-brand-500 font-bold hover:underline">
            View your stats dashboard →
          </Link>
        </p>
      </section>

    </div>
  );
}
