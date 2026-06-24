import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Products for Anxious Pets — Calming Dog & Cat Accessories | PawHaven',
  description: 'Vet-recommended calming products for anxious dogs and cats. Lick mats, puzzle feeders, orthopedic beds, and enrichment toys that reduce stress naturally.',
  alternates: { canonical: 'https://pawhavenpets.org/anxiety' },
  openGraph: {
    title: 'Calming Products for Anxious Pets — PawHaven',
    description: 'Natural, drug-free solutions for pet anxiety. Lick mats, enrichment toys, cozy hideaways, and more.',
    url: 'https://pawhavenpets.org/anxiety',
    type: 'website',
  },
};

const ANXIETY_SLUGS = [
  'calming-lick-mat',
  'iq-puzzle-feeder-toy',
  'orthopedic-memory-foam-dog-bed',
  'cozy-cat-cave-hideaway',
];

const SIGNS = [
  { emoji: '🐾', sign: 'Excessive barking or meowing' },
  { emoji: '🐾', sign: 'Destructive chewing or scratching' },
  { emoji: '🐾', sign: 'Hiding or clinginess' },
  { emoji: '🐾', sign: 'Pacing, panting, or trembling' },
  { emoji: '🐾', sign: 'Accidents indoors despite being house-trained' },
  { emoji: '🐾', sign: 'Refusal to eat' },
];

const APPROACHES = [
  {
    icon: '👅',
    title: 'Lick Mats',
    desc: 'Repetitive licking releases endorphins and serotonin — the same calming mechanism as human stress-eating, but healthy. Most effective for mild anxiety and pre-trigger situations.',
  },
  {
    icon: '🧩',
    title: 'Puzzle Feeders',
    desc: 'Mental engagement redirects anxious energy. Puzzle feeders shift your pet\'s brain into "focus mode" rather than "threat mode." Best for boredom-based anxiety.',
  },
  {
    icon: '🛏',
    title: 'Orthopedic Beds',
    desc: 'Feeling physically supported reduces anxiety in both dogs and humans. Memory foam gives anxious pets a designated "safe space" they return to voluntarily.',
  },
  {
    icon: '🏠',
    title: 'Cat Caves',
    desc: 'Cats are den animals. A cozy, enclosed hideaway gives anxious cats a place to retreat where they feel hidden from perceived threats.',
  },
];

const FAQ_ANXIETY = [
  { q: 'What are the best calming products for anxious dogs?', a: 'Lick mats and puzzle feeders are the most effective non-medication options for anxious dogs. Repetitive licking triggers the release of endorphins and serotonin. Orthopedic beds with raised edges also provide a sense of security. For severe anxiety, always consult your vet.' },
  { q: 'Do lick mats actually reduce anxiety in pets?', a: 'Yes — studies show repetitive licking activates the parasympathetic nervous system, lowering heart rate and cortisol levels in dogs. Most owners see results within the first session, particularly for situational anxiety (thunderstorms, grooming, vet visits).' },
  { q: 'What causes anxiety in cats?', a: 'Indoor cats most commonly experience anxiety from environmental changes (new people, furniture, other pets), boredom from insufficient stimulation, or lack of safe hiding spots. Enrichment toys, perches, and enclosed beds address most of these causes directly.' },
  { q: 'Should I use calming products or medication for my pet\'s anxiety?', a: 'Most vets recommend trying behavioral and environmental interventions before medication. Calming products like lick mats, puzzle feeders, and orthopedic beds address the root causes of anxiety. Medication is typically reserved for severe cases where quality of life is significantly affected.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ANXIETY.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function AnxietyPage() {
  const featured = ANXIETY_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);
  const moreAnxiety = products
    .filter((p) => (p.tag === 'Anxiety Relief' || p.tag === 'Enrichment' || p.tag === 'Comfort') && !ANXIETY_SLUGS.includes(p.slug))
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none text-[200px] leading-none flex flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>🐾</span>)}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            😌 Natural Anxiety Relief
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Calm Your Anxious Pet<br className="hidden sm:block" /> Naturally
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Drug-free, vet-approved products that reduce stress and anxiety in dogs and cats through enrichment, comfort, and natural calming mechanisms.
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-purple-700 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-white/30 hover:-translate-y-0.5"
          >
            Shop Calming Products →
          </Link>
        </div>
      </section>

      {/* ─── Signs of anxiety ─── */}
      <section className="bg-purple-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">Signs Your Pet May Have Anxiety</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIGNS.map(({ emoji, sign }) => (
              <div key={sign} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-purple-100">
                <span className="text-purple-500 text-lg flex-shrink-0">✓</span>
                <span className="text-navy-900 text-sm font-medium">{sign}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            If your pet shows 3+ of these signs regularly, anxiety products can make a meaningful difference.
          </p>
        </div>
      </section>

      {/* ─── Featured products ─── */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-500 font-bold text-sm uppercase tracking-widest mb-3">Vet-Recommended</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4">Top Calming Products</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Chosen for their clinically-backed calming mechanisms — no supplements, no side effects.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* How each approach works */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-8 text-center">How Each Approach Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {APPROACHES.map((a) => (
                <div key={a.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <h3 className="font-bold text-navy-900 mb-2">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SEO prose */}
          <div className="prose max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-4">Natural Ways to Calm an Anxious Pet</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pet anxiety is more common than most owners realize — up to <strong>40% of dogs</strong> show signs of anxiety-related behavior. The good news: many cases respond well to behavioral and environmental interventions before medication is needed.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The <Link href="/products/calming-lick-mat" className="text-brand-500 hover:underline">calming lick mat</Link> is one of the most effective tools available. When a pet licks, their brain releases endorphins — the same feel-good chemicals released during exercise. Spreading peanut butter or wet food on a lick mat gives anxious pets 10–20 minutes of focused, calming engagement. Vets frequently recommend them before events like thunderstorms, fireworks, or vet visits.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For dogs whose anxiety stems from boredom (common in working breeds left alone), the <Link href="/products/iq-puzzle-feeder-toy" className="text-brand-500 hover:underline">IQ puzzle feeder</Link> redirects nervous energy into productive problem-solving. It engages the prefrontal cortex — essentially the "calm planning" part of the brain — overriding the amygdala\'s fear response.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For cats, the instinct to hide in a safe, enclosed space is deeply wired. The <Link href="/products/cozy-cat-cave-hideaway" className="text-brand-500 hover:underline">cozy cat cave</Link> provides exactly that — a den environment where anxious cats can self-regulate without needing human intervention. Most anxious cats start using a cave within the first day and return to it whenever overstimulated.
            </p>
          </div>

          {/* More products */}
          {moreAnxiety.length > 0 && (
            <>
              <h3 className="text-2xl font-black text-navy-900 mb-6 text-center">More Calming & Enrichment Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {moreAnxiety.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-purple-600 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4">😌</div>
          <h2 className="text-3xl font-black mb-4">A Calmer Pet, A Happier Home</h2>
          <p className="text-white/80 mb-8">Free shipping over $50. 30-day no-questions returns. Try it risk-free.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="inline-block bg-white text-purple-600 font-bold text-base px-8 py-4 rounded-full hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              Shop All Products →
            </Link>
            <Link href="/quiz" className="inline-block border-2 border-white text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200">
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
