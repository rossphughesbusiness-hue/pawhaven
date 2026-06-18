import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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

        {/* ── Google Analytics 4 ── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        {/* ── Meta (Facebook) Pixel ── */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
