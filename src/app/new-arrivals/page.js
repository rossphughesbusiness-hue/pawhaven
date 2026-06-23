import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';

export const metadata = {
  title: 'New Arrivals 2026 — Just Added to PawHaven',
  description:
    'Five new vet-reviewed products just landed at PawHaven — snuffle mats, paw balm, cat puzzle feeders, a self-grooming corner brush, and a reflective safety vest. Shop what\'s new.',
  alternates: { canonical: 'https://pawhavenpets.org/new-arrivals' },
  openGraph: {
    title: 'New Arrivals 2026 — Just Added to PawHaven',
    description: 'Fresh drops: snuffle mat, paw balm stick, cat puzzle feeder, corner groomer & reflective vest.',
    url: 'https://pawhavenpets.org/new-arrivals',
    siteName: 'PawHaven',
    type: 'website',
  },
};

const NEW_SLUGS = [
  'dog-snuffle-mat',
  'cat-self-groomer-wall-corner',
  'dog-paw-balm-stick',
  'cat-puzzle-slow-feeder',
  'dog-reflective-safety-vest',
];

const WHY_BLURBS = {
  'dog-snuffle-mat':
    'We\'ve always carried puzzle feeders, but snuffle mats fill a different gap: slow, nose-led enrichment that mirrors how dogs forage naturally. They\'re especially effective for anxious dogs and high-energy breeds that need mental work, not just physical exercise.',
  'cat-self-groomer-wall-corner':
    'Cats groom themselves constantly, but owners rarely give them a tool that lets them control their own coat care. The corner brush fills that gap — it works entirely on the cat\'s terms, requires zero owner effort, and visibly reduces shedding on furniture within a week.',
  'dog-paw-balm-stick':
    'Paw care is the most overlooked part of dog grooming. Most owners don\'t think about it until pads crack. The stick format removes the one barrier that stopped owners from using balm consistently: the mess. Twist-up, apply in 30 seconds, done.',
  'cat-puzzle-slow-feeder':
    'Slow feeders for dogs have been a store staple from day one. We added this to give cat owners the same digestion and enrichment benefit at mealtime. The multi-level design — rotating discs, tunnels, and wells — is the only cat puzzle feeder we\'ve tested that holds a cat\'s interest past the first week.',
  'dog-reflective-safety-vest':
    'We already carry an LED collar for night visibility. The safety vest fills the budget gap for owners who want high-visibility protection without electronics to charge. The 360° retroreflective strips bounce headlights back 500 feet — more coverage, less maintenance.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often does PawHaven add new products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We add new products approximately every 4–6 weeks. Each product is reviewed by our vet advisory team before it goes live, so we add new arrivals in small batches rather than all at once. Sign up for our newsletter to be the first to know.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request a product for PawHaven to carry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we read every message sent through our contact page. Product requests are reviewed quarterly and we\'ve added several products based on direct customer input. Use the contact page and mention what problem you\'re trying to solve for your pet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are new arrivals on sale or discounted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New arrivals are priced at their standard retail price, but all customers get 10% off their first order with code WELCOME10 — which applies to new arrivals too. We also run periodic flash sales at /sale where new arrivals may be included.',
      },
    },
  ],
};

export default function NewArrivalsPage() {
  const newProducts = NEW_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-r from-indigo-700 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-16 text-8xl">✨</div>
          <div className="absolute top-12 right-24 text-6xl">🐾</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">🐶</div>
          <div className="absolute bottom-6 right-12 text-5xl">🐱</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            June 2026 Drop
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Just Dropped — New Products at PawHaven
          </h1>
          <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Five new vet-reviewed products added this month. Every one fills a gap we heard about from customers — here&apos;s what we added and why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#products"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-full hover:bg-indigo-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              See What&apos;s New
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">
              5 New Products
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900">
              What We Added &amp; Why
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We only add products when there&apos;s a genuine gap — something our customers kept asking for that we didn&apos;t carry yet.
            </p>
          </div>

          <div className="space-y-10">
            {newProducts.map((product, i) => (
              <div
                key={product.id}
                className={`flex flex-col ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300`}
              >
                {/* Image */}
                <div className="relative w-full md:w-72 flex-shrink-0 aspect-square md:aspect-auto md:h-72">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 288px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      ✨ New
                    </span>
                    {product.badge && product.badge !== 'New' && (
                      <span className={`${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
                    {product.category} · {product.tag}
                  </p>
                  <h3 className="text-2xl font-black text-navy-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.shortDescription}</p>

                  {/* Why We Added This */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-5">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
                      Why We Added This
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {WHY_BLURBS[product.slug]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-navy-900">${product.price}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-sm"
                    >
                      View Product →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy-900 mb-8 text-center">
            Questions About New Arrivals
          </h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-navy-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATED LINKS ─── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-navy-900 mb-6 text-center">
            Keep Exploring
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { href: '/products', label: '🛍️ All Products', desc: 'Full catalog' },
              { href: '/sale', label: '🔥 Flash Sale', desc: 'Limited-time deals' },
              { href: '/dogs', label: '🐶 Dog Products', desc: 'Everything for dogs' },
              { href: '/cats', label: '🐱 Cat Products', desc: 'Everything for cats' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 transition-all duration-200 group"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{label.split(' ')[0]}</span>
                <span className="font-bold text-navy-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {label.split(' ').slice(1).join(' ')}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
