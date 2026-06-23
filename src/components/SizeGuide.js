'use client';

import { useState } from 'react';

// Size charts keyed by guide type
const GUIDES = {
  'dog-harness': {
    title: 'Dog Harness Size Guide',
    intro: 'Measure your dog\'s chest girth (the widest part, just behind the front legs) and neck circumference for the best fit.',
    how: [
      { icon: '📏', label: 'Chest Girth', desc: 'Wrap a soft tape measure around the widest part of your dog\'s chest, just behind the front legs.' },
      { icon: '📐', label: 'Neck', desc: 'Measure around the base of the neck where a collar would normally sit.' },
      { icon: '⚖️', label: 'Weight', desc: 'Use weight as a secondary guide — if between sizes, size up for comfort.' },
    ],
    columns: ['Size', 'Weight', 'Neck', 'Chest Girth'],
    rows: [
      ['XS', '4–8 lbs', '8–12"', '12–16"'],
      ['S',  '8–15 lbs', '10–14"', '14–20"'],
      ['M',  '15–30 lbs', '12–18"', '18–26"'],
      ['L',  '30–55 lbs', '16–22"', '24–32"'],
      ['XL', '55–90 lbs', '20–26"', '30–40"'],
    ],
    tip: 'When in doubt, size up. A slightly larger harness can be tightened; a too-small harness causes discomfort.',
  },
  'dog-collar': {
    title: 'Dog Collar Size Guide',
    intro: 'Measure your dog\'s neck circumference and add 1–2 inches for a comfortable fit.',
    how: [
      { icon: '📏', label: 'Neck Circumference', desc: 'Wrap a soft tape measure around the middle of your dog\'s neck. Add 1–2 inches to the measurement for a proper fit.' },
      { icon: '🖐️', label: 'Two-Finger Rule', desc: 'A properly fitted collar lets you slip two fingers underneath comfortably.' },
    ],
    columns: ['Size', 'Neck Circumference', 'Collar Length'],
    rows: [
      ['XS', '6–9"',  '8–11"'],
      ['S',  '9–12"', '11–14"'],
      ['M',  '12–16"', '14–18"'],
      ['L',  '16–20"', '18–22"'],
      ['XL', '20–24"', '22–26"'],
    ],
    tip: 'Check the fit weekly — puppies grow fast! The collar should rest comfortably, not restrict breathing.',
  },
  'dog-bed': {
    title: 'Dog Bed Size Guide',
    intro: 'Measure your dog from nose to tail (when lying stretched out) for the best bed size.',
    how: [
      { icon: '📏', label: 'Body Length', desc: 'Measure your dog from the tip of the nose to the base of the tail while they\'re lying down fully stretched.' },
      { icon: '📐', label: 'Shoulder Width', desc: 'Measure your dog across the widest point of the shoulders.' },
    ],
    columns: ['Size', 'Bed Dimensions', 'Best For'],
    rows: [
      ['S',  '24" × 18"', 'Up to 20 lbs / Chihuahua, Yorkie'],
      ['M',  '30" × 24"', '20–50 lbs / Beagle, Cocker Spaniel'],
      ['L',  '36" × 28"', '50–80 lbs / Lab, Golden Retriever'],
      ['XL', '44" × 34"', '80+ lbs / German Shepherd, Great Dane'],
    ],
    tip: 'If your dog likes to curl up, you can size down. If they like to stretch out, size up.',
  },
  'cat-carrier': {
    title: 'Cat Carrier Size Guide',
    intro: 'This backpack carrier fits most cats under 15 lbs. Measure your cat for a comfortable fit.',
    how: [
      { icon: '📏', label: 'Body Length', desc: 'Measure your cat from the base of the neck to the base of the tail.' },
      { icon: '📐', label: 'Height', desc: 'Measure your cat\'s height from floor to the top of the shoulders while standing.' },
      { icon: '⚖️', label: 'Weight', desc: 'The carrier supports cats up to 15 lbs / 7 kg comfortably.' },
    ],
    columns: ['Measurement', 'Recommended Maximum'],
    rows: [
      ['Cat Weight',       'Up to 15 lbs / 7 kg'],
      ['Cat Body Length',  'Up to 18" / 46 cm'],
      ['Cat Height',       'Up to 12" / 30 cm'],
      ['Interior Space',   '12" × 11" × 16" (L×W×H)'],
    ],
    tip: 'For cats over 12 lbs we recommend letting them try sitting inside before a long trip to ensure they\'re comfortable.',
  },
};

export default function SizeGuide({ type }) {
  const [open, setOpen] = useState(false);
  const guide = GUIDES[type];
  if (!guide) return null;

  return (
    <>
      {/* Trigger link */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm text-brand-500 font-semibold hover:underline underline-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z" />
        </svg>
        Size Guide
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center px-4 pb-0 sm:pb-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-3xl z-10">
              <h2 className="text-lg font-black text-navy-900">{guide.title}</h2>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Intro */}
              <p className="text-gray-600 text-sm leading-relaxed">{guide.intro}</p>

              {/* How to measure */}
              <div>
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider mb-3">How to Measure</h3>
                <div className="space-y-3">
                  {guide.how.map((item) => (
                    <div key={item.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-navy-900 text-sm">{item.label}</div>
                        <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size chart */}
              <div>
                <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider mb-3">Size Chart</h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy-900 text-white">
                        {guide.columns.map((col) => (
                          <th key={col} className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider first:rounded-tl-2xl last:rounded-tr-2xl">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.rows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 text-gray-700 ${j === 0 ? 'font-black text-navy-900' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-xl flex-shrink-0">💡</span>
                <p className="text-amber-800 text-sm leading-relaxed">{guide.tip}</p>
              </div>

              {/* Contact */}
              <p className="text-center text-xs text-gray-400">
                Still unsure?{' '}
                <a href="mailto:support@pawhavenpets.org" className="text-brand-500 font-semibold hover:underline">
                  Email us
                </a>{' '}
                and we'll help you pick the right size.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
