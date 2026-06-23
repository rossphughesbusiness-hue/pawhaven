import Link from 'next/link';

export const metadata = {
  title: 'Large Dog Accessories & Gear for Big Breeds 2026 | PawHaven',
  description: 'The best large dog accessories and gear for big breeds. Orthopedic beds, heavy-duty toys, and pro-grade leashes built for dogs 50 lbs and up. Vet-reviewed.',
  alternates: { canonical: 'https://pawhavenpets.org/large-dogs' },
  openGraph: {
    title: 'Best Products for Large Breeds 2026 | PawHaven',
    description: 'Gear built for big dogs — orthopedic support, heavy-duty play, and safety on every walk.',
    url: 'https://pawhavenpets.org/large-dogs',
  },
};

const featured = [
  {
    slug: 'orthopedic-memory-foam-dog-bed',
    name: 'Orthopedic Memory Foam Dog Bed',
    tag: 'Comfort',
    price: 79.99,
    comparePrice: 129.99,
    img: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: '4" memory foam built for large breeds — relieves hip and joint pressure overnight.',
  },
  {
    slug: 'heavy-duty-rope-tug-toy',
    name: 'Heavy-Duty Rope Tug Toy',
    tag: 'Toys',
    price: 19.99,
    comparePrice: 32.99,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85&auto=format&fit=crop',
    badge: '39% off',
    blurb: 'Triple-braided natural cotton rope rated for dogs up to 120 lbs. Built to last.',
  },
  {
    slug: 'retractable-pro-dog-leash',
    name: 'Retractable Pro Dog Leash',
    tag: 'Walking',
    price: 29.99,
    comparePrice: 49.99,
    img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=600&q=85&auto=format&fit=crop',
    badge: '40% off',
    blurb: 'Heavy-duty cord rated for 110 lbs with one-touch brake and anti-slip grip.',
  },
];

const stats = [
  { value: '50%+', label: 'of large breeds develop joint issues by age 7' },
  { value: '2×', label: 'more calories needed vs. small dogs of same activity level' },
  { value: '30 min', label: 'minimum daily exercise for large breeds' },
  { value: '8–10 yr', label: 'average lifespan for giant breeds (vs. 12–15 for small)' },
];

const breedSizeGuide = [
  { size: 'Medium', weight: '25–50 lbs', examples: 'Beagle, Cocker Spaniel, Bulldog', notes: 'Standard adult gear, moderate chew strength' },
  { size: 'Large', weight: '50–90 lbs', examples: 'Labrador, Husky, Golden Retriever', notes: 'Heavy-duty hardware, XL bedding' },
  { size: 'XL', weight: '90–120 lbs', examples: 'Rottweiler, Doberman, Bernese Mountain Dog', notes: 'Reinforced leashes, 4"+ foam beds' },
  { size: 'Giant', weight: '120 lbs+', examples: 'Great Dane, Mastiff, Saint Bernard', notes: 'Extra-wide beds, slow feeders, joint supplements' },
];

const contentCards = [
  {
    icon: '🦴',
    title: 'Joint Health',
    body: 'Large breeds carry significantly more body weight on their skeletal frame, making orthopedic support critical from day one. Choose memory foam beds with 4"+ base layers, anti-slip surfaces, and low entry heights for senior dogs. Elevated food bowls reduce neck and shoulder strain during meals.',
  },
  {
    icon: '🍖',
    title: 'Feeding Large Breeds',
    body: 'Big dogs are at elevated risk of bloat (GDV) — a life-threatening emergency. Use slow feeder bowls to extend meal time to 5–10 minutes. Feed two smaller meals per day rather than one large serving. Avoid vigorous exercise for 30–60 minutes after eating, especially in deep-chested breeds like Great Danes and Boxers.',
  },
  {
    icon: '🏃',
    title: 'Exercise & Play',
    body: 'Most large breeds need 45–90 minutes of physical activity daily. Heavy-duty rope tug toys, fetch balls, and puzzle feeders satisfy both physical and mental needs. Always choose toys rated for your dog\'s weight — toys designed for small dogs are a choking hazard for large breeds and won\'t survive a single play session.',
  },
  {
    icon: '🛡️',
    title: 'Leash & Safety',
    body: 'A standard 4 lb leash isn\'t enough for a 90-lb dog mid-sprint. Look for leashes with metal snap hooks (not plastic), 5/8"–1" wide nylon or biothane webbing, and padded handles. For retractable leashes, ensure the cord strength rating exceeds your dog\'s weight. A well-fitted no-pull harness dramatically reduces shoulder and trachea strain.',
  },
];

