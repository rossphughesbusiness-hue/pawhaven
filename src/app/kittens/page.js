import Link from 'next/link';

export const metadata = {
  title: 'Kitten Essentials 2026 — New Cat Supplies & Accessories | PawHaven',
  description: 'Everything you need for a new kitten: cave beds, feather wands, litter training tips, slow feeders, and calming aids. Vet-approved kitten starter kit.',
  alternates: { canonical: 'https://pawhavenpets.org/kittens' },
  openGraph: {
    title: 'Kitten Essentials 2026 | PawHaven',
    description: 'Set your new kitten up for a confident, healthy life with vet-approved first-month essentials.',
    url: 'https://pawhavenpets.org/kittens',
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
    blurb: 'Enclosed cave gives new kittens a secure place to decompress — critical in the first weeks.',
  },
  {
    slug: 'feather-wand-cat-teaser',
    name: 'Feather Wand Cat Teaser',
    tag: 'Toys',
    price: 11.99,
    comparePrice: 18.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Develops prey drive and coordination in kittens — daily wand play prevents furniture destruction.',
  },
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Creates positive associations with grooming, vet visits, and alone time — start early for best results.',
  },
];

const weeklyChecklist = [
  {
    week: 'Days 1–3',
    icon: '🏠',
    items: ['Cave or enclosed bed in a single quiet room', 'Litter box (uncovered, low-entry)', 'Water bowl near food but not adjacent'],
  },
  {
    week: 'Week 1–2',
    icon: '🎮',
    items: ['Feather wand for 2× daily 10-min play sessions', 'Calming lick mat to build positive routines', 'Scratching post near sleeping area'],
  },
  {
    week: 'Month 1+',
    icon: '🌍',
    items: ['Gradually expand access to more rooms', 'Add window perch for bird-watching enrichment', 'Introduce grooming brush while kitten is calm'],
  },
];

const vetTips = [
  {
    icon: '🏔️',
    title: 'Give Them One Safe Room First',
    desc: 'New kittens are overwhelmed by a full house. Confine them to a single quiet room for 3–7 days before gradually expanding access. This reduces fear responses and speeds up litter box learning.',
  },
  {
    icon: '🎯',
    title: 'Play Before Meals',
    desc: "Kittens that hunt before eating follow their natural instinct cycle: hunt → catch → eat → groom → sleep. Playing before meals leads to calmer eating and better sleep, and builds a routine that reduces nighttime energy bursts.",
  },
  {
    icon: '✂️',
    title: 'Handle Paws and Mouth Early',
    desc: 'Kittens that have their paws touched and mouths opened regularly become cats that accept grooming, nail trims, and dental checks without stress. 30 seconds per session from week one is all it takes.',
  },
  {
    icon: '😌',
    title: 'Never Punish — Redirect Instead',
    desc: "Kittens don't respond to punishment — it creates fear without changing the behavior. When they scratch furniture or play-bite, redirect immediately to an appropriate toy or scratching surface. Praise and reward the redirect.",
  },
];

const commonMistakes = [
  { mistake: 'Giving full house access immediately', fix: 'Start with one room — expand access over 1–2 weeks as confidence grows' },
  { mistake: 'Using a covered litter box', fix: 'Kittens feel trapped in covered boxes and may avoid them — use open, low-sided boxes' },
  { mistake: 'Stopping play sessions early', fix: 'End wand play with a "catch" — letting kitten "kill" the toy completes the hunt cycle' },
  { mistake: 'Feeding from a bowl only', fix: 'Puzzle feeders and lick mats add critical mental stimulation and slow eating speed' },
];

const faqs = [
  {
    q: 'What do I need before bringing a kitten home?',
    a: 'The essential first-day kit: a litter box (uncovered, low-entry sides) placed in a quiet accessible spot, food and water bowls placed near each other but not adjacent to the litter box, a sleeping space with an enclosed option (cave bed or box with a blanket), and a feather wand or toy for play. Everything else — scratching posts, additional beds, puzzle feeders — can be introduced over the first week. The most common mistake is overwhelming a new kitten with too much space and too many items at once.',
  },
  {
    q: 'How do I litter train a kitten?',
    a: 'Most kittens litter train naturally and quickly — the instinct to cover waste is innate. Set up: use an uncovered box with low entry walls, place it in a quiet corner away from food and water, use unscented clumping litter (kittens are sensitive to strong scents), and show your kitten the box when they first arrive. After meals and naps, place them gently in the box. Clean it at minimum once daily — cats will avoid dirty boxes. If accidents happen, never punish; just clean thoroughly with an enzyme cleaner and re-show the box.',
  },
  {
    q: 'How much should a kitten play each day?',
    a: 'Kittens need significantly more play than adult cats — 3 to 4 sessions of 10–15 minutes daily during their first year. This develops coordination, burns energy, and prevents destructive behavior driven by boredom. Interactive wand toys are most effective because they require you to control movement — kittens learn to track, stalk, and pounce. Automated laser toys and crinkle tunnels are good supplements for between sessions, but should not replace the bonding of interactive play.',
  },
  {
    q: 'When should a kitten first see a vet?',
    a: 'Within 48–72 hours of bringing them home. This first visit establishes a health baseline, confirms vaccination status, checks for parasites, and gives you a chance to ask questions while the kitten is still adjusting. Most kittens receive 3 rounds of core vaccines at 8, 12, and 16 weeks, plus rabies and flea/tick prevention. Discuss spaying or neutering timing with your vet — most recommend between 4 and 6 months.',
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

export default function KittensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🐱</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              New Kitten?<br />
              <span className="text-purple-200">Here's What They Actually Need</span>
            </h1>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-approved essentials for the first month — from a safe hideaway to play gear that develops healthy habits. Skip the overwhelm and start with what works.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '🐾 Kitten-safe', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly checklist */}
        <section className="py-12 px-4 bg-purple-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-2">First Month Checklist</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Staged so you don't overwhelm your kitten (or yourself)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {weeklyChecklist.map(({ week, icon, items }) => (
                <div key={week} className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                  <div className="text-2xl mb-2">{icon}</div>
                  <h3 className="font-bold text-purple-700 text-sm mb-3">{week}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-purple-500 mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Start Here</h2>
            <p className="text-gray-500 text-center mb-10">The three products that matter most in the first month</p>
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

        {/* Vet tips */}
        <section className="py-12 px-4 bg-purple-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Vet-Backed First-Month Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vetTips.map(({ icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 flex gap-4">
                  <div className="text-3xl flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1">{title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Common First-Time Kitten Mistakes</h2>
            <div className="space-y-3">
              {commonMistakes.map(({ mistake, fix }) => (
                <div key={mistake} className="bg-gray-50 rounded-2xl p-4 flex gap-4 items-start border border-gray-100">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-red-400 text-lg">✗</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 line-through">{mistake}</p>
                    <p className="text-sm text-purple-700 mt-1 font-medium">✓ {fix}</p>
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
              🐱 <strong>Vet tip:</strong> Book your kitten's first vet visit within 48–72 hours of bringing them home — not because something is wrong, but to establish a health baseline before they're exposed to the rest of your environment.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">New Kitten FAQs</h2>
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

        {/* Related */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More for Your Cat</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/cat-toys', label: '🧶 Cat Toys', desc: 'Wands, lasers & tunnels' },
                { href: '/cat-beds', label: '😴 Cat Beds', desc: 'Caves, perches & hideaways' },
                { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Puzzles & mental stim' },
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
