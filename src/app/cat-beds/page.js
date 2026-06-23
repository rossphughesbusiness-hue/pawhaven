import Link from 'next/link';

export const metadata = {
  title: 'Best Cat Beds 2026 — Cave Beds, Window Perches & More | PawHaven',
  description: 'Shop vet-approved cat beds that cats actually use. Cozy cave beds, window perches, donut beds and more. Find the perfect sleep spot for your cat\'s personality.',
  alternates: { canonical: 'https://pawhavenpets.org/cat-beds' },
  openGraph: {
    title: 'Best Cat Beds 2026 | PawHaven',
    description: 'Cave beds, window perches, and donut beds — find what your cat actually wants to sleep in.',
    url: 'https://pawhavenpets.org/cat-beds',
  },
};

const featured = [
  {
    slug: 'cozy-cat-cave-hideaway',
    name: 'Cozy Cat Cave Hideaway',
    tag: 'Comfort',
    price: 44.99,
    comparePrice: 64.99,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85&auto=format&fit=crop',
    badge: '31% off',
    blurb: 'Handmade wool cave — anxious cats choose it within minutes of arrival.',
  },
  {
    slug: 'cat-window-perch-hammock',
    name: 'Cat Window Perch Hammock',
    tag: 'Comfort',
    price: 29.99,
    comparePrice: 44.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Industrial suction cups hold up to 25 lbs — cats spend hours watching birds.',
  },
  {
    slug: 'sisal-cat-scratching-post',
    name: 'Sisal Cat Scratching Post',
    tag: 'Comfort',
    price: 39.99,
    comparePrice: 59.99,
    img: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Tall enough for a full stretch — protects your furniture while cats do what cats do.',
  },
];

const bedTypes = [
  {
    icon: '🏔️',
    type: 'Cave / Hideaway Bed',
    who: 'Best for: Anxious cats, new rescues, cats that love to burrow',
    desc: 'Enclosed on all sides, cave beds satisfy the feline instinct to find a secure, hidden resting spot. Particularly effective for cats adjusting to new environments or with anxiety.',
  },
  {
    icon: '🪟',
    type: 'Window Perch / Hammock',
    who: 'Best for: Indoor cats, bird-watchers, cats that love height',
    desc: 'Attaches to windows with suction cups to give cats a raised vantage point. Provides mental stimulation via outdoor observation — a key enrichment tool for indoor cats.',
  },
  {
    icon: '🍩',
    type: 'Donut / Bolster Bed',
    who: 'Best for: Cats that curl up, cold climates, cats that like to feel held',
    desc: 'Raised circular sides create a nest-like space cats can press against. The enclosed shape retains heat well and satisfies the curling instinct.',
  },
  {
    icon: '☁️',
    type: 'Flat Mat / Cushion',
    who: 'Best for: Cats that sprawl, warm climates, multi-cat households',
    desc: 'Simple and versatile. Works well as an add-on surface for cats that prefer to spread out rather than curl. Easiest to wash.',
  },
];

const sleepFacts = [
  { stat: '12–16 hrs', label: 'Average cat sleep per day' },
  { stat: '70%', label: 'Of that spent in light dozing' },
  { stat: '3–5 lbs', label: 'Typical adult cat weight on a perch' },
  { stat: '2–3', label: 'Preferred sleep spots per cat' },
];

const faqs = [
  {
    q: 'Why won\'t my cat use the bed I bought?',
    a: 'Location is almost always the reason. Cats choose sleep spots based on safety (ability to see threats), warmth, height, and proximity to their owners. Place the bed where your cat already naps — near a window, at a certain height, or in a corner. Adding a worn item of your clothing makes it smell familiar and dramatically increases acceptance. Give it 5–7 days before concluding the cat dislikes the bed itself.',
  },
  {
    q: 'Do cats prefer enclosed beds or open beds?',
    a: 'It depends on the individual cat, but a useful rule: anxious, shy, or newly adopted cats almost universally prefer enclosed beds. Confident, social cats often enjoy elevated open perches where they can see the room. If you\'re unsure, a cave bed is the safer first purchase — even confident cats will use them when they want to feel hidden.',
  },
  {
    q: 'How many beds does a cat need?',
    a: 'The general guideline is one sleep spot per cat, plus one extra — similar to the litter box rule. In practice, cats naturally identify 2–3 favorite spots in a home and rotate between them depending on light, temperature, and time of day. A window perch plus a cave bed covers the two most common sleep preferences (elevated/visual vs. enclosed/hidden).',
  },
  {
    q: 'How do I clean a cat bed without my cat rejecting it?',
    a: 'Wash on a gentle cycle with unscented, pet-safe detergent. Avoid fabric softeners and strongly-scented detergents — cats navigate primarily by scent and a heavily-washed bed may smell wrong to them. After washing, place it back in exactly the same location. If your cat avoids it after washing, rubbing a used blanket over it to transfer familiar scent usually resolves the issue within a day.',
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

export default function CatBedsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">😴</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Cat Beds They'll<br />
              <span className="text-teal-200">Actually Choose</span>
            </h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
              Cave beds for anxious cats, window perches for bird-watchers, donut beds for curlers. Every bed is chosen for the sleep preference cats actually have — not the one we imagine they have.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '🐾 Cat-tested', '🧺 Machine-washable', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Sleep stats */}
        <section className="bg-teal-50 py-8 px-4 border-b border-teal-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {sleepFacts.map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-teal-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bed types */}
        <section className="py-12 px-4 bg-teal-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Which Bed Type Is Right for Your Cat?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bedTypes.map(({ icon, type, who, desc }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-teal-100 flex gap-4">
                  <div className="text-3xl flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm mb-0.5">{type}</h3>
                    <p className="text-xs text-teal-700 font-medium mb-1">{who}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top-Rated Cat Beds</h2>
            <p className="text-gray-500 text-center mb-10">Picked for the cats who actually tested them (approval rating: unanimous)</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-teal-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-teal-600 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Cats"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Cat Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Vet tip */}
        <section className="bg-teal-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              😴 <strong>Vet tip:</strong> Cats choose beds based on location first, comfort second. Put the right bed in the wrong spot and most cats will ignore it — move it to where they already sleep.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Cat Bed FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-teal-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More for Your Cat</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/cat-toys', label: '🧶 Cat Toys', desc: 'Wands, lasers & tunnels' },
                { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Puzzles & mental stim' },
                { href: '/indoor-cats', label: '🏠 Indoor Cats', desc: 'Essential indoor kit' },
                { href: '/cats', label: '🐱 All Cats', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-teal-50 hover:bg-teal-100 rounded-2xl p-4 text-center transition-colors">
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
