'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  onFinish?: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let start = Date.now();
    const duration = 1500 + Math.random() * 1000; // محاكاة سرعة الشبكة
    const animate = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.floor(pct));
      if (pct < 100) requestAnimationFrame(animate);
      else {
        setFadeOut(true);
        if (onFinish) setTimeout(onFinish, 700);
      }
    };
    requestAnimationFrame(animate);
  }, [onFinish]);

  return (
    <div
      aria-hidden="true" // مهم للـ SEO
      className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-white transition-opacity duration-700 pointer-events-none ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* شعار الشركة */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 animate-pulse">
        <Image
          src="/logo.webp"
          alt="الشركة المصرية للتحصيلات – ECC Collections"
          fill
          className="object-contain"
          priority // تحميل سريع للصورة → تحسين LCP
        />
      </div>

      {/* الدائرة المتحركة */}
      <div className="w-16 h-16 relative">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#2563EB"
            strokeWidth="10"
            fill="none"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(2 * Math.PI * 45 * (100 - progress)) / 100}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-[#2563EB] mt-4 font-bold text-lg">{progress}%</p>
    </div>
  );
}
