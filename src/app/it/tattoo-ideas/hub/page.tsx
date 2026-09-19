import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const page = content['hub'];

export const metadata: Metadata = {
  title: 'Galleria Tatuaggi — Ispirazione IA | InkPreview',
  description: "Esplora la nostra galleria di tatuaggi con ispirazione IA. Scopri stili popolari, idee creative e fai un\u2019anteprima gratuita sul tuo corpo.",
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
    title: 'Galleria Tatuaggi — Ispirazione IA | InkPreview',
    description: 'Esplora la nostra galleria di tatuaggi con ispirazione IA.',
    url: 'https://inkpreview.co/tattoo-ideas/hub',
    siteName: 'InkPreview',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function ItTattooIdeasHub() {
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
