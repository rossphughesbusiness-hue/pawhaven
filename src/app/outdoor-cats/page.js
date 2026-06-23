import Link from 'next/link';

export const metadata = {
  title: 'Outdoor Cat Accessories 2026 — Safety Gear for Cats That Go Outside | PawHaven',
  description: 'Shop vet-approved outdoor cat accessories for cats that go outside. Safety collars, GPS trackers, enrichment toys, grooming tools, and window perches for adventurous cats.',
  alternates: { canonical: 'https://pawhavenpets.org/outdoor-cats' },
  openGraph: {
    title: 'Outdoor Cat Accessories 2026 | PawHaven',
    description: 'Everything you need for outdoor cat safety — ID tags, enrichment, grooming, and gear for cats that roam.',
    url: 'https://pawhavenpets.org/outdoor-cats',
  },
};

const featured = [
  {
    slug: 'cat-window-perch-hammock',
    name: 'Cat Window Perch Hammock',
    tag: 'Enrichment',
    price: 29.99,
    comparePrice: 44.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Gives outdoor cats a safe vantage point indoors — satisfies the urge to watch without the risks outside.',
  },
  {
    slug: 'self-cleaning-slicker-brush',
    name: 'Self-Cleaning Slicker Brush',
    tag: 'Grooming',
    price: 19.99,
    comparePrice: 29.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Removes burrs, debris, and loose fur after outdoor adventures — retractable pins for easy cleaning.',
  },
  {
    slug: 'cat-tunnel-crinkle-play-tube',
    name: 'Cat Tunnel Crinkle Play Tube',
    tag: 'Play',
    price: 22.99,
    comparePrice: 34.99,
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=85&auto=format&fit=crop',
    badge: '34% off',
    blurb: 'Channels outdoor hunting instincts indoors — crinkle texture and peek holes engage cats for hours.',
  },
];

const stats = [
  { stat: '2–5 yrs', label: 'Shorter avg. lifespan for outdoor cats vs indoor' },
  { stat: '1 in 3', label: 'Outdoor cats go missing each year' },
  { stat: '25×', label: 'More likely to contract FIV than indoor cats' },
  { stat: '80%', label: 'Of stray cats originated as outdoor pets' },
];

const contentCards = [
  {
    icon: '⚠️',
    title: 'Outdoor Hazards',
    desc: 'Cars, predators, toxic plants, disease from other cats, and extreme weather are the top risks for cats that go outside. Knowing the risks is the first step to mitigating them — collar with ID, vaccinations, and microchipping address three of the five.',
    tip: 'Keep outdoor cats in after dark — the majority of predator encounters and traffic accidents happen between sunset and sunrise.',
  },
  {
    icon: '🛡️',
    title: 'Safety Gear',
    desc: 'A breakaway collar with an ID tag is non-negotiable for any outdoor cat. GPS trackers (clip-on or collar-integrated) let you locate a missing cat within minutes. Microchipping is permanent backup if the collar is lost — shelters scan all found cats.',
    tip: 'Breakaway collars release under 7–9 lbs of pressure — your cat can escape if snagged. Never use non-breakaway collars on outdoor cats.',
  },
  {
    icon: '🌿',
    title: 'Enrichment',
    desc: 'Cats that spend time outdoors are highly stimulated — hunting, climbing, and exploring. When they\'re inside, matching that stimulation prevents boredom behaviors like scratching and midnight zoomies. Window perches, tunnels, and puzzle feeders are the most effective tools.',
    tip: 'A "catio" (enclosed outdoor enclosure) gives outdoor cats stimulation and fresh air with zero traffic or predator risk.',
  },
  {
    icon: '🏷️',
    title: 'ID & Tracking',
    desc: 'Collar ID tags are visible to anyone who finds your cat. Microchips are permanent and can\'t fall off. GPS trackers are real-time. All three serve different scenarios — a neighbor finding your cat uses the tag; a shelter uses the chip; you use the GPS. Together they give you complete coverage.',
    tip: 'Update your microchip registration immediately after moving — most cats found far from home can\'t be returned because the registry address is outdated.',
  },
];

