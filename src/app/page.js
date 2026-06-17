import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { products } from '@/lib/products';

const trustItems = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: '↩️', title: '30-Day Returns', desc: 'Hassle-free, no questions asked' },
  { icon: '🛡️', title: 'Secure Checkout', desc: '256-bit SSL encryption' },
  { icon: '⭐', title: '10K+ Reviews', desc: 'Trusted by pet lovers nationwide' },
];

const features = [
  {
    icon: '🔬',
    title: 'Vet-Approved Products',
    desc: 'Every item is reviewed and recommended by licensed veterinarians before it ever reaches our store.',
  },
  {
    icon: '🌍',
    title: 'Sourced Globally, Tested Locally',
    desc: "We source from the world's best manufacturers and test every product personally before we sell it.",
  },
  {
    icon: '💚',
    title: 'Safe for Every Pet',
    desc: 'BPA-free materials, non-toxic dyes, and pet-safe construction on every single product.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    pet: 'Golden Retriever Mom',
    stars: 5,
    text: "My dog used to inhale his food so fast he'd get sick every week. PawHaven's slow feeder completely fixed it. It's become part of our daily routine — he actually enjoys meals now!",
    product: 'Maze Slow Feeder Bowl',
    emoji: '🥣',
  },
  {
    name: 'Jessica T.',
    pet: 'Anxious Pup Parent',
    stars: 5,
    text: "The lick mat is a MIRACLE. My dog has severe storm anxiety. Now I smear peanut butter on this mat during thunder and she's completely calm. Wish I found it years ago.",
    product: 'Calming Lick Mat',
    emoji: '🐾',
  },
  {
    name: 'Mike R.',
    pet: 'Urban Dog Owner',
    stars: 5,
    text: 'The LED collar gives me peace of mind on every nighttime walk. Cars actually slow down now. Holds charge for 4 nights. My dog barely notices he\'s wearing it.',
    product: 'SafeGlow LED Collar',
    emoji: '✨',
  },
];

const stats = [
  { value: '10,000+', label: 'Happy Pet Owners' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '5', label: 'Vet-Approved Products' },
  { value: '30 Days', label: 'Free Returns' },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative text-white overflow-hidden min-h-[85vh] flex items-center">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581888227599-779811939961?w=1600&q=85&auto=format&fit=crop')",
          }}
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            {/* Pre-headline pill */}
            <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              Trusted by 10,000+ Pet Owners
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-balance mb-6 animate-fade-up">
              Your Pet Deserves{' '}
              <span className="text-gradient bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
                the Best.
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Vet-approved accessories that make dogs and cats healthier, calmer,
              and happier. Free shipping on orders over $50.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 active:scale-95"
              >
                Shop Best Sellers
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                See What's Trending
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap items-center gap-6 mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {['⭐⭐⭐⭐⭐ 4.8/5 Rating', '📦 Ships in 1–2 Days', '🔒 Secure Checkout'].map((item) => (
                <span key={item} className="text-gray-400 text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-3 p-6">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-navy-900 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─── */}
      <section id="best-sellers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">
              Hand-Picked Winners
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
              Our Best Sellers
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              The products pet owners order again and again — vet-approved, community-loved.
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="bg-brand-500 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-brand-100 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY PAWHAVEN ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">
              Our Promise
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
              Why Pet Owners Choose Us
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We're pet owners too. We only sell what we'd give our own animals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-3xl p-8 hover:bg-brand-50 hover:border-brand-100 border border-transparent transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-500 font-bold text-sm uppercase tracking-widest mb-3">
              Customer Love
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
              What Pet Parents Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 text-base italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-lg font-bold text-brand-600">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-navy-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.pet}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                    <span>{t.emoji}</span>
                    <span>{t.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6 animate-bounce2">🐾</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Join the PawHaven Pack
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get exclusive deals, vet tips, and new product drops straight to your inbox.
            Plus — <span className="text-brand-400 font-semibold">10% off your first order.</span>
          </p>
          <NewsletterForm />
          <p className="text-gray-600 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
