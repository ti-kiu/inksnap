import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tattoo Ideas — 10,000+ AI Designs by Style, Meaning & Placement",
  description:
    "Browse tattoo ideas by style, meaning, and placement. See how each design looks on your body with InkSnap\'s free tattoo simulator.",
  alternates: { canonical: "/tattoo-ideas/hub" },
};

const styles = [
  { slug: "geometric", name: "Geometric", emoji: "📐" },
  { slug: "japanese", name: "Japanese", emoji: "🌸" },
  { slug: "minimalist", name: "Minimalist", emoji: "✍️" },
  { slug: "realism", name: "Realism", emoji: "🎨" },
  { slug: "watercolor", name: "Watercolor", emoji: "💧" },
  { slug: "blackwork", name: "Blackwork", emoji: "⬛" },
  { slug: "neo-traditional", name: "Neo-Traditional", emoji: "🏴" },
  { slug: "dotwork", name: "Dotwork", emoji: "🔵" },
  { slug: "fineline", name: "Fine Line", emoji: "〰️" },
  { slug: "tribal", name: "Tribal", emoji: "🔺" },
  { slug: "old-school", name: "Old School", emoji: "⚓" },
  { slug: "mandala", name: "Mandala", emoji: "🕉️" },
  { slug: "floral", name: "Floral", emoji: "🌺" },
  { slug: "animal", name: "Animal", emoji: "🦁" },
  { slug: "skull", name: "Skull", emoji: "💀" },
  { slug: "butterfly", name: "Butterfly", emoji: "🦋" },
  { slug: "rose", name: "Rose", emoji: "🌹" },
  { slug: "dragon", name: "Dragon", emoji: "🐉" },
  { slug: "lion", name: "Lion", emoji: "🦁" },
  { slug: "phoenix", name: "Phoenix", emoji: "🔥" },
];

export default function IdeasHub() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 text-center">
        <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-xs font-medium rounded-full mb-4">
          Tattoo Inspiration
        </span>
        <h1 className="font-display text-display-lg text-ink mb-4">
          Tattoo Ideas — Browse by Style
        </h1>
        <p className="text-body-lg text-stone max-w-2xl mx-auto">
          Explore 5,000+ tattoo designs across 20+ styles. Pick one. See how it looks on your body
          with InkSnap&apos;s free tattoo simulator.
        </p>
      </section>

      {/* STYLE GRID */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-display text-display-md text-ink text-center mb-10">Browse by Style</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {styles.map((style) => (
            <Link
              key={style.slug}
              href={`/tattoo-ideas/${style.slug}`}
              className="bg-warm-white rounded-xl p-5 text-center hover:shadow-card transition-all hover:-translate-y-0.5"
            >
              <span className="text-2xl block mb-2">{style.emoji}</span>
              <span className="text-sm font-medium text-ink">{style.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-white py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">Found a Design You Like?</h2>
          <p className="text-body-lg text-stone mb-8">
            See it on your body before you commit. Free preview, no account needed.
          </p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Try InkSnap&apos;s Tattoo Simulator
          </Link>
          <p className="text-xs text-stone mt-4">AI-generated reference. Consult a professional tattoo artist before inking.</p>
        </div>
      </section>
    </>
  );
}
