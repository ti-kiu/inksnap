import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-sand py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display text-xl text-ink">InkSnap</span>
          <p className="text-sm text-stone mt-1">
            AI tattoo visualization. Not a substitute for professional advice.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-stone">
          <Link href="/privacy" className="hover:text-charcoal transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-charcoal transition">
            Terms
          </Link>
          <Link href="/cookie-policy" className="hover:text-charcoal transition">
            Cookie Policy
          </Link>
          <Link href="/refund-policy" className="hover:text-charcoal transition">
            Refund Policy
          </Link>
          <Link href="/tattoo-simulator" className="hover:text-charcoal transition">
            Simulator
          </Link>
          <Link href="/pricing" className="hover:text-charcoal transition">
            Pricing
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-6 pt-6 border-t border-sand">
        <p className="text-xs text-stone leading-relaxed">
          Disclaimer: InkSnap provides AI-generated visual previews for reference only. Results may
          vary from actual tattoos. InkSnap does not provide tattooing services, medical advice, or
          professional design services. Always consult a licensed tattoo artist for final designs and
          application. You must be 18+ to use this service (or the age of majority in your
          jurisdiction).
        </p>
      </div>
    </footer>
  );
}
