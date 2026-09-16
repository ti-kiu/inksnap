import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InkPreview — Tattoo Simulator & Try On | Preview Before You Ink",
  description:
    "See how a tattoo looks on your body before you commit. InkPreview uses AI to simulate tattoos on your photo, generate stencils, and design cover-ups. Try it free.",
  alternates: { canonical: "/" },
};

const faqItems = [
  {
    q: "Is this a real tattoo?",
    a: "No. InkPreview generates a visual preview on your photo. It's a reference tool — not a tattoo service and not medical advice.",
  },
  {
    q: "How accurate is the preview?",
    a: "InkPreview simulates placement, size, and general appearance. Skin tone, lighting, and body curvature affect results. Always consult a professional tattoo artist before inking.",
  },
  {
    q: "Can I use the designs my tattoo artist gives me?",
    a: "Yes. Upload any image to simulate it on your body or convert it to a stencil.",
  },
  {
    q: "Is my photo stored?",
    a: "Photos are processed in-session and deleted within 24 hours. We do not use your photos for training.",
  },
  {
    q: "Can I use InkPreview designs commercially?",
    a: "Studio plan includes a commercial license. Free and Pro plans are for personal use only.",
  },
  {
    q: "What if I want to cover up an existing tattoo?",
    a: "Use the Cover-up Designer. Upload a photo of your current tattoo and InkPreview suggests designs that work with the existing lines and shading.",
  },
];

