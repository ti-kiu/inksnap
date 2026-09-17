export type Locale = 'en' | 'pt' | 'de' | 'it';

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Hero
    'hero.title': 'Tattoo Simulator & Try On',
    'hero.subtitle': 'Preview tattoo designs on your body with AI before you commit. Free, instant, and realistic.',
    'hero.cta': 'Try Free — No Signup',
    'hero.trusted': 'Trusted by 10,000+ tattoo enthusiasts',

    // Simulator
    'sim.title': 'AI Tattoo Simulator',
    'sim.upload': 'Upload Your Photo',
    'sim.upload.hint': 'Take a clear photo of the body area',
    'sim.describe': 'Describe Your Tattoo',
    'sim.describe.placeholder': 'e.g. A small rose with geometric patterns',
    'sim.style': 'Tattoo Style',
    'sim.generate': 'Generate Preview',
    'sim.generating': 'Generating...',
    'sim.download': 'Download Preview',
    'sim.reset': 'Reset Position',
    'sim.opacity': 'Opacity',
    'sim.size': 'Size',
    'sim.blend': 'Blend Mode',

    // Styles
    'style.traditional': 'Traditional',
    'style.japanese': 'Japanese',
    'style.geometric': 'Geometric',
    'style.minimalist': 'Minimalist',
    'style.watercolor': 'Watercolor',
    'style.realism': 'Realism',

    // Nav
    'nav.simulator': 'Simulator',
    'nav.stencil': 'Stencil',
    'nav.gallery': 'Gallery',
    'nav.ideas': 'Ideas',
    'nav.pricing': 'Pricing',
    'nav.try': 'Try Free',

    // Features
    'features.title': 'Why InkPreview?',
    'features.ai.title': 'AI-Powered Preview',
    'features.ai.desc': 'See realistic tattoo designs on your actual skin tone and body shape.',
    'features.free.title': 'Free to Start',
    'features.free.desc': '3 free previews daily. No credit card required.',
    'features.instant.title': 'Instant Results',
    'features.instant.desc': 'Get your tattoo preview in seconds, not hours.',
    'features.styles.title': 'All Styles',
    'features.styles.desc': 'Traditional, Japanese, minimalist, watercolor, realism, and more.',

    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.free': 'Free',
    'pricing.free.price': '$0',
    'pricing.free.desc': '3 previews/day',
    'pricing.pro': 'Pro',
    'pricing.pro.price': '$9.99/mo',
    'pricing.pro.desc': '100 previews/month',

    // FAQ
    'faq.title': 'Frequently Asked Questions',

    // Footer
    'footer.tagline': 'AI-powered tattoo preview tool. See it before you ink it.',

    // PSEO
    'pseo.try': 'Try on Your Body',
    'pseo.explore': 'Explore More Tattoo Ideas',
    'pseo.gallery': 'Popular Designs',
  },

  pt: {
    'hero.title': 'Simulador de Tatuagem com IA',
    'hero.subtitle': 'Visualize designs de tatuagem no seu corpo com IA antes de tatuar. Grátis, instantâneo e realista.',
    'hero.cta': 'Experimentar Grátis — Sem Cadastro',
    'hero.trusted': 'Usado por mais de 10.000 entusiastas de tatuagem',

    'sim.title': 'Simulador de Tatuagem IA',
    'sim.upload': 'Envie Sua Foto',
    'sim.upload.hint': 'Tire uma foto clara da área do corpo',
    'sim.describe': 'Descreva Sua Tatuagem',
    'sim.describe.placeholder': 'ex: Uma rosa pequena com padrões geométricos',
    'sim.style': 'Estilo da Tatuagem',
    'sim.generate': 'Gerar Prévia',
    'sim.generating': 'Gerando...',
    'sim.download': 'Baixar Prévia',
    'sim.reset': 'Resetar Posição',
    'sim.opacity': 'Opacidade',
    'sim.size': 'Tamanho',
    'sim.blend': 'Modo de Mistura',

    'style.traditional': 'Tradicional',
    'style.japanese': 'Japonês',
    'style.geometric': 'Geométrico',
    'style.minimalist': 'Minimalista',
    'style.watercolor': 'Aquarela',
    'style.realism': 'Realismo',

    'nav.simulator': 'Simulador',
    'nav.stencil': 'Stencil',
    'nav.gallery': 'Galeria',
    'nav.ideas': 'Ideias',
    'nav.pricing': 'Preços',
    'nav.try': 'Experimentar',

    'features.title': 'Por que InkPreview?',
    'features.ai.title': 'Prévia com IA',
    'features.ai.desc': 'Veja designs realistas no seu tom de pele e formato corporal.',
    'features.free.title': 'Grátis para Começar',
    'features.free.desc': '3 prévias grátis por dia. Sem cartão de crédito.',
    'features.instant.title': 'Resultados Instantâneos',
    'features.instant.desc': 'Sua prévia em segundos, não horas.',
    'features.styles.title': 'Todos os Estilos',
    'features.styles.desc': 'Tradicional, japonês, minimalista, aquarela, realismo e mais.',

    'pricing.title': 'Preços Simples e Transparentes',
    'pricing.free': 'Grátis',
    'pricing.free.price': 'R$0',
    'pricing.free.desc': '3 prévias/dia',
    'pricing.pro': 'Pro',
    'pricing.pro.price': 'R$49/mês',
    'pricing.pro.desc': '100 prévias/mês',

    'faq.title': 'Perguntas Frequentes',
    'footer.tagline': 'Prévia de tatuagem com IA. Veja antes de tatuar.',

    'pseo.try': 'Experimentar no Corpo',
    'pseo.explore': 'Explorar Mais Ideias',
    'pseo.gallery': 'Designs Populares',
  },

  de: {
    'hero.title': 'Tattoo-Simulator & Anprobe',
    'hero.subtitle': 'Vorschau von Tattoo-Designs auf Ihrem Körper mit KI, bevor Sie sich entscheiden. Kostenlos, sofort und realistisch.',
    'hero.cta': 'Kostenlos Testen — Keine Anmeldung',
    'hero.trusted': 'Vertraut von über 10.000 Tattoo-Begeisterten',

    'sim.title': 'KI Tattoo-Simulator',
    'sim.upload': 'Foto Hochladen',
    'sim.upload.hint': 'Machen Sie ein klares Foto des Körperbereichs',
    'sim.describe': 'Tattoo Beschreiben',
    'sim.describe.placeholder': 'z.B. Eine kleine Rose mit geometrischen Mustern',
    'sim.style': 'Tattoo-Stil',
    'sim.generate': 'Vorschau Erstellen',
    'sim.generating': 'Wird erstellt...',
    'sim.download': 'Vorschau Herunterladen',
    'sim.reset': 'Position Zurücksetzen',
    'sim.opacity': 'Deckkraft',
    'sim.size': 'Größe',
    'sim.blend': 'Überblendmodus',

    'style.traditional': 'Traditionell',
    'style.japanese': 'Japanisch',
    'style.geometric': 'Geometrisch',
    'style.minimalist': 'Minimalistisch',
    'style.watercolor': 'Aquarell',
    'style.realism': 'Realismus',

    'nav.simulator': 'Simulator',
    'nav.stencil': 'Schablone',
    'nav.gallery': 'Galerie',
    'nav.ideas': 'Ideen',
    'nav.pricing': 'Preise',
    'nav.try': 'Kostenlos Testen',

    'features.title': 'Warum InkPreview?',
    'features.ai.title': 'KI-gestützte Vorschau',
    'features.ai.desc': 'Sehen Sie realistische Designs auf Ihrem Hautton und Körpertyp.',
    'features.free.title': 'Kostenlos Starten',
    'features.free.desc': '3 kostenlose Vorschauen täglich. Keine Kreditkarte.',
    'features.instant.title': 'Sofortige Ergebnisse',
    'features.instant.desc': 'Vorschau in Sekunden, nicht Stunden.',
    'features.styles.title': 'Alle Stile',
    'features.styles.desc': 'Traditionell, japanisch, minimalistisch, Aquarell, Realismus und mehr.',

    'pricing.title': 'Einfache, Transparente Preise',
    'pricing.free': 'Kostenlos',
    'pricing.free.price': '€0',
    'pricing.free.desc': '3 Vorschauen/Tag',
    'pricing.pro': 'Pro',
    'pricing.pro.price': '€9,99/Mon',
    'pricing.pro.desc': '100 Vorschauen/Monat',

    'faq.title': 'Häufig Gestellte Fragen',
    'footer.tagline': 'KI-gestütztes Tattoo-Vorschau-Tool. Sehen Sie es, bevor Sie es tätowieren.',

    'pseo.try': 'Am Körper Ausprobieren',
    'pseo.explore': 'Weitere Ideen Entdecken',
    'pseo.gallery': 'Beliebte Designs',
  },

  it: {
    'hero.title': 'Simulatore di Tatuaggi con IA',
    'hero.subtitle': 'Anteprima dei tatuaggi sul tuo corpo con IA prima di decidere. Gratuito, istantaneo e realistico.',
    'hero.cta': 'Prova Gratis — Nessuna Registrazione',
    'hero.trusted': 'Usato da oltre 10.000 appassionati di tatuaggi',

    'sim.title': 'Simulatore Tatuaggi IA',
    'sim.upload': 'Carica la Tua Foto',
    'sim.upload.hint': 'Scatta una foto chiara della zona del corpo',
    'sim.describe': 'Descrivi il Tuo Tatuaggio',
    'sim.describe.placeholder': 'es: Una piccola rosa con motivi geometrici',
    'sim.style': 'Stile del Tatuaggio',
    'sim.generate': 'Genera Anteprima',
    'sim.generating': 'Generazione...',
    'sim.download': 'Scarica Anteprima',
    'sim.reset': 'Ripristina Posizione',
    'sim.opacity': 'Opacità',
    'sim.size': 'Dimensione',
    'sim.blend': 'Modalità Fusione',

    'style.traditional': 'Tradizionale',
    'style.japanese': 'Giapponese',
    'style.geometric': 'Geometrico',
    'style.minimalist': 'Minimalista',
    'style.watercolor': 'Acquerello',
    'style.realism': 'Realismo',

    'nav.simulator': 'Simulatore',
    'nav.stencil': 'Stencil',
    'nav.gallery': 'Galleria',
    'nav.ideas': 'Idee',
    'nav.pricing': 'Prezzi',
    'nav.try': 'Prova Gratis',

    'features.title': 'Perché InkPreview?',
    'features.ai.title': 'Anteprima con IA',
    'features.ai.desc': 'Vedi design realistici sul tuo tono di pelle e forma del corpo.',
    'features.free.title': 'Gratis per Iniziare',
    'features.free.desc': '3 anteprime gratuite al giorno. Nessuna carta di credito.',
    'features.instant.title': 'Risultati Istantanei',
    'features.instant.desc': 'Anteprima in secondi, non ore.',
    'features.styles.title': 'Tutti gli Stili',
    'features.styles.desc': 'Tradizionale, giapponese, minimalista, acquerello, realismo e altro.',

    'pricing.title': 'Prezzi Semplici e Trasparenti',
    'pricing.free': 'Gratis',
    'pricing.free.price': '€0',
    'pricing.free.desc': '3 anteprime/giorno',
    'pricing.pro': 'Pro',
    'pricing.pro.price': '€9,99/mese',
    'pricing.pro.desc': '100 anteprime/mese',

    'faq.title': 'Domande Frequenti',
    'footer.tagline': 'Strumento di anteprima tatuaggi con IA. Vedilo prima di tatuarlo.',

    'pseo.try': 'Prova sul Tuo Corpo',
    'pseo.explore': 'Esplora Altre Idee',
    'pseo.gallery': 'Design Popolari',
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}
