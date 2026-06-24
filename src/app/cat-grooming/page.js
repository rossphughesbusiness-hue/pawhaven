import Link from 'next/link';

export const metadata = {
  title: 'Cat Grooming Guide 2026 — Best Tools & How to Groom a Cat at Home | PawHaven',
  description: 'Learn how to groom a cat at home with vet-backed tips and the best cat grooming tools. Self-cleaning slicker brushes, paw cleaners, nail grinders & more.',
  alternates: { canonical: 'https://pawhavenpets.org/cat-grooming' },
  openGraph: {
    title: 'Cat Grooming Guide 2026 | PawHaven',
    description: 'Vet-backed cat grooming tools and step-by-step guidance for coat, nails, ears, and teeth.',
    url: 'https://pawhavenpets.org/cat-grooming',
  },
};

const featured = [
  {
    slug: 'self-cleaning-slicker-brush',
    name: 'Self-Cleaning Slicker Brush',
    tag: 'Grooming',
    price: 24.99,
    comparePrice: 39.99,
    img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Fine steel pins remove undercoat and tangles — one-click retract ejects fur instantly.',
  },
  {
    slug: 'portable-paw-cleaner',
    name: 'Portable Paw Cleaner',
    tag: 'Grooming',
    price: 18.99,
    comparePrice: 29.99,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85&auto=format&fit=crop',
    badge: '37% off',
    blurb: 'Soft silicone bristles lift dirt from paws in seconds — gentle enough for daily use.',
  },
  {
    slug: 'pet-nail-grinder-rechargeable',
    name: 'Pet Nail Grinder (Rechargeable)',
    tag: 'Nails',
    price: 28.99,
    comparePrice: 44.99,
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=85&auto=format&fit=crop',
    badge: '36% off',
    blurb: 'Quiet motor, 2-speed settings — smoother edges than clippers, no splitting risk.',
  },
];

const groomingTypes = [
  {
    icon: '🐱',
    type: 'Coat & Brushing',
    desc: 'Weekly brushing removes loose fur, prevents matting, and distributes natural oils. Long-haired breeds need daily attention — especially around the neck, belly, and armpits.',
  },
  {
    icon: '💅',
    type: 'Nail Trimming',
    desc: 'Trim every 2–4 weeks. Overgrown nails curl into the paw pad. Grinders are safer than clippers for nervous cats — the gradual abrasion gives better control.',
  },
  {
    icon: '👂',
    type: 'Ear Cleaning',
    desc: 'Check ears weekly for wax, debris, or odor. Clean monthly with a vet-approved solution and a cotton ball. Never insert anything into the ear canal.',
  },
  {
    icon: '🦷',
    type: 'Dental Hygiene',
    desc: 'Dental disease affects 70% of cats by age 3. Daily tooth brushing is ideal. Start with a finger brush and cat-safe toothpaste — never use human toothpaste.',
  },
];

const groomingTips = [
  {
    tip: 'Start grooming early — even if not needed yet',
    why: 'Cats that are introduced to brushing, nail trims, and handling as kittens tolerate grooming far better as adults. Exposure during the sensitive period (2–7 weeks) is ideal; after that, gradual desensitization with treats works well.',
  },
  {
    tip: 'Keep sessions short and high-value',
    why: 'Two minutes of grooming with treats is more productive than ten minutes of wrestling. End before the cat becomes impatient — stopping on a good note builds positive associations faster than pushing through resistance.',
  },
  {
    tip: 'Never bathe unless medically necessary',
    why: 'Cats are self-cleaning and find baths extremely stressful. Bathing strips natural oils and can cause hypothermia in smaller cats. If your cat has gotten into something toxic, a damp warm cloth over the affected area is usually sufficient.',
  },
  {
    tip: 'Watch for signs of skin issues during grooming',
    why: 'Regular grooming gives you a chance to check for fleas, ticks, dandruff, lumps, or areas of pain sensitivity. Catching these early — before they\'re visible symptoms — is one of the biggest practical benefits of routine grooming.',
  },
];

const frequencyGuide = [
  { coatType: 'Short-haired (e.g., Siamese, Burmese)', brushing: 'Once weekly', nails: 'Every 3–4 weeks', ears: 'Monthly check', teeth: 'Daily (or 3× weekly)' },
  { coatType: 'Medium-haired (e.g., Ragdoll, Abyssinian)', brushing: '2–3× weekly', nails: 'Every 2–3 weeks', ears: 'Bi-weekly check', teeth: 'Daily (or 3× weekly)' },
  { coatType: 'Long-haired (e.g., Persian, Maine Coon)', brushing: 'Daily', nails: 'Every 2 weeks', ears: 'Weekly check', teeth: 'Daily' },
  { coatType: 'Senior cats (7+)', brushing: '2–3× weekly', nails: 'Every 2 weeks', ears: 'Monthly check', teeth: 'Daily' },
];

