import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Senior Cat Care 2026 — Beds, Enrichment & Health Essentials | PawHaven',
  description: 'Shop vet-approved products for senior cats aged 7+. Supportive beds, gentle enrichment, grooming tools for arthritic cats, and calming aids for anxious older felines.',
  alternates: { canonical: 'https://pawhavenpets.org/senior-cats' },
  openGraph: {
    title: 'Senior Cat Care 2026 | PawHaven',
    description: 'Everything your senior cat needs — comfort, enrichment, and health essentials for cats aged 7+.',
    url: 'https://pawhavenpets.org/senior-cats',
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
    blurb: 'Enclosed wool cave relieves anxiety — senior cats spend more time hiding as they age.',
  },
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Slows eating and reduces stress — particularly effective for senior cats with anxiety.',
  },
  {
    slug: 'cat-window-perch-hammock',
    name: 'Cat Window Perch Hammock',
    tag: 'Enrichment',
    price: 29.99,
    comparePrice: 44.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Passive enrichment from a secure perch — perfect for cats that can no longer jump as high.',
  },
];

const ageStages = [
  {
    icon: '🌿',
    stage: 'Mature (7–10 years)',
    signs: 'Slower metabolism, mild joint stiffness, early dental changes',
    focus: 'Maintain healthy weight, add joint-supportive bedding, keep up interactive play',
  },
  {
    icon: '🌸',
    stage: 'Senior (11–14 years)',
    signs: 'Reduced activity, changes in coat quality, increased sleep, more vocalization at night',
    focus: 'Orthopedic sleep support, easier litter box access, low-impact enrichment',
  },
  {
    icon: '🌟',
    stage: 'Geriatric (15+ years)',
    signs: 'Significant mobility limits, sensory decline, weight changes, confusion',
    focus: 'Prioritize comfort and predictability. Keep environment stable, ramps over stairs, frequent vet check-ins',
  },
];

const healthFacts = [
  { stat: '7 years', label: 'When "senior" begins for cats' },
  { stat: '90%', label: 'Of cats 12+ have arthritis signs' },
  { stat: '2×/year', label: 'Vet visits recommended for seniors' },
  { stat: '15–20 hrs', label: 'Sleep per day for geriatric cats' },
];

const careCategories = [
  {
    icon: '🛏️',
    title: 'Sleep & Comfort',
    desc: 'Low-entry beds with memory foam or thick padding. Senior cats with arthritis need to step in without lifting legs high — avoid beds with tall walls.',
    tip: 'Place beds in every room your cat frequents so they never have to travel far to rest.',
  },
  {
    icon: '🧶',
    title: 'Low-Impact Enrichment',
    desc: 'Puzzle feeders, lick mats, and window perches replace high-energy play. Senior cats still need mental stimulation — they just prefer to engage at their own pace.',
    tip: 'Feather wands moved slowly and at floor level keep older cats engaged without straining joints.',
  },
  {
    icon: '✂️',
    title: 'Gentle Grooming',
    desc: 'Senior cats often groom less effectively, leading to matting. A soft slicker brush used gently 2–3x per week maintains coat health and provides bonding time.',
    tip: 'Check claws more frequently — arthritic cats scratch less, so claws overgrow faster.',
  },
  {
    icon: '😌',
    title: 'Anxiety & Calm',
    desc: 'Older cats are more sensitive to change. Environmental stress — a new pet, a move, schedule shifts — hits seniors harder. Calming aids and consistent routines help.',
    tip: 'Lick mats with wet food or peanut butter work as fast, drug-free anxiety relief for vet visits.',
  },
];

