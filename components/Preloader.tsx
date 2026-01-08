'use client';
import Image from 'next/image';

export default function Preloader() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* اللوجو مع أنيميشن نبض */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 animate-pulse">
        <Image 
          src="/logo.webp" // تأكد ان المسار صح
          alt="ECC Logo" 
          fill 
          className="object-contain" 
          priority 
        />
      </div>
      
      {/* دائرة التحميل */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#2563EB] rounded-full animate-spin"></div>
    </div>
  );
}