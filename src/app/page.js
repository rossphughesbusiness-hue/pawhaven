import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import HomepageRecentlyViewed from '@/components/HomepageRecentlyViewed';
import { products } from '@/lib/products';
import { getBundles } from '@/lib/bundles';

export const metadata = {
  title: 'PawHaven — Premium Pet Accessories for Dogs & Cats',
  description:
    'Shop quality accessories for dogs and cats. Slow feeders, harnesses, cat fountains, puzzle toys and more. Free shipping on orders over $50. 30-day returns.',
  alternates: { canonical: 'https://pawhavenpets.org' },
  openGraph: {
    title: 'PawHaven — Premium Pet Accessories',
    description: 'Quality accessories for dogs and cats. Free shipping on $50+.',
    url: 'https://pawhavenpets.org',
    siteName: 'PawHaven',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'PawHaven pet accessories',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PawHaven — Premium Pet Accessories',
    description: 'Quality accessories for dogs and cats. Free shipping on $50+.',
  },
};

const trustItems = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: '↩️', title: '30-Day Returns', desc: 'Hassle-free, no questions asked' },
  { icon: '🛡️', title: 'Secure Checkout', desc: '256-bit SSL encryption' },
  { icon: '⭐', title: 'Satisfaction Guaranteed', desc: '30-day money-back guarantee' },
];

const features = [
  {
    icon: '🔬',
    title: 'Carefully Selected Products',
    desc: 'Every item is chosen for safety, durability, and value before it is listed in our store.',
  },
  {
    icon: '🌍',
    title: 'Sourced From Trusted Manufacturers',
    desc: 'We work with established manufacturers and review product quality and materials before listing.',
  },
  {
    icon: '💚',
    title: 'Safe for Every Pet',
    desc: 'BPA-free materials, non-toxic dyes, and pet-safe construction on every single product.',
  },
];


const stats = [
  { value: '40+', label: 'Curated Products' },
  { value: '30 Days', label: 'Free Returns' },
  { value: '40+', label: 'Carefully Selected Products' },
  { value: '30 Days', label: 'Free Returns' },
];