const faqs = [
  {
    q: 'What size bed does a large dog need?',
    a: 'For a large dog (50–90 lbs), look for a bed at least 42" × 28". For XL breeds (90–120 lbs), go 48" × 34" or larger. Measure your dog nose-to-tail while fully stretched out, then add 10–12 inches. Dogs that like to curl up can go slightly smaller, but always size up if in doubt — there\'s no downside to more space. For memory foam beds, a 4" foam base provides adequate joint support for most large breeds.',
  },
  {
    q: 'What toys are safe for large, powerful chewers?',
    a: 'Large breeds with strong bite forces (like Rottweilers, Mastiffs, and German Shepherds) need toys specifically rated for heavy chewers. Natural rubber toys (look for Level 4 or "extreme chewer" ratings), thick braided rope toys, and reinforced nylon chews are the safest options. Avoid plush toys, thin rope toys, and anything with squeakers that can be removed easily — these become choking hazards in seconds. Always supervise play and replace toys showing significant wear.',
  },
  {
    q: 'How much exercise does a large dog need daily?',
    a: 'Most large breeds need 45–90 minutes of exercise per day, split across 2–3 sessions. High-energy working breeds (Huskies, Border Collies, German Shepherds) need 1.5–2 hours. Calmer large breeds like Basset Hounds or Saint Bernards may be satisfied with 30–45 minutes. Puppies of large breeds should follow the 5-minute rule — no more than 5 minutes of exercise per month of age to protect developing joints. Over-exercising large-breed puppies before growth plates close (typically 12–18 months) increases risk of orthopedic conditions.',
  },
  {
    q: 'Why do large dogs have shorter lifespans than small dogs?',
    a: 'The exact mechanism isn\'t fully understood, but research suggests larger dogs age faster at a cellular level. Every 4.4 lbs of body weight is associated with approximately 1 month less of life expectancy. Giant breeds like Great Danes average 7–8 years, while medium breeds average 10–12. This makes preventive health care especially important for large breeds: joint support from an early age, regular vet check-ups, weight management, and appropriate exercise all contribute to quality and length of life.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Large Dogs', item: 'https://pawhavenpets.org/large-dogs' },
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

export default function LargeDogsPage() {
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
        <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-yellow-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🦴</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Gear Built for<br />
              <span className="text-yellow-300">Big Dogs</span>
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-8">
              Large dog accessories engineered for strength, joint health, and long-term durability. Every product is size-rated and vet-reviewed for breeds 50 lbs and up.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🦴 Joint-support bedding', '💪 Heavy-duty toys', '🐾 Big-breed leashes', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Stat strip */}
        <section className="bg-amber-800 text-white py-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={value}>
                <div className="text-3xl font-black text-yellow-300">{value}</div>
                <div className="text-xs text-amber-200 mt-1 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Breed size guide */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-2">Breed Size Guide</h2>
            <p className="text-center text-gray-500 text-sm mb-6">Find the right gear tier for your dog's weight class</p>
            <div className="overflow-x-auto rounded-2xl border border-amber-100">
              <table className="w-full text-sm bg-white">
                <thead className="bg-amber-800 text-white">
                  <tr>
                    {['Size Class', 'Weight Range', 'Example Breeds', 'Gear Notes'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breedSizeGuide.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50'}>
                      <td className="px-4 py-3 font-bold text-amber-800">{row.size}</td>
                      <td className="px-4 py-3 text-gray-600">{row.weight}</td>
                      <td className="px-4 py-3 text-gray-600">{row.examples}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4-card content section */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">What Large Dogs Actually Need</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contentCards.map(({ icon, title, body }) => (
                <div key={title} className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-bold text-navy-900 text-base mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top Picks for Large Breeds</h2>
            <p className="text-gray-500 text-center mb-10">Size-rated, vet-reviewed, and built to last</p>
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
                    <span className="absolute top-3 left-3 bg-amber-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-amber-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-amber-700 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Dogs"
                className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-amber-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🩺 <strong>Vet tip:</strong> Start orthopedic joint support for large breeds at age 1–2 — well before visible symptoms appear. Prevention is far less costly than treatment, and early intervention significantly slows the progression of hip dysplasia and arthritis.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Large Dog FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-amber-700 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More Dog Resources</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/dog-beds', label: '🛏️ Dog Beds', desc: 'Orthopedic & cooling' },
                { href: '/senior-dogs', label: '🐾 Senior Dogs', desc: 'Joint & mobility care' },
                { href: '/dog-toys', label: '🧸 Dog Toys', desc: 'Heavy-duty play' },
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
