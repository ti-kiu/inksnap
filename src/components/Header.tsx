"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-ink">
          InkSnap
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
          <Link href="/tattoo-ideas/hub" className="text-stone hover:text-charcoal transition">
            Ideas
          </Link>
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
          <Link href="/tattoo-ideas/hub" className="block text-charcoal font-medium" onClick={() => setOpen(false)}>
            Ideas
          </Link>
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
