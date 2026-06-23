import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Best Cat Toys 2026 — Interactive, Laser & Tunnel Toys | PawHaven',
  description: 'Shop vet-approved cat toys that get even the laziest cats moving. Feather wands, automatic laser toys, crinkle tunnels and more. Free shipping on orders over $50.',
  alternates: { canonical: 'https://pawhavenpets.org/cat-toys' },
  openGraph: {
    title: 'Best Cat Toys 2026 | PawHaven',
    description: 'Interactive cat toys that stimulate prey drive, fight boredom, and keep indoor cats active.',
    url: 'https://pawhavenpets.org/cat-toys',
  },
};

const featured = [
  {
    slug: 'feather-wand-cat-teaser',
    name: 'Feather Wand Cat Teaser',
    tag: 'Toys',
    price: 11.99,
    comparePrice: 18.99,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Mimics bird movement to trigger natural prey drive — gets even lazy cats running.',
  },
  {
    slug: 'interactive-automatic-laser-toy',
    name: 'Interactive Automatic Laser Toy',
    tag: 'Toys',
    price: 22.99,
    comparePrice: 34.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '34% off',
    blurb: '15-minute auto-shutoff, 3 speed modes — hands-free play while you work.',
  },
  {
    slug: 'cat-tunnel-crinkle-play-tube',
    name: 'Cat Tunnel Crinkle Play Tube',
    tag: 'Play',
    price: 27.99,
    comparePrice: 44.99,
    img: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: 'T-junction tunnel with crinkle walls — ambush, sprint, and hide instincts all covered.',
  },
];

const playTypes = [
  { icon: '🐦', type: 'Wand & Feather Toys', desc: 'Engages the hunt-and-pounce instinct. Best for daily interactive play sessions of 10–15 minutes.' },
  { icon: '🔴', type: 'Laser & Electronic', desc: 'Hands-free stimulation. Great for busy owners. Always end sessions with a physical "catch" toy to avoid frustration.' },
  { icon: '🐭', type: 'Tunnel & Chase Toys', desc: 'Triggers ambush predator behavior. Crinkle sounds add auditory stimulation on top of physical play.' },
  { icon: '🧶', type: 'Puzzle & Enrichment', desc: 'Slows down fast eaters and provides mental stimulation. Reduce food portion by the amount used in puzzle.' },
];

const playTips = [
  { tip: 'Play for 10–15 min twice daily', why: 'Matches cats\' natural hunting pattern of multiple short bursts rather than one long session.' },
  { tip: 'End wand sessions with a "catch"', why: 'Cats need to complete the hunt cycle. Let them catch and "kill" the toy to avoid pent-up frustration.' },
  { tip: 'Rotate toys weekly', why: 'Novelty drives engagement. Cats lose interest in the same toy after 3–5 days — cycling keeps things exciting.' },
  { tip: 'Play before meals', why: 'Mimics the hunt-eat-groom-sleep cycle. Cats that play before eating tend to eat calmer and sleep better.' },
];

const faqs = [
  {
    q: 'How much playtime does an indoor cat need each day?',
    a: 'Vets recommend at least two 10–15 minute interactive play sessions daily for indoor cats. This mimics the multiple short hunting bursts cats would experience in the wild. Single long sessions are less effective than multiple shorter ones. Senior cats may prefer shorter, gentler sessions.',
  },
  {
    q: 'Are laser toys safe for cats?',
    a: 'Yes, with one important caveat: always end laser play sessions with a physical toy your cat can actually "catch." Laser-only play leaves cats in a perpetual state of unfulfilled predatory drive, which can cause stress and obsessive behaviors. Our laser toy comes with a dangling feather attachment for exactly this reason.',
  },
  {
    q: 'What toys work for cats that don\'t seem interested in playing?',
    a: 'Cats that appear "lazy" are often not in the right environment for play. Try: (1) playing when your cat is most active — usually dusk and dawn; (2) using wand toys at floor level rather than overhead; (3) making slower, more realistic "prey" movements rather than fast erratic ones; (4) sprinkling catnip on toys. Most cats that "don\'t play" simply need the right trigger.',
  },
  {
    q: 'When should I replace cat toys?',
    a: 'Replace wand toys when feathers or attachments are heavily frayed or detached — loose pieces can be swallowed. Replace crinkle toys when the inner material is exposed. Electronic toys: check batteries every 2–3 months. Soft toys: wash monthly and replace when structural integrity is compromised.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Cat Toys', item: 'https://pawhavenpets.org/cat-toys' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function CatToysPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 via-violet-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🐱</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Cat Toys That Wake<br />
              <span className="text-purple-200">Even the Laziest Cats</span>
            </h1>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-approved toys engineered around feline prey drive — feather wands, auto lasers, and crinkle tunnels that trigger the hunt instinct every indoor cat still has.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🐾 Prey-drive designed', '🔬 Vet-reviewed', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Play types */}
        <section className="py-12 px-4 bg-purple-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Types of Cat Play</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {playTypes.map(({ icon, type, desc }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 text-center">
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
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top-Rated Cat Toys</h2>
            <p className="text-gray-500 text-center mb-10">Tested by real cats, approved by their (admittedly biased) owners</p>
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
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-purple-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-purple-600 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Cats"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Cat Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Play tips */}
        <section className="py-12 px-4 bg-purple-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Vet-Backed Play Tips</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {playTips.map(({ tip, why }) => (
                <div key={tip} className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm flex gap-3">
                  <div className="text-purple-600 text-xl flex-shrink-0">✓</div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{tip}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-purple-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🐾 <strong>Vet tip:</strong> Indoor cats that get daily interactive play have lower rates of obesity, anxiety, and destructive behavior than cats with only solo toy access.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Cat Toy FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-purple-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More for Your Cat</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/cat-enrichment', label: '🎾 Cat Enrichment', desc: 'Puzzles & mental stim' },
                { href: '/indoor-cats', label: '🏠 Indoor Cats', desc: 'Essential indoor kit' },
                { href: '/grooming', label: '✂️ Grooming', desc: 'Brushes & deshedding' },
                { href: '/cats', label: '🐱 All Cats', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-purple-50 hover:bg-purple-100 rounded-2xl p-4 text-center transition-colors">
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
