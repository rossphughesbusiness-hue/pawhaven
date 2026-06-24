import Link from 'next/link';

export const metadata = {
  title: 'Best Cat Food Bowls 2026 — Slow Feeders, Puzzle Bowls & Lick Mats | PawHaven',
  description: 'How to slow feed a cat safely, choose the best cat food bowls, and use a cat puzzle feeder to prevent vomiting and bloat. Vet-backed feeding guide for every life stage.',
  alternates: { canonical: 'https://pawhavenpets.org/cat-feeding' },
  openGraph: {
    title: 'Cat Feeding Done Right 2026 | PawHaven',
    description: 'Portion control, slow feeding, hydration tips, and meal timing — plus the best cat food bowls and puzzle feeders for healthier cats.',
    url: 'https://pawhavenpets.org/cat-feeding',
  },
};

const featured = [
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Slow Feeding',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Spread wet food or treats across the surface — extends mealtime from 30 seconds to 5+ minutes.',
  },
  {
    slug: 'cat-puzzle-slow-feeder',
    name: 'Cat Puzzle Slow Feeder',
    tag: 'Enrichment',
    price: 21.99,
    comparePrice: 33.99,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Multi-chamber puzzle that slows eating and provides mental enrichment simultaneously.',
  },
  {
    slug: 'maze-slow-feeder-bowl',
    name: 'Maze Slow Feeder Bowl',
    tag: 'Portion Control',
    price: 19.99,
    comparePrice: 29.99,
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Interlocking maze ridges slow eating speed by up to 10× — safe for dry and wet food.',
  },
];

const feedingGuide = [
  {
    icon: '⚖️',
    area: 'Portion Control',
    summary: 'Feed by weight, not guesswork',
    desc: 'Most cats are overfed by 20–30%. Follow the feeding guide on your food packaging and adjust for your cat\'s actual weight, not ideal weight. A food scale — not a measuring cup — gives the most accurate portions. Obesity accelerates joint disease, diabetes, and liver problems in cats.',
  },
  {
    icon: '🐌',
    area: 'Slow Feeding',
    summary: 'Prevent vomiting and bloat',
    desc: 'Cats that eat too fast swallow air and food simultaneously, leading to regurgitation within minutes of eating. Slow feeders, puzzle bowls, and lick mats extend mealtime from under 30 seconds to 3–10 minutes — dramatically reducing vomiting frequency in fast-eating cats.',
  },
  {
    icon: '💧',
    area: 'Hydration',
    summary: 'Cats are poor drinkers by design',
    desc: 'Cats evolved as desert animals with a low thirst drive and are chronically under-hydrated on dry food diets. Chronic dehydration contributes to urinary crystals, kidney disease, and constipation. Wet food (70–80% moisture) is the most effective hydration strategy. Place water bowls away from food bowls — cats are instinctively averse to water near prey.',
  },
  {
    icon: '🕐',
    area: 'Meal Timing',
    summary: 'Scheduled meals over free-feeding',
    desc: 'Free-choice feeding makes portion control impossible and is the primary driver of feline obesity. Two to three scheduled meals per day (morning, noon, evening) help maintain a healthy weight, allow you to monitor appetite changes (an early illness indicator), and make your cat more engaged at mealtimes.',
  },
];

const feedingTable = [
  { profile: 'Kitten (< 6 months)', meals: '3–4 per day', amount: 'Per label — growth diet', notes: 'High protein, calorie-dense. Do not restrict.' },
  { profile: 'Kitten (6–12 months)', meals: '2–3 per day', amount: 'Per label — transition to adult', notes: 'Reduce meal frequency as growth slows.' },
  { profile: 'Adult cat (2–6kg)', meals: '2 per day', amount: '~200–240 kcal/day', notes: 'Adjust if weight gain or loss occurs.' },
  { profile: 'Adult cat (6–8kg)', meals: '2 per day', amount: '~240–280 kcal/day', notes: 'Consider weight management food if overweight.' },
  { profile: 'Senior cat (7+ years)', meals: '2–3 per day', amount: '~180–220 kcal/day', notes: 'Higher protein, lower phosphorus. Vet guidance recommended.' },
];

const vetTips = [
  {
    tip: 'Use a flat, wide bowl — not a tall narrow one',
    why: 'Cats have whiskers that extend wider than most narrow bowls. Whisker fatigue — discomfort from whiskers pressing against bowl sides — causes cats to paw food out or refuse to eat entirely. A wide, shallow dish eliminates this.',
  },
  {
    tip: 'Introduce slow feeders gradually',
    why: 'If your cat is used to eating from a standard bowl, a puzzle feeder may cause frustration and food refusal initially. Start with the easiest setting and use very high-value food. Increase difficulty only when the cat eats readily at the current level.',
  },
  {
    tip: 'Never leave wet food out for more than 30 minutes',
    why: 'Wet food left at room temperature becomes a bacterial breeding ground quickly, particularly in warm environments. Two small meals of wet food are safer than one large portion left all day. Refrigerate unused portions and warm to room temperature before serving.',
  },
  {
    tip: 'Monitor appetite — changes are early warning signs',
    why: 'Cats that skip more than 24–48 hours of food should see a vet. Hepatic lipidosis (fatty liver disease) develops within days of food refusal in cats — unlike dogs, cats cannot safely fast. A scheduled feeding routine makes appetite changes immediately obvious.',
  },
];

