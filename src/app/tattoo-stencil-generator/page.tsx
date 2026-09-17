import { Metadata } from 'next';
import StencilTool from '@/components/StencilTool';

export const metadata: Metadata = {
  title: 'Tattoo Stencil Generator — Convert Design to Stencil | InkPreview',
  description: 'Convert any tattoo design into a clean stencil outline. Free online tool for tattoo artists. Upload an image, adjust settings, download transfer-ready stencil.',
  alternates: { canonical: 'https://inkpreview.co/tattoo-stencil-generator' },
  openGraph: {
    title: 'Tattoo Stencil Generator — Convert Design to Stencil | InkPreview',
    description: 'Convert any tattoo design into a clean stencil outline. Free for tattoo artists.',
    url: 'https://inkpreview.co/tattoo-stencil-generator',
    siteName: 'InkPreview',
    type: 'website',
  },
};

export default function StencilGeneratorPage() {
  return <StencilTool />;
}
