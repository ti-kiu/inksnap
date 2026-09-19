import { Metadata } from 'next';
import GalleryTool from '@/components/GalleryTool';

export const metadata: Metadata = {
  title: 'Tattoo Gallery — AI-Generated Designs',
  description: 'Browse AI-generated tattoo designs by style. Click any design to preview it on your body with InkPreview\'s free tattoo simulator.',
  alternates: { canonical: 'https://inkpreview.co/gallery' },
  openGraph: {
    title: 'Tattoo Gallery — AI-Generated Designs',
    description: 'Browse AI-generated tattoo designs and try them on your body.',
    url: 'https://inkpreview.co/gallery',
    siteName: 'InkPreview',
    type: 'website',
  },
};

export default function GalleryPage() {
  return <GalleryTool />;
}