const faqs = [
  {
    q: 'How do I groom a cat at home if they hate being touched?',
    a: 'Start with extremely brief, positive sessions — 30 seconds of touching the cat\'s back while giving a high-value treat, then stop. Repeat daily. Gradually extend the duration and introduce the brush only when the cat is relaxed. A grooming glove is often easier to introduce than a brush because it feels like petting. Most cats that "hate grooming" have simply never been desensitized to it properly.',
  },
  {
    q: 'What are the best cat grooming tools for shedding?',
    a: 'For shedding control, the most effective tools are: (1) a self-cleaning slicker brush for regular coat maintenance, (2) a deshedding tool with fine teeth to pull out loose undercoat before it sheds naturally, and (3) a grooming glove for cats that resist traditional brushes. One thorough deshedding session with the right tool can reduce shedding by up to 90% for 2–3 weeks.',
  },
  {
    q: 'How often should I trim my cat\'s nails?',
    a: 'Every 2–4 weeks for most cats. Indoor cats don\'t naturally wear down their nails on rough surfaces, so overgrowth is common. The key indicator: when you hear clicking on hard floors, it\'s time. Check the "quick" (the pink blood vessel inside the nail) and trim only the curved, translucent tip. If you nick the quick, apply styptic powder or corn starch to stop bleeding.',
  },
  {
    q: 'Do indoor cats need grooming if they clean themselves?',
    a: 'Yes. Self-grooming handles surface dirt and basic coat maintenance, but cats cannot prevent matting in long or medium coats, remove all loose undercoat (leading to hairballs), trim their own nails, or clean their ears and teeth. Even short-haired cats benefit from weekly brushing to reduce hairballs and shedding, plus monthly nail trims, ear checks, and dental care.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Cat Grooming', item: 'https://pawhavenpets.org/cat-grooming' },
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

export default function CatGroomingPage() {
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
        <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">✂️</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Cat Grooming at Home —<br />
              <span className="text-teal-200">Done Right, Stress-Free</span>
            </h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
              Vet-backed tools and techniques for coat brushing, nail trimming, ear care, and dental hygiene. Everything you need to keep your cat healthy between vet visits.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🐾 Vet-backed tips', '✂️ Right-sized tools', '📦 Free shipping $50+', '↩️ 30-day returns'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Grooming type guide */}
        <section className="py-12 px-4 bg-teal-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-2">The 4 Areas of Cat Grooming</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Each area has different tools, technique, and frequency — here\'s the overview</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {groomingTypes.map(({ icon, type, desc }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-teal-100 text-center">
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
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top-Rated Cat Grooming Tools</h2>
            <p className="text-gray-500 text-center mb-10">Vet-recommended picks for brushing, paws, and nail care</p>
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
                    <span className="absolute top-3 left-3 bg-teal-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 mb-1 group-hover:text-teal-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{p.blurb}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-navy-900">${p.price}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${p.comparePrice}</span>
                      </div>
                      <span className="text-teal-700 font-semibold text-sm">Shop →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/products?category=Cats"
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                See All Cat Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Grooming tips */}
        <section className="py-12 px-4 bg-teal-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">4 Vet-Backed Grooming Tips</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {groomingTips.map(({ tip, why }) => (
                <div key={tip} className="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm flex gap-3">
                  <div className="text-teal-700 text-xl flex-shrink-0">✓</div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{tip}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequency guide table */}
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-2 text-center">Grooming Frequency by Coat Type</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Use this as your baseline — individual cats may need more or less depending on their lifestyle</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-700 text-white">
                    <th className="text-left px-5 py-3 font-semibold rounded-tl-2xl">Coat Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Brushing</th>
                    <th className="text-left px-4 py-3 font-semibold">Nail Trim</th>
                    <th className="text-left px-4 py-3 font-semibold">Ears</th>
                    <th className="text-left px-4 py-3 font-semibold rounded-tr-2xl">Teeth</th>
                  </tr>
                </thead>
                <tbody>
                  {frequencyGuide.map((row, i) => (
                    <tr key={row.coatType} className={i % 2 === 0 ? 'bg-white' : 'bg-teal-50/40'}>
                      <td className="px-5 py-3 font-medium text-navy-900">{row.coatType}</td>
                      <td className="px-4 py-3 text-gray-600">{row.brushing}</td>
                      <td className="px-4 py-3 text-gray-600">{row.nails}</td>
                      <td className="px-4 py-3 text-gray-600">{row.ears}</td>
                      <td className="px-4 py-3 text-gray-600">{row.teeth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Vet tip strip */}
        <section className="bg-teal-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🐾 <strong>Vet tip:</strong> Regular grooming isn\'t just cosmetic — it\'s preventive healthcare. Brushing distributes skin oils, reduces hairballs, and gives you weekly contact with your cat\'s skin and coat so you can catch lumps, parasites, or sore spots early.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Cat Grooming FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer font-semibold text-navy-900 list-none">
                    {q}
                    <span className="text-teal-700 text-xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
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
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More Cat Care</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/grooming', label: '✂️ All Grooming', desc: 'Dogs & cats tools' },
                { href: '/senior-cats', label: '🌸 Senior Cats', desc: 'Care for cats 7+' },
                { href: '/indoor-cats', label: '🏠 Indoor Cats', desc: 'Essential indoor kit' },
                { href: '/cat-feeding', label: '🍽️ Cat Feeding', desc: 'Bowls & feeders' },
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
