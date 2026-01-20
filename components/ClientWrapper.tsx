// --- START OF FILE components/ClientWrapper.tsx ---

'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';
// تم حذف DynamicTitle لأنه لم يعد مطلوباً في النظام الجديد

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // منع السكرول أثناء التحميل
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setLoading(false);
      // إعادة السكرول
      document.body.style.overflow = 'unset';
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* شيلنا DynamicTitle من هنا خلاص */}

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