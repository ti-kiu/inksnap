import Link from "next/link";
import type { Metadata } from "next";

const STYLES: Record<string, { title: string; intro: string; placements: string[]; designs: { name: string; placement: string; desc: string }[] }> = {
  geometric: {
    title: "Geometric",
    intro: "Geometric tattoos use clean lines, shapes, and patterns — from simple triangles to complex sacred geometry. They work at any size and age well on most skin types.",
    placements: ["Forearm", "Shoulder", "Calf", "Back"],
    designs: [
      { name: "Sacred Geometry Mandala", placement: "Forearm", desc: "Intricate mandala with concentric geometric patterns." },
      { name: "Minimal Triangle Set", placement: "Wrist", desc: "Three overlapping triangles in fine line." },
      { name: "Honeycomb Pattern", placement: "Shoulder", desc: "Hexagonal grid with gradient density." },
      { name: "Dotwork Mandala", placement: "Back", desc: "Traditional mandala rendered entirely in dotwork." },
      { name: "Low-Poly Wolf", placement: "Forearm", desc: "Wolf portrait rendered in geometric facets." },
      { name: "Geometric Rose", placement: "Upper Arm", desc: "Rose built from angular facets and clean lines." },
    ],
  },
  japanese: {
    title: "Japanese",
    intro: "Japanese tattoos draw from centuries of art: koi fish, dragons, cherry blossoms, waves. They\'re typically larger pieces with bold outlines and rich color.",
    placements: ["Full Sleeve", "Back", "Thigh", "Chest"],
    designs: [
      { name: "Koi Fish", placement: "Full Sleeve", desc: "Traditional koi swimming upstream with flowing water." },
      { name: "Cherry Blossom Branch", placement: "Shoulder", desc: "Delicate cherry blossoms with falling petals." },
      { name: "Dragon & Clouds", placement: "Back", desc: "Full back dragon with traditional cloud motifs." },
      { name: "Wave Pattern", placement: "Forearm", desc: "Hokusai-inspired great wave in traditional style." },
      { name: "Phoenix", placement: "Chest", desc: "Japanese phoenix (hō-ō) with flowing tail feathers." },
      { name: "Oni Mask", placement: "Upper Arm", desc: "Traditional demon mask with bold colors." },
    ],
  },
  minimalist: {
    title: "Minimalist",
    intro: "Minimalist tattoos focus on simplicity — clean lines, small scale, and negative space. They\'re subtle, versatile, and age well on most skin types.",
    placements: ["Wrist", "Ankle", "Behind Ear", "Finger"],
    designs: [
      { name: "Fine Line Mountain", placement: "Wrist", desc: "Simple mountain outline in single fine line." },
      { name: "Tiny Wave", placement: "Ankle", desc: "Minimal ocean wave in three strokes." },
      { name: "Constellation", placement: "Behind Ear", desc: "Star constellation with dot-and-line pattern." },
      { name: "Single Needle Rose", placement: "Finger", desc: "Tiny rose done entirely in single needle work." },
      { name: "Paper Plane", placement: "Forearm", desc: "Simple paper plane with dotted flight path." },
      { name: "Moon Phases", placement: "Spine", desc: "Vertical line of moon phases along the spine." },
    ],
  },
};

// Default style data for styles not explicitly defined
function getStyleData(slug: string) {
  if (STYLES[slug]) return STYLES[slug];
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title,
    intro: `${title} tattoos are a popular style choice. Browse our curated gallery of ${title.toLowerCase()} designs and see how they look on your body with InkSnap\'s free simulator.`,
    placements: ["Forearm", "Shoulder", "Back", "Chest"],
    designs: [
      { name: `${title} Design 1`, placement: "Forearm", desc: `A beautiful ${title.toLowerCase()} design for the forearm.` },
      { name: `${title} Design 2`, placement: "Shoulder", desc: `Elegant ${title.toLowerCase()} piece on the shoulder.` },
      { name: `${title} Design 3`, placement: "Back", desc: `Large ${title.toLowerCase()} design for the back.` },
      { name: `${title} Design 4`, placement: "Chest", desc: `Bold ${title.toLowerCase()} design on the chest.` },
    ],
  };
}

// Generate static params for known styles
export function generateStaticParams() {
  return Object.keys(STYLES).map((style) => ({ style }));
}

export async function generateMetadata({ params }: { params: Promise<{ style: string }> }): Promise<Metadata> {
  const { style } = await params;
  const data = getStyleData(style);
  return {
    title: `${data.title} Tattoo Ideas — Gallery & Inspiration`,
    description: `Browse ${data.title.toLowerCase()} tattoo ideas for men and women. See how each design looks on real skin with InkSnap\'s free tattoo simulator. 500+ designs.`,
    alternates: { canonical: `/tattoo-ideas/${style}` },
  };
}

export default async function StyleIdeasPage({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const data = getStyleData(style);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex gap-2 text-sm text-stone">
          <Link href="/" className="hover:text-charcoal transition">Home</Link>
          <span>/</span>
          <Link href="/tattoo-ideas/hub" className="hover:text-charcoal transition">Tattoo Ideas</Link>
          <span>/</span>
          <span className="text-charcoal">{data.title}</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pb-12 text-center">
        <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-xs font-medium rounded-full mb-4">
          {data.title} tattoo inspiration
        </span>
        <h1 className="font-display text-display-lg text-ink mb-4">
          {data.title} Tattoo Ideas — See Them on Your Skin
        </h1>
        <p className="text-body-lg text-stone max-w-2xl mx-auto mb-6">
          {data.intro}
        </p>
        <Link
          href="/tattoo-simulator"
          className="inline-flex items-center justify-center px-6 py-3 bg-sage text-white rounded-md text-sm font-medium hover:bg-sage-dark transition"
        >
          Try Any Design on Your Body — Free
        </Link>
      </section>

      {/* PLACEMENT GUIDE */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-warm-white rounded-xl p-5 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-2">Style Overview</h3>
            <p className="text-stone text-sm leading-relaxed">{data.intro}</p>
          </div>
          <div className="bg-warm-white rounded-xl p-5 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-2">Best Placements</h3>
            <p className="text-stone text-sm leading-relaxed">{data.placements.join(", ")}</p>
          </div>
          <div className="bg-warm-white rounded-xl p-5 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-2">Try Before You Ink</h3>
            <p className="text-stone text-sm leading-relaxed">
              Use InkSnap to preview any {data.title.toLowerCase()} design on your actual body photo — free, instant, private.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="font-display text-display-md text-ink text-center mb-10">
          Popular {data.title} Tattoo Designs
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.designs.map((design, i) => (
            <div key={i} className="bg-warm-white rounded-xl shadow-soft overflow-hidden group hover:shadow-card transition-all">
              <div className="aspect-[3/4] bg-sand flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-4xl mb-2">🎨</div>
                  <p className="text-stone text-xs">AI-generated preview</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-ink mb-1">{design.name}</h3>
                <p className="text-xs text-stone mb-3">{design.desc} Best on: {design.placement}.</p>
                <Link href="/tattoo-simulator" className="text-xs text-sage-dark font-medium hover:text-sage transition">
                  Preview on your body →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-white py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">
            Found a {data.title} Design You Like?
          </h2>
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
