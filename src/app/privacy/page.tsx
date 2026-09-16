import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "InkPreview privacy policy. Learn how we collect, use, and protect your data.",
  robots: { index: false },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="font-display text-display-md text-ink mb-8">Privacy Policy</h1>
      <p className="text-sm text-stone mb-8">Last updated: September 16, 2026</p>

      <div className="prose prose-sm text-charcoal space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink mb-3">1. Introduction</h2>
          <p className="text-stone text-sm leading-relaxed">
            InkPreview (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides AI-powered tattoo visualization tools. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">2. Information We Collect</h2>
          <h3 className="font-bold text-ink text-sm mt-4 mb-2">Information You Provide</h3>
          <ul className="list-disc list-inside text-stone text-sm space-y-1">
            <li>Email address (when you create an account)</li>
            <li>Password hash (stored securely via our authentication provider)</li>
            <li>OAuth profile information (when you sign in with Google or GitHub)</li>
            <li>Body photos you upload for tattoo simulation</li>
            <li>Tattoo images you upload for cover-up or stencil generation</li>
            <li>Text descriptions (prompts) for AI generation</li>
            <li>Payment information (processed by Stripe; we do not store card numbers)</li>
          </ul>
          <h3 className="font-bold text-ink text-sm mt-4 mb-2">Automatically Collected</h3>
          <ul className="list-disc list-inside text-stone text-sm space-y-1">
            <li>IP address (for rate limiting and abuse prevention)</li>
            <li>Device fingerprint (for multi-account abuse prevention)</li>
            <li>Page views (via Cloudflare Web Analytics, no PII collected)</li>
            <li>Session cookies (for login state)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-stone text-sm space-y-1">
            <li>To provide and maintain our tattoo visualization services</li>
            <li>To process your uploaded photos and generate AI previews</li>
            <li>To manage your account and subscription</li>
            <li>To prevent abuse and ensure security</li>
            <li>To improve our services through anonymous analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">4. Photo Handling</h2>
          <p className="text-stone text-sm leading-relaxed">
            <strong>Important:</strong> Photos you upload are processed in-session and deleted within 24 hours. We do not use your photos for AI training. We do not share your photos with third parties except as necessary to provide our AI processing services (see Third-Party Services below).
          </p>
          <p className="text-stone text-sm leading-relaxed mt-2">
            <strong>Privacy tip:</strong> Avoid including your face in photos for privacy protection.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">5. Third-Party Services</h2>
          <p className="text-stone text-sm leading-relaxed">We use the following third-party services:</p>
          <ul className="list-disc list-inside text-stone text-sm space-y-1 mt-2">
            <li><strong>Cloudflare</strong> (Pages, Workers, D1, R2) — Hosting, compute, and storage</li>
            <li><strong>Stripe</strong> — Payment processing</li>
            <li><strong>Google OAuth</strong> — Authentication</li>
            <li><strong>AI Model Providers</strong> — Tattoo image generation (prompts and uploaded images are sent for processing)</li>
            <li><strong>Cloudflare Web Analytics</strong> — Anonymous traffic statistics (no PII)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">6. Cookies</h2>
          <p className="text-stone text-sm leading-relaxed">
            We use essential session cookies for authentication. We do not use advertising cookies. See our <a href="/cookie-policy">Cookie Policy</a> for details.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">7. Data Retention</h2>
          <ul className="list-disc list-inside text-stone text-sm space-y-1">
            <li>Account data: Retained while your account is active</li>
            <li>Uploaded photos: Deleted within 24 hours</li>
            <li>Generated images: Retained according to your plan (Free: 7 days, Paid: permanent)</li>
            <li>Generation records: Retained for service improvement</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">8. Your Rights</h2>
          <p className="text-stone text-sm leading-relaxed">
            You can request data export or account deletion by contacting us. For EU residents (GDPR), you have additional rights including the right to access, rectify, erase, restrict processing, and data portability.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink mb-3">9. Contact</h2>
          <p className="text-stone text-sm leading-relaxed">
            For privacy inquiries, contact us at privacy@inkpreview.co.
          </p>
        </section>
      </div>
    </div>
  );
}
