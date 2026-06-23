export const metadata = {
  title: 'Refund Policy — PawHaven',
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black text-navy-900 mb-2">Refund Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: June 17, 2026</p>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-600 leading-relaxed">

          <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <p className="text-emerald-800 font-semibold text-lg">
              🛡️ 30-Day Hassle-Free Returns
            </p>
            <p className="text-emerald-700 mt-1">
              If you're not 100% satisfied with your purchase, we'll make it right. No questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Eligibility</h2>
            <p className="mb-3">To be eligible for a return or refund, your request must meet the following conditions:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your request is made within 30 days of the delivery date</li>
              <li>The item is unused and in its original condition (for returns)</li>
              <li>You have proof of purchase (order number or confirmation email)</li>
            </ul>
            <p className="mt-3">
              Items that are damaged, defective, or not as described are eligible for a full refund regardless of condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">How to Request a Refund</h2>
            <p className="mb-3">To start a return or refund:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Email us at <strong>support@pawhaven.com</strong> with your order number and reason for the return</li>
              <li>We'll respond within 1–2 business days with instructions</li>
              <li>Ship the item back if required (we'll provide a return label for defective items)</li>
              <li>Once we confirm the return, your refund will be processed within 3–5 business days</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Refund Method</h2>
            <p>
              Approved refunds are issued to your original payment method. Processing time is typically 3–5 business days after we approve the refund, though your bank may take additional time to reflect the credit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Damaged or Defective Items</h2>
            <p>
              If your item arrives damaged, defective, or significantly different from what was described, contact us immediately at support@pawhaven.com with photos. We will either send a replacement at no cost or issue a full refund — your choice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Lost or Missing Packages</h2>
            <p>
              If your tracking shows delivered but you haven't received your package, please wait 2 business days (packages are occasionally marked delivered early). If it still hasn't arrived, contact us and we'll investigate with the carrier. If confirmed lost, we'll reship your order or issue a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Non-Returnable Items</h2>
            <p className="mb-3">The following items are not eligible for return:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Items returned more than 30 days after delivery</li>
              <li>Items that have been used, washed, or altered</li>
              <li>Items returned without prior authorization from our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Order Cancellations</h2>
            <p>
              Orders can be cancelled within 12 hours of placement for a full refund. After 12 hours, orders may have already been submitted to our supplier and cannot be cancelled. Contact us as soon as possible at support@pawhaven.com if you need to cancel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Return Shipping Costs</h2>
            <p>
              For defective or incorrect items, we cover all return shipping costs. For change-of-mind returns, the customer is responsible for return shipping. We recommend using a trackable shipping method, as we cannot be responsible for items lost in return transit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Contact Us</h2>
            <p>
              Our support team is here to help. Reach us at:<br />
              <strong>Email:</strong> support@pawhaven.com<br />
              <strong>Response time:</strong> Within 1–2 business days
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
