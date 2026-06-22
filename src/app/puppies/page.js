import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Puppy Accessories & Supplies — New Dog Essentials | PawHaven',
  description: 'Everything you need for a new puppy: slow feeders, step-in harnesses, LED collars, training aids, and enrichment toys. Free shipping over $50.',
  alternates: { canonical: 'https://pawhavenpets.org/puppies' },
  openGraph: {
    title: 'Best Puppy Accessories & Supplies — PawHaven',
    description: 'Set your new puppy up for success with vet-recommended accessories for feeding, training, safety, and play.',
    url: 'https://pawhavenpets.org/puppies',
    type: 'website',
  },
};

const PUPPY_SLUGS = [
  'maze-slow-feeder-bowl',
  'reflective-step-in-harness',
  'calming-lick-mat',
  'safeglow-led-collar',
];

const CHECKLIST = [
  { week: 'Week 1', items: ['Slow feeder bowl', 'Step-in harness (size up as they grow)', 'Lick mat for settling'] },
  { week: 'Week 2', items: ['LED collar for evening walks', 'Puzzle feeder for mental stimulation', 'Portable travel bowl'] },
  { week: 'Month 2+', items: ['Leash training gear', 'Enrichment toys', 'Grooming brush'] },
];

const TIPS = [
  {
    icon: '🥣',
    title: 'Start with a Slow Feeder',
    desc: 'Puppies eat fast and are especially prone to bloat. A slow feeder bowl cuts eating speed by up to 80% and teaches healthy eating habits from day one.',
  },
  {
    icon: '🦺',
    title: 'Use a Harness, Not a Collar',
    desc: "Puppies haven't learned leash manners yet. When they pull, a collar concentrates stress on their throat. A step-in harness distributes pressure safely and is easier to size.",
  },
  {
    icon: '🧩',
    title: 'Mental Stimulation Prevents Destruction',
    desc: 'Puppies chew when they\'re bored. 15 minutes of puzzle feeder time can replace hours of destructive behavior by burning mental energy constructively.',
  },
  {
    icon: '😌',
    title: 'Lick Mats for Alone Time',
    desc: 'Separation anxiety is common in the first weeks. A lick mat with peanut butter creates a positive association with alone time and helps puppies self-settle.',
  },
];

export default function PuppiesPage() {
  const featured = PUPPY_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);
  const morePuppyProducts = products
    .filter((p) => p.category === 'Dogs' && !PUPPY_SLUGS.includes(p.slug))
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-orange-500 to-brand-500 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none text-[200px] leading-none flex flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>🐶</span>)}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🐶 New Puppy Essentials
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Everything Your New<br className="hidden sm:block" /> Puppy Needs
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Vet-recommended gear to start your puppy off right — healthy eating habits, safe walks, mental stimulation, and calm settling from day one.
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-orange-500 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Puppy Essentials →
          </Link>
        </div>
      </section>

      {/* ─── Why these matter ─── */}
      <section className="bg-orange-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">Why the Right Start Matters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map((tip) => (
              <div key={tip.title} className="text-center bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                <div className="text-4xl mb-3">{tip.icon}</div>
                <div className="font-bold text-navy-900 text-sm mb-2">{tip.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured products ─── */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">Start Here</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4">The Puppy Starter Pack</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The 4 products every new puppy owner should have in week one.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* Week-by-week checklist */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-6 text-center">New Puppy Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CHECKLIST.map(({ week, items }) => (
                <div key={week} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="font-black text-brand-500 text-sm uppercase tracking-wider mb-3">{week}</div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-navy-900">
                        <span className="text-emerald-500 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* SEO prose */}
          <div className="prose max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-4">Puppy Accessories That Make a Real Difference</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The first 16 weeks of a puppy's life are the most critical for forming healthy habits. The accessories you choose during this period can determine whether your dog grows up calm and well-behaved — or anxious and destructive.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              A <Link href="/products/maze-slow-feeder-bowl" className="text-brand-500 hover:underline">slow feeder bowl</Link> is the single highest-leverage investment for a new puppy. Beyond bloat prevention, it teaches puppies to pace themselves — a skill that carries into adulthood. Most puppies finish their meal 3–5 times slower with a slow feeder.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For walks, a <Link href="/products/reflective-step-in-harness" className="text-brand-500 hover:underline">step-in harness</Link> is far safer than a neck collar for puppies still learning leash manners. The chest-and-shoulder design prevents tracheal damage from pulling, and the step-in style is easier to put on a wriggly puppy than traditional overhead harnesses.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For settling and crate training, the <Link href="/products/calming-lick-mat" className="text-brand-500 hover:underline">calming lick mat</Link> is invaluable. Smear it with puppy-safe peanut butter or wet food and place it in the crate — the licking activates the parasympathetic nervous system and helps puppies associate the crate with calm pleasure rather than confinement.
            </p>
          </div>

          {/* More products */}
          <h3 className="text-2xl font-black text-navy-900 mb-6 text-center">Complete Your Puppy Setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {morePuppyProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-brand-500 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4">🐶</div>
          <h2 className="text-3xl font-black mb-4">Set Your Puppy Up for Life</h2>
          <p className="text-white/80 mb-8">Free shipping on orders over $50. 30-day returns. Vet-approved products.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dogs" className="inline-block bg-white text-brand-500 font-bold text-base px-8 py-4 rounded-full hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              All Dog Products →
            </Link>
            <Link href="/bundles" className="inline-block border-2 border-white text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200">
              Bundle & Save →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
