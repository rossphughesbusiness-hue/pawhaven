import { products } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://pawhavenpets.org';

export default function sitemap() {
  const productUrls = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogUrls = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/bundles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/build-a-bundle`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE}/affiliates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${BASE}/loyalty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE}/small-dogs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/indoor-cats`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/dogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/cats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/senior-dogs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/puppies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/anxiety`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE}/dog-training`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/cat-enrichment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/grooming`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/dog-walking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/travel`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE}/dog-toys`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/dog-enrichment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/dog-beds`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/cat-toys`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/cat-beds`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/senior-cats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/kittens`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/outdoor-cats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/dog-anxiety`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/cat-anxiety`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/cat-grooming`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/large-dogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/dog-grooming`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/puppy-training`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/cat-feeding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/dog-health`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE}/pet-first-aid`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${BASE}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE}/sale`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/new-arrivals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...productUrls,
    ...blogUrls,
    {
      url: `${BASE}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/refunds`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
