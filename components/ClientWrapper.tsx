'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 التعديل هنا: قللنا الوقت من 2000 لـ 800 مللي ثانية بس
    // ده وقت كافي لظهور اللوجو، وفي نفس الوقت مبيقتلش الـ LCP Score
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999]">
             <Preloader />
        </div>
      )}

      {/* المحتوى موجود والـ Opacity كاملة عشان جوجل يشوفه ورا اللوادر */}
      <div className="relative z-0">
        {children}
      </div>
    </>
  );
}