const faqs = [
  {
    q: 'What outdoor cat accessories are most important for safety?',
    a: 'Three essentials cover the majority of outdoor cat risks: (1) A breakaway collar with a clearly engraved ID tag including your phone number — this is the fastest way for a neighbor to return a lost cat. (2) A microchip registered to your current address — shelters and vets scan all found cats, and this is your permanent backup if the collar falls off. (3) Up-to-date vaccinations — outdoor cats are exposed to FIV, FeLV, rabies, and upper respiratory infections at far higher rates than indoor cats. A GPS tracker is optional but increasingly affordable and genuinely useful for cats that roam wide ranges.',
  },
  {
    q: 'How do I keep my outdoor cat safe from predators and cars?',
    a: 'Time and visibility are your two biggest levers. Keeping cats inside between dusk and dawn eliminates most predator and traffic risk — coyotes, owls, and foxes are predominantly nocturnal, and drivers\' visibility is worst at night. For daytime safety: avoid outdoor access near busy roads if possible, and consider a catio (enclosed outdoor run) as a middle ground between full outdoor access and indoor-only living. Reflective or brightly-colored collars improve visibility to drivers. GPS tracking lets you intervene quickly if your cat enters a high-risk area.',
  },
  {
    q: 'What is the lifespan difference between outdoor and indoor cats?',
    a: 'The data on this is striking: indoor cats live an average of 12–18 years, while outdoor or indoor-outdoor cats average 2–5 years. The gap is driven primarily by vehicle strikes, predator attacks, disease transmission from other cats (especially FIV and FeLV), exposure to toxins, and fighting injuries. This doesn\'t mean outdoor cats can\'t live long lives — many do — but the statistical risk is substantially higher. The safest compromise is supervised outdoor time, a secure catio, or leash walking with a well-fitted cat harness.',
  },
  {
    q: 'How do I enrich an outdoor cat when they\'re inside?',
    a: 'Outdoor cats have high stimulation baselines from hunting, climbing, and exploring. When confined indoors, they need equivalent outlets. Window perches placed near bird feeders provide passive visual enrichment for hours. Cat tunnels and crinkle tubes engage the hunting instinct through hide-and-seek play. Puzzle feeders slow mealtime and add mental work. Interactive play (wand toys, laser pointers) 2–3 times daily is the highest-value investment — 10-15 minutes of active play burns significant energy and reduces destructive behavior. For cats that strongly resist being indoors, a catio gives them outdoor access within a controlled, safe environment.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Outdoor Cats', item: 'https://pawhavenpets.org/outdoor-cats' },
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

export default function OutdoorCatsPage() {
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
        <section className="bg-gradient-to-br from-green-700 via-emerald-600 to-green-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🌿</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Outdoor Cat<br />
              <span className="text-green-200">Safety & Accessories</span>
            </h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto mb-8">
              Cats that go outside need more than luck — they need ID tags, the right gear, and enrichment that satisfies their adventurous instincts safely.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '🏷️ ID & tracking', '🌿 Enrichment gear', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Stat strip */}
        <section className="bg-green-50 py-8 px-4 border-b border-green-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-green-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Content cards */}
        <section className="py-12 px-4 bg-green-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">What Every Outdoor Cat Owner Should Know</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contentCards.map(({ icon, title, desc, tip }) => (
                <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-gray-900 self-center">{title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{desc}</p>
                  <div className="bg-green-50 rounded-xl px-4 py-2 border-l-2 border-green-500">
                    <p className="text-xs text-green-700 font-medium">💡 Vet tip: {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">Top Picks for Outdoor Cats</h2>
            <p className="text-gray-500 text-center mb-10">Chosen for enrichment, safety, and post-adventure care</p>
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
                    <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-gray-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-green-700 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Cats"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Cat Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-emerald-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🌿 <strong>Vet tip:</strong> Microchip your outdoor cat and keep the registry updated. It takes 5 minutes and is the single most effective thing you can do to get a lost cat back — shelters scan every animal they receive, but only a current address gets your cat home.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Outdoor Cat FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-gray-900 list-none">
                    {q}
                    <span className="text-green-700 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">More for Your Cat</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/indoor-cats', label: '🏠 Indoor Cats', desc: 'Indoor enrichment kit' },
                { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Puzzles & mental stim' },
                { href: '/cat-toys', label: '🧶 Cat Toys', desc: 'Wands, tunnels & lasers' },
                { href: '/cats', label: '🐱 All Cats', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-green-50 hover:bg-green-100 rounded-2xl p-4 text-center transition-colors">
                  <div className="font-bold text-gray-900 text-sm">{label}</div>
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
