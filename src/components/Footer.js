import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="text-2xl font-black tracking-tight">
                Paw<span className="text-brand-400">Haven</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Premium accessories for dogs and cats who deserve the best. Every
              product is hand-picked for quality, safety, and your pet's happiness.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                '🔒 Secure Checkout',
                '📦 Free Returns',
                '⭐ 10K+ Happy Pets',
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/bundles', label: 'Bundle Deals' },
                { href: '/sale', label: '🔥 Flash Sale' },
                { href: '/quiz', label: 'Find My Match ✨' },
                { href: '/blog', label: 'Pet Care Blog' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Pet */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              By Pet
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/dogs', label: '🐶 All Dogs' },
                { href: '/puppies', label: 'Puppies' },
                { href: '/small-dogs', label: 'Small Dogs' },
                { href: '/senior-dogs', label: 'Senior Dogs' },
                { href: '/dog-training', label: 'Dog Training' },
                { href: '/dog-walking', label: 'Walking Gear' },
                { href: '/dog-toys', label: 'Dog Toys' },
                { href: '/dog-enrichment', label: 'Dog Enrichment' },
                { href: '/dog-beds', label: 'Dog Beds' },
                { href: '/cats', label: '🐱 All Cats' },
                { href: '/kittens', label: 'Kittens' },
                { href: '/indoor-cats', label: 'Indoor Cats' },
                { href: '/cat-enrichment', label: 'Cat Enrichment' },
                { href: '/cat-toys', label: 'Cat Toys' },
                { href: '/cat-beds', label: 'Cat Beds' },
                { href: '/senior-cats', label: 'Senior Cats' },
                { href: '/grooming', label: 'Grooming Tools' },
                { href: '/travel', label: '✈️ Travel Gear' },
                { href: '/anxiety', label: 'Anxiety & Calm' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/order-tracking', label: 'Track Your Order' },
                { href: '/loyalty', label: '🏆 PawPoints Rewards' },
                { href: '/affiliates', label: '🤝 Affiliate Program' },
                { href: '/legal/refund', label: 'Shipping & Returns' },
                { href: 'mailto:support@pawhavenpets.org', label: 'support@pawhavenpets.org' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} PawHaven. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'Privacy Policy', href: '/legal/privacy' },
              { label: 'Terms of Service', href: '/legal/terms' },
              { label: 'Refund Policy', href: '/legal/refund' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Payment icons (text placeholders) */}
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            {['Visa', 'MC', 'Amex', 'PayPal'].map((p) => (
              <span key={p} className="bg-white/10 px-2 py-1 rounded text-gray-400">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
