import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Pet Travel Accessories for Dogs & Cats (2026) | PawHaven',
  description:
    'Stress-free travel with your pet starts with the right gear. Waterproof car hammocks, collapsible travel bowls, and airline-approved cat carrier backpacks — all vet-approved.',
  alternates: { canonical: 'https://pawhavenpets.org/travel' },
  openGraph: {
    title: 'Best Pet Travel Accessories 2026 | PawHaven',
    description: 'Car hammocks, travel bowls, and cat carrier backpacks — travel-ready for dogs and cats.',
    url: 'https://pawhavenpets.org/travel',
  },
};

const SLUGS = ['dog-car-seat-hammock', 'collapsible-travel-bowl-set', 'premium-cat-carrier-backpack'];
const featured = SLUGS.map((s) => products.find((p) => p.slug === s)).filter(Boolean);

const PREP_TIPS = [
  {
    icon: '🏥',
    title: 'Visit the vet first',
    desc: 'Get up-to-date vaccinations and ask about motion sickness medication if your pet has had trouble in the past.',
  },
  {
    icon: '🚗',
    title: 'Practice short trips',
    desc: 'Start with 5-minute drives and gradually increase. This desensitizes anxious pets and builds positive car associations.',
  },
  {
    icon: '💧',
    title: 'Pack collapsible bowls',
    desc: 'Offer water every 2 hours on long trips. Collapsible bowls clip to any bag and store flat — no excuses to skip hydration.',
  },
  {
    icon: '🧸',
    title: 'Bring familiar scents',
    desc: "A pet's own blanket or toy in the carrier provides massive comfort. The familiar smell reduces stress hormones measurably.",
  },
];

const FAQS = [
  {
    q: 'How do I keep my dog safe in the car?',
    a: "A car seat hammock protects your back seat and keeps your dog from sliding around. For extra safety, use a crash-tested dog harness clipped to the seatbelt. Never let dogs ride with their head out the window at highway speeds — debris and insects can cause serious eye injury.",
  },
  {
    q: 'Are cat carrier backpacks safe for airlines?',
    a: "Yes — many cat carrier backpacks are designed to fit under airline seats and qualify as personal items on most major carriers. Always check your specific airline's pet policy before flying. Cats should be able to stand, turn around, and lie down comfortably in the carrier.",
  },
  {
    q: 'How often should I stop on a road trip with a pet?',
    a: "Every 2–3 hours is ideal for both dogs and cats. Dogs need bathroom breaks and stretching; cats benefit from a check-in and water offer even if they don't move much. Never leave a pet unattended in a parked car — temperatures rise dangerously fast even on mild days.",
  },
  {
    q: 'What should I pack in a travel kit for my pet?',
    a: "The essentials: food and water (enough for the trip plus a day extra), collapsible bowls, waste bags, a familiar toy or blanket, any medications, vet records, and a recent photo in case your pet gets separated from you. A first-aid kit is also worth carrying on longer trips.",
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Pet Travel', item: 'https://pawhavenpets.org/travel' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function TravelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fdba74 100%)' }}
          className="border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                ✈️ Pet Travel
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
                Adventure together —{' '}
                <span className="text-orange-600">stress-free</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The right gear turns chaotic car trips and vet visits into smooth, comfortable experiences for your pet. Whether you're road-tripping across states or just heading to the park, these are the essentials that make travel better for both of you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#products"
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg"
                >
                  Shop Travel Gear →
                </Link>
                <Link
                  href="/quiz"
                  className="bg-white border border-orange-200 text-orange-700 font-bold px-8 py-3.5 rounded-full hover:border-orange-400 transition-colors"
                >
                  Find My Match ✨
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="bg-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { n: '67%', label: 'of pet owners travel with pets' },
                { n: '2 min', label: 'Car hammock install time' },
                { n: 'Airline ✓', label: 'Carrier backpack approved' },
                { n: '4.8★', label: 'Average traveler rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black">{s.n}</div>
                  <div className="text-orange-200 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Travel Essentials</h2>
            <p className="text-gray-500">Three products that cover every pet travel scenario.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featured.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <Image
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.comparePrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                        {Math.round((1 - p.price / p.comparePrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-orange-500 mb-1">{p.tag}</p>
                    <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-orange-500 transition-colors">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{p.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-gray-900">${p.price.toFixed(2)}</span>
                        {p.comparePrice && (
                          <span className="text-sm text-gray-400 line-through">${p.comparePrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full group-hover:bg-orange-400 transition-colors">
                        Shop →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Prep tips */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">Before you hit the road</h2>
            <p className="text-gray-500 text-center mb-12">Four things every pet traveler should do.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PREP_TIPS.map((tip) => (
                <div key={tip.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h3 className="font-black text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Pet Travel FAQs</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-gray-50 rounded-2xl px-6 py-5 cursor-pointer border border-gray-100 hover:border-orange-200 transition-colors">
                <summary className="font-bold text-gray-900 list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="text-orange-500 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed text-sm">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/dogs', emoji: '🐶', title: 'All Dog Products', desc: 'Browse the full dog catalog.' },
              { href: '/cats', emoji: '🐱', title: 'All Cat Products', desc: 'Browse the full cat catalog.' },
              { href: '/blog', emoji: '📖', title: 'Pet Care Blog', desc: 'Guides, tips, and reviews.' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-colors group">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-black text-gray-900 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-orange-500">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
            <div className="text-4xl mb-4">✈️</div>
            <h2 className="text-3xl font-black mb-3">Pack smarter for your next adventure</h2>
            <p className="text-orange-100 mb-8">Use code <strong className="text-white">WELCOME10</strong> for 10% off your first order.</p>
            <Link
              href="/products"
              className="inline-block bg-white text-orange-600 font-black px-10 py-4 rounded-full hover:bg-orange-50 transition-colors text-lg"
            >
              Shop All Products →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
