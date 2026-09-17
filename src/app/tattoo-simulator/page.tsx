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
              <h3 className="font-display text-lg text-ink mb-2">Step 3 — Preview &amp; Adjust</h3>
              <p className="text-stone text-sm leading-relaxed">
                Drag to reposition. Pinch or scroll to resize. Rotate to match body contour. Compare
                up to 4 placements side by side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-12">
            For First-Timers, Collectors &amp; Artists
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-warm-white rounded-xl p-6 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-2">For First-Timers</h3>
              <p className="text-stone text-sm leading-relaxed">
                Not sure if a forearm piece is right for you? Try it on 6 different spots before you
                walk into a shop.
              </p>
            </div>
            <div className="bg-warm-white rounded-xl p-6 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-2">For Collectors</h3>
              <p className="text-stone text-sm leading-relaxed">
                Planning your next piece? See how a new design fits with existing tattoos.
              </p>
            </div>
            <div className="bg-warm-white rounded-xl p-6 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-2">For Artists</h3>
              <p className="text-stone text-sm leading-relaxed">
                Show clients a realistic mockup. They approve faster. Fewer re-draws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-white py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">
            Your Body. Your Design. See It First.
          </h2>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Upload a Photo and Start
          </Link>
          <p className="text-xs text-stone mt-4">
            AI-generated reference. Consult a professional tattoo artist before inking.
          </p>
        </div>
      </section>
    </>
  );
}
