import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Cat Accessories — PawHaven',
  description: 'Shop premium cat accessories: water fountains, interactive toys, cozy caves, grooming gloves, and more. Free shipping over $50.',
  alternates: { canonical: 'https://pawhavenpets.org/cats' },
  openGraph: {
    title: 'Premium Cat Accessories — PawHaven',
    description: 'Everything your cat deserves — vet-approved accessories for health, enrichment, and comfort.',
    url: 'https://pawhavenpets.org/cats',
    type: 'website',
  },
};

const catProducts = products.filter((p) => p.category === 'Cats');

const CATEGORIES = [
  { tag: null,        label: 'All',        emoji: '🐱' },
  { tag: 'Health',    label: 'Health',     emoji: '💧' },
  { tag: 'Toys',      label: 'Toys',       emoji: '🪀' },
  { tag: 'Comfort',   label: 'Comfort',    emoji: '🛏' },
  { tag: 'Grooming',  label: 'Grooming',   emoji: '✨' },
  { tag: 'Travel',    label: 'Travel',     emoji: '✈️' },
];

const HIGHLIGHTS = [
  { icon: '🩺', title: 'Vet-Recommended', desc: 'Cat health is our priority — every product is vetted.' },
  { icon: '🚚', title: 'Free Shipping',   desc: 'Free on all orders over $50. Arrives in 7–14 days.' },
  { icon: '↩️', title: '30-Day Returns',  desc: 'If your cat isn\'t impressed, neither is your bill.' },
  { icon: '😸', title: 'Cat-Approved',    desc: 'Tested by real cats (and their very opinionated owners).' },
];

const FEATURED_SLUGS = [
  'silent-cat-water-fountain',
  'feather-wand-cat-teaser',
  'cozy-cat-cave-hideaway',
  'cat-deshedding-grooming-glove',
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Cats', item: 'https://pawhavenpets.org/cats' },
  ],
};

export default function CatsPage({ searchParams }) {
  const activeTag = searchParams?.tag || null;
  const filtered = activeTag
    ? catProducts.filter((p) => p.tag === activeTag)
    : catProducts;
  const featured = FEATURED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-brand-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[200px] leading-none overflow-hidden flex flex-wrap gap-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="opacity-20">😸</span>
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Cats</span>
          </nav>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-semibold mb-6">
              🐱 For Cat Owners
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-5">
              For the World\'s Pickiest Pets
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Premium cat accessories designed around how cats actually live — independent, curious, and always a little dramatic. Your cat will be impressed. Maybe.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#products"
                className="bg-brand-500 hover:bg-brand-400 text-white font-black px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5"
              >
                Shop Cat Products →
              </Link>
              <Link
                href="/quiz"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full border border-white/20 transition-all backdrop-blur-sm"
              >
                🎯 Find My Cat\'s Perfect Match
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

      {/* ─── Featured ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-navy-900">Top Cat Picks</h2>
              <p className="text-gray-500 text-sm mt-1">Our best-loved accessories for cats</p>
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
          <h2 className="text-2xl font-black text-navy-900 mb-4">Cat Accessories That Actually Work</h2>
          <div className="prose prose-gray max-w-none text-gray-600 text-base leading-relaxed space-y-4">
            <p>
              Cats are notoriously hard to please — which is why we\'ve done the work of finding products they\'ll actually use.
              PawHaven\'s cat collection focuses on three things: hydration, enrichment, and comfort. Because a bored, dehydrated
              cat is a destructive one.
            </p>
            <p>
              Our{' '}
              <Link href="/products/silent-cat-water-fountain" className="text-brand-500 font-semibold hover:underline">
                silent cat water fountain
              </Link>{' '}
              encourages cats to drink more by mimicking running water — a natural instinct. Running water stays
              oxygenated and fresh, which is better for your cat\'s kidneys long-term. Our{' '}
              <Link href="/products/feather-wand-cat-teaser" className="text-brand-500 font-semibold hover:underline">
                feather wand teaser
              </Link>{' '}
              triggers your cat\'s natural prey drive for a healthy daily workout, and our{' '}
              <Link href="/products/cozy-cat-cave-hideaway" className="text-brand-500 font-semibold hover:underline">
                cozy cave hideaway
              </Link>{' '}
              gives anxious or shy cats a safe space to decompress.
            </p>
            <p>
              Have multiple cats? Take our{' '}
              <Link href="/quiz" className="text-brand-500 font-semibold hover:underline">
                quick quiz
              </Link>{' '}
              and we\'ll help you find the right products for each of their unique personalities.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Browse by category ─── */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy-900 mb-8">All Cat Products</h2>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const href = cat.tag ? `/cats?tag=${encodeURIComponent(cat.tag)}` : '/cats';
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
                    ({cat.tag ? catProducts.filter((p) => p.tag === cat.tag).length : catProducts.length})
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
              <div className="text-5xl mb-4">🐱</div>
              <p className="text-gray-500">No products in this category yet.</p>
              <Link href="/cats" className="text-brand-500 font-semibold mt-2 inline-block hover:underline">
                View all cat products →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── Related links ─── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-bold text-navy-900 mb-5 text-center">Explore Cat Care</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: '/cat-feeding', label: '🍽️ Cat Feeding', desc: 'Bowls, feeders & portion tips' },
              { href: '/cat-grooming', label: '✂️ Cat Grooming', desc: 'Brushes, nail tools & more' },
              { href: '/outdoor-cats', label: '🌿 Outdoor Cats', desc: 'Safety & gear for outdoor cats' },
              { href: '/cat-anxiety', label: '😿 Cat Anxiety', desc: 'Calming & stress relief' },
              { href: '/senior-cats', label: '🌸 Senior Cats', desc: 'Comfort & care for 7+' },
              { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Puzzles & mental stim' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="bg-white hover:bg-purple-50 rounded-xl p-4 text-center transition-colors border border-gray-100">
                <div className="font-bold text-navy-900 text-sm">{label}</div>
                <div className="text-xs text-gray-500 mt-1">{desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🐱</div>
          <h2 className="text-3xl font-black text-white mb-3">Not sure what your cat needs?</h2>
          <p className="text-gray-400 mb-7">
            Take our 60-second quiz and get personalized recommendations for your cat\'s personality and lifestyle.
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
    </>
  );
}
