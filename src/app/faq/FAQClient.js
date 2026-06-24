'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FAQ } from './faq-data';

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
            Can\'t find what you\'re looking for?{' '}
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
