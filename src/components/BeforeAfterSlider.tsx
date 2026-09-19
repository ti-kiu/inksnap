'use client';

import { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging.current) updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden cursor-col-resize select-none shadow-card"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full width, behind) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-charcoal">
        Before
      </div>
      <div className="absolute top-3 right-3 bg-sage/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
        After
      </div>
    </div>
  );
}
