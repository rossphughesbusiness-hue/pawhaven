import Link from 'next/link';

export const metadata = {
  title: 'About PawHaven — Our Story',
  description: 'PawHaven was built by pet owners who were tired of overpriced, low-quality accessories. We source vet-approved products directly and ship them to your door.',
  alternates: { canonical: 'https://pawhavenpets.org/about' },
};

const values = [
  {
    icon: '🔬',
    title: 'Vet-Reviewed, Always',
    desc: 'Every product in our catalog is reviewed against veterinarian guidelines before we list it. If a vet wouldn\'t recommend it, we don\'t sell it.',
  },
  {
    icon: '🌍',
    title: 'Globally Sourced, Rigorously Tested',
    desc: 'We source from the world\'s best pet-product manufacturers and personally test every item. Cheap materials and poor construction don\'t make the cut.',
  },
  {
    icon: '💚',
    title: 'Pet-Safe Materials Only',
    desc: 'BPA-free plastics, non-toxic dyes, and pet-safe construction on every product. We\'d never sell something we wouldn\'t use with our own pets.',
  },
  {
    icon: '📦',
    title: 'Honest, Transparent Pricing',
    desc: 'We cut out the middleman to bring you premium products at fair prices. No inflated "compare at" tricks — just genuine quality at honest value.',
  },
];

const stats = [
  { value: '10,000+', label: 'Happy Pet Owners' },
  { value: '25+', label: 'Curated Products' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '30 Days', label: 'Free Returns' },
];

const team = [
  {
    name: 'The PawHaven Team',
    role: 'Pet Lovers & Product Obsessives',
    emoji: '🐾',
    bio: 'We\'re a small team of dog and cat owners who got tired of paying department-store prices for accessories that fell apart in a month. PawHaven started as a personal project — finding the best products for our own pets — and grew into the store you\'re shopping today.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            We're Pet Owners First.<br />
            <span className="text-brand-400">Sellers Second.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            PawHaven was born from a simple frustration: great pet accessories existed,
            but finding ones that were actually safe, durable, and fairly priced felt impossible.
            We fixed that.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-brand-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black">{s.value}</div>
                <div className="text-white/80 text-sm font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-black text-navy-900 mb-6">Our Story</h2>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
          <p>
            It started with a slow feeder bowl. Our golden retriever Max was eating so fast
            he'd get sick every few nights — our vet recommended a slow feeder, but the ones
            we found locally were either flimsy plastic that cracked after a month or wildly
            overpriced "premium" options that were essentially the same thing in fancier packaging.
          </p>
          <p>
            So we went looking. We spent three months testing products from manufacturers across
            the world, comparing materials, checking for BPA and non-toxic certifications, stress-testing
            durability. Max ended up with a feeder that lasted, and we ended up with a list of
            products we'd actually recommend to friends.
          </p>
          <p>
            That list became PawHaven. Every product in our catalog went through the same process:
            real-world testing, material verification, vet review, and a simple question — would we
            buy this for our own pets? If the answer wasn't a clear yes, it didn't make the cut.
          </p>
          <p>
            We're not a big-box retailer trying to squeeze margin on a million SKUs. We're a small
            team with high standards and a genuine belief that your pet deserves quality gear without
            you having to spend hours researching to find it.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-black text-navy-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black text-navy-900 mb-8 text-center">Our Promises to You</h2>
        <div className="space-y-4">
          {[
            {
              icon: '🛡️',
              title: '30-Day No-Questions-Asked Returns',
              desc: "If you're not happy for any reason within 30 days, we\'ll refund you in full. No hoops, no guilt trips.",
            },
            {
              icon: '🚚',
              title: 'Free Shipping on Orders Over $50',
              desc: 'Standard shipping is always free when you spend $50 or more. Express shipping is available at checkout for $9.99.',
            },
            {
              icon: '🔒',
              title: 'Secure, Private Checkout',
              desc: "All payments go through Stripe — PCI DSS Level 1 certified. We never see or store your card details.",
            },
            {
              icon: '📧',
              title: 'Real Support, Real Humans',
              desc: 'Email us at support@pawhavenpets.org. We read every message and respond within 24 hours.',
            },
          ].map((p) => (
            <div key={p.title} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <span className="text-2xl flex-shrink-0">{p.icon}</span>
              <div>
                <div className="font-bold text-navy-900 mb-0.5">{p.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-navy-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🐾</div>
          <h2 className="text-3xl font-black mb-4">Ready to Spoil Your Pet?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Browse our full catalog or take the quiz to find the perfect products for your specific pet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              href="/quiz"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full border border-white/20 transition-colors"
            >
              ✨ Take the Pet Quiz
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
