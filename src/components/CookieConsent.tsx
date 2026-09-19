'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone/20 p-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-stone text-sm leading-relaxed">
          We use essential cookies for site functionality and Cloudflare Web Analytics (privacy-friendly, no PII). 
          By continuing, you agree to our{' '}
          <a href="/privacy" className="text-sage underline">Privacy Policy</a> and{' '}
          <a href="/cookie-policy" className="text-sage underline">Cookie Policy</a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm border border-stone/30 rounded-md text-stone hover:bg-stone/5 transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-sage text-white rounded-md hover:bg-sage-dark transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