function BundlesTeaser() {
  const bundles = getBundles().slice(0, 3);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">Save More</p>
          <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
            Curated Bundle Deals 🎁
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Hand-picked combinations at up to 20% off. Everything your pet needs, in one click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {bundles.map((bundle) => (
            <Link
              key={bundle.id}
              href={`/bundles#${bundle.id}`}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Gradient header */}
              <div
                className="px-6 py-8 text-white text-center"
                style={{ background: bundle.gradient }}
              >
                <div className="text-5xl mb-3">{bundle.emoji}</div>
                <h3 className="font-black text-xl leading-tight mb-1">{bundle.name}</h3>
                <p className="text-white/80 text-sm">{bundle.tagline}</p>
              </div>

              {/* Pricing */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 line-through mb-0.5">
                    ${bundle.originalTotal.toFixed(2)} separately
                  </div>
                  <div className="text-2xl font-black text-navy-900">
                    ${bundle.bundleTotal.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-emerald-50 text-emerald-700 text-sm font-bold px-3 py-1.5 rounded-full">
                    Save ${bundle.savings.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{bundle.savingsPct}% off</div>
                </div>
              </div>

              {/* Item count */}
              <div className="px-6 pb-5">
                <div className="text-xs text-gray-400 mb-3">{bundle.products.length} items included</div>
                <div className="w-full py-3 bg-navy-900 group-hover:bg-brand-500 text-white text-sm font-bold rounded-2xl text-center transition-colors duration-200">
                  Shop This Bundle →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/bundles"
            className="inline-flex items-center gap-2 text-brand-500 font-bold hover:underline text-base"
          >
            View all {getBundles().length} bundles →
          </Link>
        </div>
      </div>
    </section>
  );
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://pawhavenpets.org/#website',
      url: 'https://pawhavenpets.org',
      name: 'PawHaven',
      description: 'Quality pet accessories for dogs and cats.',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://pawhavenpets.org/products?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://pawhavenpets.org/#organization',
      name: 'PawHaven',
      url: 'https://pawhavenpets.org',
      logo: { '@type': 'ImageObject', url: 'https://pawhavenpets.org/logo.png' },
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@pawhavenpets.org' },
      sameAs: ['https://www.instagram.com/pawhavenpets', 'https://www.tiktok.com/@pawhavenpets'],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      {/* ─── HERO ─── */}
      <section className="relative text-white overflow-hidden min-h-[85vh] flex items-center">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581888227599-779811939961?w=1600&q=85&auto=format&fit=crop')",
          }}
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            {/* Pre-headline pill */}
            <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              Free Shipping on Orders $50+
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-balance mb-6 animate-fade-up">
              Your Pet Deserves{' '}
              <span className="text-gradient bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
                the Best.
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Thoughtfully chosen accessories that help dogs and cats feel healthier, calmer,
              and happier. Free shipping on orders over $50.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 active:scale-95"
              >
                Shop Best Sellers
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                ✨ Find My Pet&apos;s Match
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap items-center gap-6 mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {['✅ 30-Day Returns', '📦 Ships in 1–2 Days', '🔒 Secure Checkout'].map((item) => (
                <span key={item} className="text-gray-400 text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SHOP BY CATEGORY ─── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Curated collections for every pet and every need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dogs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐶</span>
                <h3 className="text-lg font-black text-navy-900">Dogs</h3>
                <Link href="/dogs" className="ml-auto text-xs text-brand-500 font-semibold hover:underline">See all →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: '/dog-toys', emoji: '🧸', label: 'Dog Toys', desc: 'Tug, puzzle & squeaky' },
                  { href: '/dog-beds', emoji: '🛏️', label: 'Dog Beds', desc: 'Orthopedic & cooling' },
                  { href: '/dog-walking', emoji: '🐾', label: 'Walking Gear', desc: 'Harness, leash & more' },
                  { href: '/dog-training', emoji: '🎯', label: 'Training', desc: 'Treat pouches & gear' },
                  { href: '/dog-anxiety', emoji: '🧘', label: 'Dog Anxiety', desc: 'Calming & stress relief' },
                  { href: '/senior-dogs', emoji: '🦮', label: 'Senior Dogs', desc: 'Joint & mobility care' },
                  { href: '/puppies', emoji: '🐕', label: 'Puppies', desc: 'New puppy essentials' },
                  { href: '/dog-enrichment', emoji: '🧠', label: 'Enrichment', desc: 'Puzzles & mental stim' },
                ].map(({ href, emoji, label, desc }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-100 hover:border-amber-200 transition-all duration-200 group"
                  >
                    <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{emoji}</span>
                    <div>
                      <div className="text-sm font-bold text-navy-900">{label}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Cats */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐱</span>
                <h3 className="text-lg font-black text-navy-900">Cats</h3>
                <Link href="/cats" className="ml-auto text-xs text-brand-500 font-semibold hover:underline">See all →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: '/cat-toys', emoji: '🧶', label: 'Cat Toys', desc: 'Wands, lasers & tunnels' },
                  { href: '/cat-beds', emoji: '😴', label: 'Cat Beds', desc: 'Caves, perches & more' },
                  { href: '/cat-enrichment', emoji: '🎾', label: 'Enrichment', desc: 'Puzzles & mental stim' },
                  { href: '/kittens', emoji: '🐱', label: 'Kittens', desc: 'New kitten essentials' },
                  { href: '/senior-cats', emoji: '🌸', label: 'Senior Cats', desc: 'Comfort & care for 7+' },
                  { href: '/indoor-cats', emoji: '🏠', label: 'Indoor Cats', desc: 'Essential indoor kit' },
                  { href: '/cat-anxiety', emoji: '😿', label: 'Cat Anxiety', desc: 'Calming products' },
                  { href: '/cats', emoji: '🐱', label: 'All Cat Products', desc: 'Browse everything' },
                ].map(({ href, emoji, label, desc }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 transition-all duration-200 group"
                  >
                    <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{emoji}</span>
                    <div>
                      <div className="text-sm font-bold text-navy-900">{label}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-3 p-6">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-navy-900 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─── */}
      <section id="best-sellers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">
              Hand-Picked Winners
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
              Our Best Sellers
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A hand-picked selection of practical, well-made products for dogs and cats.
            </p>
          </div>

          {/* Product grid — top 8 by soldCount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...products]
              .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
              .slice(0, 8)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-1">Just Landed</p>
              <h2 className="text-3xl font-black text-navy-900">New Arrivals</h2>
            </div>
            <Link href="/new-arrivals" className="text-brand-500 font-semibold hover:underline text-sm">View all →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...products]
              .filter(p => [36, 37, 38, 39, 40].includes(p.id))
              .map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-gray-100"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-0.5">{product.tag}</p>
                    <p className="font-bold text-navy-900 text-sm leading-tight mb-1 group-hover:text-brand-500 transition-colors">{product.shortName || product.name}</p>
                    <p className="font-black text-navy-900 text-sm">${product.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="bg-brand-500 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-brand-100 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY PAWHAVEN ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">
              Our Promise
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
              Why Pet Owners Choose Us
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We&apos;re pet owners too. We only sell what we&apos;d give our own animals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-3xl p-8 hover:bg-brand-50 hover:border-brand-100 border border-transparent transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUNDLE DEALS ─── */}
      <BundlesTeaser />

      {/* ─── RECENTLY VIEWED (returning visitors only) ─── */}
      <HomepageRecentlyViewed />

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6 animate-bounce2">🐾</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Join the PawHaven Pack
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get exclusive deals, vet tips, and new product drops straight to your inbox.
            Plus — <span className="text-brand-400 font-semibold">10% off your first order.</span>
          </p>
          <NewsletterForm />
          <p className="text-gray-600 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
