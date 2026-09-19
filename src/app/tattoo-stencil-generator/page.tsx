import { Metadata } from 'next';
import StencilTool from '@/components/StencilTool';

export const metadata: Metadata = {
  title: 'Tattoo Stencil Generator — Free Online Tool | InkPreview',
  description: 'Convert any tattoo design into a clean stencil outline. Free online tool for tattoo artists. Upload an image, adjust settings, download transfer-ready stencil.',
  alternates: { canonical: 'https://inkpreview.co/tattoo-stencil-generator' },
  openGraph: {
    title: 'Tattoo Stencil Generator — Free Online Tool | InkPreview',
    description: 'Convert any tattoo design into a clean stencil outline. Free for tattoo artists.',
    url: 'https://inkpreview.co/tattoo-stencil-generator',
    siteName: 'InkPreview',
    type: 'website',
  },
};

export default function StencilGeneratorPage() {
  return (
    <>
      <StencilTool />

      {/* BEFORE/AFTER */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-display text-display-md text-ink text-center mb-8">From Design to Stencil</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <img src="/images/tool-examples/stencil-before.webp" alt="Original tattoo design" className="w-full rounded-xl shadow-card" loading="lazy" width="600" height="750" />
            <p className="text-stone text-sm mt-3">Before — full color design</p>
          </div>
          <div className="text-center">
            <img src="/images/tool-examples/stencil-after.webp" alt="Clean stencil outline" className="w-full rounded-xl shadow-card" loading="lazy" width="600" height="750" />
            <p className="text-sage-dark text-sm mt-3">After — transfer-ready stencil</p>
          </div>
        </div>
      </section>
    </>
  );
}
