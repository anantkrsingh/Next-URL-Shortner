import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | TinyUR",
  description:
    "TinyUR's refund policy for Pro and Bulk & API subscriptions: request a refund within 48 hours of purchase and it's processed within 24 hours.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen px-4 py-12 pt-28">
      <div className="glass-panel glass-doc mx-auto max-w-4xl rounded-2xl p-8 md:p-12">
        <Link prefetch={false} href="/" className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">Refund Policy</h1>
        <p className="mb-8 text-gray-600">Last updated: August 24, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">1. What this covers</h2>
            <p>
              This policy applies to paid TinyUR subscriptions (Pro and Bulk &amp;
              API) purchased through checkout on tinyur.in and processed via
              Razorpay (or PhonePe, if used as a fallback at checkout).
              TinyUR&apos;s free tools — shortening, unshortening, and click
              counting — are free and have nothing to refund.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">2. The 48-hour refund window</h2>
            <p>
              If you request a refund within{" "}
              <strong>48 hours of your purchase</strong>, email{" "}
              <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
                contact@tinyur.in
              </a>{" "}
              from the email address on your account and include your order or
              transaction reference. Once we confirm the request is eligible, your
              refund is processed within <strong>24 hours</strong>.
            </p>
            <p className="mt-4">
              Requests made after the 48-hour window are handled at our discretion
              and aren&apos;t guaranteed.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">3. How to request a refund</h2>
            <ul className="ml-4 list-inside list-disc space-y-2">
              <li>
                Email{" "}
                <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
                  contact@tinyur.in
                </a>{" "}
                within 48 hours of the charge.
              </li>
              <li>Use the email address associated with your TinyUR account.</li>
              <li>Include the plan you purchased and, if you have it, the payment/transaction ID from your payment confirmation.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">4. How refunds are paid</h2>
            <p>
              Approved refunds are issued back to the original payment
              method used at checkout. Once we process the refund on our end
              (within 24 hours of an eligible request), the time it takes to
              actually appear in your account or on your statement depends on
              your bank or card network, and is outside our control.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">5. Cancelling instead of refunding</h2>
            <p>
              You can cancel a subscription at any time from Account →
              Subscription to stop future billing. Cancelling on its own does not
              trigger a refund for the current billing period — for that, follow
              the refund request process above within the 48-hour window.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">6. Enterprise plans</h2>
            <p>
              Enterprise plans are billed under a custom agreement. Refund terms
              for Enterprise are whatever is stated in that agreement, not this
              policy — contact your account manager or{" "}
              <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
                contact@tinyur.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">7. Questions</h2>
            <p>
              Read our{" "}
              <Link prefetch={false} href="/pricing" className="text-blue-600 hover:underline">
                Pricing
              </Link>{" "}
              and{" "}
              <Link prefetch={false} href="/terms-of-service" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              for more on billing, or reach us at{" "}
              <a href="mailto:contact@tinyur.in" className="text-blue-600 hover:underline">
                contact@tinyur.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
