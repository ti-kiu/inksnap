"use client";

import Link from "next/link";
import { useState } from "react";

const langs = [
  { code: '', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="InkPreview" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/tattoo-simulator" className="text-stone hover:text-charcoal transition">
            Simulator
          </Link>
          <Link href="/tattoo-stencil-generator" className="text-stone hover:text-charcoal transition">
            Stencil
          </Link>
          <Link href="/pricing" className="text-stone hover:text-charcoal transition">
            Pricing
          </Link>
          <Link href="/gallery" className="text-stone hover:text-charcoal transition">
            Gallery
          </Link>
          <Link href="/tattoo-ideas" className="text-stone hover:text-charcoal transition">
            Ideas
          </Link>
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-stone hover:text-charcoal transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.8 3.9 6.3 3.9 9s-1.4 6.2-3.9 9c-2.5-2.8-3.9-6.3-3.9-9s1.4-6.2 3.9-9z" />
              </svg>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-card border border-sand py-2 min-w-[120px]">
                {langs.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.code}`}
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-sage-light transition"
                    onClick={() => setLangOpen(false)}
                  >
                    {l.flag} {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center px-5 py-2.5 bg-sage text-white rounded-md hover:bg-sage-dark transition"
          >
            Try Free
          </Link>
        </div>
        <button
          className="md:hidden text-charcoal"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-sand bg-cream px-6 py-6 space-y-4">
          <Link href="/tattoo-simulator" className="block text-charcoal font-medium" onClick={() => setOpen(false)}>
            Simulator
          </Link>
          <Link href="/tattoo-stencil-generator" className="block text-charcoal font-medium" onClick={() => setOpen(false)}>
            Stencil
          </Link>
          <Link href="/pricing" className="block text-charcoal font-medium" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link href="/gallery" className="block text-charcoal font-medium" onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <Link href="/tattoo-ideas" className="block text-charcoal font-medium" onClick={() => setOpen(false)}>
            Ideas
          </Link>
          {/* Mobile language links */}
          <div className="flex gap-3 pt-2 border-t border-sand">
            {langs.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                className="text-sm text-stone hover:text-charcoal"
                onClick={() => setOpen(false)}
              >
                {l.flag} {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center px-5 py-2.5 bg-sage text-white rounded-md"
            onClick={() => setOpen(false)}
          >
            Try Free
          </Link>
        </div>
      )}
    </nav>
  );
}
