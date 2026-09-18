import { Metadata } from 'next';
import '@/app/tattoo-ideas/pseo.css';
import content from '@/data/pseo-content.json';

const placementSlugs = ["placement-ankle", "placement-back", "placement-forearm", "placement-ribs", "placement-shoulder", "placement-thigh", "placement-upper-arm", "placement-wrist"];
const placementMap: Record<string, string> = {"placement-ankle": "ankle", "placement-back": "back", "placement-forearm": "forearm", "placement-ribs": "ribs", "placement-shoulder": "shoulder", "placement-thigh": "thigh", "placement-upper-arm": "upper-arm", "placement-wrist": "wrist"};

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

export default async function PlacementPage({ params }: PageProps) {
  const { placement } = await params;
  const slug = `placement-${placement}` as keyof typeof content;
  const page = content[slug];
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
    </>
  );
}
