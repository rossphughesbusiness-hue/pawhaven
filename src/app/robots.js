export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/feed', '/api/feed.xml', '/api/feed/'],
      disallow: ['/api/', '/checkout/'],
    },
    sitemap: 'https://pawhavenpets.org/sitemap.xml',
  };
}
