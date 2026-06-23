import ProductsClient from './ProductsClient';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Shop Premium Pet Accessories — Dogs & Cats | PawHaven',
  description:
    'Browse 30+ vet-approved pet accessories for dogs and cats. Slow feeders, harnesses, cat fountains, puzzle toys, and more — all with free shipping on orders over $50.',
  alternates: { canonical: 'https://pawhavenpets.org/products' },
  openGraph: {
    title: 'Shop Premium Pet Accessories | PawHaven',
    description:
      'Vet-approved accessories for dogs and cats. Free shipping on $50+. 30-day returns.',
    url: 'https://pawhavenpets.org/products',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=85&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'PawHaven pet accessories',
      },
    ],
  },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'PawHaven Pet Accessories',
  description: 'Premium vet-approved accessories for dogs and cats',
  url: 'https://pawhavenpets.org/products',
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://pawhavenpets.org/products/${p.slug}`,
    name: p.name,
    image: p.images?.[0] || p.image,
    item: {
      '@type': 'Product',
      name: p.name,
      description: p.shortDescription || p.description,
      image: p.images?.[0] || p.image,
      url: `https://pawhavenpets.org/products/${p.slug}`,
      brand: { '@type': 'Brand', name: 'PawHaven' },
      offers: {
        '@type': 'Offer',
        price: p.price.toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `https://pawhavenpets.org/products/${p.slug}`,
      },
      ...(p.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating,
          bestRating: 5,
          worstRating: 1,
          reviewCount: p.reviewCount || 10,
        },
      }),
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductsClient />
    </>
  );
}
