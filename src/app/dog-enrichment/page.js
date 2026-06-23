import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Dog Enrichment Toys & Activities 2026 — Mental Stimulation for Dogs | PawHaven',
  description: 'Shop vet-recommended dog enrichment products. Puzzle feeders, lick mats, tug toys and slow feeders that tire out bored dogs mentally — without leaving the house.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-enrichment' },
  openGraph: {
    title: 'Dog Enrichment Toys 2026 | PawHaven',
    description: 'Puzzle feeders, lick mats, and tug toys that provide mental stimulation and beat boredom for dogs.',
    url: 'https://pawhavenpets.org/dog-enrichment',
  },
};

const featured = [
  {
    slug: 'iq-puzzle-feeder-toy',
    name: 'IQ Puzzle Feeder Toy',
    tag: 'Enrichment',
    price: 27.99,
    comparePrice: 39.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '30% off',
    blurb: 'Two difficulty levels for growing challenge — tires out high-energy dogs in 15 minutes.',
  },
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Repetitive licking activates the parasympathetic nervous system — the science of calm.',
  },
  {
    slug: 'heavy-duty-rope-tug-toy',
    name: 'Heavy-Duty Rope Tug Toy',
    tag: 'Play',
    price: 16.99,
    comparePrice: 26.99,
    img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Tug engages problem-solving and bonding simultaneously — 10 min = 30 min walk.',
  },
  {
    slug: 'maze-slow-feeder-bowl',
    name: 'Maze Slow Feeder Bowl',
    tag: 'Feeding',
    price: 24.99,
    comparePrice: 39.99,
    img: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: 'Turns every meal into a 10-minute puzzle — slows eating and satisfies scent instincts.',
  },
  {
    slug: 'crinkle-squeaky-toy-bundle',
    name: 'Crinkle Squeaky Toy Bundle',
    tag: 'Toys',
    price: 16.99,
    comparePrice: 27.99,
    img: 'https://images.unsplash.com/photo-1534361960057-19f4434a5fd6?w=600&q=85&auto=format&fit=crop',
    badge: '39% off',
    blurb: 'Multi-sensory textures and sounds engage sight, smell, and prey drive all at once.',
  },
];

const enrichmentTypes = [
  {
    icon: '🧠',
    type: 'Cognitive / Puzzle',
    time: '10–20 min',
    difficulty: 'Adjustable',
    desc: 'Problem-solving challenges that activate working memory. Most effective at tiring high-drive breeds and preventing destructive boredom behavior.',
    example: 'IQ Puzzle Feeder Toy',
  },
  {
    icon: '👃',
    type: 'Sniff & Forage',
    time: '15–30 min',
    difficulty: 'Low–Medium',
    desc: 'Engaging the olfactory system is one of the most tiring enrichment types. Dogs have 300M scent receptors — 15 minutes of sniffing = 1 hour of walking.',
    example: 'Lick mats, scatter feeding',
  },
  {
    icon: '💪',
    type: 'Physical / Interactive',
    time: '5–15 min',
    difficulty: 'High energy',
    desc: 'Tug and fetch engage prey drive while building the bond between dog and owner. Short intense bursts (5–10 min) are more tiring than long low-energy play.',
    example: 'Heavy-Duty Rope Tug Toy',
  },
  {
    icon: '🥣',
    type: 'Feeding Enrichment',
    time: '10–15 min',
    difficulty: 'Meal-replacing',
    desc: 'Replacing a standard bowl with a slow feeder or puzzle converts every meal into enrichment. Slows eating, improves digestion, engages problem-solving.',
    example: 'Maze Slow Feeder Bowl',
  },
];

const schedule = [
  { time: 'Morning', activity: 'Scatter feed breakfast', why: 'Activates scent system for the day' },
  { time: 'Midday', activity: 'Puzzle feeder or lick mat', why: 'Breaks boredom during the quiet hours' },
  { time: 'Pre-walk', activity: '5-min tug session', why: 'Burns edge before leash goes on' },
  { time: 'Evening', activity: 'Slow feeder dinner + chew', why: 'Tires mentally before sleep cycle' },
];

