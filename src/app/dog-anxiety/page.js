import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Dog Anxiety Relief 2026 — Calming Products That Actually Work | PawHaven',
  description: 'Vet-approved calming products for anxious dogs. Lick mats, puzzle feeders, and comfort beds that reduce separation anxiety, noise phobia, and stress without sedation.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-anxiety' },
  openGraph: {
    title: 'Dog Anxiety Relief 2026 | PawHaven',
    description: 'Drug-free calming tools for anxious dogs — lick mats, enrichment, and comfort products that actually work.',
    url: 'https://pawhavenpets.org/dog-anxiety',
  },
};

const featured = [
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Repetitive licking triggers serotonin release — vet\'s first recommendation for mild to moderate anxiety.',
  },
  {
    slug: 'maze-slow-feeder-bowl',
    name: 'Maze Slow Feeder Bowl',
    tag: 'Enrichment',
    price: 19.99,
    comparePrice: 29.99,
    img: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Mental engagement at mealtimes reduces post-meal pacing and settles anxious dogs faster.',
  },
  {
    slug: 'orthopedic-memory-foam-dog-bed',
    name: 'Orthopedic Memory Foam Dog Bed',
    tag: 'Comfort',
    price: 79.99,
    comparePrice: 129.99,
    img: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: 'A dedicated, consistent sleep space is foundational for anxious dogs — reduces nighttime alertness.',
  },
];

const anxietyTypes = [
  {
    icon: '🏠',
    type: 'Separation Anxiety',
    signs: 'Destructive behavior, excessive barking, accidents when left alone, pacing before you leave',
    approach: 'Gradual desensitization + departure cues (lick mat frozen before you leave, puzzle feeder as distraction)',
  },
  {
    icon: '⛈️',
    type: 'Noise Phobia',
    signs: 'Trembling, hiding, panting during storms, fireworks, or loud sounds',
    approach: 'Pressure wraps, safe den space, white noise, and desensitization recordings during calm periods',
  },
  {
    icon: '👥',
    type: 'Social Anxiety',
    signs: 'Cowering, growling, excessive reactivity around strangers or other dogs',
    approach: 'Counter-conditioning with high-value treats, gradual exposure, consistent neutral body language from owner',
  },
  {
    icon: '🚗',
    type: 'Travel Anxiety',
    signs: 'Drooling, whining, vomiting in vehicles, refusal to enter car',
    approach: 'Lick mat during travel, secure hammock seat for containment, short positive trips before long ones',
  },
];

const anxietyStats = [
  { stat: '70%', label: 'Of dogs show anxiety signs' },
  { stat: '#1', label: 'Reason dogs are surrendered to shelters' },
  { stat: '85%', label: 'Improve with behavioral + environmental changes' },
  { stat: '3–5 min', label: 'For lick mat to reduce cortisol measurably' },
];

const calming_tools = [
  {
    icon: '👅',
    tool: 'Lick Mats',
    why: 'Repetitive licking stimulates production of serotonin and endorphins. It\'s the most accessible calming tool for most dogs — immediate, drug-free, and effective for mild to moderate situational anxiety.',
    use: 'Freeze with peanut butter, plain yogurt, or wet food. Offer 5 minutes before a stressful event (departure, storm, vet visit).',
  },
  {
    icon: '🧩',
    tool: 'Puzzle Feeders',
    why: 'Mental engagement overrides anxiety. Dogs can\'t simultaneously problem-solve and panic — working for food occupies the prefrontal cortex and crowds out the stress response.',
    use: 'Swap the food bowl for a puzzle at breakfast. Increase difficulty gradually. Mealtime enrichment also reduces post-meal restlessness.',
  },
  {
    icon: '🛏️',
    tool: 'Designated Sleep Space',
    why: 'Anxious dogs benefit enormously from a consistent, predictable safe space. A dedicated bed in a consistent location reduces environmental uncertainty — a core driver of chronic anxiety.',
    use: 'Place in a low-traffic corner. Add a worn item of your clothing for scent familiarity. Never use the bed area as a timeout location.',
  },
  {
    icon: '🎯',
    tool: 'Enrichment & Exercise',
    why: 'A dog whose physical and mental needs are met has less baseline anxiety. Most behavioral problems diagnosed as "anxiety" are also — or entirely — enrichment deficits.',
    use: 'Two 30-minute walks plus one mental enrichment session daily covers most dogs. Sniff walks (letting the dog lead and explore) are more calming than brisk walks.',
  },
];

