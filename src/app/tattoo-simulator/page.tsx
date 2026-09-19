import Link from "next/link";
import type { Metadata } from "next";
import SimulatorTool from "@/components/SimulatorTool";

export const metadata: Metadata = {
  title: "Tattoo Simulator — Virtual Tattoo Try On",
  description:
    "Upload your photo and see how any tattoo looks on your body. Free virtual tattoo try on with AI. Adjust size, placement, and style in seconds.",
  alternates: { canonical: "/tattoo-simulator" },
};

export default function TattooSimulator() {
  return (
    <>
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
                Browse 5,000+ styles (geometric, Japanese, minimalist, realism, watercolor, blackwork),
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
    </>
  );
}
