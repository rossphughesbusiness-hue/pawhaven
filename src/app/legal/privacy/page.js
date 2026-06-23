export const metadata = {
  title: 'Privacy Policy — PawHaven',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black text-navy-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 17, 2026</p>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">1. Who We Are</h2>
            <p>
              PawHaven ("we," "us," or "our") operates the website pawhaven.com. We sell pet accessories online and ship products directly to customers. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our site or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name, email address, and phone number</li>
              <li>Billing and shipping address</li>
              <li>Payment information (processed securely by Stripe — we never store card details)</li>
              <li>Order history and product preferences</li>
              <li>Messages you send us via email or contact forms</li>
            </ul>
            <p className="mt-3">We also automatically collect certain technical data when you visit our site, including your IP address, browser type, pages visited, and referring URLs, via cookies and similar technologies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations, shipping updates, and receipts</li>
              <li>Respond to your questions and provide customer support</li>
              <li>Send promotional emails (you can opt out at any time)</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">4. Sharing Your Information</h2>
            <p className="mb-3">We do not sell your personal information. We may share it with trusted third parties only as necessary to operate our business:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Stripe</strong> — to process payments securely</li>
              <li><strong>Shipping carriers and suppliers</strong> — to fulfill and deliver your order</li>
              <li><strong>Email service providers</strong> — to send transactional and marketing emails</li>
              <li><strong>Analytics providers</strong> — to understand how our site is used</li>
              <li><strong>Law enforcement or regulators</strong> — if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">5. Dropshipping Disclosure</h2>
            <p>
              PawHaven operates as a dropshipping business. When you place an order, your shipping name and address are shared with our suppliers so they can ship your order directly to you. We do not share your payment information with suppliers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">6. Cookies</h2>
            <p>
              We use cookies to keep your cart active, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, but some features of the site may not function correctly without them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, and resolve disputes. Order records are typically retained for 7 years for tax and accounting purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">8. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at privacy@pawhaven.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">9. Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your personal information. All payment transactions are encrypted and processed by Stripe, which is PCI-DSS compliant. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">10. Children's Privacy</h2>
            <p>
              Our website is not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by updating the date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:<br />
              <strong>Email:</strong> privacy@pawhaven.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
