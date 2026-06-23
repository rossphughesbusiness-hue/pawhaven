import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Best Dog Beds 2026 — Orthopedic, Cooling & Cozy | PawHaven',
  description: 'Shop vet-approved dog beds for every breed and sleep style. Orthopedic memory foam for seniors, cooling gel mats for summer, and cozy bolster beds for puppies.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-beds' },
  openGraph: {
    title: 'Best Dog Beds 2026 | PawHaven',
    description: 'Orthopedic, cooling, and cozy dog beds for every sleep style and breed size.',
    url: 'https://pawhavenpets.org/dog-beds',
  },
};

const featured = [
  {
    slug: 'orthopedic-memory-foam-dog-bed',
    name: 'Orthopedic Memory Foam Dog Bed',
    tag: 'Comfort',
    price: 79.99,
    comparePrice: 129.99,
    img: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&q=85&auto=format&fit=crop',
    badge: '38% off',
    blurb: '4" memory foam relieves joint pressure — a vet favourite for senior dogs.',
  },
  {
    slug: 'dog-cooling-gel-mat',
    name: 'Dog Cooling Gel Mat',
    tag: 'Comfort',
    price: 34.99,
    comparePrice: 54.99,
    img: 'https://images.unsplash.com/photo-1534361960057-19f4434a5fd6?w=600&q=85&auto=format&fit=crop',
    badge: '36% off',
    blurb: 'Self-cooling gel cools on contact — no electricity or refrigeration needed.',
  },
  {
    slug: 'calming-lick-mat',
    name: 'Calming Lick Mat',
    tag: 'Anxiety Relief',
    price: 14.99,
    comparePrice: 22.99,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    badge: '35% off',
    blurb: 'Freeze with peanut butter or yogurt for a calming, slow-lick experience.',
  },
];

const bedTypes = [
  { icon: '🦴', type: 'Orthopedic / Memory Foam', who: 'Best for: Senior dogs, large breeds, post-surgery recovery', desc: '4" memory foam distributes weight evenly, reducing pressure on hips, elbows, and knees.' },
  { icon: '❄️', type: 'Cooling Gel Mat', who: 'Best for: Summer heat, flat-faced breeds, indoor dogs', desc: 'Self-activated gel stays cool on contact — ideal for bulldogs, pugs, and dogs that overheat.' },
  { icon: '🏔️', type: 'Bolster / Donut Bed', who: 'Best for: Puppies, anxious dogs, dogs who like to curl up', desc: 'Raised sides provide a sense of security and head support for dogs who love to lean or burrow.' },
  { icon: '🔲', type: 'Elevated / Cot Bed', who: 'Best for: Outdoor use, hot climates, dogs who run hot', desc: 'Raised off the ground for airflow on all sides — keeps dogs cooler than any flat surface.' },
];

const sizeGuide = [
  { size: 'Small', weight: 'Up to 25 lbs', breeds: 'Chihuahua, Poodle, Shih Tzu', dims: '24" × 18"' },
  { size: 'Medium', weight: '25–50 lbs', breeds: 'Beagle, Cocker Spaniel, Border Collie', dims: '36" × 24"' },
  { size: 'Large', weight: '50–90 lbs', breeds: 'Lab, Husky, Golden Retriever', dims: '42" × 28"' },
  { size: 'XL', weight: '90+ lbs', breeds: 'Great Dane, Saint Bernard, Mastiff', dims: '54" × 36"' },
];

const faqs = [
  {
    q: 'What type of dog bed is best for senior dogs?',
    a: 'Orthopedic memory foam beds are the gold standard for senior dogs. As dogs age, joints wear and arthritis becomes common — particularly in hips, elbows, and knees. A 3–4" memory foam layer distributes body weight to relieve pressure points, reducing pain and improving sleep quality. Look for waterproof liners (easy to clean) and low entry height for dogs with mobility issues.',
  },
  {
    q: 'How big should my dog\'s bed be?',
    a: 'Measure your dog from nose to tail while stretched out, then add 8–12 inches. This gives enough room to stretch without wasting space. For dogs that curl up, you can size down slightly — but always err larger for comfort. Use our size guide above as a starting point and adjust for your dog\'s specific sleeping style.',
  },
  {
    q: 'How do I get my dog to use their new bed?',
    a: 'Place the bed in a spot your dog already gravitates toward. Add a worn item of your clothing to make it smell familiar. Use treats or lure your dog onto the bed and reward them for staying. Most dogs accept a new bed within 3–7 days. Avoid forcing or placing the dog on the bed — positive reinforcement works far better.',
  },
  {
    q: 'How often should I wash my dog\'s bed?',
    a: 'Wash covers every 1–2 weeks, or immediately after any accidents. Most PawHaven bed covers are machine washable on a gentle cycle with pet-safe detergent. Air dry covers to preserve waterproof coatings. The foam insert itself rarely needs washing — spot-clean with diluted pet-safe cleaner and allow to air dry completely before covering.',
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

export default function DogBedsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-yellow-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-4">🛏️</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Dog Beds They'll<br />
              <span className="text-yellow-300">Actually Sleep In</span>
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-8">
              Orthopedic memory foam for seniors, cooling gel for summer, cozy bolsters for pups. Every bed is vet-reviewed for support, safety, and washability.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['🦴 Joint-relieving foam', '🔬 Vet-reviewed', '🧺 Machine-washable covers', '📦 Free shipping $50+'].map(b => (
                <span key={b} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Bed types */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-navy-900 mb-8">Which Bed Type Is Right?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bedTypes.map(({ icon, type, who, desc }) => (
                <div key={type} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 flex gap-4">
                  <div className="text-3xl flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm mb-0.5">{type}</h3>
                    <p className="text-xs text-amber-700 font-medium mb-1">{who}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-navy-900 mb-2 text-center">Top-Rated Dog Beds</h2>
            <p className="text-gray-500 text-center mb-10">Vet-approved comfort for dogs of every age and breed</p>
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

        {/* Size guide */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">Dog Bed Size Guide</h2>
            <div className="overflow-x-auto rounded-2xl border border-amber-100">
              <table className="w-full text-sm bg-white">
                <thead className="bg-amber-700 text-white">
                  <tr>
                    {['Size', 'Dog Weight', 'Typical Breeds', 'Bed Dimensions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50'}>
                      <td className="px-4 py-3 font-bold text-navy-900">{row.size}</td>
                      <td className="px-4 py-3 text-gray-600">{row.weight}</td>
                      <td className="px-4 py-3 text-gray-600">{row.breeds}</td>
                      <td className="px-4 py-3 text-gray-600">{row.dims}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Tip: Measure nose-to-tail while your dog is stretched out, then add 8–12 inches.</p>
          </div>
        </section>

        {/* Vet tip */}
        <section className="bg-amber-700 text-white py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-semibold">
              🦴 <strong>Vet tip:</strong> Dogs with arthritis benefit most from beds with 3–4" of memory foam and low entry height — look for beds under 6" tall for senior dogs with mobility issues.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Dog Bed FAQs</h2>
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

        {/* Related */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-navy-900 mb-6 text-center">More for Your Dog</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: '/dog-toys', label: '🧸 Dog Toys', desc: 'Tug, puzzle & squeaky' },
                { href: '/senior-dogs', label: '🐾 Senior Dogs', desc: 'Joint & mobility care' },
                { href: '/anxiety', label: '😌 Anxiety', desc: 'Calming products' },
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
