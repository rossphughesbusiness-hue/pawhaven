import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  metadataBase: new URL('https://pawhavenpets.org'),
  title: {
    default: 'PawHaven — Premium Pet Accessories',
    template: '%s | PawHaven',
  },
  description:
    'Shop vet-recommended pet accessories for dogs and cats. Free shipping on orders over $50. 30-day returns. 10,000+ happy pet owners.',
  keywords: [
    'pet accessories', 'dog accessories', 'cat accessories',
    'slow feeder bowl', 'lick mat', 'LED dog collar', 'cat water fountain',
    'orthopedic dog bed', 'pet store', 'dropshipping pets',
  ],
  openGraph: {
    title: 'PawHaven — Your Pet Deserves the Best',
    description: 'Premium accessories for dogs and cats who deserve the best. Free shipping over $50.',
    url: 'https://pawhavenpets.org',
    siteName: 'PawHaven',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PawHaven — Premium Pet Accessories',
    description: 'Shop vet-recommended accessories for dogs and cats. Free shipping over $50.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
