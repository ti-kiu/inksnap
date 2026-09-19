import HeroCarousel from "@/components/HeroCarousel";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "See how a tattoo looks on your body before you commit. InkPreview uses AI to simulate tattoos on your photo, generate stencils, and design cover-ups.",
  alternates: {
    canonical: '/',
    languages: {
      'en': 'https://inkpreview.co',
      'pt': 'https://inkpreview.co/pt',
      'de': 'https://inkpreview.co/de',
      'it': 'https://inkpreview.co/it',
      'x-default': 'https://inkpreview.co',
    },
  },
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
  const faqJsonLd = {
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

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'InkPreview',
    'url': 'https://inkpreview.co',
    'description': 'AI-powered tattoo simulator. See how a tattoo looks on your body before you commit.',
    'applicationCategory': 'DesignApplication',
    'operatingSystem': 'Web',
    'offers': [
      { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'name': 'Free' },
      { '@type': 'Offer', 'price': '9.99', 'priceCurrency': 'USD', 'name': 'Pro', 'billingIncrement': 'P1M' },
      { '@type': 'Offer', 'price': '29.99', 'priceCurrency': 'USD', 'name': 'Studio', 'billingIncrement': 'P1M' }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '127'
    }
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'InkPreview',
    'url': 'https://inkpreview.co',
    'logo': 'https://inkpreview.co/logo.svg',
    'sameAs': []
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'InkPreview — AI Tattoo Simulator & Try On',
    'description': 'See how a tattoo looks on your body before you commit. Free AI-powered tattoo preview tool.',
    'url': 'https://inkpreview.co',
    'publisher': {
      '@type': 'Organization',
      'name': 'InkPreview',
      'url': 'https://inkpreview.co'
    },
    'mainEntity': {
      '@type': 'WebApplication',
      'name': 'InkPreview Tattoo Simulator',
      'applicationCategory': 'DesignApplication',
      'operatingSystem': 'Web'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
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
              <p className="text-xs text-stone/70 mt-3 leading-relaxed max-w-md">
                InkPreview is a free AI tattoo simulator that helps you visualize tattoo designs on your
                body before committing. Whether you&apos;re considering a small minimalist tattoo on your
                wrist, a full sleeve design, or a meaningful cover-up for an existing tattoo, our AI
                engine generates realistic previews in seconds. Used by over 10,000 tattoo enthusiasts
                worldwide.
              </p>
            </div>
            <div className="relative">
              <BeforeAfterSlider
                beforeSrc="/images/tool-examples/simulator-before.webp"
                afterSrc="/images/tool-examples/simulator-after.webp"
                beforeAlt="Clean skin before tattoo"
                afterAlt="AI tattoo preview on skin"
              />
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
              { title: "Tattoo Simulator", desc: "See any design mapped onto your actual body photo. Adjust size, angle, and placement. Our AI analyzes your skin tone, body curves, and lighting to produce a realistic tattoo preview that looks like the real thing. Perfect for trying placement ideas on your forearm, shoulder, back, chest, or wrist before visiting a tattoo artist.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
              { title: "Stencil Generator", desc: "Convert any image into a clean tattoo stencil your artist can use. Download as PNG. Uses edge detection and threshold controls to extract crisp outlines from photos, illustrations, or AI-generated designs. Tattoo artists love this tool for quick client consultations — upload a reference image and get a transfer-ready stencil in seconds.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
              { title: "Cover-up Designer", desc: "Upload your existing tattoo. InkPreview suggests cover-up designs that work with the existing lines and shading. A great option if you have an old tattoo you regret or want to refresh. Our AI considers the size, darkness, and style of your current ink to recommend designs that naturally blend with or conceal the original artwork.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
              { title: "Style Library", desc: "Japanese irezumi, geometric patterns, minimalist fine line, photorealism, watercolor splashes, blackwork, tribal, neo-traditional — browse hundreds of styles or search by keyword. Each style comes with cultural context and placement suggestions so you can choose a design that matches your personality and body area.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
              { title: "HD Export", desc: "Free tier: 512px. Pro: 1024px. Studio: 4K with no watermark. Download high-resolution previews to show your tattoo artist exactly what you want. Save time during consultations by bringing a visual reference instead of trying to describe your dream tattoo with words alone.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
              { title: "Batch Mode", desc: "Studio plan: generate up to 50 variations in one session. Great for client presentations and tattoo studio workflows. Compare multiple design options side by side, adjust placements, and export a full mood board for your next tattoo appointment. Ideal for professional tattoo artists who want to offer clients a visual preview service.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
            ].map((f, i) => (
              <div key={i} className="bg-warm-white rounded-xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5">
                <div className="w-10 h-10 mb-3 rounded-lg bg-sage-light flex items-center justify-center">
                  <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-ink mb-2">{f.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & AUTHORITY */}
      <section className="bg-warm-white section-padding py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">
            Why Tattoo Preview Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-display text-sage mb-2">24%</div>
              <p className="text-stone text-sm">of people with tattoos regret at least one, according to a <a href="https://www.pewresearch.org/short-reads/2023/08/15/about-a-third-of-us-adults-say-they-have-a-tattoo/" target="_blank" rel="noopener noreferrer" className="text-sage-dark underline">2023 Pew Research study</a>.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display text-sage mb-2">32%</div>
              <p className="text-stone text-sm">of U.S. adults have at least one tattoo — up from 21% in 2012, per <a href="https://www.pewresearch.org/short-reads/2023/08/15/about-a-third-of-us-adults-say-they-have-a-tattoo/" target="_blank" rel="noopener noreferrer" className="text-sage-dark underline">Pew Research Center</a>.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display text-sage mb-2">10s</div>
              <p className="text-stone text-sm">average preview time on InkPreview — see the design before you commit, reducing the chance of regret.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-3">How We Help</h3>
            <p className="text-stone text-sm leading-relaxed mb-4">
              InkPreview was built to solve a simple problem: <strong className="text-charcoal">you can&apos;t undo a tattoo easily</strong>.
              Traditional methods — verbal descriptions, Pinterest boards, printed stencils — leave too much to imagination.
              Our AI engine renders realistic previews on your actual photo, accounting for skin tone, body curvature, and lighting.
            </p>
            <p className="text-stone text-sm leading-relaxed mb-4">
              According to the <a href="https://www.aad.org/public/everyday-care/skin-care-secrets/tattoos/caring-for-tattooed-skin" target="_blank" rel="noopener noreferrer" className="text-sage-dark underline">American Academy of Dermatology</a>,
              proper planning and placement are key factors in tattoo satisfaction. InkPreview helps you test placement
              and size before sitting in the chair.
            </p>
            <p className="text-stone text-sm leading-relaxed">
              Professional tattoo artists also use InkPreview as a consultation tool — showing clients realistic previews
              reduces revision requests and improves client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT / SEO CONTENT */}
      <section className="section-padding py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Who Uses InkPreview?</h2>
              <p className="text-stone text-sm leading-relaxed mb-4">
                InkPreview serves a diverse community of tattoo enthusiasts, first-timers, and professional
                tattoo artists across the globe. Whether you&apos;re planning your first small tattoo or
                designing a full Japanese-style sleeve, our AI-powered platform helps you make confident
                decisions about body art.
              </p>
              <p className="text-stone text-sm leading-relaxed mb-4">
                <strong className="text-charcoal">First-time tattoo clients</strong> use InkPreview to overcome
                hesitation. Seeing a realistic preview of a butterfly tattoo on their wrist or a rose design
                on their shoulder removes the fear of the unknown. You can experiment with dozens of designs
                in a single session without any commitment.
              </p>
              <p className="text-stone text-sm leading-relaxed mb-4">
                <strong className="text-charcoal">Tattoo collectors</strong> who already have multiple tattoos
                use the simulator to plan their next piece. They test how a new geometric design flows with
                existing ink, or how a cover-up might look over an old tattoo. The batch mode in our Studio
                plan lets you compare 50 variations side by side.
              </p>
              <p className="text-stone text-sm leading-relaxed">
                <strong className="text-charcoal">Professional tattoo artists</strong> leverage the stencil
                generator to speed up consultations. Instead of spending 30 minutes sketching a rough outline,
                they upload a client&apos;s reference image and get a clean stencil in seconds. The simulator
                also helps artists show clients realistic placement options during the booking process.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Popular Tattoo Scenarios</h2>
              <div className="space-y-4">
                {[
                  { title: "Small minimalist tattoo", desc: "Fine line designs for wrist, finger, behind the ear, or ankle. Subtle and elegant." },
                  { title: "Full sleeve design", desc: "Plan a cohesive arm sleeve with Japanese, tribal, or custom themes flowing from shoulder to wrist." },
                  { title: "Meaningful memorial tattoo", desc: "Honor loved ones with portraits, dates, or symbolic designs like infinity knots and birds." },
                  { title: "Cover-up for old ink", desc: "Transform faded or unwanted tattoos into fresh artwork that works with existing lines." },
                  { title: "Matching couples tattoo", desc: "Preview complementary designs on both partners before your anniversary or wedding." },
                  { title: "First tattoo experiment", desc: "Not sure about placement? Try multiple body areas to find the perfect spot." },
                ].map((s, i) => (
                  <div key={i} className="bg-warm-white rounded-lg p-4 border border-sand">
                    <h3 className="font-medium text-charcoal text-sm mb-1">{s.title}</h3>
                    <p className="text-stone text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
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
              <p className="text-sm text-stone mt-1">300 images/mo · No watermark · 1024px</p>
            </div>
            <div className="bg-cream rounded-xl p-6 shadow-soft">
              <p className="text-sm text-stone mb-1">Studio</p>
              <p className="font-display text-3xl text-ink">$29.99</p>
              <p className="text-sm text-stone mt-1">1,000 images/mo · 4K · Batch · Commercial</p>
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

      {/* ABOUT INKPREVIEW */}
      <section className="section-padding py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl text-ink mb-4">About InkPreview</h2>
          <p className="text-stone text-sm leading-relaxed mb-4">
            InkPreview is an independent tool built by tattoo enthusiasts and AI engineers.
            We are not a tattoo studio and do not provide tattooing services. Our mission is to help
            you make better decisions about body art by showing realistic previews before you commit.
          </p>
          <p className="text-stone text-sm leading-relaxed">
            Our AI models are trained on diverse skin tones and body types. We work with professional
            tattoo artists to validate our preview accuracy. For tattoo-specific advice — pain management,
            aftercare, ink allergies — always consult a licensed tattoo artist or dermatologist.
          </p>
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
