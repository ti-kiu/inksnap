import Link from "next/link";
import type { Metadata } from "next";

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
          Upload a photo of any body area. Pick a design or describe one. InkSnap maps it onto your
          skin in under 10 seconds.
        </p>
      </section>

      {/* TOOL AREA */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* MAIN PREVIEW AREA */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <div className="bg-warm-white rounded-xl border-2 border-dashed border-sand hover:border-sage transition-colors cursor-pointer p-8 md:p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-ink mb-2">Drop your photo here</h3>
              <p className="text-stone text-sm mb-2">
                Drag and drop or click to upload. JPG, PNG, HEIC up to 10MB.
              </p>
              <p className="text-xs text-terracotta font-medium">
                Avoid including your face for privacy.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-terracotta-light/40 rounded-lg p-4 flex gap-3">
              <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-xs text-terracotta leading-relaxed">
                <strong>AI-generated reference.</strong> Consult a professional tattoo artist before
                inking. AI previews are approximations. Actual results depend on your artist&apos;s
                technique, ink, skin type, and placement.
              </p>
            </div>
          </div>

          {/* SIDEBAR CONTROLS */}
          <aside className="space-y-6">
            {/* Style Selection */}
            <div className="bg-warm-white rounded-xl p-5 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-4">Choose a style</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Traditional", "Japanese", "Geometric", "Minimalist", "Watercolor", "Realism"].map(
                  (style) => (
                    <button
                      key={style}
                      className="bg-cream rounded-lg p-3 text-center hover:bg-sage-light transition group"
                    >
                      <span className="text-xs text-stone group-hover:text-sage-dark">{style}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Describe Your Tattoo */}
            <div className="bg-warm-white rounded-xl p-5 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-3">Describe your tattoo</h3>
              <textarea
                className="w-full px-3 py-2.5 border border-sand rounded-md bg-cream text-charcoal text-sm placeholder-stone focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent resize-none"
                rows={3}
                placeholder="e.g. A small wolf howling at the moon, fine line style"
              />
              <button className="w-full mt-3 inline-flex items-center justify-center px-4 py-2.5 bg-sage text-white rounded-md text-sm font-medium hover:bg-sage-dark transition">
                Generate Preview
              </button>
            </div>

            {/* Placement */}
            <div className="bg-warm-white rounded-xl p-5 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-3">Placement</h3>
              <select className="w-full px-3 py-2.5 border border-sand rounded-md bg-cream text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent">
                <option>Auto-detect</option>
                <option>Upper arm</option>
                <option>Forearm</option>
                <option>Shoulder</option>
                <option>Back</option>
                <option>Chest</option>
                <option>Leg</option>
                <option>Ankle</option>
                <option>Wrist</option>
                <option>Neck</option>
              </select>
            </div>

            {/* Usage */}
            <div className="bg-sage-light/30 rounded-xl p-5 border border-sage-light">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-charcoal font-medium">Free uses remaining</span>
                <span className="badge">3 / 3</span>
              </div>
              <div className="w-full bg-sand rounded-full h-2">
                <div className="bg-sage h-2 rounded-full" style={{ width: "100%" }} />
              </div>
              <p className="text-xs text-stone mt-2">
                Need more?{" "}
                <Link href="/pricing" className="text-sage-dark underline">
                  Upgrade to Pro
                </Link>{" "}
                for 100 images/month.
              </p>
            </div>
          </aside>
        </div>
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
