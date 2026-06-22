import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Dog Accessories — PawHaven',
  description: 'Shop vet-recommended dog accessories: slow feeder bowls, harnesses, LED collars, orthopedic beds, and more. Free shipping over $50.',
  alternates: { canonical: 'https://pawhavenpets.org/dogs' },
  openGraph: {
    title: 'Premium Dog Accessories — PawHaven',
    description: 'Everything your dog deserves — vet-approved accessories for health, safety, comfort, and play.',
    url: 'https://pawhavenpets.org/dogs',
    type: 'website',
  },
};

const dogProducts = products.filter((p) => p.category === 'Dogs');

const CATEGORIES = [
  { tag: null,          label: 'All', emoji: '🐶' },
  { tag: 'Feeding',     label: 'Feeding',   emoji: '🥣' },
  { tag: 'Safety',      label: 'Walking & Safety', emoji: '🦮' },
  { tag: 'Comfort',     label: 'Comfort',   emoji: '🛏' },
  { tag: 'Grooming',    label: 'Grooming',  emoji: '✨' },
  { tag: 'Travel',      label: 'Travel',    emoji: '✈️' },
  { tag: 'Toys',        label: 'Toys',      emoji: '🎾' },
  { tag: 'Enrichment',  label: 'Enrichment', emoji: '🧠' },
];

const HIGHLIGHTS = [
  { icon: '🩺', title: 'Vet-Approved',    desc: 'Every product reviewed by licensed vets before listing.' },
  { icon: '🚚', title: 'Free Shipping',   desc: 'Free on orders over $50. Fast 7–14 day delivery.' },
  { icon: '↩️', title: '30-Day Returns',  desc: 'Not happy? Return it, no questions asked.' },
  { icon: '⭐', title: '10,000+ Reviews', desc: 'Trusted by dog owners across the country.' },
];

const FEATURED_SLUGS = [
  'maze-slow-feeder-bowl',
  'safeglow-led-collar',
  'reflective-step-in-harness',
  'orthopedic-memory-foam-dog-bed',
];

export default function DogsPage({ searchParams }) {
  const activeTag = searchParams?.tag || null;
  const filtered = activeTag
    ? dogProducts.filter((p) => p.tag === activeTag)
    : dogProducts;
  const featured = FEATURED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-brand-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[200px] leading-none overflow-hidden flex flex-wrap gap-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="opacity-20">🐾</span>
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Dogs</span>
          </nav>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-semibold mb-6">
              🐶 For Dog Owners
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-5">
              Everything Your Dog Deserves
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Vet-recommended accessories built to improve your dog's health, safety, and happiness — whether they're a pup or a senior.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#products"
                className="bg-brand-500 hover:bg-brand-400 text-white font-black px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5"
              >
                Shop Dog Products →
              </Link>
              <Link
                href="/quiz"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full border border-white/20 transition-all backdrop-blur-sm"
              >
                🎯 Find My Dog's Perfect Match
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Highlights ─── */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{h.icon}</span>
                <div>
                  <div className="font-bold text-navy-900 text-sm">{h.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5 leading-snug">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured (top picks) ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-navy-900">Top Dog Picks</h2>
              <p className="text-gray-500 text-sm mt-1">Our best-selling accessories for dogs</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO content block ─── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy-900 mb-4">Premium Dog Accessories for Every Need</h2>
          <div className="prose prose-gray max-w-none text-gray-600 text-base leading-relaxed space-y-4">
            <p>
              Whether you have a playful puppy or a senior companion, the right accessories can make a huge difference in
              their daily life. At PawHaven, we curate every dog product with one goal in mind: helping your dog live their
              happiest, healthiest life.
            </p>
            <p>
              Our <Link href="/products/maze-slow-feeder-bowl" className="text-brand-500 font-semibold hover:underline">slow feeder bowls</Link> are
              designed to prevent bloat and promote healthy eating habits in fast-eating dogs. Our{' '}
              <Link href="/products/reflective-step-in-harness" className="text-brand-500 font-semibold hover:underline">reflective step-in harnesses</Link>{' '}
              distribute pressure evenly across the chest — far safer than collars for dogs who pull on leash. And our{' '}
              <Link href="/products/orthopedic-memory-foam-dog-bed" className="text-brand-500 font-semibold hover:underline">orthopedic memory foam beds</Link>{' '}
              are vet-recommended for dogs with arthritis or joint pain.
            </p>
            <p>
              Not sure what your dog needs? Take our <Link href="/quiz" className="text-brand-500 font-semibold hover:underline">2-minute pet quiz</Link> and
              we'll match them with their perfect accessories — based on their size, breed type, and your priorities.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Browse by category ─── */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy-900 mb-8">All Dog Products</h2>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const href = cat.tag ? `/dogs?tag=${encodeURIComponent(cat.tag)}` : '/dogs';
              const isActive = activeTag === cat.tag;
              return (
                <Link
                  key={cat.label}
                  href={href}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-500'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                  <span className={`text-xs font-normal ml-0.5 ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                    ({cat.tag ? dogProducts.filter((p) => p.tag === cat.tag).length : dogProducts.length})
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🐶</div>
              <p className="text-gray-500">No products in this category yet.</p>
              <Link href="/dogs" className="text-brand-500 font-semibold mt-2 inline-block hover:underline">
                View all dog products →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🐶</div>
          <h2 className="text-3xl font-black text-white mb-3">Not sure where to start?</h2>
          <p className="text-gray-400 mb-7">
            Take our 60-second quiz and get personalized product recommendations for your dog.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-brand-500 hover:bg-brand-400 text-white font-black px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            Start the Pet Quiz →
          </Link>
        </div>
      </section>
    </div>
  );
}
