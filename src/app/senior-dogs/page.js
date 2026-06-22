import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Products for Senior Dogs (7+) — PawHaven',
  description: 'Vet-recommended accessories for aging dogs: orthopedic beds, slow feeders, joint-friendly harnesses, and calming products. Free shipping over $50.',
  alternates: { canonical: 'https://pawhavenpets.org/senior-dogs' },
  openGraph: {
    title: 'Best Products for Senior Dogs — PawHaven',
    description: 'Give your aging dog the comfort they deserve. Orthopedic beds, gentle harnesses, calming aids, and more.',
    url: 'https://pawhavenpets.org/senior-dogs',
    type: 'website',
  },
};

const FEATURED_SLUGS = [
  'orthopedic-memory-foam-dog-bed',
  'calming-lick-mat',
  'maze-slow-feeder-bowl',
  'reflective-step-in-harness',
];

const BENEFITS = [
  { icon: '🛏', title: 'Joint Support', desc: 'Orthopedic memory foam relieves pressure points and helps arthritic dogs sleep comfortably.' },
  { icon: '🥣', title: 'Digestive Health', desc: 'Slow feeders prevent bloat and improve digestion — especially important as dogs age.' },
  { icon: '😌', title: 'Anxiety Relief', desc: 'Senior dogs often develop new anxieties. Lick mats and puzzle toys keep them calm and engaged.' },
  { icon: '🦮', title: 'Gentle Walks', desc: 'Step-in harnesses reduce neck strain and are easier to put on dogs with stiff joints.' },
];

const FAQ = [
  {
    q: 'What age is considered a senior dog?',
    a: 'Most dogs are considered senior around age 7, though larger breeds age faster — Great Danes can be senior at 5, while small breeds may not hit senior status until 10+.',
  },
  {
    q: 'What products help dogs with arthritis?',
    a: 'Orthopedic memory foam beds are the single biggest quality-of-life improvement for arthritic dogs. Step-in harnesses also reduce strain during walks.',
  },
  {
    q: 'Do slow feeders help senior dogs?',
    a: 'Yes — senior dogs are more prone to bloat. A slow feeder bowl cuts eating speed by 50–80%, significantly reducing bloat risk.',
  },
  {
    q: 'How do I help my senior dog with anxiety?',
    a: 'Calming lick mats trigger the release of endorphins through repetitive licking. Puzzle feeders also provide gentle mental stimulation that reduces anxiety.',
  },
];

export default function SeniorDogsPage() {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);
  const relatedDogProducts = products
    .filter((p) => p.category === 'Dogs' && !FEATURED_SLUGS.includes(p.slug))
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none text-[180px] leading-none flex flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>🐾</span>)}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🐶 Senior Dogs · Age 7+
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            The Best Products<br className="hidden sm:block" /> for Senior Dogs
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your senior dog gave you years of unconditional love. Give them the comfort, relief, and enrichment they deserve in their golden years.
          </p>
          <Link
            href="#products"
            className="inline-block bg-brand-500 hover:bg-brand-400 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5"
          >
            Shop Senior Dog Products →
          </Link>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="text-center">
                <div className="text-4xl mb-3">{b.icon}</div>
                <div className="font-bold text-navy-900 text-sm mb-1">{b.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured products ─── */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">Vet-Approved</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4">Top Picks for Senior Dogs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every product selected for joint health, digestive support, and comfort — the areas senior dogs need most.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* SEO prose */}
          <div className="prose prose-gray max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-4">Why Senior Dogs Need Specialized Products</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              As dogs age past 7 years, their needs shift significantly. Joint pain from arthritis affects up to 80% of senior dogs, making comfortable bedding one of the most impactful investments you can make. An <Link href="/products/orthopedic-memory-foam-dog-bed" className="text-brand-500 hover:underline">orthopedic memory foam bed</Link> distributes weight evenly and reduces pressure on inflamed joints — many owners report their dogs sleeping longer and moving more freely within days.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Digestive changes are also common in older dogs. Slower metabolism means they're more prone to <strong>bloat</strong> — a potentially life-threatening condition. A <Link href="/products/maze-slow-feeder-bowl" className="text-brand-500 hover:underline">slow feeder bowl</Link> reduces eating speed by 50–80% and is one of the cheapest and most effective bloat prevention tools available.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mental stimulation is equally important. Cognitive decline (Canine Cognitive Dysfunction) affects up to 68% of dogs aged 15–16. <Link href="/products/calming-lick-mat" className="text-brand-500 hover:underline">Lick mats</Link> and puzzle feeders keep the brain engaged and trigger calming endorphins — ideal for managing senior anxiety without medication.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For walks, traditional neck collars can strain arthritic spines. A <Link href="/products/reflective-step-in-harness" className="text-brand-500 hover:underline">step-in harness</Link> distributes leash pressure across the chest and shoulders instead, making walks more comfortable — and the reflective stitching keeps your silver-muzzled companion visible on evening strolls.
            </p>
          </div>

          {/* More products */}
          <h3 className="text-2xl font-black text-navy-900 mb-6 text-center">More Dog Favorites</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDogProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy-900 mb-10 text-center">Senior Dog FAQs</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-brand-500 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4">🐾</div>
          <h2 className="text-3xl font-black mb-4">Your Senior Dog Deserves the Best</h2>
          <p className="text-white/80 mb-8">Free shipping on orders over $50. 30-day returns, no questions asked.</p>
          <Link href="/products" className="inline-block bg-white text-brand-500 font-bold text-base px-8 py-4 rounded-full hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
            Shop All Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
