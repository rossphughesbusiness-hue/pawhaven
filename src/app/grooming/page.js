import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Pet Grooming Tools for Dogs & Cats (2026) | PawHaven',
  description:
    'Shop vet-approved grooming tools that make coat care easy and stress-free. Self-cleaning brushes, deshedding gloves, and paw cleaners for dogs and cats.',
  alternates: { canonical: 'https://pawhavenpets.org/grooming' },
  openGraph: {
    title: 'Best Pet Grooming Tools for Dogs & Cats | PawHaven',
    description: 'Self-cleaning brushes, deshedding gloves, and paw cleaners — all vet-approved.',
    url: 'https://pawhavenpets.org/grooming',
  },
};

const SLUGS = ['self-cleaning-slicker-brush', 'portable-paw-cleaner', 'cat-deshedding-grooming-glove'];
const featured = SLUGS.map((s) => products.find((p) => p.slug === s)).filter(Boolean);

const TIPS = [
  {
    icon: '📅',
    title: 'Brush 2–3x per week',
    desc: 'Regular brushing distributes natural oils, prevents matting, and dramatically reduces shedding around the home.',
  },
  {
    icon: '🐾',
    title: 'Clean paws after every walk',
    desc: 'Paws collect bacteria, allergens, and road chemicals. A quick 5-second paw rinse protects floors and your pet's health.',
  },
  {
    icon: '🛁',
    title: 'Start grooming early',
    desc: 'Puppies and kittens introduced to grooming early accept it as normal — making the routine faster and less stressful for life.',
  },
  {
    icon: '🎯',
    title: 'Match the tool to the coat',
    desc: 'Short coats need a rubber brush or grooming glove. Long, thick coats need a slicker brush with steel pins. Double coats need both.',
  },
];

const FAQS = [
  {
    q: 'How often should I groom my dog?',
    a: 'Most dogs benefit from brushing 2–3 times per week. Short-coated breeds can get away with weekly brushing, while long-haired and double-coated breeds like Golden Retrievers, Huskies, and Maine Coons may need daily attention during shedding season.',
  },
  {
    q: 'Do cats need to be brushed?',
    a: "Yes — especially indoor cats and long-haired breeds. Regular brushing reduces hairballs, prevents matting, and is a bonding activity most cats enjoy. A grooming glove is ideal for cats who are resistant to traditional brushes, since it feels like being petted.",
  },
  {
    q: 'What is a self-cleaning slicker brush?',
    a: 'A self-cleaning slicker brush has a button that retracts the bristles so collected fur ejects instantly into the trash — no need to pull fur off the brush by hand. This makes grooming sessions faster and much less messy.',
  },
  {
    q: 'How do I clean my dog's paws without a bath?',
    a: "A portable paw cleaner is the fastest solution. Fill it with water, insert each paw, twist gently, and the silicone bristles loosen mud and debris in seconds. It's gentle enough for daily use and takes about 5 seconds per paw.",
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

export default function GroomingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)' }}
          className="border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                ✂️ Pet Grooming
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
                Grooming tools that make coat care{' '}
                <span className="text-emerald-600">effortless</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Regular grooming isn't just about looks — it's how you keep your pet healthy, comfortable, and bonded to you. Our tools make the routine faster, cleaner, and stress-free for both of you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#products"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg"
                >
                  Shop Grooming →
                </Link>
                <Link
                  href="/quiz"
                  className="bg-white border border-emerald-200 text-emerald-700 font-bold px-8 py-3.5 rounded-full hover:border-emerald-400 transition-colors"
                >
                  Take the Quiz ✨
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { n: '3', label: 'Grooming Essentials' },
                { n: '25%', label: 'Less Shedding (avg)' },
                { n: '5 sec', label: 'Paw Clean Time' },
                { n: '4.8★', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black">{s.n}</div>
                  <div className="text-emerald-200 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Our Grooming Essentials</h2>
            <p className="text-gray-500">Three tools that cover every coat type — dogs and cats.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featured.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <Image
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.comparePrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                        {Math.round((1 - p.price / p.comparePrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-emerald-600 mb-1">{p.tag}</p>
                    <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{p.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-gray-900">${p.price.toFixed(2)}</span>
                        {p.comparePrice && (
                          <span className="text-sm text-gray-400 line-through">${p.comparePrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="bg-emerald-600 text-white text-sm font-bold px-4 py-1.5 rounded-full group-hover:bg-emerald-500 transition-colors">
                        Shop →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">Grooming tips from the pros</h2>
            <p className="text-gray-500 text-center mb-12">Simple habits that make a big difference.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TIPS.map((tip) => (
                <div key={tip.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h3 className="font-black text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Grooming FAQs</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-gray-50 rounded-2xl px-6 py-5 cursor-pointer border border-gray-100 hover:border-emerald-200 transition-colors">
                <summary className="font-bold text-gray-900 list-none flex items-center justify-between gap-4">
                  {q}
                  <span className="text-emerald-600 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed text-sm">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-emerald-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
            <div className="text-4xl mb-4">✂️</div>
            <h2 className="text-3xl font-black mb-3">Ready for a cleaner, happier pet?</h2>
            <p className="text-emerald-200 mb-8">Use code <strong className="text-white">WELCOME10</strong> for 10% off your first order.</p>
            <Link
              href="/products"
              className="inline-block bg-white text-emerald-700 font-black px-10 py-4 rounded-full hover:bg-emerald-50 transition-colors text-lg"
            >
              Shop All Products →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
