'use client';

import { useState } from 'react';
import Link from 'next/link';

export const FAQ = [
  {
    category: '🚚 Shipping & Delivery',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5–8 business days. Express shipping (2–3 business days) is available at checkout for $9.99. We process and dispatch orders within 1–2 business days.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes! We currently ship to the United States, Canada, United Kingdom, and Australia. International orders typically take 7–14 business days.',
      },
      {
        q: 'How much does shipping cost?',
        a: 'Standard shipping is FREE on all orders over $50. For orders under $50, standard shipping is a flat $4.99. Express shipping is $9.99 regardless of order size.',
      },
      {
        q: 'How do I track my order?',
        a: "Once your order ships, you'll receive a confirmation email with a tracking link. You can also visit our Order Tracking page and enter your order ID at any time.",
      },
      {
        q: 'What if I need to change my shipping address?',
        a: 'Contact us at support@pawhavenpets.org within 24 hours of placing your order. After that, the order may already be in fulfillment and we may not be able to make changes.',
      },
    ],
  },
  {
    category: '🔄 Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: "We offer a 30-day no-questions-asked return policy. If you're not 100% happy with your purchase — or your pet isn't! — just let us know and we'll make it right.",
      },
      {
        q: 'How do I start a return?',
        a: "Email support@pawhavenpets.org with your order number and reason for return. We'll send you a prepaid return label within 1 business day.",
      },
      {
        q: 'When will I receive my refund?',
        a: "Once we receive your return, refunds are processed within 1–2 business days. You'll see the amount back in your account within 3–5 business days depending on your bank.",
      },
      {
        q: 'What if my item arrives damaged or defective?',
        a: "We're so sorry if that happens! Take a photo and email it to support@pawhavenpets.org. We'll send a replacement or issue a full refund immediately — no need to return the damaged item.",
      },
      {
        q: 'Can I exchange an item for a different product?',
        a: "Absolutely. Start a return as normal and place a new order for the item you'd prefer. If the prices differ, we'll credit or charge the difference.",
      },
    ],
  },
  {
    category: '🛍 Products & Quality',
    questions: [
      {
        q: 'Are your products safe for pets?',
        a: "Yes. Every product in our catalog is reviewed for safety before listing. We prioritize BPA-free materials, non-toxic dyes, and pet-safe construction. When in doubt, check the product's materials section or email us.",
      },
      {
        q: 'Where are your products sourced from?',
        a: "We work with carefully vetted suppliers who meet our quality and safety standards. We're constantly testing and updating our catalog to ensure every product earns its place.",
      },
      {
        q: 'Do you offer size guides for products like harnesses and collars?',
        a: "Yes — size information is listed on each individual product page in the Key Features section. When in doubt, we recommend measuring your pet's neck and chest girth before ordering. You can also email us for sizing advice.",
      },
      {
        q: "What if the product doesn't work for my pet?",
        a: "Every pet is different. If a product doesn't suit your pet within 30 days, return it for a full refund under our happiness guarantee — no explanation needed.",
      },
      {
        q: 'Do you sell products for both dogs and cats?',
        a: 'Yes! We have a growing catalog for both dogs and cats. Use the Shop by Category filter on our products page, or take our Pet Quiz to get personalized recommendations.',
      },
    ],
  },
  {
    category: '💳 Orders & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as Apple Pay and Google Pay. All payments are processed securely through Stripe.',
      },
      {
        q: 'Is it safe to enter my payment info on your site?',
        a: "Absolutely. We use Stripe for payment processing — your card details never touch our servers. All transactions are encrypted with TLS and Stripe is certified PCI DSS Level 1.",
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Contact us at support@pawhavenpets.org as soon as possible. We can usually modify or cancel orders within 24 hours. After that, the order may be in fulfillment.',
      },
      {
        q: 'How do I use a coupon or promo code?',
        a: 'Enter your code in the "Coupon code" field on the Cart page before clicking "Proceed to Checkout." The discount is applied immediately and reflected in your order total.',
      },
      {
        q: "I was charged but didn't receive an order confirmation email — what do I do?",
        a: "Check your spam folder first. If it's not there, email support@pawhavenpets.org with your name and the email you used at checkout. We'll track down your order and resend the confirmation.",
      },
    ],
  },
  {
    category: '🐾 About PawHaven',
    questions: [
      {
        q: 'What makes PawHaven different from other pet stores?',
        a: "We don't list everything — we list the best. Every product is hand-picked for quality, safety, and value. We'd rather carry 30 great products than 3,000 mediocre ones.",
      },
      {
        q: 'How can I contact customer support?',
        a: 'Email us at support@pawhavenpets.org — we aim to respond within 24 hours on weekdays. You can also use the Contact form on our Help page.',
      },
      {
        q: 'Do you offer discounts for new customers?',
        a: 'Yes! New customers get 10% off their first order with code WELCOME10. You can also subscribe to our newsletter for exclusive deals and early sale access.',
      },
      {
        q: 'Do you have a loyalty or rewards program?',
        a: 'Yes! Our PawPoints rewards program lets you earn 1 point for every $1 spent. Reach 100 points and get an automatic $10 off coupon emailed to you. Points never expire. Visit /loyalty to check your balance.',
      },
    ],
  },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-navy-900 text-base">{q}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 text-gray-600 leading-relaxed text-sm pr-10">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-50 to-amber-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-5xl mb-4">❓</div>
          <h1 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-lg">
            Everything you need to know about PawHaven.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Can't find what you're looking for?{' '}
            <Link href="/contact" className="text-brand-500 font-semibold hover:underline">
              Contact us →
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Category nav */}
          <nav className="lg:col-span-1">
            <div className="sticky top-24 space-y-1">
              {FAQ.map((section, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeCategory === i
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-gray-500 hover:text-navy-900 hover:bg-gray-50'
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </div>
          </nav>

          {/* Questions */}
          <div className="lg:col-span-3">
            {FAQ.map((section, i) => (
              <div
                key={i}
                id={`section-${i}`}
                className={activeCategory !== i ? 'hidden' : ''}
              >
                <h2 className="text-xl font-black text-navy-900 mb-6">
                  {section.category}
                </h2>
                <div className="bg-gray-50 rounded-3xl px-6 divide-y divide-gray-100">
                  {section.questions.map((item, j) => (
                    <AccordionItem key={j} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}

            {/* Still need help */}
            <div className="mt-12 bg-navy-900 rounded-3xl p-8 text-center text-white">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-xl font-black mb-2">Still have questions?</h3>
              <p className="text-gray-400 text-sm mb-6">
                Our support team typically responds within a few hours on weekdays.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-6 py-3 rounded-full transition-colors"
                >
                  Send us a message
                </Link>
                <a
                  href="mailto:support@pawhavenpets.org"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors"
                >
                  support@pawhavenpets.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
