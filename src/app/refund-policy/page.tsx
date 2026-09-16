import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "InkSnap refund policy. 7-day full refund on all paid plans.",
  robots: { index: false },
};

export default function RefundPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-display text-display-md text-ink mb-8">Refund Policy</h1>
      <p className="text-sm text-stone mb-8">Last updated: September 16, 2026</p>

      <div className="prose prose-sm text-charcoal space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink mb-3">Subscription Plans</h2>
          <p className="text-stone text-sm leading-relaxed">
            We offer a <strong>7-day full refund</strong> on all paid subscription plans (Pro and Studio). If you are not satisfied within the first 7 days, contact us at support@inksnap.ai for a full refund — no questions asked.
          </p>
          <p className="text-stone text-sm leading-relaxed mt-2">
            After 7 days, monthly subscriptions can be cancelled at any time. You will retain access until the end of your current billing period. No partial refunds for unused portions of monthly billing cycles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">Annual Subscriptions</h2>
          <p className="text-stone text-sm leading-relaxed">
            Annual subscriptions are eligible for a pro-rata refund within 30 days of purchase. After 30 days, annual subscriptions are non-refundable. You can cancel to prevent renewal at the end of the annual period.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">Credit Packs</h2>
          <p className="text-stone text-sm leading-relaxed">
            Credit packs ($4.99 for 50 credits) are <strong>non-refundable</strong> once purchased. Credits never expire and can be used on any feature at any resolution.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">How to Request a Refund</h2>
          <p className="text-stone text-sm leading-relaxed">
            Contact us at <strong>support@inksnap.ai</strong> with your account email and reason for the refund. We process refund requests within 3 business days. Refunds are issued to the original payment method via Stripe.
          </p>
        </section>
      </div>
    </div>
  );
}
