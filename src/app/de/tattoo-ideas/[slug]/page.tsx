import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const styleSlugs = ["anime", "blackwork", "fine-line", "floral", "geometric", "japanese", "minimalist", "neo-traditional", "ornamental", "realism", "script-lettering", "small-simple", "snake-dragon", "traditional", "tribal", "watercolor"];

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
    title: `${name} Tattoo-Ideen — Inspiration & Kostenlose Vorschau | InkPreview`,
    description: `Entdecken Sie ${name} Tattoo-Ideen mit KI-Inspiration. Erstellen Sie eine kostenlose Vorschau auf Ihrem Körper mit InkPreview.`,
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
      title: `${name} Tattoo-Ideen | InkPreview`,
      description: `Entdecken Sie ${name} Tattoo-Ideen mit KI-Inspiration.`,
      url: `https://inkpreview.co/tattoo-ideas/${slug}`,
      siteName: 'InkPreview',
      locale: 'de_DE',
      type: 'website',
    },
  };
}

export default async function DePseoStylePage({ params }: PageProps) {
  const { slug } = await params;
  const page = content[slug as keyof typeof content];
  if (!page) return <div className="p-8 text-center">Seite nicht gefunden</div>;

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
