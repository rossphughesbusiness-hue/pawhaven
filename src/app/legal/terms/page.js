export const metadata = {
  title: 'Terms of Service — PawHaven',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black text-navy-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 17, 2026</p>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the PawHaven website (pawhaven.com) or placing an order with us, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">2. About PawHaven</h2>
            <p>
              PawHaven is an online retailer of pet accessories. We operate as a dropshipping business, meaning orders are fulfilled and shipped directly to you by our suppliers. PawHaven is your retailer of record for all purchases made on this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">3. Products and Pricing</h2>
            <p className="mb-3">
              We reserve the right to modify or discontinue any product at any time without notice. Prices are displayed in US dollars and are subject to change. We make every effort to display product descriptions and images accurately, but we do not warrant that they are error-free.
            </p>
            <p>
              In the event of a pricing error, we reserve the right to cancel the affected order and issue a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">4. Orders and Payment</h2>
            <p className="mb-3">
              By placing an order, you represent that you are of legal age to form a binding contract and that the information you provide is accurate and complete. We reserve the right to refuse or cancel any order at our discretion.
            </p>
            <p>
              Payments are processed securely by Stripe. By submitting a payment, you authorize us to charge your selected payment method for the total order amount, including any applicable taxes and shipping fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">5. Shipping and Delivery</h2>
            <p className="mb-3">
              Estimated delivery times are 5–8 business days for standard shipping and 2–3 business days for express shipping. These are estimates only and are not guaranteed. Delays may occur due to carrier issues, customs, or circumstances outside our control.
            </p>
            <p>
              We are not responsible for packages lost or damaged in transit. If your package is lost or arrives damaged, please contact us at support@pawhaven.com and we will work with you to resolve the issue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">6. Returns and Refunds</h2>
            <p>
              Our return and refund policy is described in detail on our <a href="/legal/refund" className="text-brand-500 hover:underline">Refund Policy</a> page. By placing an order, you agree to those terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">7. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, graphics, and code — is the property of PawHaven or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">8. User Conduct</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with the operation of the site</li>
              <li>Use automated tools to scrape or collect data without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">9. Disclaimer of Warranties</h2>
            <p>
              The site and its content are provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the site will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, PawHaven shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site or your purchase of products. Our total liability to you for any claim shall not exceed the amount you paid for the order giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">11. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the United States. Any disputes arising from these terms shall be resolved through binding arbitration, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">12. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service at any time. We will indicate the date of the most recent update at the top of this page. Continued use of the site after changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">13. Contact Us</h2>
            <p>
              For questions about these Terms, contact us at:<br />
              <strong>Email:</strong> support@pawhaven.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
