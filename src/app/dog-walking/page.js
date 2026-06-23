import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Dog Walking Accessories (2026) — Harness, Leash & More | PawHaven',
  description:
    'Everything you need for safer, more enjoyable walks. No-pull harnesses, retractable leashes, LED collars, treat pouches, and paw cleaners — all vet-approved.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-walking' },
  openGraph: {
    title: 'Best Dog Walking Accessories 2026 | PawHaven',
    description: 'No-pull harnesses, retractable leashes, LED collars, and more — built for safer walks.',
    url: 'https://pawhavenpets.org/dog-walking',
  },
};

const SLUGS = [
  'reflective-step-in-harness',
  'retractable-pro-dog-leash',
  'safeglow-led-collar',
  'dog-treat-training-pouch',
  'portable-paw-cleaner',
];
const featured = SLUGS.map((s) => products.find((p) => p.slug === s)).filter(Boolean);

const WALK_CHECKLIST = [
  { icon: '🦺', label: 'Harness', note: 'No-pull, step-in — protects the trachea' },
  { icon: '📏', label: 'Leash', note: '16-ft retractable for open spaces, 6-ft for city' },
  { icon: '💡', label: 'LED Collar', note: 'Essential for early morning and evening walks' },
  { icon: '🎽', label: 'Treat Pouch', note: 'Hands-free rewards = faster training on the go' },
  { icon: '🐾', label: 'Paw Cleaner', note: '5-second rinse keeps mud and bacteria out' },
];

const FAQS = [
  {
    q: 'Is a harness better than a collar for walking dogs?',
    a: "For most dogs, yes. Collars put pressure directly on the trachea when a dog pulls, which can cause coughing, injury, or long-term damage — especially in small breeds. A step-in harness distributes pressure across the chest and shoulders instead, which is safer and often reduces pulling behavior on its own.",
  },
  {
    q: 'Are retractable leashes safe?',
    a: "Retractable leashes are great for open spaces like parks and trails where you want to give your dog more freedom to explore. On city sidewalks or near traffic, lock it at 6 feet for control. The key is to always keep a thumb on the lock button so you can stop quickly if needed.",
  },
  {
    q: 'Should my dog wear an LED collar at night?',
    a: "Absolutely. Most dog-related accidents happen at dawn and dusk when visibility is lowest. An LED collar makes your dog visible to drivers from over 500 feet away — compared to just 50 feet for a non-lit dog. It's one of the cheapest, most effective safety upgrades you can make.",
  },
  {
    q: 'Why use a treat pouch on walks?',
    a: "Treat pouches keep rewards instantly accessible without digging through pockets or a bag. This matters because timing is everything in dog training — a treat delivered within 2 seconds of a good behavior is 4x more effective than one delivered 10 seconds later. Treat pouches also free both hands for leash control.",
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function DogWalkingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)' }}
          className="border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                🦮 Dog Walking
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
                Walk smarter, walk{' '}
                <span className="text-blue-600">safer</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The right gear transforms every walk — less pulling, more confidence, and the freedom to enjoy it. These are the five essentials that professional dog trainers and vets actually recommend.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#products"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg"
                >
                  Shop Walking Gear →
                </Link>
                <Link
                  href="/dog-training"
                  className="bg-white border border-blue-200 text-blue-700 font-bold px-8 py-3.5 rounded-full hover:border-blue-400 transition-colors"
                >
                  Training Tips →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist strip */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest text-center mb-4">The Perfect Walk Checklist</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              {WALK_CHECKLIST.map((item) => (
                <div key={item.label}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-black text-sm">{item.label}</div>
                  <div className="text-blue-200 text-xs mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Walking Essentials</h2>
            <p className="text-gray-500">Five products. One perfect walk. All vet-recommended.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className={`group block ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.comparePrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                        {Math.round((1 - p.price / p.comparePrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs font-bold text-blue-600 mb-1">{p.tag}</p>
                    <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{p.shortDescription}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-gray-900">${p.price.toFixed(2)}</span>
                        {p.comparePrice && (
                          <span className="text-sm text-gray-400 line-through">${p.comparePrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full group-hover:bg-blue-500 transition-colors">
                        Shop →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Dog Walking FAQs</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-2xl px-6 py-5 cursor-pointer border border-gray-100 hover:border-blue-200 transition-colors">
                  <summary className="font-bold text-gray-900 list-none flex items-center justify-between gap-4">
                    {q}
                    <span className="text-blue-600 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed text-sm">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Related pages */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/dog-training', emoji: '🎓', title: 'Dog Training', desc: 'Train your dog on the leash and off.' },
              { href: '/dogs', emoji: '🐶', title: 'All Dog Products', desc: 'Browse the full dog accessories catalog.' },
              { href: '/puppies', emoji: '🐕', title: 'Puppy Essentials', desc: 'Everything new puppy owners need.' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
            <div className="text-4xl mb-4">🦮</div>
            <h2 className="text-3xl font-black mb-3">Your best walk starts here</h2>
            <p className="text-blue-200 mb-8">Use code <strong className="text-white">WELCOME10</strong> for 10% off your first order.</p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-700 font-black px-10 py-4 rounded-full hover:bg-blue-50 transition-colors text-lg"
            >
              Shop All Products →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
