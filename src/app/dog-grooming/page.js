import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Dog Grooming at Home 2026 — Best Tools & Step-by-Step Guide | PawHaven',
  description: 'Vet-backed dog grooming tools and techniques for coat brushing, nail care, paw cleaning, and deshedding. Everything you need to groom your dog at home.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-grooming' },
  openGraph: {
    title: 'Dog Grooming at Home 2026 | PawHaven',
    description: 'The right tools and techniques for brushing, nail trims, paw care, and deshedding — vet-approved dog grooming at home.',
    url: 'https://pawhavenpets.org/dog-grooming',
  },
};

const featured = [
  {
    slug: 'self-cleaning-slicker-brush',
    name: 'Self-Cleaning Slicker Brush',
    tag: 'Grooming',
    price: 24.99,
    comparePrice: 39.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Fine steel pins remove undercoat and tangles — one-click retract ejects fur instantly for all coat types.',
  },
  {
    slug: 'portable-paw-cleaner',
    name: 'Portable Paw Cleaner',
    tag: 'Grooming',
    price: 18.99,
    comparePrice: 29.99,
    img: 'https://images.unsplash.com/photo-1535930891776-0539ec2ecb2b?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Soft silicone bristles remove mud and debris in seconds — gentle enough for daily use after walks.',
  },
  {
    slug: 'dog-paw-balm-stick',
    name: 'Dog Paw Balm Stick',
    tag: 'Grooming',
    price: 12.99,
    comparePrice: 19.99,
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'All-natural beeswax formula heals cracked pads — protects against hot pavement and winter ice salt.',
  },
];

const groomingTypes = [
  {
    icon: '🐶',
    type: 'Coat & Brushing',
    desc: 'Brush 2–3× weekly (daily for long coats). Removes loose fur, prevents matting, and distributes skin oils. Reduces shedding by up to 90% when done consistently.',
  },
  {
    icon: '🐾',
    type: 'Nail Trimming',
    desc: 'Trim every 3–4 weeks. Overgrown nails can affect gait and cause joint pain. Grinders are quieter and safer than clippers for anxious dogs.',
  },
  {
    icon: '🚿',
    type: 'Paw Cleaning',
    desc: 'Clean paws after every outdoor walk. Removes allergens, road salt, and bacteria. Protects your floors and prevents ingestion of toxins during licking.',
  },
  {
    icon: '👂',
    type: 'Ear & Teeth',
    desc: 'Check ears weekly for wax or odor. Brush teeth 2–3× weekly — dental disease affects 80% of dogs by age 3. Start both habits early for lifelong compliance.',
  },
];

const coatGuide = [
  {
    coatType: 'Short / smooth (Beagle, Boxer, Whippet)',
    brushing: 'Once weekly',
    tool: 'Rubber curry brush or mitt',
    bath: 'Every 6–8 weeks',
    shed: 'Low–moderate',
  },
  {
    coatType: 'Double coat (Lab, Golden, Husky)',
    brushing: '3–4× weekly',
    tool: 'Slicker brush + deshedder',
    bath: 'Every 4–6 weeks',
    shed: 'High (seasonal blowout)',
  },
  {
    coatType: 'Long / silky (Spaniel, Setter, Shih Tzu)',
    brushing: 'Daily',
    tool: 'Slicker brush + wide-tooth comb',
    bath: 'Every 3–4 weeks',
    shed: 'Low (but tangles form fast)',
  },
  {
    coatType: 'Curly / wavy (Poodle, Doodle, Bichon)',
    brushing: 'Daily',
    tool: 'Slicker brush + dematting comb',
    bath: 'Every 3–4 weeks',
    shed: 'Very low (but mats badly)',
  },
  {
    coatType: 'Wire / rough (Terrier, Schnauzer)',
    brushing: '2–3× weekly',
    tool: 'Slicker brush + stripping comb',
    bath: 'Every 6–8 weeks',
    shed: 'Low',
  },
];

const groomingTips = [
  {
    tip: 'Brush before bathing, never after',
    why: 'Water sets tangles and matting. Brushing dry fur first removes knots and loose undercoat — bathing a matted dog makes the problem significantly worse and harder to fix.',
  },
  {
    tip: 'Introduce nail grinding gradually',
    why: 'Most dogs fear nail trims because of past quick nicks. A grinder with a quiet motor, introduced in short sessions with high-value treats, converts almost all nail-trim-resistant dogs within 2–3 weeks.',
  },
  {
    tip: 'Clean paws every walk — not just muddy ones',
    why: 'Road salt, fertilizer, pesticides, and allergens accumulate on paws year-round. Daily paw cleaning prevents seasonal allergies from paw licking and protects against chemical ingestion.',
  },
  {
    tip: 'Use a lick mat to keep dogs still during grooming',
    why: 'A frozen lick mat with peanut butter or wet food occupies a dog for 10–15 minutes. This single tool converts difficult grooming sessions into easy ones — especially for brushing, nail grinding, and ear cleaning.',
  },
];

