import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Cat Anxiety Relief 2026 — Calming Products for Stressed Cats | PawHaven',
  description: 'Vet-approved calming products for anxious cats. Lick mats, cave beds, and enrichment tools that reduce stress, hiding, overgrooming, and litter box avoidance.',
  alternates: { canonical: 'https://pawhavenpets.org/cat-anxiety' },
  openGraph: {
    title: 'Cat Anxiety Relief 2026 | PawHaven',
    description: 'Drug-free calming tools for anxious cats — products that address the root causes of feline stress.',
    url: 'https://pawhavenpets.org/cat-anxiety',
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
    blurb: 'Licking triggers endorphin release — works for vet visits, grooming, and general daily stress.',
  },
  {
    slug: 'cozy-cat-cave-hideaway',
    name: 'Cozy Cat Cave Hideaway',
    tag: 'Comfort',
    price: 44.99,
    comparePrice: 64.99,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85&auto=format&fit=crop',
    badge: '31% off',
    blurb: 'Enclosed space gives anxious cats control over their environment — the #1 thing stressed cats need.',
  },
  {
    slug: 'cat-window-perch-hammock',
    name: 'Cat Window Perch Hammock',
    tag: 'Enrichment',
    price: 29.99,
    comparePrice: 44.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '33% off',
    blurb: 'Height and territory — a perch gives anxious cats a safe vantage point that reduces stress hormones.',
  },
];

const stressTypes = [
  {
    icon: '🏠',
    type: 'Environmental Stress',
    signs: 'Hiding more than usual, reduced appetite, not using litter box, overgrooming',
    causes: 'New furniture, remodeling, smell changes, new people in the home',
    approach: 'Maintain routine and scent consistency. Add secure hideaways. Feliway diffuser in affected area.',
  },
  {
    icon: '🐾',
    type: 'Social Stress',
    signs: 'Aggression toward other cats or people, blocking, resource guarding',
    causes: 'New pet, resident cat tension, inadequate territory',
    approach: 'Separate resources (one per cat plus one extra). Vertical territory via perches. Gradual reintroduction.',
  },
  {
    icon: '🔊',
    type: 'Noise & Startle Anxiety',
    signs: 'Running and hiding at sounds, staying hidden for hours, not eating after loud events',
    causes: 'Construction, fireworks, thunderstorms, appliances',
    approach: 'Designated safe den with cave bed. White noise near the space. Lick mat during predictable events.',
  },
  {
    icon: '🏥',
    type: 'Vet & Travel Anxiety',
    signs: 'Hiding at the sight of carrier, vocalization during travel, aggression at vet',
    causes: 'Negative associations with carrier and car travel',
    approach: 'Leave carrier out permanently. Lick mat inside carrier daily. Feed meals at the carrier door.',
  },
];

const anxietyStats = [
  { stat: '58%', label: 'Of indoor cats show chronic stress signs' },
  { stat: '3×', label: 'More hiding in under-enriched environments' },
  { stat: '5 min', label: 'For lick mat to reduce cortisol' },
  { stat: '7+', label: 'Common signs owners miss' },
];

const calming_tools = [
  {
    icon: '🏔️',
    tool: 'Enclosed Hiding Spaces',
    why: 'Control is the antidote to cat anxiety. When a cat can choose to enter an enclosed space, they gain agency over their stress response. This is why cats in stressful environments hide — it is a healthy coping mechanism that should be supported, not prevented.',
    use: 'Place a cave bed or hideaway in every room your cat uses. Never force a cat out of their hiding spot — it destroys the safety of the space.',
  },
  {
    icon: '👅',
    tool: 'Lick Mats',
    why: 'Repetitive licking activates the parasympathetic nervous system and triggers endorphin release. In cats, this is especially effective because licking is a self-soothing behavior they already use naturally — the mat amplifies a built-in stress response.',
    use: 'Use before predictable stressors: vet visits, grooming, guests arriving. Wet food, tuna water, or meat-based baby food work well.',
  },
  {
    icon: '🪟',
    tool: 'Vertical Territory & Perches',
    why: 'Cats reduce stress by increasing their territory. A window perch gives a cat a defensible high position from which to survey their environment — this directly reduces the vigilance that drives chronic stress.',
    use: 'Place near a window with an outdoor view, bird feeder, or busy street. Multiple perches in a multi-cat home reduce competition and territorial tension.',
  },
  {
    icon: '🎾',
    tool: 'Daily Structured Play',
    why: 'Cats that complete the hunt sequence (stalk → chase → catch → eat → groom → sleep) twice daily have measurably lower stress hormones. Play is not optional for anxious cats — it is part of the treatment.',
    use: 'Wand toy for 10–15 minutes before the evening meal. End by letting the cat catch the toy. Follow with food immediately to complete the cycle.',
  },
];

