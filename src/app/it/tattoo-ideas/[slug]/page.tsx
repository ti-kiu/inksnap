import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const styleSlugs = ["anime", "blackwork", "chinese-lattice", "dotwork", "fine-line", "flame", "floral", "geometric", "japanese", "minimalist", "neo-traditional", "ornamental", "realism", "sacred-geometry", "script-lettering", "small-simple", "snake-dragon", "traditional", "tribal", "watercolor"];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return styleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = content[slug as keyof typeof content];
  if (!page) return {};
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  return {
    title: `Idee Tatuaggio ${name} — Ispirazione e Anteprima Gratuita | InkPreview`,
    description: `Scopri idee per tatuaggi ${name} con ispirazione IA. Fai un'anteprima gratuita sul tuo corpo con InkPreview.`,
    alternates: {
      canonical: `https://inkpreview.co/tattoo-ideas/${slug}`,
          languages: {
      'en': `https://inkpreview.co/tattoo-ideas/${slug}`,
      'pt': `https://inkpreview.co/pt/tattoo-ideas/${slug}`,
      'de': `https://inkpreview.co/de/tattoo-ideas/${slug}`,
      'it': `https://inkpreview.co/it/tattoo-ideas/${slug}`,
      'x-default': `https://inkpreview.co/tattoo-ideas/${slug}`,
    },
    },
    openGraph: {
      title: `Idee Tatuaggio ${name} | InkPreview`,
      description: `Scopri idee per tatuaggi ${name} con ispirazione IA.`,
      url: `https://inkpreview.co/tattoo-ideas/${slug}`,
      siteName: 'InkPreview',
      locale: 'it_IT',
      type: 'website',
    },
  };
}

export default async function ItPseoStylePage({ params }: PageProps) {
  const { slug } = await params;
  const page = content[slug as keyof typeof content];
  if (!page) return <div className="p-8 text-center">Pagina non trovata</div>;

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
