import Link from "next/link";
import type { Metadata } from "next";
import SimulatorTool from "@/components/SimulatorTool";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Tattoo Simulator — Virtual Tattoo Try On",
  description:
    "Upload your photo and see how any tattoo looks on your body. Free virtual tattoo try on with AI. Adjust size, placement, and style in seconds.",
  alternates: { canonical: "/tattoo-simulator" },
};

const faqItems = [
  { q: "Is the tattoo simulator really free?", a: "Yes. You get 3 free previews per day with no account required. Pro plans start at $9.99/mo for 300 images." },
  { q: "How accurate is the AI tattoo preview?", a: "The AI maps the design onto your skin using perspective and lighting adjustments. Results are for reference — always consult a licensed tattoo artist for the final design." },
  { q: "What photo should I upload?", a: "Take a clear, well-lit photo of the body area you want to tattoo. Arms, legs, back, chest, and ribs all work. Avoid filters or heavy shadows." },
  { q: "Can I use my own tattoo design?", a: "Yes. Upload any reference image, or describe what you want and the AI will generate a design for you." },
  { q: "Does it work on all skin tones?", a: "Yes. The simulator adapts the tattoo overlay to match your skin tone and lighting conditions in the photo." },
];

export default function TattooSimulator() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12 text-center">
        <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-xs font-medium rounded-full mb-4">
          Free virtual tattoo try on
        </span>
        <h1 className="font-display text-display-md text-ink mb-2">
          Tattoo Simulator — See It On Your Skin
        </h1>
        <p className="text-stone max-w-xl mx-auto">
          Upload a photo of any body area. Pick a design or describe one. InkPreview maps it onto your
          skin in under 10 seconds.
        </p>
      </section>

      {/* INTERACTIVE TOOL */}
      <SimulatorTool />

      {/* BEFORE/AFTER */}
      <section className="max-w-lg mx-auto px-6 py-12">
        <h2 className="font-display text-display-md text-ink text-center mb-8">Drag to Compare</h2>
        <BeforeAfterSlider
          beforeSrc="/images/tool-examples/simulator-page-before.webp"
          afterSrc="/images/tool-examples/simulator-page-after.webp"
          beforeAlt="Clean skin before tattoo"
          afterAlt="AI tattoo preview on skin"
        />
        <p className="text-center text-stone text-xs mt-3">← Clean Skin &nbsp;|&nbsp; Tattoo Preview →</p>
      </section>

      {/* HOW THE SIMULATOR WORKS */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">
            From Photo to Preview in Three Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-lg text-ink mb-2">Step 1 — Upload</h3>
              <p className="text-stone text-sm leading-relaxed">
                Take a clear, well-lit photo of the area you&apos;re considering. Arm, leg, back, chest,
                ribs — any body part works.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-ink mb-2">Step 2 — Choose Your Design</h3>
              <p className="text-stone text-sm leading-relaxed">
                Browse 20+ styles (geometric, Japanese, minimalist, realism, watercolor, blackwork),
                upload a reference image, or describe what you want and let AI generate it.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-ink mb-2">Step 3 — Preview & Adjust</h3>
              <p className="text-stone text-sm leading-relaxed">
                Drag, resize, and rotate the tattoo on your photo. Adjust opacity and blend mode until it
                looks natural. Download or share with your artist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE A SIMULATOR */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-10">
            Why Preview Before You Ink?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-white rounded-xl p-6">
              <h3 className="font-display text-lg text-ink mb-2">Avoid Tattoo Regret</h3>
              <p className="text-stone text-sm leading-relaxed">
                Nearly 25% of people with tattoos regret at least one. A preview helps you see the design
                at the right size and placement before committing.
              </p>
            </div>
            <div className="bg-warm-white rounded-xl p-6">
              <h3 className="font-display text-lg text-ink mb-2">Communicate with Your Artist</h3>
              <p className="text-stone text-sm leading-relaxed">
                Show your tattoo artist exactly what you want — size, placement, and style. A visual
                reference beats a verbal description every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-white py-16 md:py-20 text-center">
        <h2 className="font-display text-display-md text-ink mb-4">
          Ready to See Your Tattoo?
        </h2>
        <p className="text-stone max-w-lg mx-auto mb-8">
          Upload one photo and preview any design on your body. Free, no sign-up required.
        </p>
        <Link
          href="/tattoo-simulator"
          className="inline-flex items-center px-7 py-3.5 bg-sage text-white rounded-md text-base font-medium hover:bg-sage-dark transition-all"
        >
          Try the Simulator Free
        </Link>
      </section>

      {/* RELATED TOOLS */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-8">Explore More Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/tattoo-stencil-generator" className="bg-warm-white rounded-xl p-6 border border-sand hover:shadow-card transition">
              <h3 className="font-display text-lg text-ink mb-2">Tattoo Stencil Generator</h3>
              <p className="text-stone text-sm">Convert any image into a clean tattoo stencil outline. Perfect for artists and clients.</p>
            </Link>
            <Link href="/tattoo-cover-up-design" className="bg-warm-white rounded-xl p-6 border border-sand hover:shadow-card transition">
              <h3 className="font-display text-lg text-ink mb-2">Tattoo Cover-up Designer</h3>
              <p className="text-stone text-sm">Design a cover-up for an existing tattoo. AI suggests patterns that work with your old ink.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-sand pb-6 last:border-0">
                <h3 className="font-display text-lg text-ink mb-2">{item.q}</h3>
                <p className="text-stone text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-stone text-sm mt-8">
            Browse <Link href="/tattoo-ideas/hub" className="text-sage underline">tattoo ideas</Link> by style, or try the <Link href="/tattoo-stencil-generator" className="text-sage underline">stencil generator</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