export default function LandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <section className="bg-gradient-to-b from-cream to-warm-white">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-xs font-medium rounded-full mb-6">
                AI-powered tattoo simulator
              </span>
              <h1 className="font-display text-display-xl text-ink mb-6 leading-tight">
                See Your Tattoo Before You Ink It
              </h1>
              <p className="text-body-lg text-stone max-w-lg mb-8">
                Upload a photo. Pick a design. InkPreview shows exactly how it looks on your skin — in
                10 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tattoo-simulator"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-sage text-white rounded-md text-base font-medium hover:bg-sage-dark transition-all hover:shadow-card"
                >
                  Try It Free — No Account Needed
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-sage text-sage-dark rounded-md text-base font-medium hover:bg-sage-light transition"
                >
                  How It Works
                </a>
              </div>
              <p className="text-sm text-stone mt-6">
                Free to try · No sign-up needed · AI-powered preview
              </p>
            </div>
            <div className="relative">
              <div className="bg-warm-white rounded-xl shadow-card p-4 md:p-6">
                <div className="aspect-[4/5] bg-sand rounded-lg flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 400 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Background split */}
                    <rect x="0" y="0" width="200" height="500" fill="#F5F0EB" />
                    <rect x="200" y="0" width="200" height="500" fill="#E8E3DE" />
                    {/* Divider */}
                    <line x1="200" y1="40" x2="200" y2="460" stroke="#A8B5A0" strokeWidth="2" strokeDasharray="6,4" />
                    {/* Labels */}
                    <text x="100" y="30" textAnchor="middle" fill="#6B6560" fontSize="13" fontFamily="system-ui">Before</text>
                    <text x="300" y="30" textAnchor="middle" fill="#6B6560" fontSize="13" fontFamily="system-ui">After</text>
                    {/* Left arm (bare) */}
                    <path d="M80,80 C75,100 70,140 72,200 C74,260 78,320 82,380 C84,410 86,430 90,450 L110,450 C106,430 104,410 102,380 C98,320 94,260 92,200 C90,140 95,100 100,80 Z" fill="#D4C4B0" stroke="#B8A898" strokeWidth="1.5" />
                    {/* Left arm skin detail */}
                    <path d="M82,120 C84,160 86,200 86,240" stroke="#C4B4A0" strokeWidth="0.8" fill="none" />
                    <path d="M96,120 C94,160 92,200 92,240" stroke="#C4B4A0" strokeWidth="0.8" fill="none" />
                    {/* Right arm (with tattoo) */}
                    <path d="M280,80 C275,100 270,140 272,200 C274,260 278,320 282,380 C284,410 286,430 290,450 L310,450 C306,430 304,410 302,380 C298,320 294,260 292,200 C290,140 295,100 300,80 Z" fill="#D4C4B0" stroke="#B8A898" strokeWidth="1.5" />
                    {/* Tattoo design on right arm - floral/botanical */}
                    <g transform="translate(265,140)" opacity="0.85">
                      {/* Main flower */}
                      <circle cx="35" cy="40" r="18" fill="none" stroke="#5D6B55" strokeWidth="1.8" />
                      <circle cx="35" cy="40" r="8" fill="#5D6B55" opacity="0.3" />
                      <circle cx="35" cy="40" r="3" fill="#5D6B55" />
                      {/* Petals */}
                      <ellipse cx="35" cy="18" rx="7" ry="12" fill="none" stroke="#5D6B55" strokeWidth="1.5" />
                      <ellipse cx="35" cy="62" rx="7" ry="12" fill="none" stroke="#5D6B55" strokeWidth="1.5" />
                      <ellipse cx="13" cy="40" rx="12" ry="7" fill="none" stroke="#5D6B55" strokeWidth="1.5" />
                      <ellipse cx="57" cy="40" rx="12" ry="7" fill="none" stroke="#5D6B55" strokeWidth="1.5" />
                      {/* Stem going down */}
                      <path d="M35,70 C35,90 30,110 32,140 C34,160 28,180 30,200" stroke="#5D6B55" strokeWidth="2" fill="none" />
                      {/* Leaves on stem */}
                      <path d="M32,110 C22,100 15,95 10,100 C15,105 22,108 32,110Z" fill="#5D6B55" opacity="0.4" />
                      <path d="M33,150 C43,140 50,135 55,140 C50,145 43,148 33,150Z" fill="#5D6B55" opacity="0.4" />
                      {/* Small buds */}
                      <circle cx="15" cy="170" r="4" fill="none" stroke="#5D6B55" strokeWidth="1.2" />
                      <circle cx="50" cy="125" r="3" fill="none" stroke="#5D6B55" strokeWidth="1.2" />
                    </g>
                    {/* Arrow between */}
                    <g transform="translate(180,230)">
                      <path d="M10,0 L30,0" stroke="#8B9E82" strokeWidth="2" />
                      <path d="M26,-5 L34,0 L26,5" fill="#8B9E82" />
                    </g>
                    {/* AI badge */}
                    <rect x="290" y="450" width="80" height="24" rx="12" fill="#8B9E82" />
                    <text x="330" y="466" textAnchor="middle" fill="white" fontSize="10" fontFamily="system-ui" fontWeight="600">AI Preview</text>
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sage-light/30 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-terracotta-light/40 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-warm-white section-padding py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-lg text-ink mb-4">
              Three Steps. Ten Seconds.
            </h2>
            <p className="text-body-lg text-stone max-w-xl mx-auto">
              No sign-up, no commitment. Just see what your tattoo could look like.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-sage-light flex items-center justify-center">
                <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-ink mb-2">1. Upload Your Photo</h3>
              <p className="text-stone text-sm leading-relaxed">
                Take a clear shot of the body area. (Avoid including your face for privacy.)
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-terracotta-light flex items-center justify-center">
                <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-ink mb-2">2. Choose or Generate a Design</h3>
              <p className="text-stone text-sm leading-relaxed">
                Pick from 5,000+ styles or describe what you want. AI builds it in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-sage-light flex items-center justify-center">
                <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-ink mb-2">3. Preview on Your Skin</h3>
              <p className="text-stone text-sm leading-relaxed">
                InkPreview maps the design onto your photo. Resize, rotate, try placements.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/tattoo-simulator"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-sage text-white rounded-md text-base font-medium hover:bg-sage-dark transition-all hover:shadow-card"
            >
              Start Your Preview Now
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section-padding py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-lg text-ink mb-4">
              Everything You Need to Decide With Confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Tattoo Simulator", desc: "See any design mapped onto your actual body photo. Adjust size, angle, and placement." },
              { title: "Stencil Generator", desc: "Convert any image into a clean tattoo stencil your artist can use. Download as PNG or PDF." },
              { title: "Cover-up Designer", desc: "Upload your existing tattoo. InkPreview suggests cover-up designs that work with what's already there." },
              { title: "Style Library", desc: "Japanese, geometric, minimalist, realism, watercolor, blackwork — browse or search by keyword." },
              { title: "HD Export", desc: "Free tier: 512px. Pro: 1024px. Studio: 4K with no watermark." },
              { title: "Batch Mode", desc: "Studio plan: generate up to 50 variations in one session. Great for client presentations." },
            ].map((f, i) => (
              <div key={i} className="bg-warm-white rounded-xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5">
                <h3 className="font-display text-lg text-ink mb-2">{f.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="bg-warm-white section-padding py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-display-lg text-ink mb-4">Plans for Every Stage</h2>
          <p className="text-body-lg text-stone max-w-xl mx-auto mb-10">
            Start free. Upgrade when you need more images, HD exports, and no watermarks.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-cream rounded-xl p-6 shadow-soft">
              <p className="text-sm text-stone mb-1">Free</p>
              <p className="font-display text-3xl text-ink">$0</p>
              <p className="text-sm text-stone mt-1">3 images/day · Watermark · 512px</p>
            </div>
            <div className="bg-cream rounded-xl p-6 shadow-card border-2 border-sage">
              <p className="text-sm text-sage-dark font-medium mb-1">Pro</p>
              <p className="font-display text-3xl text-ink">$9.99</p>
              <p className="text-sm text-stone mt-1">100 images/mo · No watermark · 1024px</p>
            </div>
            <div className="bg-cream rounded-xl p-6 shadow-soft">
              <p className="text-sm text-stone mb-1">Studio</p>
              <p className="font-display text-3xl text-ink">$29.99</p>
              <p className="text-sm text-stone mt-1">500 images/mo · 4K · Batch · Commercial</p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center text-sage-dark font-medium hover:text-sage transition"
          >
            See Full Pricing
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-display-lg text-ink text-center mb-12">Common Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <details key={i} className="group bg-warm-white rounded-xl p-6 shadow-soft">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-ink text-lg">
                  {item.q}
                  <svg className="w-5 h-5 text-stone group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-stone text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-warm-white section-padding py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-lg text-ink mb-4">
            Stop Guessing. Start Previewing.
          </h2>
          <p className="text-body-lg text-stone mb-8">
            Free to try. No credit card. Three images today.
          </p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Try InkPreview Free
          </Link>
          <p className="text-xs text-stone mt-4">
            AI-generated reference. Consult a professional tattoo artist before inking.
          </p>
        </div>
      </section>
    </>
  );
}
