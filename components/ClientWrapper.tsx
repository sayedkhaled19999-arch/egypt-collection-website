'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preloader يظهر 1.5 إلى 2.5 ثانية بشكل عشوائي
    const timer = setTimeout(() => setLoading(false), 1500 + Math.random() * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader يظهر فوق المحتوى */}
      {loading && <Preloader />}

      {/* المحتوى موجود دائمًا في DOM مع تأثير fade-in */}
      <div
        className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </div>
    </>
  );
}
