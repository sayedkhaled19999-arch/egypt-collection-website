'use client';

import { useState, useEffect } from 'react';

interface CookieConsentProps {
  dict: any;
}

export default function CookieConsent({ dict }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [consented, setConsented] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) {
      setConsented(false);
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    setTimeout(() => setConsented(true), 500);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
    setTimeout(() => setConsented(true), 500);
  };

  if (consented) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-4 md:py-3 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-center md:text-left leading-relaxed">
            {dict.desc}
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleAccept}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm rounded-lg transition-colors font-medium"
            >
              {dict.accept_btn}
            </button>
            <button
              onClick={handleDecline}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
              {dict.decline_btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
