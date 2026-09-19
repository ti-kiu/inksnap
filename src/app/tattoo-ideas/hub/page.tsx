import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const page = content['hub'];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.canonical },
  openGraph: {
    title: page.title,
    description: page.description,
    url: page.canonical,
    siteName: 'InkPreview',
    type: 'website',
  },
};

export default function TattooIdeasHub() {
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
