import { Metadata } from 'next';
import Link from 'next/link';
import StencilTool from '@/components/StencilTool';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export const metadata: Metadata = {
  title: 'Tattoo Stencil Generator — Free Online Tool | InkPreview',
  description: 'Convert any tattoo design into a clean stencil outline. Free online tool for tattoo artists. Upload an image, adjust settings, download transfer-ready stencil.',
  alternates: { canonical: '/tattoo-stencil-generator' },
};

const faqItems = [
  { q: "What file formats does the stencil generator accept?", a: "Upload JPG, PNG, or WebP images up to 10MB. The generator works with photos, digital art, and hand-drawn sketches." },
  { q: "Can I use the stencil for a real tattoo?", a: "The output is a clean outline suitable for transfer paper. Always have a licensed tattoo artist review and refine the stencil before inking." },
  { q: "Is the stencil generator free?", a: "Yes. You get 3 free stencils per day. Pro plans offer higher resolution output and batch processing." },
  { q: "What's the difference between a stencil and the original design?", a: "A stencil removes shading and color, leaving only the outline — the lines your tattoo artist will follow during the actual tattooing process." },
];

export default function StencilGeneratorPage() {
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
      <StencilTool />

      {/* BEFORE/AFTER */}
      <section className="max-w-lg mx-auto px-6 py-12">
        <h2 className="font-display text-display-md text-ink text-center mb-8">Drag to Compare</h2>
        <BeforeAfterSlider
          beforeSrc="/images/tool-examples/stencil-before.webp"
          afterSrc="/images/tool-examples/stencil-after.webp"
          beforeAlt="Original tattoo design"
          afterAlt="Clean stencil outline"
        />
        <p className="text-center text-stone text-xs mt-3">← Original Design &nbsp;|&nbsp; Stencil Outline →</p>
      </section>

      {/* RELATED TOOLS */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-display-md text-ink text-center mb-8">Explore More Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/tattoo-simulator" className="bg-warm-white rounded-xl p-6 border border-sand hover:shadow-card transition">
              <h3 className="font-display text-lg text-ink mb-2">Tattoo Simulator</h3>
              <p className="text-stone text-sm">Preview how any tattoo looks on your body before you commit. Upload a photo and try designs.</p>
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
            Try the <Link href="/tattoo-simulator" className="text-sage underline">tattoo simulator</Link> to preview designs on your body, or browse <Link href="/tattoo-ideas/hub" className="text-sage underline">tattoo ideas</Link> by style.
          </p>
        </div>
      </section>
    </>
  );
}