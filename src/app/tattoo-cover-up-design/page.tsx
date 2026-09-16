import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tattoo Cover-up Design — Redesign Old Tattoos",
  description:
    "Upload a photo of your existing tattoo. InkSnap suggests cover-up designs that work with your current ink. See the result before you book.",
  alternates: { canonical: "/tattoo-cover-up-design" },
};

export default function CoverUpDesign() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 text-center">
        <span className="inline-block px-3 py-1 bg-terracotta-light text-terracotta text-xs font-medium rounded-full mb-4">
          Redesign old tattoos with AI
        </span>
        <h1 className="font-display text-display-lg text-ink mb-4">
          Tattoo Cover-up Design — See What&apos;s Possible
        </h1>
        <p className="text-body-lg text-stone max-w-2xl mx-auto mb-8">
          Upload a photo of the tattoo you want to cover. InkSnap suggests designs that work with the
          existing lines, shading, and size.
        </p>
        <Link
          href="/tattoo-simulator"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-sage text-white rounded-md text-base font-medium hover:bg-sage-dark transition-all hover:shadow-card"
        >
          Upload Your Tattoo Photo
        </Link>
      </section>

      {/* TOOL PLACEHOLDER */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-warm-white rounded-xl border-2 border-dashed border-sand p-8 md:p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-terracotta-light flex items-center justify-center">
            <svg className="w-10 h-10 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <h3 className="font-display text-xl text-ink mb-2">Upload your current tattoo photo</h3>
          <p className="text-stone text-sm mb-2">Photograph the tattoo you want to cover. Even lighting, no filters.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">Four Steps to a Fresh Start</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Upload Your Current Tattoo", desc: "Photograph the tattoo you want to cover. Even lighting, no filters." },
              { step: "2", title: "AI Analyzes the Existing Ink", desc: "InkSnap reads the line density, shading pattern, size, and color palette of your current tattoo." },
              { step: "3", title: "Get Cover-up Suggestions", desc: "The AI generates 3–10 design options that work with — not against — your existing ink." },
              { step: "4", title: "Preview on Your Skin", desc: "Pick a suggestion. InkSnap maps it over your existing tattoo on the photo. See the before/after side by side." },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-10 h-10 mb-4 rounded-full bg-terracotta-light flex items-center justify-center">
                  <span className="text-terracotta font-bold text-sm">{s.step}</span>
                </div>
                <h3 className="font-display text-lg text-ink mb-2">{s.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-terracotta mt-8">
            AI-generated reference. Consult a professional tattoo artist before inking.
          </p>
        </div>
      </section>

      {/* COMMON SCENARIOS */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">Common Cover-up Scenarios</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { scenario: "Old text/lettering", suggestion: "Organic designs (florals, animals, nature scenes) that flow over letter shapes." },
              { scenario: "Faded tribal", suggestion: "Larger, more detailed blackwork or neo-traditional pieces." },
              { scenario: "Small regrettable symbol", suggestion: "Expanded design that incorporates the original into something bigger." },
              { scenario: "Ex\'s name", suggestion: "Cover elements that use dark shading to mask the text." },
            ].map((s, i) => (
              <div key={i} className="bg-warm-white rounded-xl p-6 shadow-soft">
                <h3 className="font-display text-lg text-ink mb-2">{s.scenario}</h3>
                <p className="text-stone text-sm leading-relaxed">{s.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTE */}
      <section className="bg-terracotta-light/30 py-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-charcoal">
            <strong>Important:</strong> InkSnap designs cover-ups — new ink over old ink. InkSnap does
            not remove tattoos. For removal, consult a dermatologist or laser removal specialist.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">Your Tattoo Has a Second Chance</h2>
          <p className="text-body-lg text-stone mb-8">Upload a photo. See cover-up options in 10 seconds.</p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Upload and Explore Cover-ups
          </Link>
          <p className="text-xs text-stone mt-4">AI-generated reference. Consult a professional tattoo artist before inking.</p>
        </div>
      </section>
    </>
  );
}
