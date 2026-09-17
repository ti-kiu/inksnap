'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function StencilTool() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [stencilImage, setStencilImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [threshold, setThreshold] = useState(128);
  const [edgeStrength, setEdgeStrength] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setSourceImage(url);
      setStencilImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const generateStencil = useCallback(() => {
    if (!sourceImage) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      canvasRef.current = canvas;

      // Draw original
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Step 1: Grayscale
      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      // Step 2: Edge detection (Sobel)
      if (edgeStrength > 0) {
        const w = canvas.width;
        const h = canvas.height;
        const gray = new Float32Array(w * h);
        for (let i = 0; i < gray.length; i++) gray[i] = data[i * 4];

        const edges = new Float32Array(w * h);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const gx =
              -gray[(y - 1) * w + (x - 1)] + gray[(y - 1) * w + (x + 1)]
              - 2 * gray[y * w + (x - 1)] + 2 * gray[y * w + (x + 1)]
              - gray[(y + 1) * w + (x - 1)] + gray[(y + 1) * w + (x + 1)];
            const gy =
              -gray[(y - 1) * w + (x - 1)] - 2 * gray[(y - 1) * w + x] - gray[(y - 1) * w + (x + 1)]
              + gray[(y + 1) * w + (x - 1)] + 2 * gray[(y + 1) * w + x] + gray[(y + 1) * w + (x + 1)];
            edges[y * w + x] = Math.sqrt(gx * gx + gy * gy);
          }
        }

        // Normalize edges
        let maxE = 0;
        for (let i = 0; i < edges.length; i++) if (edges[i] > maxE) maxE = edges[i];
        const scale = (255 / maxE) * edgeStrength;

        for (let i = 0; i < gray.length; i++) {
          const edgeVal = Math.min(255, edges[i] * scale);
          // Blend original gray with edge
          const blended = Math.min(255, gray[i] * (1 - edgeStrength * 0.3) + edgeVal * edgeStrength * 0.3);
          data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = blended;
        }
      }

      // Step 3: Threshold to black/white
      for (let i = 0; i < data.length; i += 4) {
        const val = data[i] > threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = val;
      }

      ctx.putImageData(imageData, 0, 0);
      setStencilImage(canvas.toDataURL('image/png'));
      setProcessing(false);
    };
    img.src = sourceImage;
  }, [sourceImage, threshold, edgeStrength]);

  const handleDownload = () => {
    if (!stencilImage) return;
    const a = document.createElement('a');
    a.href = stencilImage;
    a.download = `inkpreview-stencil-${Date.now()}.png`;
    a.click();
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <nav className="text-sm text-stone mb-8">
        <Link href="/" className="hover:text-sage">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">Stencil Generator</span>
      </nav>

      <h1 className="font-display text-4xl text-ink mb-3">Tattoo Stencil Generator</h1>
      <p className="text-stone mb-8 max-w-xl">
        Convert any design into a clean tattoo stencil outline. Upload an image and get a transfer-ready stencil in seconds.
      </p>

      {/* Upload area */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-display text-xl text-ink mb-4">1. Upload Design</h2>
          <div
            className="aspect-square bg-warm-white border-2 border-dashed border-sand rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-sage transition"
            onClick={() => fileRef.current?.click()}
          >
            {sourceImage ? (
              <img src={sourceImage} alt="Source" className="w-full h-full object-contain rounded-2xl p-4" />
            ) : (
              <>
                <svg className="w-12 h-12 text-stone/40 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-stone text-sm">Click to upload image</p>
                <p className="text-stone/60 text-xs mt-1">PNG, JPG up to 10MB</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>

        <div>
          <h2 className="font-display text-xl text-ink mb-4">2. Stencil Result</h2>
          <div className="aspect-square bg-warm-white border border-sand rounded-2xl flex flex-col items-center justify-center overflow-hidden">
            {stencilImage ? (
              <img src={stencilImage} alt="Stencil" className="w-full h-full object-contain p-4" />
            ) : (
              <div className="text-center">
                <svg className="w-12 h-12 text-stone/30 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <p className="text-stone text-sm">Stencil will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-warm-white rounded-2xl p-6 border border-sand mb-8">
        <h3 className="font-display text-lg text-ink mb-4">Adjust Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-charcoal mb-2 block">Threshold: {threshold}</label>
            <input
              type="range"
              min="60"
              max="200"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-sage"
            />
            <p className="text-xs text-stone mt-1">Lower = more detail, Higher = cleaner lines</p>
          </div>
          <div>
            <label className="text-sm text-charcoal mb-2 block">Edge Strength: {edgeStrength.toFixed(1)}</label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={edgeStrength}
              onChange={(e) => setEdgeStrength(Number(e.target.value))}
              className="w-full accent-sage"
            />
            <p className="text-xs text-stone mt-1">0 = no edge detection, 3 = strong outlines</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={generateStencil}
          disabled={!sourceImage || processing}
          className="flex-1 min-w-[200px] bg-sage text-white py-3 rounded-lg font-medium hover:bg-sage-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Processing...
            </span>
          ) : 'Generate Stencil'}
        </button>
        {stencilImage && (
          <button
            onClick={handleDownload}
            className="flex-1 min-w-[200px] bg-ink text-white py-3 rounded-lg font-medium hover:bg-charcoal transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Stencil
          </button>
        )}
      </div>

      {/* B2B CTA */}
      <div className="mt-12 bg-sage-light/30 rounded-2xl p-8 text-center">
        <h2 className="font-display text-2xl text-ink mb-3">For Tattoo Artists</h2>
        <p className="text-stone mb-6 max-w-lg mx-auto">
          Need batch processing, custom line weights, or SVG export? Our Studio plan includes advanced stencil tools designed for professional tattoo artists.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 bg-sage text-white px-6 py-3 rounded-lg font-medium hover:bg-sage-dark transition"
        >
          View Studio Plan
        </Link>
      </div>
    </section>
  );
}
