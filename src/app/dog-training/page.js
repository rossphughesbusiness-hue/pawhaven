import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Best Dog Training Accessories & Gear 2026 | PawHaven',
  description: 'Vet-recommended dog training accessories: treat pouches, step-in harnesses, leashes, and reward toys. Everything you need for positive reinforcement training.',
  alternates: { canonical: 'https://pawhavenpets.org/dog-training' },
  openGraph: {
    title: 'Best Dog Training Accessories & Gear 2026 — PawHaven',
    description: 'The right training gear makes all the difference. Shop treat pouches, harnesses, and enrichment toys for faster, more effective positive reinforcement training.',
    url: 'https://pawhavenpets.org/dog-training',
    type: 'website',
  },
};

const TRAINING_SLUGS = [
  'dog-treat-training-pouch',
  'reflective-step-in-harness',
  'retractable-pro-dog-leash',
  'heavy-duty-rope-tug-toy',
];

const TIPS = [
  {
    icon: '🎯',
    title: 'Reward Within 2 Seconds',
    desc: 'Dogs connect rewards to whatever they were doing in the last 2 seconds. A treat pouch with instant one-hand access is not optional — it\'s the difference between teaching "sit" and teaching "sit then look around confused."',
  },
  {
    icon: '🦺',
    title: 'Use a Harness for Loose-Leash Training',
    desc: 'A no-pull harness redirects your dog toward you when they forge ahead, reinforcing the correct position without pain or pressure on the trachea. Step-in harnesses are easiest to fit on wriggly dogs.',
  },
  {
    icon: '🎾',
    title: 'Make Play Part of the Reward System',
    desc: 'For high-drive dogs, a tug toy can be more motivating than food. Ending a training session with a tug game creates a powerful reward history and makes your dog eager to work for access to play.',
  },
  {
    icon: '📏',
    title: 'Train at the Right Distance',
    desc: 'A retractable leash lets you proof commands at distance — sit, stay, come — without letting your dog fully off-leash before they\'re ready. Distance is a variable in training, not just a safety feature.',
  },
];

const STAGES = [
  {
    stage: 'Week 1–2',
    focus: 'Foundation commands',
    items: ['Name recognition', 'Sit', 'Watch me', 'Leave it'],
    gear: 'Treat pouch + high-value treats',
  },
  {
    stage: 'Week 3–4',
    focus: 'Leash manners',
    items: ['Loose-leash walking', 'Auto-sit at crossings', 'No pulling', 'Direction changes'],
    gear: 'Step-in harness + 6ft leash',
  },
  {
    stage: 'Month 2+',
    focus: 'Distance & distraction',
    items: ['Stay with distance', 'Reliable recall', 'Proofing in public', 'Off-leash prep'],
    gear: 'Retractable leash + tug toy rewards',
  },
];

