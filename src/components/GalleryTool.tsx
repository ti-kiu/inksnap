'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  type: string;
  style: string;
  created_at: string;
  imageUrl?: string;
}

const STYLES = ['All', 'Traditional', 'Japanese', 'Geometric', 'Minimalist', 'Watercolor', 'Realism'];

export default function GalleryTool() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://api.inkpreview.co/api/gallery?limit=50');
        const data = await res.json();
        setItems(data.items || []);
      } catch (e) {
        console.error('Gallery load failed:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = filter === 'All'
    ? items
    : items.filter((i) => i.style?.toLowerCase() === filter.toLowerCase());

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl text-ink mb-3">Tattoo Gallery</h1>
        <p className="text-stone max-w-xl mx-auto">
          Browse AI-generated tattoo designs. Click any design to preview it on your body.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {STYLES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === s
                ? 'bg-sage text-white'
                : 'bg-cream text-stone hover:bg-sage-light'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-sage border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone">Loading designs...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-warm-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all group"
            >
              <div className="aspect-square bg-sand relative overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={`${item.style || ''} tattoo design`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-stone/30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Link
                    href="/tattoo-simulator"
                    className="bg-white text-charcoal text-xs font-medium px-4 py-2 rounded-full hover:bg-sage hover:text-white transition"
                  >
                    Try on your body
                  </Link>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal font-medium capitalize">{item.style || 'Custom'}</span>
                  <span className="text-xs text-stone capitalize">{item.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-light flex items-center justify-center">
            <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h3 className="font-display text-xl text-ink mb-2">Gallery is growing</h3>
          <p className="text-stone text-sm mb-6">Be one of the first to create a design.</p>
          <Link
            href="/tattoo-simulator"
            className="inline-flex items-center gap-2 bg-sage text-white px-6 py-3 rounded-lg font-medium hover:bg-sage-dark transition"
          >
            Create your design
          </Link>
        </div>
      )}
    </section>
  );
}
