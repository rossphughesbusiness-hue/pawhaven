export default function manifest() {
  return {
    name: 'PawHaven — Premium Pet Accessories',
    short_name: 'PawHaven',
    description: 'Shop vet-recommended pet accessories for dogs and cats. Free shipping over $50.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316',
    orientation: 'portrait',
    categories: ['shopping', 'lifestyle'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x800',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
    shortcuts: [
      {
        name: 'Shop All',
        url: '/products',
        description: 'Browse all pet products',
      },
      {
        name: 'Pet Quiz',
        url: '/quiz',
        description: 'Find the perfect product',
      },
      {
        name: 'My Cart',
        url: '/cart',
        description: 'View shopping cart',
      },
    ],
  };
}