const faqs = [
  {
    q: 'How often should I groom my dog at home?',
    a: 'It depends on coat type. Short-coated dogs (Beagle, Boxer) need brushing once weekly and bathing every 6–8 weeks. Double-coated dogs (Golden Retriever, Husky) need brushing 3–4× weekly, especially during seasonal shedding. Long-coated and curly dogs (Shih Tzu, Poodle) need daily brushing and bathing every 3–4 weeks. Nail trims every 3–4 weeks and ear checks weekly apply to all breeds.',
  },
  {
    q: 'What is the best brush for a dog that sheds a lot?',
    a: 'For heavy shedders, a two-tool approach works best: a slicker brush for regular coat maintenance (removes surface fur and prevents tangles) combined with an undercoat deshedding tool for weekly deep sessions. The deshedding tool reaches the dense undercoat layer that slicker brushes miss — this is where most of the loose fur comes from in double-coated breeds. One thorough deshedding session per week can reduce shedding by up to 90%.',
  },
  {
    q: 'How do I clean my dog\'s paws without a bath?',
    a: 'A paw cleaner cup is the most effective solution for daily post-walk cleaning. Add a small amount of water to the cup, insert each paw and twist gently — the soft silicone bristles dislodge mud, salt, and debris without needing a full rinse. For quick cleanups, unscented pet wipes work well. For deep cleaning between toes (where allergens accumulate), a warm damp cloth or cotton ball with a small amount of diluted pet shampoo is effective.',
  },
  {
    q: 'Should I groom my dog before or after a bath?',
    a: 'Always before. Brushing a wet coat sets tangles and can cause the brush to pull painful mats tighter. Brush and detangle while the coat is completely dry, then bathe. After bathing, wait until the coat is fully dry before brushing again. Use a hair dryer on low-cool setting for thick double coats — air drying takes too long and can cause "wet dog" odor from bacterial growth in the dense undercoat.',
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

export default function DogGroomingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🐕</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Dog Grooming at Home —<br />
              <span className="text-amber-200">The Right Tools, Done Right</span>
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-backed tools and step-by-step guidance for coat brushing, paw cleaning, nail care, and deshedding. Save on groomer fees without sacrificing quality.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🐾 Vet-backed tips', '🐕 Breed-specific advice', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Grooming type guide */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-2">The 4 Areas of Dog Grooming</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Each area has different tools, technique, and frequency — here's what to know</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {groomingTypes.map(({ icon, type, desc }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 text-center">
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
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top-Rated Dog Grooming Tools</h2>
            <p className="text-gray-500 text-center mb-10">Vet-recommended picks for brushing, paw care, and coat health</p>
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
                    <span className="absolute top-3 left-3 bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Dog Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Coat type guide table */}
        <section className="py-14 px-4 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-2 text-center">Grooming Guide by Coat Type</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Different coats need very different tools and schedules — find yours below</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-700 text-white">
                    <th className="text-left px-5 py-3 font-semibold rounded-tl-2xl">Coat Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Brushing</th>
                    <th className="text-left px-4 py-3 font-semibold">Best Tool</th>
                    <th className="text-left px-4 py-3 font-semibold">Bath Freq.</th>
                    <th className="text-left px-4 py-3 font-semibold rounded-tr-2xl">Shedding</th>
                  </tr>
                </thead>
                <tbody>
                  {coatGuide.map((row, i) => (
                    <tr key={row.coatType} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50/40'}>
                      <td className="px-5 py-3 font-medium text-navy-900">{row.coatType}</td>
                      <td className="px-4 py-3 text-gray-600">{row.brushing}</td>
                      <td className="px-4 py-3 text-gray-600">{row.tool}</td>
                      <td className="px-4 py-3 text-gray-600">{row.bath}</td>
                      <td className="px-4 py-3 text-gray-600">{row.shed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Grooming tips */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">4 Vet-Backed Grooming Tips</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {groomingTips.map(({ tip, why }) => (
                <div key={tip} className="bg-amber-50 rounded-2xl p-5 border border-amber-100 shadow-sm flex gap-3">
                  <div className="text-amber-700 text-xl flex-shrink-0">✓</div>
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
        <section className="bg-amber-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🐾 <strong>Vet tip:</strong> Regular at-home grooming isn't just about appearance — it's preventive healthcare. Monthly checks for lumps, skin changes, and ear or dental issues caught during grooming visits are more likely to be found by owners than at annual vet appointments.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Dog Grooming FAQs</h2>
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

        {/* Related pages */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More Dog Care</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/grooming', label: '✂️ All Grooming', desc: 'Dogs & cats tools' },
                { href: '/dog-walking', label: '🦮 Dog Walking', desc: 'Leash & harness picks' },
                { href: '/senior-dogs', label: '🐾 Senior Dogs', desc: 'Comfort & care 7+' },
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
