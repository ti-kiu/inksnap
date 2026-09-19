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
  return {
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
}

export default async function PseoStylePage({ params }: PageProps) {
  const { slug } = await params;
  const page = content[slug as keyof typeof content];
  if (!page) return <div className="p-8 text-center">Page not found</div>;

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
