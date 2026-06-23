import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Products for Indoor Cats — PawHaven',
  description: 'The best toys, perches, water fountains, and enrichment products to keep indoor cats healthy, stimulated, and happy. Vet-recommended picks.',
  alternates: { canonical: 'https://pawhavenpets.org/indoor-cats' },
  openGraph: {
    title: 'Best Products for Indoor Cats — PawHaven',
    description: 'Indoor cats need enrichment, hydration, and places to perch. Here are the products that actually keep them healthy and engaged.',
    url: 'https://pawhavenpets.org/indoor-cats',
    type: 'website',
  },
};

const FEATURED_SLUGS = [
  'feather-wand-cat-teaser',
  'silent-cat-water-fountain',
  'cat-window-perch-hammock',
  'cozy-cat-cave-hideaway',
];

const NEEDS = [
  {
    icon: '🏃',
    title: 'Daily Exercise',
    desc: 'Indoor cats don\'t hunt or roam. Without active play, they become overweight and lethargic. Two 10-minute interactive play sessions a day is the minimum.',
  },
  {
    icon: '💧',
    title: 'Running Water',
    desc: 'Cats evolved to distrust still water (standing water in nature is often stagnant). Running water fountains dramatically increase hydration — critical for urinary health.',
  },
  {
    icon: '🪟',
    title: 'Vertical Space',
    desc: 'Cats feel safest at height. Without climbing and perching opportunities, they become stressed and territorial. A window perch gives them a safe, enriching vantage point.',
  },
  {
    icon: '🏠',
    title: 'Hiding Spots',
    desc: 'Cats need places to retreat when overstimulated. A cave or enclosed bed lets them self-regulate stress — without this, anxiety compounds into destructive behavior.',
  },
];

const SIGNS = [
  { sign: 'Overgrooming or hair loss', cause: 'Stress or boredom' },
  { sign: 'Excessive vocalization', cause: 'Under-stimulation or frustration' },
  { sign: 'Aggression toward owners', cause: 'Redirected predatory drive' },
  { sign: 'Eating too fast or too slow', cause: 'Anxiety-based eating patterns' },
  { sign: 'Weight gain', cause: 'Insufficient activity' },
  { sign: 'Urinary issues', cause: 'Dehydration from insufficient water intake' },
];

const FAQ = [
  {
    q: 'How much playtime do indoor cats need?',
    a: 'Veterinary behaviorists recommend at least two active play sessions of 10–15 minutes each per day. Wand toys and interactive feather teasers are most effective because you control the movement, mimicking real prey behavior.',
  },
  {
    q: 'Do water fountains really help cats?',
    a: 'Yes — significantly. Cats have a low thirst drive because their ancestors got most moisture from prey. Running water triggers drinking instinct. Cats with fountains drink 50–100% more water daily, which dramatically reduces the risk of urinary crystals, kidney disease, and UTIs.',
  },
  {
    q: 'My cat sleeps all day. Is that normal?',
    a: 'Cats sleep 12–16 hours naturally, but if your cat is lethargic even during waking hours or has lost interest in play entirely, that\'s a sign of boredom or depression. Add enrichment (window perch, interactive play, puzzle feeders) and see if activity levels return within 2 weeks.',
  },
  {
    q: 'Should indoor cats have a hiding spot?',
    a: 'Absolutely — it\'s not optional for their mental health. Cats need to feel in control of their environment. Having a retreat they can disappear into reduces baseline stress and prevents stress-related behaviors like spraying, overgrooming, and aggression.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function IndoorCatsPage() {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🐱 Indoor Cat Essentials
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Everything Your<br className="hidden sm:block" /> Indoor Cat Needs
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8">
            Indoor cats live longer but need more from us. The right enrichment, hydration, and safe spaces are the difference between a thriving cat and a stressed one.
          </p>
          <Link
            href="#products"
            className="inline-block bg-teal-400 hover:bg-teal-300 text-teal-900 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Indoor Cat Picks →
          </Link>
        </div>
      </section>

      {/* What they need */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-10">The 4 Things Indoor Cats Need (That Most Don't Get)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {NEEDS.map((n) => (
              <div key={n.title} className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-3xl flex-shrink-0">{n.icon}</div>
                <div>
                  <h3 className="font-black text-navy-900 mb-1">{n.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section className="py-12 bg-amber-50 border-y border-amber-100 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-navy-900 text-center mb-6">Signs Your Indoor Cat Needs More Enrichment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIGNS.map(({ sign, cause }) => (
              <div key={sign} className="bg-white rounded-xl p-4 border border-amber-100 flex items-start gap-3">
                <span className="text-amber-500 font-black text-lg mt-0.5">⚠</span>
                <div>
                  <div className="font-bold text-navy-900 text-sm">{sign}</div>
                  <div className="text-amber-700 text-xs mt-0.5">{cause}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-navy-900 mb-3">Top Picks for Indoor Cats</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Vet-recommended for enrichment, hydration, and mental wellbeing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/cats"
              className="inline-block bg-white border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200"
            >
              View All Cat Products →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">Indoor Cat FAQs</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-navy-900 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
