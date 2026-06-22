export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/'],
    allow: ['/api/feed/'],
    },
    sitemap: 'https://pawhavenpets.org/sitemap.xml',
  };
}
