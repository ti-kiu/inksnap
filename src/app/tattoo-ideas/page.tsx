import { Metadata } from 'next';
import Link from 'next/link';
import pages from '@/data/pseo-pages.json';

export const metadata: Metadata = {
  title: 'Tattoo Ideas — AI Design Preview | InkPreview',
  description: 'Browse 200+ tattoo ideas by style, placement, and meaning. Preview any design on your body with AI before you ink.',
  alternates: { canonical: 'https://inkpreview.co/tattoo-ideas' },
};

export default function TattooIdeasIndex() {
  const categories = [
    { key: 'design', label: 'By Design', icon: '🎨' },
    { key: 'style', label: 'By Style', icon: '✨' },
    { key: 'placement', label: 'By Placement', icon: '💪' },
    { key: 'audience', label: 'By Audience', icon: '👥' },
    { key: 'size', label: 'By Size', icon: '📐' },
    { key: 'tool', label: 'Tools', icon: '🔧' },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">Tattoo Ideas</h1>
      <p className="text-lg text-stone mb-10 max-w-2xl">
        Browse hundreds of tattoo ideas organized by design, style, and placement.
        Preview any design on your body with our AI simulator.
      </p>

      {categories.map((cat) => {
        const catPages = pages.filter((p) => p.category === cat.key);
        if (catPages.length === 0) return null;
        return (
          <section key={cat.key} className="mb-10">
            <h2 className="font-display text-2xl text-ink mb-4">
              {cat.icon} {cat.label}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {catPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tattoo-ideas/${p.slug}`}
                  className="bg-warm-white border border-sand rounded-xl p-4 hover:border-sage hover:shadow-soft transition group"
                >
                  <h3 className="font-medium text-charcoal group-hover:text-sage transition text-sm">
                    {p.keyword}
                  </h3>
                  <p className="text-xs text-stone mt-1">{p.volume}/mo</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-sage-light/30 rounded-2xl p-8 md:p-12 text-center mt-12">
        <h2 className="font-display text-2xl text-ink mb-3">Can&apos;t find what you want?</h2>
        <p className="text-stone mb-6">Describe any tattoo idea and preview it on your body with AI.</p>
        <Link
          href="/tattoo-simulator"
          className="inline-flex items-center gap-2 bg-sage text-white px-6 py-3 rounded-lg font-medium hover:bg-sage-dark transition"
        >
          Open Tattoo Simulator
        </Link>
      </section>
    </main>
  );
}
