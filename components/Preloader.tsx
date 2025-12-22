'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  onFinish: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onFinish, 800); // fade-out duration
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-white transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* اللوجو مع حركة خفيفة */}
      <div className="relative w-40 h-40 md:w-60 md:h-60 mb-8 animate-pulse scale-95 hover:scale-100 transition-transform duration-700">
        <Image
          src="/logo.png"
          alt="المصرية للتحصيلات كولكشن"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Progress دائري */}
      <div className="w-16 h-16 relative">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
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
