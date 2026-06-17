import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'PawHaven — Premium Pet Accessories',
  description:
    'Shop vet-recommended pet accessories for dogs and cats. Free shipping on orders over $50. 30-day returns. 10,000+ happy pet owners.',
  keywords: 'pet accessories, dog accessories, cat accessories, slow feeder, lick mat, LED collar',
  openGraph: {
    title: 'PawHaven — Your Pet Deserves the Best',
    description: 'Premium accessories for dogs and cats who deserve the best.',
    type: 'website',
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