const faqs = [
  {
    q: 'What is dog enrichment and why does my dog need it?',
    a: 'Dog enrichment means providing activities that engage your dog\'s natural instincts — foraging, problem-solving, scenting, chasing, and chewing. Dogs were bred for work and still carry those cognitive needs even as pets. Without mental stimulation, bored dogs redirect their energy destructively: chewing furniture, excessive barking, digging, or pacing. Regular enrichment reduces these behaviors and produces calmer, more satisfied dogs.',
  },
  {
    q: 'How much enrichment does my dog need per day?',
    a: 'Most dogs benefit from 2–4 enrichment sessions per day, 10–20 minutes each. The ideal amount depends on breed drive: working breeds (border collies, malinois, huskies, labs) need significantly more than companion breeds (bulldogs, basset hounds, shih tzus). A useful signal: a well-enriched dog settles easily after exercise and doesn\'t seek constant attention or display destructive behavior.',
  },
  {
    q: 'Can enrichment replace walks?',
    a: 'Mental enrichment supplements but doesn\'t replace physical exercise. However, 15 minutes of cognitive enrichment (puzzle feeding, sniffing) measurably fatigues dogs in a way that 45 minutes of low-stimulation walking doesn\'t. For dogs that can\'t exercise fully due to age, injury, or weather, enrichment is particularly valuable. The optimal combination is both — shorter, more stimulating walks plus daily enrichment sessions.',
  },
  {
    q: 'What enrichment is best for anxious dogs?',
    a: 'Lick mats and scatter feeding are best for anxious dogs. Repetitive licking triggers the release of endorphins and activates the parasympathetic nervous system — the same biological mechanism behind thumb-sucking in children. These activities are calming rather than activating. Avoid high-intensity tug or fetch for anxious dogs in aroused states — these can escalate rather than calm. Save cognitive puzzles for neutral emotional states.',
  },
  {
    q: 'How do I introduce a puzzle toy to my dog?',
    a: 'Start at the easiest difficulty and make the rewards extremely high-value (small pieces of cooked chicken or cheese rather than dry kibble). Let your dog succeed quickly in the first session — the point is to build confidence with the format, not to challenge them immediately. Increase difficulty only when your dog solves the current level in under 2 minutes without frustration. Frustration (pawing aggressively, barking at the toy, walking away) is a sign you\'ve moved up too fast.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Dog Enrichment', item: 'https://pawhavenpets.org/dog-enrichment' },
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

export default function DogEnrichmentPage() {
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
        <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🧠</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Tire Out Your Dog's<br />
              <span className="text-emerald-200">Brain, Not Just Their Legs</span>
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-8">
              15 minutes of mental enrichment exhausts a dog as much as a 45-minute walk. Puzzle feeders, lick mats, slow feeders, and tug toys — the vet-backed toolkit for calmer, happier dogs.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-recommended', '🧠 Behaviour-backed', '🐾 All breeds & ages', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Key stat */}
        <section className="bg-emerald-50 py-8 px-4 border-b border-emerald-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { stat: '300M', label: 'Dog scent receptors (vs 6M human)' },
              { stat: '10×', label: 'Slower eating with a puzzle bowl' },
              { stat: '15 min', label: 'Puzzle time ≈ 45-min low-stim walk' },
              { stat: '↓80%', label: 'Destructive behavior with daily enrichment' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-emerald-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Enrichment types */}
        <section className="py-12 px-4 bg-emerald-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">The 4 Types of Dog Enrichment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrichmentTypes.map(({ icon, type, time, difficulty, desc, example }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <h3 className="font-bold text-navy-900 text-sm">{type}</h3>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-xs text-emerald-700 font-medium">{time}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{desc}</p>
                  <p className="text-xs text-emerald-700 font-medium">Try: {example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top Enrichment Products</h2>
            <p className="text-gray-500 text-center mb-10">Vet-recommended for mental stimulation, boredom prevention, and calmer behaviour</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-emerald-700 font-medium mb-0.5">{p.tag}</p>
                    <h3 className="font-bold text-navy-900 text-xs mb-1 leading-tight group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-400 mb-2 leading-tight hidden sm:block">{p.blurb}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-navy-900 text-sm">${p.price}</span>
                      <span className="text-gray-400 text-xs line-through">${p.comparePrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Dogs"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Daily schedule */}
        <section className="py-12 px-4 bg-emerald-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-2 text-center">Sample Daily Enrichment Schedule</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Add under 1 hour of total enrichment to your existing routine</p>
            <div className="space-y-3">
              {schedule.map(({ time, activity, why }, i) => (
                <div key={time} className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex items-center gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{time}</span>
                      <span className="font-semibold text-navy-900 text-sm">{activity}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip */}
        <section className="bg-emerald-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🧠 <strong>Vet tip:</strong> The #1 predictor of destructive dog behavior isn't lack of exercise — it's lack of mental stimulation. A physically tired but mentally bored dog will still chew your furniture.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Dog Enrichment FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-emerald-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More for Your Dog</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/dog-toys', label: '🧸 Dog Toys', desc: 'Tug, puzzle & squeaky' },
                { href: '/dog-training', label: '🎯 Training', desc: 'Treat pouches & gear' },
                { href: '/anxiety', label: '😌 Anxiety', desc: 'Calming products' },
                { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 text-center transition-colors">
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
