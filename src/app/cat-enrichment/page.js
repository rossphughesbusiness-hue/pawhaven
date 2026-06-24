import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Cat Enrichment Toys & Activities 2026 | PawHaven',
  description: 'Cat enrichment toys that actually engage indoor cats — tunnels, laser toys, feather wands, puzzle feeders, and window perches. Prevent boredom, reduce stress.',
  alternates: { canonical: 'https://pawhavenpets.org/cat-enrichment' },
  openGraph: {
    title: 'Best Cat Enrichment Toys & Activities 2026 — PawHaven',
    description: 'Indoor cats need more than a food bowl. The right enrichment toys prevent boredom, reduce anxiety, and give your cat an outlet for natural hunting instincts.',
    url: 'https://pawhavenpets.org/cat-enrichment',
    type: 'website',
  },
};

const ENRICHMENT_SLUGS = [
  'cat-tunnel-crinkle-play-tube',
  'feather-wand-cat-teaser',
  'interactive-automatic-laser-toy',
  'iq-puzzle-feeder-toy',
];

const ENRICHMENT_TYPES = [
  {
    icon: '🏃',
    title: 'Physical Play',
    desc: 'Tunnels, wands, and laser toys trigger the chase instinct. 10–15 minutes of active play per day is enough to meaningfully reduce boredom-related behaviors like excessive meowing, furniture scratching, and overgrooming.',
  },
  {
    icon: '🧩',
    title: 'Mental Stimulation',
    desc: 'Puzzle feeders turn mealtime into a hunting exercise. Cats who work for their food eat slower, stay mentally sharp, and experience less anxiety. A puzzle feeder at breakfast replaces 30 minutes of pacing or destructive behavior.',
  },
  {
    icon: '🪟',
    title: 'Environmental Enrichment',
    desc: 'Window perches give cats a "job" — watching birds, squirrels, and the outside world. This passive enrichment reduces stress hormones significantly in indoor-only cats, especially those home alone during the day.',
  },
  {
    icon: '🎯',
    title: 'Prey Sequence Play',
    desc: 'Cats need to complete the full hunt cycle: stalk → chase → pounce → catch. Wand toys let you mimic live prey movement so cats experience a satisfying full hunt, which is critical for psychological wellbeing.',
  },
];

const SCHEDULE = [
  {
    time: 'Morning',
    activity: 'Puzzle feeder breakfast',
    duration: '5–10 min',
    benefit: 'Mental stimulation, slower eating',
  },
  {
    time: 'Midday',
    activity: 'Laser toy or automated play',
    duration: '15 min',
    benefit: 'Physical exercise while you\'re out',
  },
  {
    time: 'Evening',
    activity: 'Interactive wand play + catch',
    duration: '10–15 min',
    benefit: 'Bonding + completes prey sequence',
  },
  {
    time: 'Night',
    activity: 'Crinkle tunnel exploration',
    duration: 'Ongoing',
    benefit: 'Independent play before bed',
  },
];

