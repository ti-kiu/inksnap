import { Metadata } from 'next';
import Link from 'next/link';
import { t, Locale } from '@/lib/i18n';

const locale: Locale = 'it';

export const metadata: Metadata = {
  title: 'Simulatore Tatuaggi con IA — Prova Gratis',
  description: 'Anteprima dei tatuaggi sul tuo corpo con IA. Gratuito, istantaneo e realistico. Oltre 50 stili disponibili.',
  alternates: {
    canonical: 'https://inkpreview.co/it',
    languages: { 'en': 'https://inkpreview.co', 'pt': 'https://inkpreview.co/pt', 'de': 'https://inkpreview.co/de', 'it': 'https://inkpreview.co/it', 'x-default': 'https://inkpreview.co' },
  },
  openGraph: {
    title: 'Simulatore Tatuaggi con IA | InkPreview',
    description: 'Anteprima dei tatuaggi sul tuo corpo con IA.',
    url: 'https://inkpreview.co/it',
    siteName: 'InkPreview',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function ItalianLanding() {
  return (
    <main>
      <section className="relative bg-warm-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-ink mb-6 leading-tight">{t(locale, 'hero.title')}</h1>
          <p className="text-lg md:text-xl text-stone max-w-2xl mx-auto mb-8">{t(locale, 'hero.subtitle')}</p>
          <Link href="/tattoo-simulator" className="inline-flex items-center gap-2 bg-sage text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-sage-dark transition shadow-card">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
            {t(locale, 'hero.cta')}
          </Link>
          <p className="mt-6 text-sm text-stone">{t(locale, 'hero.trusted')}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl text-ink text-center mb-12">{t(locale, 'features.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', title: t(locale, 'features.ai.title'), desc: t(locale, 'features.ai.desc') },
              { icon: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z', title: t(locale, 'features.free.title'), desc: t(locale, 'features.free.desc') },
              { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', title: t(locale, 'features.instant.title'), desc: t(locale, 'features.instant.desc') },
              { icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42', title: t(locale, 'features.styles.title'), desc: t(locale, 'features.styles.desc') },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sage-light flex items-center justify-center">
                  <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d={f.icon} /></svg>
                </div>
                <h3 className="font-display text-lg text-ink mb-2">{f.title}</h3>
                <p className="text-stone text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-sage-light/30 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl text-ink mb-4">Pronto a provare?</h2>
          <p className="text-stone mb-8">Inizia gratis. Nessuna registrazione richiesta.</p>
          <Link href="/tattoo-simulator" className="inline-flex items-center gap-2 bg-sage text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-sage-dark transition">
            {t(locale, 'nav.try')} →
          </Link>
        </div>
      </section>
    </main>
  );
}