const faqs = [
  {
    q: 'What is the best cat food bowl for a fast eater?',
    a: 'For cats that eat too fast and vomit afterward, the most effective options are: (1) a maze slow feeder bowl — ridged maze patterns that force cats to eat around obstacles, slowing speed by up to 10×; (2) a lick mat for wet food or treats — the textured surface means cats lick rather than gulp; (3) a puzzle feeder — multi-chamber designs require cats to work for each bite. For the fastest eaters, a puzzle feeder produces the most dramatic slowdown. For cats that resist feeders initially, a lick mat is the easiest introduction.',
  },
  {
    q: 'How do I slow feed a cat without a special bowl?',
    a: 'Scatter dry kibble on a clean mat or across a flat surface, spread wet food into a thin layer on a plate instead of a pile, or use a muffin tin with kibble in each cup. These free alternatives work, but dedicated slow feeders are more durable, easier to clean, and maintain meal containment. A lick mat or maze bowl used consistently is generally more effective long-term than improvised alternatives.',
  },
  {
    q: 'How often should I feed my cat?',
    a: 'Adult cats do best with two measured meals per day — one in the morning and one in the evening. Kittens (under 6 months) need three to four smaller meals because their stomachs are smaller and their caloric needs relative to body weight are higher. Senior cats (7+) often do better with two to three smaller meals, as digestion slows and appetite can become less consistent. Free-choice feeding (always-available food) is the primary driver of feline obesity and should be avoided unless recommended for a specific medical condition.',
  },
  {
    q: 'Do cats need wet food or is dry food enough?',
    a: 'Both can support a healthy cat, but wet food provides a significant hydration benefit that dry food cannot replicate. Cats on all-dry diets typically drink insufficient water even with fresh water always available — their thirst drive is simply too low. Chronic low-level dehydration is a contributing factor in feline urinary tract disease and kidney disease, both extremely common in cats. A combination of wet food (for hydration) and puzzle feeders or maze bowls for dry food tends to produce the best health outcomes for most adult cats.',
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Cat Feeding', item: 'https://pawhavenpets.org/cat-feeding' },
  ],
};

export default function CatFeedingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Cat Feeding Done Right —<br />
              <span className="text-violet-200">Slow, Enriching, Healthy</span>
            </h1>
            <p className="text-violet-100 text-lg max-w-2xl mx-auto mb-8">
              Portion control, slow feeding, hydration, and meal timing — the vet-backed feeding playbook for every life stage. Plus the best cat food bowls and puzzle feeders to stop vomiting and support healthy weight.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🏅 Vet-backed tips', '🐾 All life stages', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Feeding guide cards */}
        <section className="py-12 px-4 bg-violet-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">The 4 Pillars of Healthy Cat Feeding</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Get these right and you eliminate the most common cat feeding problems</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {feedingGuide.map(({ icon, area, summary, desc }) => (
                <div key={area} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-100">
                  <div className="text-3xl mb-2">{icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{area}</h3>
                  <p className="text-xs text-violet-700 font-medium mb-2">{summary}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">Best Cat Food Bowls & Slow Feeders</h2>
            <p className="text-gray-500 text-center mb-10">Top-rated feeders that slow eating, reduce vomiting, and add enrichment to every meal</p>
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
                    <span className="absolute top-3 left-3 bg-violet-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-violet-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-gray-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-violet-700 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Cats"
                className="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Cat Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Frequency / amount table */}
        <section className="py-12 px-4 bg-violet-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Feeding Frequency & Amount by Life Stage</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Calories and meal frequency by cat weight and age — adjust based on activity level and body condition</p>
            <div className="overflow-x-auto rounded-2xl border border-violet-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-violet-700 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Life Stage / Weight</th>
                    <th className="text-left px-4 py-3 font-semibold">Meals / Day</th>
                    <th className="text-left px-4 py-3 font-semibold">Daily Amount</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {feedingTable.map((row, i) => (
                    <tr key={row.profile} className={i % 2 === 0 ? 'bg-white' : 'bg-violet-50/40'}>
                      <td className="px-5 py-3 font-medium text-gray-900">{row.profile}</td>
                      <td className="px-4 py-3 text-violet-700 font-semibold">{row.meals}</td>
                      <td className="px-4 py-3 text-gray-700">{row.amount}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Vet tips */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">4 Vet-Backed Cat Feeding Tips</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {vetTips.map(({ tip, why }) => (
                <div key={tip} className="bg-violet-50 rounded-2xl p-5 border border-violet-100 shadow-sm flex gap-3">
                  <div className="text-violet-700 text-xl flex-shrink-0">✓</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{tip}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-violet-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🍽️ <strong>Vet tip:</strong> The #1 cause of preventable health problems in cats is overeating and under-hydrating. Slow feeders address speed; wet food addresses hydration. Together they prevent the two most common diet-driven diseases: obesity and urinary tract disease.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cat Feeding FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-gray-900 list-none">
                    {q}
                    <span className="text-violet-700 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">More Cat Care</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/cats', label: '🐱 All Cats', desc: 'Browse everything' },
                { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Toys & mental stimulation' },
                { href: '/senior-cats', label: '🌸 Senior Cats', desc: 'Care for cats 7+' },
                { href: '/kittens', label: '🐱 Kittens', desc: 'New kitten essentials' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-violet-50 hover:bg-violet-100 rounded-2xl p-4 text-center transition-colors">
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
