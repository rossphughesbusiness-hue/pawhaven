import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Best Dog Toys 2026 — Interactive, Tug & Puzzle Toys | PawHaven',
  description: 'Shop vet-approved dog toys for every play style. Squeaky toys, puzzle feeders, tug ropes and more. Durable, non-toxic, and guaranteed to keep tails wagging.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-toys' },
  openGraph: {
    title: 'Best Dog Toys 2026 | PawHaven',
    description: 'Interactive, tug, and puzzle toys that keep dogs engaged and happy.',
    url: 'https://pawhavenpets.org/dog-toys',
  },
};

const featured = [
  {
    slug: 'crinkle-squeaky-toy-bundle',
    name: 'Crinkle Squeaky Toy Bundle',
    tag: 'Toys',
    price: 16.99,
    comparePrice: 27.99,
    img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=85&auto=format&fit=crop',
    badge: '39% off',
    blurb: 'Five durable plush toys in one set — squeaky, crinkly, and built to last.',
  },
  {
    slug: 'iq-puzzle-feeder-toy',
    name: 'IQ Puzzle Feeder Toy',
    tag: 'Enrichment',
    price: 27.99,
    comparePrice: 39.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '30% off',
    blurb: 'Two difficulty levels keep your dog mentally challenged and boredom-free.',
  },
  {
    slug: 'heavy-duty-rope-tug-toy',
    name: 'Heavy-Duty Rope Tug Toy',
    tag: 'Play',
    price: 16.99,
    comparePrice: 26.99,
    img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Tight-woven cotton rope that survives even the most aggressive chewers.',
  },
];

const toyTypes = [
  { icon: '🦆', type: 'Squeaky & Plush', desc: 'Satisfies prey drive and provides comfort. Great for gentle chewers and dogs who love to carry toys.' },
  { icon: '🧩', type: 'Puzzle & Feeder', desc: 'Slows eating, prevents boredom, and provides mental stimulation. Vet-recommended for high-energy breeds.' },
  { icon: '💪', type: 'Tug & Rope', desc: 'Builds the bond between dog and owner while cleaning teeth. Ideal for power chewers.' },
  { icon: '🎾', type: 'Fetch & Chase', desc: 'Provides aerobic exercise and satisfies instinctive chase behavior. Best used in outdoor spaces.' },
];

const faqs = [
  {
    q: 'How do I choose the right toy for my dog\'s size?',
    a: 'Match toy size to your dog\'s jaw size — toys that are too small are a choking hazard, and toys that are too large can be frustrating. As a rule: small dogs (under 25 lbs) → small/medium toys; medium dogs (25–60 lbs) → medium toys; large dogs (60+ lbs) → large or XL. When in doubt, size up.',
  },
  {
    q: 'Are squeaky toys safe for dogs?',
    a: 'Yes, when sized correctly and supervised. The squeaker itself can become a choking hazard if your dog destroys the toy and extracts it. Inspect squeaky toys regularly and remove them when the outer material is breached. All PawHaven squeaky toys use reinforced stitching to slow destruction.',
  },
  {
    q: 'How often should I replace dog toys?',
    a: 'Inspect toys weekly. Replace immediately if you see: torn fabric exposing stuffing, separated seams, cracked hard plastic, or rope fraying into short strands. Most quality plush toys last 2–4 weeks with daily play; rope toys and puzzle feeders typically last months.',
  },
  {
    q: 'What toys are best for mentally stimulating my dog?',
    a: 'Puzzle feeders and snuffle mats are the gold standard for mental enrichment — they engage scent, problem-solving, and eating instincts simultaneously. A 15-minute puzzle session tires a dog as much as a 30-minute walk. The IQ Puzzle Feeder has two difficulty levels for growing challenge.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function DogToysPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🐕</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Dog Toys That Actually<br />
              <span className="text-yellow-200">Hold Up</span>
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-approved toys for every play style — from gentle squeakers to puzzle feeders to indestructible tug ropes. Non-toxic materials, zero flimsy fillers.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🐾 Non-toxic materials', '🔬 Vet-reviewed', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Toy type guide */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Find the Right Toy Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toyTypes.map(({ icon, type, desc }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 text-center">
                  <div className="text-3xl mb-2">{icon}</div>
                  <h3 className="font-bold text-navy-900 text-sm mb-2">{type}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top-Rated Dog Toys</h2>
            <p className="text-gray-500 text-center mb-10">Hand-picked for durability, safety, and tail-wagging approval</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={600}
                      height={480}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-orange-500 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-orange-500 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Dogs"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-orange-500 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🐾 <strong>Vet tip:</strong> Rotate 3–5 toys weekly — novelty keeps dogs engaged longer than having access to everything at once.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Dog Toy FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-orange-500 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related pages */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More for Your Dog</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/dog-beds', label: '🛏️ Dog Beds', desc: 'Orthopedic & cooling' },
                { href: '/dog-walking', label: '🐾 Walking Gear', desc: 'Harness, leash & more' },
                { href: '/dog-training', label: '🎯 Training', desc: 'Treat pouches & gear' },
                { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-amber-50 hover:bg-amber-100 rounded-2xl p-4 text-center transition-colors">
                  <div className="font-bold text-navy-900 text-sm">{label}</div>
                  <div className="text-xs text-gray-500 mt-1">{desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
