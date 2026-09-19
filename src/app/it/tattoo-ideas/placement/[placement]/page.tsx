import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const placementSlugs = ["placement-ankle", "placement-back", "placement-forearm", "placement-ribs", "placement-shoulder", "placement-thigh", "placement-upper-arm", "placement-wrist"];
const placementMap: Record<string, string> = {"placement-ankle": "ankle", "placement-back": "back", "placement-forearm": "forearm", "placement-ribs": "ribs", "placement-shoulder": "shoulder", "placement-thigh": "thigh", "placement-upper-arm": "upper-arm", "placement-wrist": "wrist"};
const placementNames: Record<string, string> = {"ankle": "Caviglia", "back": "Schiena", "forearm": "Avambraccio", "ribs": "Costole", "shoulder": "Spalla", "thigh": "Coscia", "upper-arm": "Braccio Superiore", "wrisit": "Polso"};

interface PageProps {
  params: Promise<{ placement: string }>;
}

export async function generateStaticParams() {
  return placementSlugs.map((slug) => ({ placement: placementMap[slug] }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { placement } = await params;
  const slug = `placement-${placement}` as keyof typeof content;
  const page = content[slug];
  if (!page) return {};
  const name = placementNames[placement] || placement;
  return {
    title: `Tatuaggio sul ${name} — Idee, Dolore e Cura | InkPreview`,
    description: `Scopri idee per tatuaggi sul ${name}. Consigli su dolore, cura e design popolari. Fai un'anteprima gratuita con IA.`,
    alternates: {
      canonical: `https://inkpreview.co/tattoo-ideas/placement/${placement}`,
          languages: {
      'en': `https://inkpreview.co/tattoo-ideas/placement/${placement}`,
      'pt': `https://inkpreview.co/pt/tattoo-ideas/placement/${placement}`,
      'de': `https://inkpreview.co/de/tattoo-ideas/placement/${placement}`,
      'it': `https://inkpreview.co/it/tattoo-ideas/placement/${placement}`,
      'x-default': `https://inkpreview.co/tattoo-ideas/placement/${placement}`,
    },
    },
    openGraph: {
      title: `Tatuaggio sul ${name} | InkPreview`,
      description: `Scopri idee per tatuaggi sul ${name}.`,
      url: `https://inkpreview.co/tattoo-ideas/placement/${placement}`,
      siteName: 'InkPreview',
      locale: 'it_IT',
      type: 'website',
    },
  };
}

export default async function ItPlacementPage({ params }: PageProps) {
  const { placement } = await params;
  const slug = `placement-${placement}` as keyof typeof content;
  const page = content[slug];
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
