import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Accessories for Small Dogs — PawHaven',
  description: 'The best harnesses, feeders, toys, and beds for small dog breeds. Vet-recommended picks sized right for Chihuahuas, Yorkies, Shih Tzus, and more.',
  alternates: { canonical: 'https://pawhavenpets.org/small-dogs' },
  openGraph: {
    title: 'Best Accessories for Small Dogs — PawHaven',
    description: 'Perfectly-sized picks for small dogs. Harnesses that won\'t choke, slow feeders for tiny tummies, and calming beds they\'ll love.',
    url: 'https://pawhavenpets.org/small-dogs',
    type: 'website',
  },
};

const FEATURED_SLUGS = [
  'reflective-step-in-harness',
  'calming-lick-mat',
  'maze-slow-feeder-bowl',
  'crinkle-squeaky-toy-bundle',
];

const TIPS = [
  {
    icon: '🦺',
    title: 'Skip the Collar for Walks',
    desc: 'Small dogs are disproportionately at risk of tracheal collapse from collar pressure. A step-in harness distributes force across the chest — much safer.',
  },
  {
    icon: '🥣',
    title: 'Small Tummies Need Slow Feeders',
    desc: 'Small breeds can bloat from eating too fast. Slow feeders extend meal time 5–10x and dramatically reduce bloat risk and post-meal vomiting.',
  },
  {
    icon: '😰',
    title: 'Watch for "Small Dog Syndrome"',
    desc: 'Under-stimulated small dogs develop anxiety and aggression. Daily enrichment with puzzle toys and lick mats addresses the root cause — boredom.',
  },
  {
    icon: '🛏',
    title: 'Warmth & Security Matter More',
    desc: 'Small dogs lose body heat faster and feel more exposed. A raised-edge calming bed satisfies their instinct to burrow and keeps them warm through the night.',
  },
];

const BREEDS = [
  'Chihuahua', 'Yorkshire Terrier', 'Shih Tzu', 'Pomeranian',
  'Maltese', 'Dachshund', 'Toy Poodle', 'French Bulldog',
  'Boston Terrier', 'Pug', 'Cavalier King Charles Spaniel', 'Miniature Schnauzer',
];

const FAQ = [
  {
    q: 'What size harness do small dogs need?',
    a: 'Most dogs under 15 lbs wear an XS–S harness. Measure your dog\'s chest girth (just behind the front legs) — the harness should fit snugly with two fingers of clearance. Step-in designs are easiest for small dogs that dislike things going over their head.',
  },
  {
    q: 'Do small dogs need special slow feeder bowls?',
    a: 'Yes — most standard slow feeder bowls are designed for medium-to-large dogs. The maze depth can be too deep for small snouts. Look for shallow-maze designs, or use a flat lick mat for small breeds.',
  },
  {
    q: 'Why are small dogs more prone to anxiety?',
    a: 'Small dogs\' nervous systems are more reactive to environmental stimuli. They hear and sense more, and feel more physically vulnerable. Daily enrichment, consistent routines, and calming beds all reduce this baseline anxiety significantly.',
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

export default function SmallDogsPage() {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🐶 Small Dog Essentials
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Big Care for<br className="hidden sm:block" /> Little Dogs
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8">
            Small dogs have unique needs — trachea-safe harnesses, shallow feeders, and enrichment sized for tiny paws. Here's what vets actually recommend.
          </p>
          <Link
            href="#products"
            className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Small Dog Picks →
          </Link>
        </div>
      </section>

      {/* Breeds */}
      <section className="py-10 px-4 border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">These picks are perfect for</p>
          <div className="flex flex-wrap justify-center gap-2">
            {BREEDS.map((b) => (
              <span key={b} className="text-sm bg-white border border-gray-200 rounded-full px-3 py-1.5 text-navy-900 font-medium shadow-sm">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-10">What Small Dog Owners Need to Know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TIPS.map((t) => (
              <div key={t.title} className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-3xl flex-shrink-0">{t.icon}</div>
                <div>
                  <h3 className="font-black text-navy-900 mb-1">{t.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
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
            <h2 className="text-3xl font-black text-navy-900 mb-3">Top Picks for Small Dogs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Tested for size, safety, and small-dog physiology.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/dogs"
              className="inline-block bg-white border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200"
            >
              View All Dog Products →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">Small Dog FAQs</h2>
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
