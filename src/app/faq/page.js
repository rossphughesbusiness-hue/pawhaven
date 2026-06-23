import FAQClient, { FAQ } from './FAQClient';

export const metadata = {
  title: 'FAQ — Shipping, Returns & Product Questions | PawHaven',
  description:
    'Answers to the most common questions about PawHaven: shipping times, return policy, product safety, payment methods, and our PawPoints rewards program.',
  alternates: { canonical: 'https://pawhavenpets.org/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | PawHaven',
    description:
      'Everything you need to know about shipping, returns, products, and rewards at PawHaven.',
    url: 'https://pawhavenpets.org/faq',
  },
};

// Flatten all Q&As into a single FAQPage JSON-LD entity
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.flatMap((section) =>
    section.questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQClient />
    </>
  );
}
