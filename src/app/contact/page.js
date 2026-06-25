'use client';

import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 5–12 business days to the US, Canada, UK, and Australia. Express shipping (2–3 business days) is available at checkout for $9.99. You\'ll receive a tracking number via email once your order ships.',
  },
  {
    q: 'Where do you ship from?',
    a: 'Our products ship directly from our fulfillment partners in Asia, which is how we keep prices low without sacrificing quality. All products are quality-checked before dispatch.',
  },
  {
    q: 'Can I return a product?',
    a: 'Yes — we offer hassle-free 30-day returns. If you\'re not happy for any reason, contact us and we\'ll make it right. See our full Refund Policy for details.',
  },
  {
    q: 'How do I track my order?',
    a: 'Visit our Order Tracking page at pawhavenpets.org/order-tracking and enter your order ID (from your confirmation email) to see live status and your tracking number.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Absolutely. All payments are processed by Stripe, which is PCI DSS Level 1 certified — the highest level of payment security. We never store your card details.',
  },
  {
    q: 'Can I use the WELCOME10 discount code?',
    a: 'Yes! New customers can use code WELCOME10 at checkout for 10% off their first order. Sign up to our email list to get the code delivered to your inbox.',
  },
  {
    q: 'What if my order arrives damaged?',
    a: 'We\'re sorry to hear that — please take a photo and email us at support@pawhavenpets.org within 7 days of delivery. We\'ll send a replacement or issue a full refund immediately.',
  },
  {
    q: 'Do you sell wholesale or in bulk?',
    a: 'We don\'t currently offer a formal wholesale program, but feel free to reach out via the contact form below and we\'ll do our best to help.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-navy-900 pr-4">{q}</span>
        <span className={`text-brand-500 text-xl flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-4xl font-black text-navy-900 mb-3">How can we help?</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We typically reply within 24 hours. Check the FAQ below first — your answer might already be there.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '📦', title: 'Track Your Order', desc: 'Check your shipment status in real time.', href: '/order-tracking' },
            { icon: '↩️', title: 'Request a Refund', desc: 'Start your return in 60 seconds.', href: '/refund' },
            { icon: '✉️', title: 'Email Support', desc: 'support@pawhavenpets.org', href: 'mailto:support@pawhavenpets.org' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-bold text-navy-900 mb-1">{item.title}</div>
              {item.href ? (
                <Link href={item.href} className="text-brand-500 text-sm hover:underline">{item.desc}</Link>
              ) : (
                <p className="text-gray-500 text-sm">{item.desc}</p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-black text-navy-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3 mb-16">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10">
          <h2 className="text-2xl font-black text-navy-900 mb-2">Still need help?</h2>
          <p className="text-gray-500 text-sm mb-8">Send us a message and we\'ll get back to you within 24 hours.</p>

          {status === 'done' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold text-navy-900 text-lg">Message sent!</p>
              <p className="text-gray-500 text-sm mt-1">We\'ll reply to {form.email} within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                  placeholder="Order number, product question, or anything else..."
                />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Email us directly at support@pawhavenpets.org.</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-brand-500 hover:bg-brand-400 disabled:opacity-70 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
