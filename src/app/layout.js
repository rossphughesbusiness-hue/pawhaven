import './globals.css';
import { Suspense } from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailPopup from '@/components/EmailPopup';
import AnnouncementBar from '@/components/AnnouncementBar';
import SalesPopup from '@/components/SalesPopup';
import ReferralCapture from '@/components/ReferralCapture';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CompareProvider } from '@/context/CompareContext';
import CompareBar from '@/components/CompareBar';
import CookieBanner from '@/components/CookieBanner';
import SocialProofToast from '@/components/SocialProofToast';
import ExitIntentPopup from '@/components/ExitIntentPopup';

const GA_ID             = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID     = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID   = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export const metadata = {
  metadataBase: new URL('https://pawhavenpets.org'),
  title: {
    default: 'PawHaven — Premium Pet Accessories',
    template: '%s | PawHaven',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PawHaven',
  },
  themeColor: '#f97316',
  description:
    'Shop vet-recommended pet accessories for dogs and cats. Free shipping on orders over $50. 30-day returns. 10,000+ happy pet owners.',
  keywords: [
    'pet accessories', 'dog accessories', 'cat accessories',
    'slow feeder bowl', 'lick mat', 'LED dog collar', 'cat water fountain',
    'orthopedic dog bed', 'pet store', 'dropshipping pets',
  ],
  verification: {
    google: 'ey1uN2nerFau2k3XHR8AHIyw-3BxoYf0nk2pF1mSctA',
  },
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
          <WishlistProvider>
            <CompareProvider>
              <AnnouncementBar />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <EmailPopup />
              <SalesPopup />
              <CompareBar />
              <CookieBanner />
              <SocialProofToast />
              <ExitIntentPopup />
              <Suspense fallback={null}><ReferralCapture /></Suspense>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>

        {/* ── Google Analytics 4 (Consent Mode v2) ── */}
        {GA_ID && (
          <>
            <Script id="ga4-consent-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                var consent = null;
                try { consent = localStorage.getItem('ph_cookie_consent'); } catch(e){}
                gtag('consent', 'default', {
                  analytics_storage: consent === 'all' ? 'granted' : 'denied',
                  ad_storage: consent === 'all' ? 'granted' : 'denied',
                  wait_for_update: 500,
                });
              `}
            </Script>
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
        {/* ── TikTok Pixel ── */}
        {TIKTOK_PIXEL_ID && (
          <Script id="tiktok-pixel-init" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
                ttq._o=ttq._o||{};ttq._o[e]=n||{};
                var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
                var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${TIKTOK_PIXEL_ID}');ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
