import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "InkSnap terms of service. Read our terms before using our AI tattoo visualization tools.",
  robots: { index: false },
};

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-display text-display-md text-ink mb-8">Terms of Service</h1>
      <p className="text-sm text-stone mb-8">Last updated: September 16, 2026</p>

      <div className="prose prose-sm text-charcoal space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink mb-3">1. Service Description</h2>
          <p className="text-stone text-sm leading-relaxed">
            InkSnap provides AI-powered tattoo visualization tools including a tattoo simulator, stencil generator, and cover-up designer. Our tools generate visual previews for reference purposes only.
          </p>
          <p className="text-stone text-sm leading-relaxed mt-2">
            <strong>Disclaimer:</strong> InkSnap provides AI-generated visual previews for reference only. Results may vary from actual tattoos. InkSnap does not provide tattooing services, medical advice, or professional design services. Always consult a licensed tattoo artist for final designs and application.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">2. Eligibility</h2>
          <p className="text-stone text-sm leading-relaxed">
            You must be at least 13 years old to use InkSnap. If you are under 18, you must have parental consent. You must be 18+ to purchase any paid plan.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">3. Account</h2>
          <p className="text-stone text-sm leading-relaxed">
            You are responsible for maintaining the security of your account. You may not share your account credentials or create multiple accounts to circumvent usage limits.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">4. Subscriptions and Payment</h2>
          <p className="text-stone text-sm leading-relaxed">
            Paid plans are billed through Stripe. Monthly plans renew automatically. You can cancel anytime from your account settings. See our <a href="/refund-policy">Refund Policy</a> for refund terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">5. AI-Generated Content</h2>
          <p className="text-stone text-sm leading-relaxed">
            AI-generated tattoo designs are inspiration references, not finished artwork. You may use them for personal reference. Studio plan includes a commercial license. Free and Pro plans are for personal use only.
          </p>
          <p className="text-stone text-sm leading-relaxed mt-2">
            AI-generated designs are approximations. Actual tattoo results depend on your artist&apos;s skill, your skin, and the technique used. Always consult a professional tattoo artist before inking.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">6. User Content</h2>
          <p className="text-stone text-sm leading-relaxed">
            You retain ownership of photos you upload. By uploading, you grant InkSnap a limited license to process your images for the purpose of providing our services. You may not upload content that infringes on others&apos; intellectual property rights.
          </p>
          <p className="text-stone text-sm leading-relaxed mt-2">
            DMCA notices can be sent to dmca@inksnap.ai.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">7. Refunds</h2>
          <p className="text-stone text-sm leading-relaxed">
            We offer a 7-day full refund on all paid plans. Annual subscriptions can be refunded on a pro-rata basis within 30 days. Credit packs are non-refundable once purchased.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">8. Prohibited Uses</h2>
          <ul className="list-disc list-inside text-stone text-sm space-y-1">
            <li>Uploading illegal, NSFW, or harmful content</li>
            <li>Attempting to reverse-engineer or scrape our services</li>
            <li>Using the service for any unlawful purpose</li>
            <li>Creating multiple accounts to abuse free tier limits</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">9. Limitation of Liability</h2>
          <p className="text-stone text-sm leading-relaxed">
            InkSnap is provided &quot;as is&quot; without warranties. We are not liable for any decisions made based on AI-generated previews, including tattoo application decisions. Always consult a professional.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">10. Changes</h2>
          <p className="text-stone text-sm leading-relaxed">
            We may update these terms from time to time. Continued use of InkSnap after changes constitutes acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