const FAQ_TRAINING = [
  {
    q: 'What treats should I use for dog training?',
    a: 'Use small (pea-sized), high-value treats your dog doesn\'t get at other times — cooked chicken, cheese, or commercial training treats work well. The treat should be consumed in under 2 seconds so training doesn\'t stall. A treat pouch worn on your hip keeps treats accessible without fumbling in your pocket.',
  },
  {
    q: 'How does a treat training pouch work?',
    a: 'A training pouch clips to your waistband or belt and holds treats in a wide-mouth compartment you can open with one hand mid-command. The best pouches have magnetic or drawstring closures that open instantly and close automatically, so you\'re never searching for treats during a critical training moment.',
  },
  {
    q: 'What is the best age to start training a dog?',
    a: 'Puppies can begin basic training as early as 8 weeks old — their brains are highly plastic at this stage and they absorb commands quickly. However, adult and rescue dogs train equally well with consistent positive reinforcement. There is no "too late" for basic obedience; the methods just need to be adapted for the dog\'s history and temperament.',
  },
  {
    q: 'Is a harness or collar better for training?',
    a: 'For training purposes, a step-in harness is strongly preferred over a collar. Collars concentrate leash pressure on the trachea, which can cause coughing, pain, or injury when dogs pull — the opposite of a positive training experience. A harness distributes pressure across the chest and shoulders, allows natural head movement, and gives trainers better control over body direction without aversive pressure.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
    { '@type': 'ListItem', position: 2, name: 'Dog Training', item: 'https://pawhavenpets.org/dog-training' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_TRAINING.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function DogTrainingPage() {
  const featured = TRAINING_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);
  const moreTrainingProducts = products
    .filter((p) => p.category === 'Dogs' && !TRAINING_SLUGS.includes(p.slug))
    .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-brand-500 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none text-[200px] leading-none flex flex-wrap">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>🎯</span>)}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🎯 Dog Training Gear
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Train Smarter,<br className="hidden sm:block" /> Not Harder
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            The right gear makes positive reinforcement training 3x faster. Treat pouches with instant access, no-pull harnesses, and reward toys that make your dog want to work.
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-indigo-600 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Training Gear →
          </Link>
        </div>
      </section>

      {/* ─── Why gear matters ─── */}
      <section className="bg-indigo-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy-900 text-center mb-8">Training Principles That Actually Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map((tip) => (
              <div key={tip.title} className="text-center bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
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
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">Core Training Kit</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4">The 4 Tools Every Trainer Uses</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Professional trainers agree: the right equipment isn\'t a shortcut — it\'s what makes the science of positive reinforcement actually work in practice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* Training stages */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-6 text-center">Training Timeline by Stage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STAGES.map(({ stage, focus, items, gear }) => (
                <div key={stage} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="font-black text-indigo-600 text-sm uppercase tracking-wider mb-1">{stage}</div>
                  <div className="font-bold text-navy-900 text-base mb-3">{focus}</div>
                  <ul className="space-y-1.5 mb-4">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-navy-900">
                        <span className="text-emerald-500 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs font-semibold text-indigo-500 bg-indigo-50 rounded-lg px-3 py-1.5">
                    🎒 {gear}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO prose */}
          <div className="prose max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-4">Why Training Accessories Actually Matter</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Positive reinforcement training is about timing: the reward must arrive within 2 seconds of the correct behavior or your dog can\'t make the association. This is why the <Link href="/products/dog-treat-training-pouch" className="text-brand-500 hover:underline">treat training pouch</Link> is the single most important piece of training equipment you can own. When treats are on your hip with one-hand magnetic access, you reward in 0.5 seconds instead of 3–4 seconds fumbling in a pocket. That gap makes or breaks whether learning happens.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For leash training, a <Link href="/products/reflective-step-in-harness" className="text-brand-500 hover:underline">step-in harness</Link> is essential. Loose-leash walking is one of the hardest behaviors to teach when a collar is involved — every pull tightens on the throat, which creates a stress response that makes dogs more reactive, not less. A chest harness removes that aversive element entirely, so your dog can focus on learning the correct behavior rather than escaping discomfort.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For dogs who are toy-motivated more than food-motivated, the <Link href="/products/heavy-duty-rope-tug-toy" className="text-brand-500 hover:underline">heavy-duty rope tug toy</Link> is a game-changer as a reward. Ending a training session with 60 seconds of tug creates a powerful reward history and makes obedience practice something your dog actively anticipates.
            </p>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ_TRAINING.map(({ q, a }) => (
                <details key={q} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-bold text-navy-900 text-sm list-none">
                    {q}
                    <span className="flex-shrink-0 text-brand-500 group-open:rotate-180 transition-transform duration-200">▾</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* More products */}
          <h3 className="text-2xl font-black text-navy-900 mb-6 text-center">More Dog Essentials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreTrainingProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-3xl font-black mb-4">Ready to Train Smarter?</h2>
          <p className="text-white/80 mb-8">Free shipping on orders over $50. 30-day returns. Trusted by thousands of dog owners.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dogs" className="inline-block bg-white text-indigo-600 font-bold text-base px-8 py-4 rounded-full hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              All Dog Products →
            </Link>
            <Link href="/puppies" className="inline-block border-2 border-white text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200">
              New Puppy Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