const faqs = [
  {
    q: 'How do I know if my cat is stressed or just naturally shy?',
    a: 'Shyness is a stable personality trait — a naturally shy cat is consistently reserved but otherwise healthy, eating well, using the litter box, and engaging on their own terms. Stress is a change from baseline: a cat that was previously outgoing is now hiding, or a cat that ate reliably is now avoiding food. Other stress indicators that are easy to miss: overgrooming (look for thin patches, especially on the belly and inner legs), increased vocalization, sudden aggression, or litter box avoidance in a cat with a previously clean record. If the behavior changed, something changed in the cat\'s environment or health.',
  },
  {
    q: 'My cat hides all the time — should I be worried?',
    a: 'Context determines whether hiding is a problem. A new cat hiding for the first week is normal adjustment. A resident cat suddenly hiding more than usual is a significant signal. Cats hide primarily for two reasons: fear/stress or pain/illness. Both require attention. Rule out illness first with a vet visit if the hiding is new and persistent — many sick cats simply hide because they feel unwell. If health is clear, identify what changed in the environment (new pet, new person, remodeling, schedule change) and address that root cause.',
  },
  {
    q: 'Do calming pheromone products (Feliway) actually work for cats?',
    a: 'Feliway and similar synthetic pheromone products have a genuine but modest evidence base. They are most effective for situational anxiety (new home, travel, vet visits) and multi-cat tension. They work less well for deep-seated anxiety or situations where the stressor is ongoing and unavoidable. The most reliable use case: Feliway diffuser in the area most affected by the stressor, used continuously for at least 4 weeks. Single-use sprays are less effective. It is a reasonable first-line adjunct for mild anxiety, but not a standalone solution for moderate or severe cases.',
  },
  {
    q: 'What is the single most effective thing I can do for an anxious cat?',
    a: 'Provide choice and control. Anxious cats are anxious primarily because they feel they have no control over their environment — threats can come from any direction, resources may not be secure, and retreating to safety may not be possible. The most impactful changes: add at least one enclosed hideaway per room the cat uses, add a high perch with a clear sightline, ensure all resources (food, water, litter) are accessible without passing another cat\'s territory, and maintain a consistent daily routine. These address the root cause of most feline anxiety rather than managing symptoms.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Cat Anxiety Relief', item: 'https://pawhavenpets.org/cat-anxiety' },
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

export default function CatAnxietyPage() {
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
        <section className="bg-gradient-to-br from-violet-800 via-purple-700 to-indigo-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">😿</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Calming Products<br />
              <span className="text-purple-200">for Anxious Cats</span>
            </h1>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-8">
              Cats hide stress better than any pet — and suffer more for it. Vet-recommended hideaways, lick mats, and enrichment tools that address the root causes of feline anxiety.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🔬 Vet-reviewed', '🐾 Cat-specific', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-purple-50 py-8 px-4 border-b border-purple-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {anxietyStats.map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-purple-700">{stat}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Stress types */}
        <section className="py-12 px-4 bg-purple-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Types of Cat Anxiety</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stressTypes.map(({ icon, type, signs, causes, approach }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-navy-900 self-center">{type}</h3>
                  </div>
                  <p className="text-xs text-purple-700 font-medium mb-0.5">Signs:</p>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">{signs}</p>
                  <p className="text-xs text-purple-700 font-medium mb-0.5">Common causes:</p>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">{causes}</p>
                  <p className="text-xs text-purple-700 font-medium mb-0.5">Approach:</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{approach}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top Calming Products for Cats</h2>
            <p className="text-gray-500 text-center mb-10">Vet-recommended tools for stressed, anxious, and reactive cats</p>
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

        {/* Calming tools */}
        <section className="py-12 px-4 bg-purple-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">How Each Calming Tool Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {calming_tools.map(({ icon, tool, why, use }) => (
                <div key={tool} className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <h3 className="font-bold text-navy-900 self-center">{tool}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{why}</p>
                  <div className="bg-purple-50 rounded-xl px-4 py-2 border-l-2 border-purple-400">
                    <p className="text-xs text-purple-700 font-medium">How to use: {use}</p>
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
              🐾 <strong>Vet tip:</strong> The most impactful change for most anxious cats is adding choice — one hideway per room, one perch per cat, resources that don't require passing another cat's territory. Control reduces anxiety faster than any product.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Cat Anxiety FAQs</h2>
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
                { href: '/cat-beds', label: '😴 Cat Beds', desc: 'Caves, perches & hideaways' },
                { href: '/cat-enrichment', label: '🎾 Enrichment', desc: 'Puzzles & mental stim' },
                { href: '/senior-cats', label: '🌸 Senior Cats', desc: 'Comfort & care for 7+' },
                { href: '/cat-feeding', label: '🍽️ Cat Feeding', desc: 'Bowls & feeders' },
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
