import { Metadata } from 'next';
import Link from 'next/link';
import pages from '@/data/pseo-pages.json';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://inkpreview.co/tattoo-ideas/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://inkpreview.co/tattoo-ideas/${page.slug}`,
      siteName: 'InkPreview',
      type: 'website',
    },
  };
}

export default async function PseoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) return <div className="p-8 text-center">Page not found</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone mb-8">
          <Link href="/" className="hover:text-sage">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tattoo-ideas" className="hover:text-sage">Tattoo Ideas</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{page.keyword}</span>
        </nav>

        {/* Hero */}
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">{page.h1}</h1>
        <p className="text-lg text-stone mb-8 max-w-2xl">{page.description}</p>

        {/* Search volume badge */}
        <div className="inline-flex items-center gap-2 bg-sage-light/30 rounded-full px-4 py-2 mb-10">
          <span className="w-2 h-2 bg-sage rounded-full"></span>
          <span className="text-sm text-charcoal">{page.keyword} — {page.volume} monthly searches</span>
        </div>

        {/* CTA */}
        <section className="bg-warm-white rounded-2xl p-8 md:p-12 mb-12 border border-sand">
          <h2 className="font-display text-2xl text-ink mb-3">Try {page.keyword} on Your Body</h2>
          <p className="text-stone mb-6">Upload your photo, describe your dream tattoo, and see how it looks on your skin — all with AI.</p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center gap-2 bg-sage text-white px-6 py-3 rounded-lg font-medium hover:bg-sage-dark transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            Open Tattoo Simulator
          </Link>
        </section>

        {/* Gallery placeholder */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-ink mb-6">Popular {page.keyword} Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-cream rounded-xl flex items-center justify-center">
                <div className="text-center text-stone">
                  <svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <p className="text-xs">AI-generated sample</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-ink mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {page.faq.map((f, i) => (
              <div key={i} className="bg-warm-white rounded-xl p-6 border border-sand">
                <h3 className="font-display text-lg text-ink mb-2">{f.q}</h3>
                <p className="text-stone text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="font-display text-2xl text-ink mb-6">Explore More Tattoo Ideas</h2>
          <div className="flex flex-wrap gap-3">
            {pages.filter((p) => p.slug !== slug).slice(0, 10).map((p) => (
              <Link
                key={p.slug}
                href={`/tattoo-ideas/${p.slug}`}
                className="bg-cream hover:bg-sage-light text-charcoal text-sm px-4 py-2 rounded-full transition"
              >
                {p.keyword}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
