import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const page = content['hub'];

export const metadata: Metadata = {
  title: 'Galeria de Tatuagens — Inspiração IA | InkPreview',
  description: 'Explore nossa galeria de tatuagens com inspiração IA. Descubra estilos populares, ideias criativas e faça uma prévia grátis no seu corpo.',
  alternates: {
    canonical: 'https://inkpreview.co/tattoo-ideas/hub',
        languages: {
      'en': 'https://inkpreview.co/tattoo-ideas/hub',
      'pt': 'https://inkpreview.co/pt/tattoo-ideas/hub',
      'de': 'https://inkpreview.co/de/tattoo-ideas/hub',
      'it': 'https://inkpreview.co/it/tattoo-ideas/hub',
      'x-default': 'https://inkpreview.co/tattoo-ideas/hub',
    },
  },
  openGraph: {
    title: 'Galeria de Tatuagens — Inspiração IA | InkPreview',
    description: 'Explore nossa galeria de tatuagens com inspiração IA.',
    url: 'https://inkpreview.co/tattoo-ideas/hub',
    siteName: 'InkPreview',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function PtTattooIdeasHub() {
  return (
    <>
      {page.jsonLd.map((jl: string, i: number) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={ { __html: jl } }
        />
      ))}
      <div
        className="pseo-wrap max-w-[1200px] mx-auto px-6"
        dangerouslySetInnerHTML={ { __html: page.bodyHtml } }
      />
      <PseoPreviewButtons />
    </>
  );
}
