'use client';

import { useEffect } from 'react';

/**
 * Injects "Preview on my body" buttons into PSEO gallery cards.
 * Each card links to /tattoo-ideas/<slug>, we add a second link
 * that opens the simulator with the card's image pre-loaded.
 */
export default function PseoPreviewButtons() {
  useEffect(() => {
    // Find all gallery cards with images
    const cards = document.querySelectorAll('.pseo-wrap .card');
    cards.forEach((card) => {
      // Skip if button already added
      if (card.querySelector('.pseo-preview-btn')) return;

      const img = card.querySelector('img');
      const href = card.getAttribute('href');
      if (!img || !href) return;

      // Extract the image src for the simulator
      const imgSrc = img.getAttribute('src');
      if (!imgSrc) return;

      // Create preview button
      const btn = document.createElement('a');
      btn.className = 'pseo-preview-btn';
      btn.href = `/tattoo-simulator?design=${encodeURIComponent(imgSrc)}`;
      btn.textContent = 'Preview on my body';
      btn.style.cssText = `
        display: block;
        text-align: center;
        padding: 8px 12px;
        margin: 8px 12px 12px;
        background: var(--sage, #8FA68B);
        color: white;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        transition: background 0.15s;
      `;
      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'var(--sage-dark, #5C7A57)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'var(--sage, #8FA68B)';
      });

      // Prevent card click when clicking button
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      card.appendChild(btn);
    });
  }, []);

  return null;
}
