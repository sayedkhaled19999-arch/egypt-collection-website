'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. منع السكرول
    document.body.style.overflow = 'hidden';

    // 2. التايمر (تقدر تزوده لـ 1500 لو عايز اللوجو يلحق يبان)
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'unset';
    }, 1500); // خليتها 1.5 ثانية عشان تلحق تشوف اللوجو

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div 
        className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-700 ease-in-out ${
          loading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <Preloader />
      </div>

      <div className="relative z-0">
        {children}
      </div>
    </>
  );
}