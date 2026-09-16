import Link from "next/link";
import type { Metadata } from "next";

const SYMBOLS: Record<string, { title: string; meaning: string; styles: { name: string; desc: string; placement: string }[] }> = {
  phoenix: {
    title: "Phoenix",
    meaning: "The phoenix tattoo represents rebirth, resilience, and transformation. In Greek mythology, the phoenix dies in flames and rises again — making it a popular choice after major life changes, recovery, or personal growth. In Japanese tradition, the phoenix (hō-ō) symbolizes grace, virtue, and the sun.",
    styles: [
      { name: "Traditional Phoenix", desc: "Bold outlines with rich red and gold coloring", placement: "Back" },
      { name: "Watercolor Phoenix", desc: "Flowing colors with splatter effects", placement: "Shoulder" },
      { name: "Geometric Phoenix", desc: "Angular, faceted interpretation of the classic bird", placement: "Forearm" },
    ],
  },
  dragon: {
    title: "Dragon",
    meaning: "Dragon tattoos symbolize power, strength, and wisdom. In Eastern cultures, dragons represent good fortune and protection. In Western tradition, they symbolize courage and fierce independence. Dragon tattoos are versatile and work in nearly every tattoo style.",
    styles: [
      { name: "Japanese Dragon", desc: "Long, serpentine body with clouds and waves", placement: "Full Sleeve" },
      { name: "Celtic Dragon", desc: "Interlaced knotwork dragon design", placement: "Upper Arm" },
      { name: "Realistic Dragon", desc: "Detailed, lifelike dragon with scales and fire", placement: "Back" },
    ],
  },
  rose: {
    title: "Rose",
    meaning: "The rose tattoo is one of the most timeless and versatile designs. It symbolizes love, beauty, and passion. Different colors carry different meanings: red for love, black for mourning or rebellion, yellow for friendship. Roses work at any size and in any style.",
    styles: [
      { name: "Traditional Rose", desc: "Bold outlines with classic red and green", placement: "Forearm" },
      { name: "Fine Line Rose", desc: "Delicate single-needle rose with minimal shading", placement: "Wrist" },
      { name: "Blackwork Rose", desc: "Solid black rose with negative space details", placement: "Shoulder" },
    ],
  },
};

function getSymbolData(slug: string) {
  if (SYMBOLS[slug]) return SYMBOLS[slug];
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title,
    meaning: `The ${title.toLowerCase()} tattoo carries deep symbolic meaning. It has been used across cultures to represent various qualities and values. ${title} tattoos are popular choices for their visual appeal and personal significance.`,
    styles: [
      { name: `Traditional ${title}`, desc: `Classic ${title.toLowerCase()} design with bold lines`, placement: "Forearm" },
      { name: `Modern ${title}`, desc: `Contemporary interpretation with clean lines`, placement: "Shoulder" },
      { name: `Detailed ${title}`, desc: `Realistic ${title.toLowerCase()} with fine details`, placement: "Back" },
    ],
  };
}

export function generateStaticParams() {
  return Object.keys(SYMBOLS).map((symbol) => ({ symbol }));
}

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }): Promise<Metadata> {
  const { symbol } = await params;
  const data = getSymbolData(symbol);
  return {
    title: `${data.title} Tattoo Meaning — What Does It Symbolize?`,
    description: `What does a ${data.title.toLowerCase()} tattoo mean? Learn the symbolism, cultural origins, and popular placements. See how it looks on your skin with InkPreview\'s free simulator.`,
    alternates: { canonical: `/tattoo-meaning/${symbol}` },
  };
}

export default async function SymbolMeaningPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const data = getSymbolData(symbol);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex gap-2 text-sm text-stone">
          <Link href="/" className="hover:text-charcoal transition">Home</Link>
          <span>/</span>
          <Link href="/tattoo-ideas/hub" className="hover:text-charcoal transition">Tattoo Ideas</Link>
          <span>/</span>
          <span className="text-charcoal">{data.title} Meaning</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pb-12 text-center">
        <span className="inline-block px-3 py-1 bg-terracotta-light text-terracotta text-xs font-medium rounded-full mb-4">
          Tattoo symbolism explained
        </span>
        <h1 className="font-display text-display-lg text-ink mb-4">
          {data.title} Tattoo Meaning — What It Symbolizes
        </h1>
      </section>

      {/* MEANING */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <h2 className="font-display text-display-md text-ink mb-4">What Does a {data.title} Tattoo Mean?</h2>
        <p className="text-stone leading-relaxed mb-4">{data.meaning}</p>
      </section>

      {/* DESIGN VARIATIONS */}
      <section className="bg-warm-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-10">Popular {data.title} Tattoo Styles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.styles.map((style, i) => (
              <div key={i} className="bg-cream rounded-xl p-6">
                <h3 className="font-display text-lg text-ink mb-2">{style.name}</h3>
                <p className="text-stone text-sm leading-relaxed mb-2">{style.desc}</p>
                <p className="text-xs text-sage-dark">Best placement: {style.placement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink mb-4">
            Ready to See a {data.title} Tattoo on Your Skin?
          </h2>
          <p className="text-body-lg text-stone mb-8">Upload your photo. Pick a design. Preview it in seconds.</p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center justify-center px-8 py-4 bg-sage text-white rounded-md text-lg font-medium hover:bg-sage-dark transition-all hover:shadow-card"
          >
            Try InkPreview Free
          </Link>
          <p className="text-xs text-stone mt-4">AI-generated reference. Consult a professional tattoo artist before inking.</p>
        </div>
      </section>
    </>
  );
}