const faqs = [
  {
    q: 'What is the fastest way to calm an anxious dog?',
    a: 'The fastest drug-free intervention is a lick mat with a spreadable food like peanut butter or wet food. Repetitive licking stimulates the vagal nerve and triggers serotonin release — most dogs noticeably relax within 3–5 minutes. For immediate severe anxiety (during storms or fireworks), this combined with a safe enclosed space and physical pressure (snug body wrap or firm, calm hold if the dog accepts it) is the most effective non-pharmaceutical approach.',
  },
  {
    q: 'How do I know if my dog has separation anxiety vs. just being bored?',
    a: 'The key difference is timing and pattern. Separation anxiety manifests specifically when you leave — destructive behavior, barking, or accidents begin within 15–30 minutes of departure and don\'t occur when you\'re home. Boredom-related behavior happens regardless of whether you\'re present, typically peaks at predictable times (after meals, at 5pm), and responds well to enrichment alone. Record your dog with a phone camera during your absence to see what actually happens — many owners are surprised by what they find.',
  },
  {
    q: 'Do calming products really work for dogs?',
    a: 'It depends on the product category and the severity of anxiety. Products with strong evidence: lick mats and puzzle feeders (peer-reviewed data on cortisol reduction), pressure wraps (consistent positive results for noise phobia specifically), consistent enrichment routines (foundational for all anxiety types), and pheromone diffusers (moderate evidence, most effective in low-to-moderate cases). Products with limited evidence: most calming supplements, essential oil diffusers, calming music specifically. For moderate to severe anxiety, behavioral modification guided by a certified veterinary behaviorist is significantly more effective than any product alone.',
  },
  {
    q: 'Should I get medication for my anxious dog?',
    a: 'For moderate to severe anxiety — particularly separation anxiety, noise phobia that causes self-injury, or generalized anxiety affecting quality of life — medication is often appropriate and highly effective. Common options include daily SSRIs (fluoxetine) for chronic anxiety, situational medications (trazodone, gabapentin) for predictable stressors like vet visits or travel, and newer options like Sileo (dexmedetomidine) for noise phobias. Medication works best combined with behavioral modification, not as a standalone solution. Talk to your vet — many are very open to discussing this and it\'s significantly more humane than letting a dog suffer through avoidable anxiety.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Dog Anxiety Relief', item: 'https://pawhavenpets.org/dog-anxiety' },
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

export default function DogAnxietyPage() {
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
        <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">😌</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Calming Products<br />
              <span className="text-blue-200">for Anxious Dogs</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-recommended tools that reduce separation anxiety, noise phobia, and stress — without sedation. Lick mats, enrichment feeders, and comfort products that actually work.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '💊 Drug-free options', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-blue-50 py-8 px-4 border-b border-blue-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {anxietyStats.map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-blue-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Anxiety types */}
        <section className="py-12 px-4 bg-blue-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Types of Dog Anxiety</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {anxietyTypes.map(({ icon, type, signs, approach }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-navy-900 self-center">{type}</h3>
                  </div>
                  <p className="text-xs text-blue-700 font-medium mb-1">Signs:</p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{signs}</p>
                  <p className="text-xs text-blue-700 font-medium mb-1">Approach:</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{approach}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top Calming Products</h2>
            <p className="text-gray-500 text-center mb-10">Vet-recommended, drug-free anxiety relief for dogs</p>
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
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-blue-600 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Dogs"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Calming tools guide */}
        <section className="py-12 px-4 bg-blue-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Drug-Free Calming Tools: How They Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {calming_tools.map(({ icon, tool, why, use }) => (
                <div key={tool} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-navy-900 self-center">{tool}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{why}</p>
                  <div className="bg-blue-50 rounded-xl px-4 py-2 border-l-2 border-blue-400">
                    <p className="text-xs text-blue-700 font-medium">How to use: {use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-blue-600 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🔬 <strong>Vet tip:</strong> The most effective anxiety protocol is behavioral modification + enrichment + environmental management. Products accelerate the process but don't replace it. If your dog's anxiety is affecting their quality of life, a certified veterinary behaviorist can design a protocol specific to your dog's triggers.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Dog Anxiety FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-blue-600 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
                { href: '/dog-enrichment', label: '🧠 Enrichment', desc: 'Puzzles & mental stim' },
                { href: '/senior-dogs', label: '🐾 Senior Dogs', desc: 'Joint & mobility care' },
                { href: '/dog-beds', label: '🛏️ Dog Beds', desc: 'Orthopedic & cozy' },
                { href: '/dog-health', label: '🏥 Dog Health', desc: 'Prevention & wellness' },
                { href: '/pet-first-aid', label: '🩹 Pet First Aid', desc: 'Emergency preparedness' },
                { href: '/dogs', label: '🐶 All Dogs', desc: 'Browse everything' },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href} className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 text-center transition-colors">
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
