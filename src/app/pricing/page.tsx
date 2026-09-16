import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InkSnap Pricing — Free, Pro & Studio Plans",
  description:
    "InkSnap pricing: Free plan with 3 daily images. Pro at $9.99/mo for 100 images. Studio at $29.99/mo for 4K, batch mode, and commercial license. Compare plans.",
  alternates: { canonical: "/pricing" },
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "Try it, no strings attached",
    highlight: false,
    features: [
      { text: "3 images/day (~90/mo)", included: true },
      { text: "512px resolution", included: true },
      { text: "Watermark on exports", included: true },
      { text: "Tattoo Simulator", included: true },
      { text: "Basic Stencil Generator", included: true },
      { text: "20 styles", included: true },
      { text: "5 save slots", included: true },
      { text: "No watermark", included: false },
      { text: "No batch mode", included: false },
      { text: "No PDF export", included: false },
    ],
    cta: { text: "Try Free", href: "/tattoo-simulator", style: "secondary" as const },
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    annual: "$59.99/yr (save 50%)",
    desc: "For serious tattoo planning",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "100 images/month", included: true },
      { text: "1024px resolution", included: true },
      { text: "No watermark", included: true },
      { text: "Tattoo Simulator", included: true },
      { text: "Full Stencil Generator", included: true },
      { text: "Full Cover-up Designer", included: true },
      { text: "All 5,000+ styles", included: true },
      { text: "Unlimited save slots", included: true },
      { text: "Email support (48hr)", included: true },
      { text: "No batch mode", included: false },
    ],
    cta: { text: "Get Pro", href: "#", style: "primary" as const },
  },
  {
    name: "Studio",
    price: "$29.99",
    period: "/mo",
    annual: "$199.99/yr (save 44%)",
    desc: "For tattoo artists & shops",
    highlight: false,
    features: [
      { text: "500 images/month", included: true },
      { text: "4K resolution", included: true },
      { text: "No watermark", included: true },
      { text: "Batch mode (up to 50)", included: true },
      { text: "PDF export", included: true },
      { text: "Commercial license", included: true },
      { text: "Full + artist PDF", included: true },
      { text: "All 5,000+ styles", included: true },
      { text: "Unlimited save slots", included: true },
      { text: "Priority support (24hr)", included: true },
    ],
    cta: { text: "Get Studio", href: "#", style: "primary" as const },
  },
  {
    name: "Credit Pack",
    price: "$4.99",
    period: "",
    desc: "Don\'t want a subscription?",
    highlight: false,
    features: [
      { text: "50 credits", included: true },
      { text: "~$0.10 per image", included: true },
      { text: "Never expires", included: true },
      { text: "Any feature, any resolution", included: true },
      { text: "No subscription required", included: true },
    ],
    cta: { text: "Buy 50 Credits", href: "#", style: "secondary" as const },
  },
];

