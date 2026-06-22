'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { trackAddToCart } from '@/lib/analytics';

// ─── Quiz questions ───────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'pet',
    question: "What kind of pet do you have?",
    emoji: '🐾',
    options: [
      { value: 'dog', label: 'Dog', emoji: '🐶' },
      { value: 'cat', label: 'Cat', emoji: '🐱' },
      { value: 'both', label: 'Both!', emoji: '🐶🐱' },
    ],
  },
  {
    id: 'size',
    question: "How big is your pet?",
    emoji: '📏',
    options: [
      { value: 'small', label: 'Small', desc: 'Under 20 lbs', emoji: '🐾' },
      { value: 'medium', label: 'Medium', desc: '20–50 lbs', emoji: '🐾🐾' },
      { value: 'large', label: 'Large', desc: '50+ lbs', emoji: '🐾🐾🐾' },
    ],
    skip: (answers) => answers.pet === 'cat', // cats skip size question
  },
  {
    id: 'goal',
    question: "What's your biggest priority right now?",
    emoji: '🎯',
    options: [
      { value: 'health', label: 'Better Health & Eating', emoji: '🥗' },
      { value: 'calm', label: 'Reducing Anxiety & Stress', emoji: '😌' },
      { value: 'play', label: 'More Play & Enrichment', emoji: '🎮' },
      { value: 'walks', label: 'Safer, Easier Walks', emoji: '🦮' },
      { value: 'travel', label: 'Travel & On-the-Go', emoji: '✈️' },
    ],
    catOptions: [
      { value: 'health', label: 'Better Health & Hydration', emoji: '💧' },
      { value: 'calm', label: 'Comfort & Anxiety Relief', emoji: '😌' },
      { value: 'play', label: 'More Play & Enrichment', emoji: '🎮' },
      { value: 'groom', label: 'Grooming & Shedding', emoji: '✨' },
      { value: 'travel', label: 'Travel & Vet Visits', emoji: '✈️' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    emoji: '💰',
    options: [
      { value: 'low', label: 'Under $25', emoji: '💵' },
      { value: 'mid', label: '$25–$50', emoji: '💵💵' },
      { value: 'high', label: '$50+', emoji: '💵💵💵' },
    ],
  },
];

// ─── Recommendation engine ────────────────────────────────────────────────────
function getRecommendations(answers) {
  const { pet, goal, budget } = answers;
  const budgetRange = {
    low: [0, 25],
    mid: [25, 50],
    high: [50, 999],
  }[budget] || [0, 999];

  // Score every product
  const scored = products.map((p) => {
    let score = 0;

    // Pet type match
    const isDog = p.category === 'Dogs';
    const isCat = p.category === 'Cats';
    if (pet === 'dog' && isDog) score += 3;
    if (pet === 'cat' && isCat) score += 3;
    if (pet === 'both') score += 1;

    // Goal match
    const tag = (p.tag || '').toLowerCase();
    const name = (p.name || '').toLowerCase();

    if (goal === 'health' && (tag.includes('feeding') || name.includes('feeder') || name.includes('fountain') || name.includes('bowl'))) score += 4;
    if (goal === 'calm' && (tag.includes('anxiety') || name.includes('calming') || name.includes('lick') || name.includes('orthopedic') || name.includes('puzzle') || name.includes('cave'))) score += 4;
    if (goal === 'play' && (tag.includes('play') || name.includes('toy') || name.includes('puzzle') || name.includes('laser') || name.includes('feather') || name.includes('crinkle'))) score += 4;
    if (goal === 'walks' && (tag.includes('walking') || name.includes('harness') || name.includes('leash') || name.includes('collar'))) score += 4;
    if (goal === 'travel' && (name.includes('travel') || name.includes('car') || name.includes('carrier') || name.includes('portable') || name.includes('paw cleaner'))) score += 4;
    if (goal === 'groom' && (name.includes('brush') || name.includes('grooming') || name.includes('deshed'))) score += 4;

    // Budget match
    if (p.price >= budgetRange[0] && p.price <= budgetRange[1]) score += 2;

    // Popularity boost
    score += Math.min((p.soldCount || 0) / 500, 1);

    return { product: p, score };
  });

  return scored
    .filter(({ score }) => score > 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ product }) => product);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: '#f97316' }}
      />
    </div>
  );
}

function RecommendationCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      emoji: product.emoji,
    });
    trackAddToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">{product.emoji}</div>
          )}
          {product.badge && (
            <div className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {product.badge}
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-brand-500 font-semibold uppercase tracking-wide mb-1">{product.tag}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-navy-900 text-sm leading-tight mb-2 hover:text-brand-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-black text-navy-900">${product.price.toFixed(2)}</span>
          {product.comparePrice && (
            <span className="text-xs text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            added
              ? 'bg-emerald-500 text-white'
              : 'bg-navy-900 hover:bg-brand-500 text-white'
          }`}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// ─── Email gate sub-component ─────────────────────────────────────────────────
function EmailGate({ answers, onSubmit }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const petLabel = answers.pet === 'dog' ? 'dog' : answers.pet === 'cat' ? 'cat' : 'pet';
  const goalLabel = {
    health: 'better health', calm: 'reducing anxiety', play: 'more play',
    walks: 'easier walks', travel: 'travel', groom: 'grooming',
  }[answers.goal] || 'everything';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('Please enter a valid email.'); return; }
    setLoading(true);
    setError('');
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quizAnswers: answers }),
      });
    } catch {}
    onSubmit(email);
  }

  function skip() { onSubmit(null); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-orange-50 flex flex-col">
      <div className="max-w-lg mx-auto w-full px-4 sm:px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-black text-navy-900 mb-3">
            Your results are ready!
          </h2>
          <p className="text-gray-500 leading-relaxed">
            We found the perfect picks for your <strong className="text-navy-900">{petLabel}</strong> focused on <strong className="text-navy-900">{goalLabel}</strong>. Enter your email to see them — we'll also send you a copy so you can revisit anytime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8">
          <label className="block text-sm font-bold text-navy-900 mb-2">
            Your email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-navy-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 mb-2 text-base"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <p className="text-xs text-gray-400 mb-5">
            We'll also send you a 10% off code. No spam, unsubscribe any time.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/40 disabled:opacity-60 text-base"
          >
            {loading ? 'One moment…' : 'See My Recommendations →'}
          </button>
          <button
            type="button"
            onClick={skip}
            className="w-full mt-3 py-2 text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            Skip — just show me the results
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main quiz component ──────────────────────────────────────────────────────
export default function QuizPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Filter out skipped steps
  const activeSteps = STEPS.filter((s) => !s.skip || !s.skip(answers));
  const currentStep = activeSteps[stepIdx];
  const totalSteps = activeSteps.length;

  function choose(value) {
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);

    if (stepIdx < totalSteps - 1) {
      setStepIdx((i) => i + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setAnswers({});
    setStepIdx(0);
    setDone(false);
    setEmailSubmitted(false);
  }

  const recommendations = (done && emailSubmitted) ? getRecommendations(answers) : [];

  // ── Email gate (shown before results) ──
  if (done && !emailSubmitted) {
    return <EmailGate answers={answers} onSubmit={() => setEmailSubmitted(true)} />;
  }

  // ── Results screen ──
  if (done) {
    const petLabel = answers.pet === 'dog' ? 'your dog' : answers.pet === 'cat' ? 'your cat' : 'your pets';
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🎉</div>
            <h1 className="text-3xl font-black text-navy-900 mb-2">
              Perfect picks for {petLabel}!
            </h1>
            <p className="text-gray-500">
              Based on your answers, here's what we'd recommend:
            </p>
          </div>

          {/* Recommendations grid */}
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {recommendations.map((p) => (
                <RecommendationCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No exact matches — browse our full catalog instead.</p>
              <Link href="/products" className="text-brand-500 font-semibold hover:underline">
                Shop all products →
              </Link>
            </div>
          )}

          {/* Use code callout */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 text-center mb-8">
            <p className="text-navy-900 font-bold mb-1">New customer?</p>
            <p className="text-gray-600 text-sm">
              Use code{' '}
              <span className="font-black text-brand-500 bg-brand-100 px-2 py-0.5 rounded-lg">
                WELCOME10
              </span>{' '}
              for 10% off your first order.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={restart}
              className="text-gray-500 hover:text-navy-900 font-medium text-sm transition-colors"
            >
              ↩ Retake quiz
            </button>
            <Link
              href="/products"
              className="bg-navy-900 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Browse all products →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ──
  const options =
    currentStep.id === 'goal' && answers.pet === 'cat' && currentStep.catOptions
      ? currentStep.catOptions
      : currentStep.options;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-orange-50 flex flex-col">
      <div className="max-w-xl mx-auto w-full px-4 sm:px-6 py-12 flex-1 flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-2 flex justify-between text-xs text-gray-400 font-medium">
          <span>Question {stepIdx + 1} of {totalSteps}</span>
          <button onClick={restart} className="hover:text-gray-600 transition-colors">
            Start over
          </button>
        </div>
        <ProgressBar current={stepIdx + 1} total={totalSteps} />

        {/* Question */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">{currentStep.emoji}</div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
            {currentStep.question}
          </h2>
        </div>

        {/* Options */}
        <div className={`grid gap-3 ${options.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => choose(opt.value)}
              className="group bg-white hover:bg-brand-500 border-2 border-gray-100 hover:border-brand-500 rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95"
            >
              <div className="text-3xl mb-2">{opt.emoji}</div>
              <div className="font-bold text-navy-900 group-hover:text-white text-base transition-colors">
                {opt.label}
              </div>
              {opt.desc && (
                <div className="text-gray-400 group-hover:text-white/80 text-xs mt-0.5 transition-colors">
                  {opt.desc}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Back */}
        {stepIdx > 0 && (
          <button
            onClick={() => setStepIdx((i) => i - 1)}
            className="mt-6 text-center text-gray-400 hover:text-navy-900 text-sm transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
