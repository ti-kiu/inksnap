import { Metadata } from 'next';
import StencilTool from '@/components/StencilTool';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

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
    </>
  );
}