const faqItems = [
  { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade from your account settings. Changes take effect on your next billing cycle." },
  { q: "Do unused images roll over?", a: "Monthly image limits reset each billing cycle. Credit packs never expire and don\'t reset." },
  { q: "What happens if I hit my image limit?", a: "You can wait for the next cycle, upgrade your plan, or buy a credit pack for additional images." },
  { q: "Is there a free trial of Pro or Studio?", a: "No formal trial, but the Free plan lets you test every core feature with 3 images per day." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel from your account page. You keep access until the end of your billing period." },
  { q: "Do I own the images I generate?", a: "You can use them for personal reference on Free and Pro. Studio plan includes a commercial license for broader use." },
];

export default function PricingPage() {
  const pricingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'InkSnap',
    'applicationCategory': 'DesignApplication',
    'offers': [
      { '@type': 'Offer', 'name': 'Free', 'price': '0', 'priceCurrency': 'USD' },
      { '@type': 'Offer', 'name': 'Pro', 'price': '9.99', 'priceCurrency': 'USD', 'billingIncrement': 'P1M' },
      { '@type': 'Offer', 'name': 'Studio', 'price': '29.99', 'priceCurrency': 'USD', 'billingIncrement': 'P1M' },
      { '@type': 'Offer', 'name': 'Credit Pack', 'price': '4.99', 'priceCurrency': 'USD' }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-8 md:pt-24 text-center">
        <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-xs font-medium rounded-full mb-6">
          Simple Pricing
        </span>
        <h1 className="font-display text-display-lg text-ink mb-4">Simple Pricing. No Surprises.</h1>
        <p className="text-body-lg text-stone max-w-xl mx-auto">
          Start free. Upgrade when you need more images, HD exports, and no watermarks.
        </p>
      </section>

      {/* PRICING GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-warm-white rounded-xl p-6 shadow-soft flex flex-col relative ${
                tier.highlight ? "border-2 border-sage shadow-card" : ""
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge">{tier.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-display text-xl text-ink mb-1">{tier.name}</h3>
                <p className="text-sm text-stone">{tier.desc}</p>
              </div>
              <div className="mb-6">
                <span className="font-display text-4xl text-ink">{tier.price}</span>
                {tier.period && <span className="text-sm text-stone">{tier.period}</span>}
                {tier.annual && (
                  <p className="text-xs text-stone mt-1">{tier.annual}</p>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                    {f.included ? (
                      <svg className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-sand mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={f.included ? "" : "text-stone"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              {tier.cta.style === "primary" ? (
                <button className="inline-flex items-center justify-center w-full px-5 py-3 bg-sage text-white rounded-md text-sm font-medium hover:bg-sage-dark transition">
                  {tier.cta.text}
                </button>
              ) : (
                <Link
                  href={tier.cta.href}
                  className="inline-flex items-center justify-center w-full px-5 py-3 border border-sage text-sage-dark rounded-md text-sm font-medium hover:bg-sage-light transition"
                >
                  {tier.cta.text}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-stone">
            <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            7-day money-back guarantee on Pro and Studio. No questions asked.
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-10">Compare plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand">
                  <th className="text-left py-3 pr-4 text-stone font-medium">Feature</th>
                  <th className="text-center py-3 px-3 text-stone font-medium">Free</th>
                  <th className="text-center py-3 px-3 text-sage-dark font-medium">Pro</th>
                  <th className="text-center py-3 px-3 text-stone font-medium">Studio</th>
                  <th className="text-center py-3 px-3 text-stone font-medium">Credit Pack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/50">
                {[
                  ["Monthly Price", "$0", "$9.99/mo", "$29.99/mo", "$4.99 one-time"],
                  ["Images per month", "3/day (~90/mo)", "100", "500", "50 (never expires)"],
                  ["Resolution", "512px", "1024px", "4K", "1024px"],
                  ["Watermark", "Yes", "No", "No", "No"],
                  ["Tattoo Simulator", "✓", "✓", "✓", "✓"],
                  ["Stencil Generator", "Basic", "Full", "Full + batch", "Full"],
                  ["Cover-up Designer", "Preview only", "Full access", "Full + artist PDF", "Full access"],
                  ["Style Library", "20 styles", "All 5,000+", "All 5,000+", "All 5,000+"],
                  ["Save & Compare", "5 slots", "Unlimited", "Unlimited", "30 days"],
                  ["Batch Mode", "✗", "✗", "✓ (up to 50)", "✗"],
                  ["PDF Export", "✗", "✗", "✓", "✗"],
                  ["Commercial License", "✗", "✗", "✓", "✗"],
                  ["Support", "Community", "Email (48hr)", "Priority (24hr)", "Community"],
                ].map(([feat, free, pro, studio, credit], i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4 text-charcoal">{feat}</td>
                    <td className="text-center py-3 px-3 text-charcoal">{free}</td>
                    <td className="text-center py-3 px-3 font-medium">{pro}</td>
                    <td className="text-center py-3 px-3 text-charcoal">{studio}</td>
                    <td className="text-center py-3 px-3 text-charcoal">{credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-10">Pricing FAQ</h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="group bg-warm-white rounded-xl p-5 shadow-soft">
                <summary className="flex items-center justify-between cursor-pointer font-medium text-ink text-sm">
                  {item.q}
                  <svg className="w-4 h-4 text-stone group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-stone text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-warm-white py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">
            Preview Your Next Tattoo Today
          </h2>
          <p className="text-body-lg text-stone mb-8">Free to start. No credit card required.</p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Create Your Free Account
          </Link>
          <p className="text-xs text-stone mt-4">By signing up you agree to our Terms of Service.</p>
        </div>
      </section>
    </>
  );
}
