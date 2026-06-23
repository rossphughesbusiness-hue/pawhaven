import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import { getRelatedPosts } from '@/lib/blog';
import { getFBT } from '@/lib/fbt';
import FrequentlyBoughtTogether from '@/components/FrequentlyBoughtTogether';
import SizeGuide from '@/components/SizeGuide';
import ReviewForm from '@/components/ReviewForm';
import DynamicReviews from '@/components/DynamicReviews';

// Map product slugs to size guide type
const SIZE_GUIDE_MAP = {
  'reflective-step-in-harness':    'dog-harness',
  'safeglow-led-collar':           'dog-collar',
  'orthopedic-memory-foam-dog-bed': 'dog-bed',
  'premium-cat-carrier-backpack':  'cat-carrier',
};
import ProductCard from '@/components/ProductCard';
import AddToCartButton from './AddToCartButton';
import ImageGallery from './ImageGallery';
import ViewTracker from './ViewTracker';
import ViewerCount from './ViewerCount';
import TrustBadges from '@/components/TrustBadges';
import WishlistButton from '@/components/WishlistButton';
import ShareButtons from '@/components/ShareButtons';
import BackInStockForm from '@/components/BackInStockForm';
import CountdownTimer from './CountdownTimer';
import StickyAddToCart from './StickyAddToCart';
import RecentlyViewed from './RecentlyViewed';

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const url = `https://pawhavenpets.org/products/${product.slug}`;
  return {
    title: `${product.name} — PawHaven`,
    description: product.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} — PawHaven`,
      description: product.shortDescription,
      url,
      type: 'website',
      images: product.images?.[0] ? [{ url: product.images[0], alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">
        {rating} · {count.toLocaleString()} reviews
      </span>
    </div>
  );
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 3);
  const relatedPosts = getRelatedPosts(product, 3);
  const fbtCompanions = getFBT(product.slug, products);
  const sizeGuideType = SIZE_GUIDE_MAP[product.slug] || null;
  const savings = product.comparePrice
    ? (product.comparePrice - product.price).toFixed(2)
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images || [product.image],
    sku: product.supplierSku || String(product.id),
    brand: { '@type': 'Brand', name: 'PawHaven' },
    offers: {
      '@type': 'Offer',
      url: `https://pawhavenpets.org/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'PawHaven' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: product.reviews.slice(0, 3).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pawhavenpets.org' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://pawhavenpets.org/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://pawhavenpets.org/products/${product.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ViewTracker id={product.id} name={product.name} product={product} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-500 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-navy-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Product image gallery */}
          <div className="sticky top-24">
            <ImageGallery product={product} />
          </div>

          {/* Right — Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">
                  {product.category} · {product.tag}
                </span>
                {sizeGuideType && <SizeGuide type={sizeGuideType} />}
              </div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl sm:text-4xl font-black text-navy-900 leading-tight">
                  {product.name}
                </h1>
                <WishlistButton product={product} size="lg" className="mt-1 flex-shrink-0" />
              </div>
              <StarRating rating={product.rating} count={product.reviewCount} />
              <ViewerCount productId={product.id} />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4 border-y border-gray-100">
              <span className="text-4xl font-black text-navy-900">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
              {savings && (
                <span className="bg-red-50 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                  You save ${savings}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-gray-600 leading-relaxed text-base">
              {product.shortDescription}
            </p>

            {/* Stock & shipping */}
            <div className="bg-emerald-50 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
                <span>✓</span>
                <span>In Stock — {product.stock} units remaining</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 text-sm">
                <span>🚚</span>
                <span>Estimated delivery: {product.shippingDays}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 text-sm">
                <span>🎁</span>
                <span>Free shipping on orders over $50</span>
              </div>
            </div>

            {/* Share */}
            <ShareButtons product={product} />

            {/* Countdown timer */}
            <CountdownTimer />

            {/* Back in stock form (low stock) */}
            {product.stock < 10 && <BackInStockForm product={product} />}

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Trust badges */}
            <TrustBadges compact />

            {/* Sticky bar for mobile — appears when main button scrolls off screen */}
            <StickyAddToCart product={product} />
          </div>
        </div>

        {/* ─── Description + Features ─── */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black text-navy-900 mb-4">About This Product</h2>
            <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-black text-navy-900 mb-4">Key Features</h2>
            <div className="space-y-4">
              {product.features.map((f) => (
                <div key={f.title} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="font-bold text-navy-900 text-sm">{f.title}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Reviews ─── */}
        <div className="mt-20">
          <h2 className="text-2xl font-black text-navy-900 mb-8">
            Customer Reviews ({product.reviewCount.toLocaleString()})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-sm font-bold text-brand-600">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{review.name}</div>
                    <div className="text-gray-400 text-xs">{review.date} · Verified Purchase</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Community Reviews + Submit Form ─── */}
        <DynamicReviews slug={product.slug} />
        <ReviewForm slug={product.slug} productName={product.name} />

        {/* ─── Frequently Bought Together ─── */}
        {fbtCompanions.length > 0 && (
          <FrequentlyBoughtTogether
            mainProduct={product}
            companions={fbtCompanions}
          />
        )}

        {/* ─── From Our Blog ─── */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-navy-900">From Our Blog</h2>
              <Link href="/blog" className="text-brand-500 text-sm font-semibold hover:underline">
                All articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {post.heroImage && (
                    <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">{post.emoji}</span>
                      <span className="text-xs font-bold text-brand-500 uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm leading-snug mb-2 group-hover:text-brand-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-xs text-gray-400 font-medium">
                      <span>⏱</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── Related Products ─── */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-black text-navy-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Recently Viewed ─── */}
        <RecentlyViewed currentId={product.id} />
      </div>
    </div>
  );
}
