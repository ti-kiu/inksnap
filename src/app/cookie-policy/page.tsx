import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about how InkSnap uses cookies and how to manage your preferences.",
  robots: { index: false },
};

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-display text-display-md text-ink mb-8">Cookie Policy</h1>
      <p className="text-sm text-stone mb-8">Last updated: September 16, 2026</p>

      <div className="prose prose-sm text-charcoal space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink mb-3">What Are Cookies?</h2>
          <p className="text-stone text-sm leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help websites function properly and provide information to site owners.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">How We Use Cookies</h2>
          <h3 className="font-bold text-ink text-sm mt-4 mb-2">Essential Cookies</h3>
          <p className="text-stone text-sm leading-relaxed">
            Session cookies for authentication and account management. These are necessary for the service to function and cannot be disabled.
          </p>
          <h3 className="font-bold text-ink text-sm mt-4 mb-2">Analytics Cookies</h3>
          <p className="text-stone text-sm leading-relaxed">
            Cloudflare Web Analytics uses anonymous, cookie-free tracking. No personal information is collected.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">Third-Party Cookies</h2>
          <p className="text-stone text-sm leading-relaxed">
            We use Stripe for payment processing, which may set its own cookies. We do not use advertising or social media tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">Managing Cookies</h2>
          <p className="text-stone text-sm leading-relaxed">
            You can control cookies through your browser settings. Disabling essential cookies may affect site functionality.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">Contact</h2>
          <p className="text-stone text-sm leading-relaxed">
            For cookie-related inquiries, contact us at privacy@inksnap.ai.
          </p>
        </section>
      </div>
    </div>
  );
}
