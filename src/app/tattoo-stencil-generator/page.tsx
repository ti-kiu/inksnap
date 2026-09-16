import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tattoo Stencil Generator — Image to Stencil",
  description:
    "Convert any image into a clean tattoo stencil in seconds. Upload a photo or design, get a print-ready stencil your artist can use. Free to try.",
  alternates: { canonical: "/tattoo-stencil-generator" },
};

export default function StencilGenerator() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 text-center">
        <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-xs font-medium rounded-full mb-4">
          Image to stencil in seconds
        </span>
        <h1 className="font-display text-display-lg text-ink mb-4">
          Tattoo Stencil Generator — Any Image to Clean Stencil
        </h1>
        <p className="text-body-lg text-stone max-w-2xl mx-auto mb-8">
          Upload a photo, drawing, or reference image. InkPreview converts it to a clean, print-ready
          tattoo stencil your artist can work from.
        </p>
        <Link
          href="/tattoo-simulator"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-sage text-white rounded-md text-base font-medium hover:bg-sage-dark transition-all hover:shadow-card"
        >
          Upload an Image — Get Your Stencil
        </Link>
      </section>

      {/* TOOL PLACEHOLDER */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-warm-white rounded-xl border-2 border-dashed border-sand p-8 md:p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <h3 className="font-display text-xl text-ink mb-2">Upload your image here</h3>
          <p className="text-stone text-sm mb-2">JPG, PNG, HEIC, WEBP, or SVG. Up to 10MB.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">Image In. Stencil Out.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-lg text-ink mb-2">Step 1 — Upload</h3>
              <p className="text-stone text-sm leading-relaxed">
                Drop in any image: a photo, a sketch, a screenshot, or an AI-generated design.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-ink mb-2">Step 2 — Adjust Settings</h3>
              <p className="text-stone text-sm leading-relaxed">
                Line weight: fine, medium, bold. Detail level: simplified, balanced, detailed. Output
                size: standard (8.5×11) or custom dimensions.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-ink mb-2">Step 3 — Download</h3>
              <p className="text-stone text-sm leading-relaxed">
                Get a high-contrast black-and-white stencil as PNG or PDF. Print it or send it
                directly to your artist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">Stencil Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Auto-Trace", desc: "AI detects edges and converts them to clean linework." },
              { title: "Line Weight Control", desc: "Choose fine lines for delicate work or bold outlines for visibility." },
              { title: "Detail Slider", desc: "Simplify complex images or preserve every detail." },
              { title: "PDF Export", desc: "Print-ready output sized for standard paper (Studio plan)." },
              { title: "Batch Processing", desc: "Upload up to 20 images at once (Studio plan)." },
              { title: "Background Removal", desc: "Automatically isolates the subject from the background." },
            ].map((f, i) => (
              <div key={i} className="bg-warm-white rounded-xl p-6 shadow-soft">
                <h3 className="font-display text-lg text-ink mb-2">{f.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">Who It&apos;s For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-display text-lg text-ink mb-2">Tattoo Artists</h3>
              <p className="text-stone text-sm leading-relaxed">
                Client brings a reference photo on their phone. Upload it, generate a stencil, print
                it. Five minutes instead of thirty.
              </p>
            </div>
            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-display text-lg text-ink mb-2">Studios</h3>
              <p className="text-stone text-sm leading-relaxed">
                Batch mode handles multiple client consultations in one session. PDF export goes
                straight to the printer.
              </p>
            </div>
            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-display text-lg text-ink mb-2">DIY Designers</h3>
              <p className="text-stone text-sm leading-relaxed">
                Have a sketch or a concept? Convert it to a stencil your artist can refine and use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">Turn Any Image Into a Tattoo Stencil</h2>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Generate Your Stencil — Free
          </Link>
        </div>
      </section>
    </>
  );
}