const faqs = [
  {
    q: 'At what age is a cat considered "senior"?',
    a: 'Veterinary consensus places the senior threshold at 7 years, with "geriatric" beginning around 15 years. For context, a 7-year-old cat is roughly equivalent to a 44-year-old human. From age 7 onward, cats benefit from twice-yearly vet check-ups (vs. once annually for adults) because age-related changes — kidney function, thyroid activity, dental disease, arthritis — progress quickly and are much easier to manage when caught early.',
  },
  {
    q: 'How do I know if my senior cat is in pain?',
    a: 'Cats are stoic by instinct and rarely vocalize pain. Signs to watch for: reluctance to jump up or down, avoiding stairs, stiffness after sleeping, decreased grooming of hard-to-reach areas (lower back, tail base), changes in litter box habits (posture or frequency), reduced appetite, hiding more than usual, or unusual aggression when touched in certain areas. Any of these in a cat over 7 warrants a vet visit — arthritis is the most common finding, but hyperthyroidism, dental disease, and kidney disease present similarly.',
  },
  {
    q: 'What changes should I make to my home for a senior cat?',
    a: 'Three high-impact changes: (1) Add ramps or steps to favorite perches so your cat can access them without jumping. (2) Add a litter box on every floor — senior cats sometimes don\'t make it down stairs in time. Choose boxes with lower entry walls. (3) Move food and water to ground level or near sleeping spots. Beyond these, maintain consistency in furniture placement and routine — senior cats adapt poorly to change and can become confused or anxious when their environment shifts.',
  },
  {
    q: 'Should senior cats still have toys and play time?',
    a: 'Yes — mental stimulation remains important throughout a cat\'s life, but the style of play should change. Rather than high-intensity pursuit games, senior cats benefit from slow-moving wand toys at floor level, puzzle feeders, window perches with bird feeders outside, and lick mats. These engage the mind without stressing joints. Aim for two short 5–10 minute sessions daily rather than one long one, and let your cat set the pace.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Senior Cats', item: 'https://pawhavenpets.org/senior-cats' },
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

export default function SeniorCatsPage() {
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
        <section className="bg-gradient-to-br from-rose-700 via-pink-700 to-rose-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🐾</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Care for Your<br />
              <span className="text-rose-200">Senior Cat</span>
            </h1>
            <p className="text-rose-100 text-lg max-w-2xl mx-auto mb-8">
              Cats aged 7+ have different needs — better sleep support, gentler enrichment, easier grooming. Every product here is chosen with older cats in mind.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '🐾 Senior-tested', '🦴 Joint-friendly', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Health stats */}
        <section className="bg-rose-50 py-8 px-4 border-b border-rose-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {healthFacts.map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-rose-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Age stages */}
        <section className="py-12 px-4 bg-rose-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Cat Aging Stages Explained</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ageStages.map(({ icon, stage, signs, focus }) => (
                <div key={stage} className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100">
                  <div className="text-3xl mb-2">{icon}</div>
                  <h3 className="font-bold text-navy-900 text-sm mb-2">{stage}</h3>
                  <p className="text-xs text-rose-700 font-medium mb-1">Common signs:</p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{signs}</p>
                  <p className="text-xs text-rose-700 font-medium mb-1">Focus:</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top Picks for Senior Cats</h2>
            <p className="text-gray-500 text-center mb-10">Chosen for comfort, low-impact enrichment, and calm</p>
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
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-rose-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-rose-600 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Cats"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Cat Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Care categories */}
        <section className="py-12 px-4 bg-rose-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Senior Cat Care by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {careCategories.map(({ icon, title, desc, tip }) => (
                <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-navy-900 self-center">{title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{desc}</p>
                  <div className="bg-rose-50 rounded-xl px-4 py-2 border-l-2 border-rose-400">
                    <p className="text-xs text-rose-700 font-medium">💡 Vet tip: {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-rose-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🐾 <strong>Vet tip:</strong> The single most impactful thing you can do for a senior cat is twice-yearly vet check-ups. Most age-related conditions — kidney disease, hyperthyroidism, arthritis — are manageable when caught early but expensive and difficult once advanced.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Senior Cat FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-rose-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
                { href: '/cat-beds', label: '😴 Cat Beds', desc: 'Caves, perches & hideaways' },
                { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Puzzles & mental stim' },
                { href: '/anxiety', label: '😌 Anxiety', desc: 'Calming products' },
                { href: '/cats', label: '🐱 All Cats', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-rose-50 hover:bg-rose-100 rounded-2xl p-4 text-center transition-colors">
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
