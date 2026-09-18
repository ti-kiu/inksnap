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
  const [style, setStyle] = useState('Blackwork');
  const [placement, setPlacement] = useState('Auto-detect');
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tattoo overlay state
  const [overlayPos, setOverlayPos] = useState({ x: 50, y: 50 });
  const [overlaySize, setOverlaySize] = useState(200);
  const [overlayOpacity, setOverlayOpacity] = useState(0.90); // Tattoo ink transparency
  const [blendMode, setBlendMode] = useState<string>('multiply'); // Multiply = white disappears
  const [overlayBlur, setOverlayBlur] = useState(0.8); // Slightly more blur for skin integration
  const [overlayRotation, setOverlayRotation] = useState(0); // Rotation angle
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle photo upload
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  // Whitewash near-background pixels to pure white for clean multiply
  // Threshold: pixels with R,G,B all > 210 become pure white
  const whitewashImage = useCallback((imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(imageUrl); return; }
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const whiteThreshold = 210; // Lower = more aggressive whitewash
        const lightenThreshold = 230; // Transition zone
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i+1], b = data[i+2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          
          // Force pure white for near-white pixels
          if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold && saturation < 0.15) {
            data[i] = 255;
            data[i+1] = 255;
            data[i+2] = 255;
          }
          // Lighten transition zone
          else if (r > lightenThreshold && g > lightenThreshold && b > lightenThreshold && saturation < 0.15) {
            const factor = 0.7;
            data[i] = Math.min(255, r + (255 - r) * factor);
            data[i+1] = Math.min(255, g + (255 - g) * factor);
            data[i+2] = Math.min(255, b + (255 - b) * factor);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(imageUrl);
      img.src = imageUrl;
    });
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
        // Force near-white background to pure white for clean multiply blending
        const processed = await whitewashImage(result.imageUrl);
        setResultUrl(processed);
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

  // Drag handlers for tattoo overlay
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - overlayPos.x, y: e.clientY - overlayPos.y });
  }, [overlayPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setOverlayPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll to resize overlay
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setOverlaySize(prev => Math.max(50, Math.min(400, prev - e.deltaY * 0.5)));
  }, []);

  // Get CSS blend mode and filter for realistic skin effect
  const getOverlayStyle = useCallback((): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      left: overlayPos.x,
      top: overlayPos.y,
      width: overlaySize,
      height: overlaySize,
      opacity: overlayOpacity,
      transform: `rotate(${overlayRotation}deg)`,
    };

    switch (blendMode) {
      case 'skin':
        // Skin mode: multiply with lower opacity and slight blur for realism
        return {
          ...baseStyle,
          mixBlendMode: 'multiply',
          filter: `blur(${overlayBlur}px) contrast(0.9) brightness(1.05)`,
        };
      case 'multiply':
        return {
          ...baseStyle,
          mixBlendMode: 'multiply',
          filter: `blur(${overlayBlur}px) saturate(0.82) contrast(1.05)`,
        };
      case 'overlay':
        return {
          ...baseStyle,
          mixBlendMode: 'overlay',
          filter: `blur(${overlayBlur}px)`,
        };
      case 'screen':
        return {
          ...baseStyle,
          mixBlendMode: 'screen',
          filter: `blur(${overlayBlur}px)`,
        };
      case 'normal':
      default:
        return {
          ...baseStyle,
          filter: `blur(${overlayBlur}px)`,
        };
    }
  }, [overlayPos, overlaySize, overlayOpacity, blendMode, overlayBlur, overlayRotation]);

  // Download composite image with realistic skin effect
  const handleDownload = useCallback(() => {
    if (!uploadPreview || !resultUrl) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bg = new Image();
    bg.crossOrigin = 'anonymous';
    bg.onload = () => {
      canvas.width = bg.naturalWidth;
      canvas.height = bg.naturalHeight;
      ctx.drawImage(bg, 0, 0);

      const overlay = new Image();
      overlay.crossOrigin = 'anonymous';
      overlay.onload = () => {
        // Calculate overlay position relative to actual image size
        const containerEl = containerRef.current;
        const displayImg = containerEl?.querySelector('img');
        if (!displayImg) return;
        const scaleX = bg.naturalWidth / displayImg.clientWidth;
        const scaleY = bg.naturalHeight / displayImg.clientHeight;
        const x = overlayPos.x * scaleX;
        const y = overlayPos.y * scaleY;
        const w = overlaySize * scaleX;
        const h = overlaySize * scaleY;

        // Apply realistic skin blending
        ctx.save();
        
        // Set blend mode
        if (blendMode === 'skin' || blendMode === 'multiply') {
          ctx.globalCompositeOperation = 'multiply';
        } else if (blendMode === 'overlay') {
          ctx.globalCompositeOperation = 'overlay';
        } else if (blendMode === 'screen') {
          ctx.globalCompositeOperation = 'screen';
        }
        
        ctx.globalAlpha = overlayOpacity;
        
        // Apply rotation
        if (overlayRotation !== 0) {
          ctx.translate(x + w/2, y + h/2);
          ctx.rotate(overlayRotation * Math.PI / 180);
          ctx.drawImage(overlay, -w/2, -h/2, w, h);
        } else {
          ctx.drawImage(overlay, x, y, w, h);
        }
        
        ctx.restore();

        // Add subtle skin texture overlay for realism
        if (blendMode === 'skin') {
          ctx.save();
          ctx.globalCompositeOperation = 'soft-light';
          ctx.globalAlpha = 0.1;
          // Create subtle noise texture
          const imageData = ctx.getImageData(x, y, w, h);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 20;
            data[i] += noise;     // R
            data[i+1] += noise;   // G
            data[i+2] += noise;   // B
          }
          ctx.putImageData(imageData, x, y);
          ctx.restore();
        }

        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `inkpreview-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      overlay.src = resultUrl;
    };
    bg.src = uploadPreview;
  }, [uploadPreview, resultUrl, overlayPos, overlaySize, overlayOpacity, blendMode, overlayRotation]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - overlayPos.x, y: touch.clientY - overlayPos.y });
  }, [overlayPos]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setOverlayPos({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const usagePercent = usage ? ((usage.limit - usage.used) / usage.limit) * 100 : 100;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        {/* MAIN PREVIEW AREA */}
        <div className="space-y-6">
          {/* Upload Zone / Preview with Overlay */}
          <div
            ref={containerRef}
            className="bg-warm-white rounded-xl border-2 border-dashed border-sand hover:border-sage transition-colors cursor-pointer p-8 md:p-16 text-center relative overflow-hidden"
            onClick={() => !uploadPreview && fileInputRef.current?.click()}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {uploadPreview ? (
              <div className="relative inline-block">
                <img src={uploadPreview} alt="Your photo" className="max-h-96 mx-auto rounded-lg select-none" draggable={false} />
                {/* Tattoo Overlay */}
                {resultUrl && (
                  <div
                    className="absolute cursor-move select-none"
                    style={getOverlayStyle()}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => setIsDragging(false)}
                  >
                    <img
                      src={resultUrl}
                      alt="Tattoo overlay"
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  </div>
                )}
                {/* Controls hint */}
                {resultUrl && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                    Drag to move · Scroll to resize · Use controls for skin effect
                  </div>
                )}
              </div>
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

          {/* Generated Design (standalone) */}
          {resultUrl && !uploadPreview && (
            <div className="bg-warm-white rounded-xl p-6 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-4">Your Preview</h3>
              <img src={resultUrl} alt="AI generated tattoo preview" className="w-full rounded-lg" />
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
              {['Blackwork', 'Black & Grey', 'Traditional', 'Japanese', 'Geometric', 'Minimalist', 'Watercolor', 'Realism'].map(
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

          {/* Overlay Controls (when tattoo is generated and photo uploaded) */}
          {resultUrl && uploadPreview && (
            <div className="bg-warm-white rounded-xl p-5 shadow-soft">
              <h3 className="font-display text-lg text-ink mb-3">Adjust Overlay</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-charcoal flex justify-between mb-1">
                    <span>Blend Mode</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'skin', label: '🎨 Skin (Best)' },
                      { value: 'multiply', label: 'Multiply' },
                      { value: 'overlay', label: 'Overlay' },
                      { value: 'normal', label: 'Normal' },
                    ].map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setBlendMode(m.value)}
                        className={`text-xs rounded-md py-1.5 transition ${
                          blendMode === m.value
                            ? 'bg-sage text-white'
                            : 'bg-cream text-stone hover:bg-sage-light'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-charcoal flex justify-between mb-1">
                    <span>Opacity</span>
                    <span className="text-stone">{Math.round(overlayOpacity * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                    className="w-full accent-sage"
                  />
                </div>
                <div>
                  <label className="text-sm text-charcoal flex justify-between mb-1">
                    <span>Edge Blur</span>
                    <span className="text-stone">{overlayBlur.toFixed(1)}px</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.5"
                    value={overlayBlur}
                    onChange={(e) => setOverlayBlur(parseFloat(e.target.value))}
                    className="w-full accent-sage"
                  />
                </div>
                <div>
                  <label className="text-sm text-charcoal flex justify-between mb-1">
                    <span>Rotation</span>
                    <span className="text-stone">{overlayRotation}°</span>
                  </label>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    step="5"
                    value={overlayRotation}
                    onChange={(e) => setOverlayRotation(parseInt(e.target.value))}
                    className="w-full accent-sage"
                  />
                </div>
                <div>
                  <label className="text-sm text-charcoal flex justify-between mb-1">
                    <span>Size</span>
                    <span className="text-stone">{overlaySize}px</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="400"
                    step="10"
                    value={overlaySize}
                    onChange={(e) => setOverlaySize(parseInt(e.target.value))}
                    className="w-full accent-sage"
                  />
                </div>
                <button
                  onClick={() => {
                    setOverlayPos({ x: 50, y: 50 });
                    setOverlayRotation(0);
                    setOverlayBlur(0.5);
                    setOverlayOpacity(0.75);
                  }}
                  className="w-full text-sm text-sage border border-sage rounded-md py-1.5 hover:bg-sage-light transition"
                >
                  Reset All
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full text-sm text-white bg-sage rounded-md py-2 hover:bg-sage-dark transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Preview
                </button>
              </div>
            </div>
          )}

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
              for 300 images/month.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