const FAQ_ENRICHMENT = [
  {
    q: 'How do I know if my cat is bored?',
    a: 'Signs of feline boredom include: excessive meowing or vocalization, overgrooming (licking patches bald), furniture scratching, knocking objects off surfaces, aggression toward other pets, and weight gain from inactivity. Most of these behaviors are preventable with 20–30 minutes of daily enrichment.',
  },
  {
    q: 'How much playtime does an indoor cat need?',
    a: 'Veterinary behaviorists recommend at least two 10–15 minute interactive play sessions per day for indoor cats. Kittens and young adult cats need more — up to 30–40 minutes total. The sessions don\'t need to be long; frequent short sessions are more effective than one long one because they mirror natural hunting patterns.',
  },
  {
    q: 'Do cats actually like crinkle tunnels?',
    a: 'Most cats are strongly attracted to crinkle tunnels. The rustling sound mimics the sound of small prey moving through undergrowth, which triggers hunting instincts. The enclosed space also appeals to cats\' preference for hiding spots from which to observe and ambush. Multi-cat households often see cats ambushing each other through the tunnel openings.',
  },
  {
    q: 'What is the best enrichment toy for a lazy cat?',
    a: 'For cats that don\'t self-motivate easily, automated toys work best — particularly laser toys that move unpredictably without requiring you to operate them. The unpredictable movement pattern triggers the prey response even in low-energy cats. Start sessions before meals when your cat is hungriest and most motivated to chase.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Cat Enrichment', item: 'https://pawhavenpets.org/cat-enrichment' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ENRICHMENT.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function CatEnrichmentPage() {
  const featured = ENRICHMENT_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);
  const moreCatProducts = products
    .filter((p) => p.category === 'Cats' && !ENRICHMENT_SLUGS.includes(p.slug))
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-brand-500 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none text-[200px] leading-none flex flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>🐱</span>)}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🐱 Cat Enrichment
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Your Indoor Cat<br className="hidden sm:block" /> Needs More Than a Bowl
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Indoor cats live up to 3x longer than outdoor cats — but they need enrichment to thrive mentally. Tunnels, wand toys, puzzle feeders, and laser toys give them an outlet for natural instincts.
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-purple-600 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Enrichment Toys →
          </Link>
        </div>
      </section>

      {/* ─── Enrichment types ─── */}
      <section className="bg-purple-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">The 4 Types of Cat Enrichment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENRICHMENT_TYPES.map((type) => (
              <div key={type.title} className="text-center bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
                <div className="text-4xl mb-3">{type.icon}</div>
                <div className="font-bold text-navy-900 text-sm mb-2">{type.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{type.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured products ─── */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">Top Picks</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4">Best Cat Enrichment Toys for 2026</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Covering all four enrichment types — physical play, mental stimulation, environmental enrichment, and prey sequence completion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* Daily enrichment schedule */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-2 text-center">The Ideal Daily Enrichment Schedule</h2>
            <p className="text-gray-500 text-sm text-center mb-8">30 minutes total across 4 sessions — most cats flourish on this routine</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SCHEDULE.map(({ time, activity, duration, benefit }) => (
                <div key={time} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                  <div className="font-black text-purple-600 text-xs uppercase tracking-wider mb-1">{time}</div>
                  <div className="font-bold text-navy-900 text-sm mb-1">{activity}</div>
                  <div className="text-xs text-brand-500 font-semibold mb-2">{duration}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{benefit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO prose */}
          <div className="prose max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-4">Why Cat Enrichment Is Not Optional</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Domestic cats are obligate hunters. Even well-fed indoor cats have a hardwired drive to stalk, chase, pounce, and catch — and when they can\'t express these behaviors, the frustration manifests as behavioral problems: destructive scratching, aggression, anxiety, and stress-related illnesses.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The <Link href="/products/cat-tunnel-crinkle-play-tube" className="text-brand-500 hover:underline">crinkle tunnel</Link> is one of the most versatile enrichment tools available. The sound mimics prey rustling through undergrowth, the enclosed space provides a hunting blind, and the multiple openings allow ambush play between cats. Most cats figure it out within minutes and use it independently throughout the day.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For interactive play, nothing replaces a <Link href="/products/feather-wand-cat-teaser" className="text-brand-500 hover:underline">feather wand</Link> operated by a human. Wand toys allow you to mimic the erratic, unpredictable movement of real prey — something automated toys can\'t fully replicate. The key is to let your cat "catch" the toy every few minutes so they complete the prey sequence and don\'t become frustrated.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For cats left home alone, the <Link href="/products/interactive-automatic-laser-toy" className="text-brand-500 hover:underline">automatic laser toy</Link> provides stimulation without requiring your presence. Set it to run for 15–20 minutes at midday and your cat gets physical exercise and mental engagement at their most active time.
            </p>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ_ENRICHMENT.map(({ q, a }) => (
                <details key={q} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-bold text-navy-900 text-sm list-none">
                    {q}
                    <span className="flex-shrink-0 text-brand-500 group-open:rotate-180 transition-transform duration-200">▾</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* More cat products */}
          <h3 className="text-2xl font-black text-navy-900 mb-6 text-center">More for Your Cat</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreCatProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-purple-600 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4">🐱</div>
          <h2 className="text-3xl font-black mb-4">Give Your Cat the Stimulation They Need</h2>
          <p className="text-white/80 mb-8">Free shipping over $50. 30-day returns. Vet-recommended products.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cats" className="inline-block bg-white text-purple-600 font-bold text-base px-8 py-4 rounded-full hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              All Cat Products →
            </Link>
            <Link href="/indoor-cats" className="inline-block border-2 border-white text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200">
              Indoor Cat Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
