'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ensureAuth, getUsage, generate } from '@/lib/api';

interface Usage {
  tier: string;
  limit: number;
  used: number;
  remaining: number;
}

export default function SimulatorTool() {
  const [token, setToken] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Traditional');
  const [placement, setPlacement] = useState('Auto-detect');
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize auth + usage on mount
  useEffect(() => {
    (async () => {
      try {
        const t = await ensureAuth();
        setToken(t);
        const u = await getUsage(t);
        setUsage(u);
      } catch (e) {
        console.error('Auth/usage failed:', e);
      }
    })();
  }, []);

  // Handle photo upload (preview only for now)
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  // Handle generate
  const handleGenerate = useCallback(async () => {
    if (!token || !prompt.trim()) return;
    if (usage && usage.remaining <= 0) {
      setError('You\'ve used all free previews today. Upgrade to Pro for more.');
      return;
    }

    setGenerating(true);
    setError(null);
    setResultUrl(null);

    try {
      const fullPrompt = placement !== 'Auto-detect'
        ? `${prompt}, on ${placement.toLowerCase()}`
        : prompt;

      const result = await generate(token, {
        prompt: fullPrompt,
        style: style.toLowerCase(),
        type: 'design',
      });

      if (result.imageUrl.startsWith('https://')) {
        setResultUrl(result.imageUrl);
      } else {
        setResultUrl(null);
      }

      // Refresh usage
      const u = await getUsage(token);
      setUsage(u);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }, [token, prompt, style, placement, usage]);

  const usagePercent = usage ? ((usage.limit - usage.used) / usage.limit) * 100 : 100;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        {/* MAIN PREVIEW AREA */}
        <div className="space-y-6">
          {/* Upload Zone */}
          <div
            className="bg-warm-white rounded-xl border-2 border-dashed border-sand hover:border-sage transition-colors cursor-pointer p-8 md:p-16 text-center relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {uploadPreview ? (
              <img src={uploadPreview} alt="Your photo" className="max-h-96 mx-auto rounded-lg" />
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
                  <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">Drop your photo here</h3>
                <p className="text-stone text-sm mb-2">Drag and drop or click to upload. JPG, PNG, HEIC up to 10MB.</p>
                <p className="text-xs text-terracotta font-medium">Avoid including your face for privacy.</p>
              </>
            )}
          </div>

          {/* Generated Result */}
          {resultUrl && (
            <div className="bg-warm-white rounded-xl p-6 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-4">Your Preview</h3>
              <img src={resultUrl} alt="AI generated tattoo preview" className="w-full rounded-lg" />
              <p className="text-xs text-stone mt-3">
                AI-generated reference. Consult a professional tattoo artist before inking.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-terracotta-light/40 rounded-lg p-4">
              <p className="text-sm text-terracotta">{error}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-terracotta-light/40 rounded-lg p-4 flex gap-3">
            <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-xs text-terracotta leading-relaxed">
              <strong>AI-generated reference.</strong> Consult a professional tattoo artist before
              inking. AI previews are approximations. Actual results depend on your artist&apos;s
              technique, ink, skin type, and placement.
            </p>
          </div>
        </div>

        {/* SIDEBAR CONTROLS */}
        <aside className="space-y-6">
          {/* Style Selection */}
          <div className="bg-warm-white rounded-xl p-5 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-4">Choose a style</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Traditional', 'Japanese', 'Geometric', 'Minimalist', 'Watercolor', 'Realism'].map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`rounded-lg p-3 text-center transition ${
                      style === s
                        ? 'bg-sage text-white'
                        : 'bg-cream hover:bg-sage-light'
                    }`}
                  >
                    <span className={`text-xs ${style === s ? 'text-white' : 'text-stone'}`}>{s}</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Describe Your Tattoo */}
          <div className="bg-warm-white rounded-xl p-5 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-3">Describe your tattoo</h3>
            <textarea
              className="w-full px-3 py-2.5 border border-sand rounded-md bg-cream text-charcoal text-sm placeholder-stone focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent resize-none"
              rows={3}
              placeholder="e.g. A small wolf howling at the moon, fine line style"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim() || !token}
              className="w-full mt-3 inline-flex items-center justify-center px-4 py-2.5 bg-sage text-white rounded-md text-sm font-medium hover:bg-sage-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Preview'
              )}
            </button>
          </div>

          {/* Placement */}
          <div className="bg-warm-white rounded-xl p-5 shadow-soft">
            <h3 className="font-display text-lg text-ink mb-3">Placement</h3>
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className="w-full px-3 py-2.5 border border-sand rounded-md bg-cream text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
            >
              <option>Auto-detect</option>
              <option>Upper arm</option>
              <option>Forearm</option>
              <option>Shoulder</option>
              <option>Back</option>
              <option>Chest</option>
              <option>Leg</option>
              <option>Ankle</option>
              <option>Wrist</option>
              <option>Neck</option>
            </select>
          </div>

          {/* Usage */}
          <div className="bg-sage-light/30 rounded-xl p-5 border border-sage-light">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-charcoal font-medium">Free uses remaining</span>
              <span className="badge">
                {usage ? `${usage.remaining} / ${usage.limit}` : '...'}
              </span>
            </div>
            <div className="w-full bg-sand rounded-full h-2">
              <div
                className="bg-sage h-2 rounded-full transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-xs text-stone mt-2">
              Need more?{' '}
              <Link href="/pricing" className="text-sage-dark underline">
                Upgrade to Pro
              </Link>{' '}
              for 100 images/month.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
