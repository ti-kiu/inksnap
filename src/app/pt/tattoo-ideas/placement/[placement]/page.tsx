import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';
import PseoPreviewButtons from '@/components/PseoPreviewButtons';

const placementSlugs = ["placement-ankle", "placement-back", "placement-forearm", "placement-ribs", "placement-shoulder", "placement-thigh", "placement-upper-arm", "placement-wrist"];
const placementMap: Record<string, string> = {"placement-ankle": "ankle", "placement-back": "back", "placement-forearm": "forearm", "placement-ribs": "ribs", "placement-shoulder": "shoulder", "placement-thigh": "thigh", "placement-upper-arm": "upper-arm", "placement-wrist": "wrist"};
const placementNames: Record<string, string> = {"ankle": "Tornozelo", "back": "Costas", "forearm": "Antebra\u00e7o", "ribs": "Costelas", "shoulder": "Ombro", "thigh": "Coxa", "upper-arm": "Bra\u00e7o Superior", "wrist": "Pulso"};

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
    title: `Tatuagem no ${name} — Ideias, Dor e Cuidados | InkPreview`,
    description: `Descubra ideias de tatuagem no ${name}. Dicas sobre dor, cuidados e designs populares. Faça uma prévia grátis com IA.`,
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
      title: `Tatuagem no ${name} | InkPreview`,
      description: `Descubra ideias de tatuagem no ${name}.`,
      url: `https://inkpreview.co/tattoo-ideas/placement/${placement}`,
      siteName: 'InkPreview',
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

export default async function PtPlacementPage({ params }: PageProps) {
  const { placement } = await params;
  const slug = `placement-${placement}` as keyof typeof content;
  const page = content[slug];
  if (!page) return <div className="p-8 text-center">Página não encontrada</div>;

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
