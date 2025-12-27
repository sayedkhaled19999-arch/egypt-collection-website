'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // قللنا الوقت شوية عشان اليوزر ميزهقش، وخليناه ثابت عشان الأداء
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader يظهر فوق المحتوى بـ z-index عالي */}
      {loading && (
        <div className="fixed inset-0 z-[9999]"> {/* ضمنا إنه فوق كل حاجة */}
             <Preloader />
        </div>
      )}

      {/* 🔥 التعديل هنا: شلنا كلاسات الإخفاء (opacity-0) */}
      {/* المحتوى موجود دايماً في الـ DOM، فجوجل هيشوف صورة الـ Hero فوراً حتى واللوادر شغال */}
      <div className="relative z-0"> 
        {children}
      </div>
    </>
  );
}