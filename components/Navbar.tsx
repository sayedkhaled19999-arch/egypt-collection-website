'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // نكتشف حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // نضيف ظل عند الـ scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-md'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* اللوجو واسم الشركة */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="لوجو الشركة"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-[#353535] font-bold text-lg md:text-xl whitespace-nowrap">
            المصرية للتحصيلات كولكشن
          </span>
        </Link>

        {/* روابط الديسكتوب */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            className="text-[#353535] hover:text-[#D90000] font-medium transition-all duration-300 hover:scale-105"
          >
            الرئيسية
          </Link>
          <Link
            href="/jobs"
            className="text-[#353535] hover:text-[#D90000] font-medium transition-all duration-300 hover:scale-105"
          >
            الوظائف
          </Link>
          <Link
            href="/apply"
            className="bg-[#D90000] text-white px-6 py-2 rounded-lg hover:bg-[#B40000] transition-all duration-300 hover:scale-105 font-medium shadow-sm"
          >
            قدّم الآن
          </Link>
        </div>

        {/* زر القائمة للموبايل */}
        <button
          className="md:hidden text-[#353535] focus:outline-none z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Backdrop عند فتح القائمة على الموبايل */}
        {isOpen && !isDesktop && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
          ></div>
        )}

        {/* قائمة الموبايل RTL */}
        <div
          className={`md:hidden bg-white shadow-md px-4 py-3 space-y-3 overflow-hidden fixed top-16 right-0 w-full transition-all duration-300 z-50 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <Link
            href="/"
            className="block text-[#353535] hover:text-[#D90000] font-medium transition-all duration-300 hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            الرئيسية
          </Link>
          <Link
            href="/jobs"
            className="block text-[#353535] hover:text-[#D90000] font-medium transition-all duration-300 hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            الوظائف
          </Link>
          <Link
            href="/apply"
            className="block bg-[#D90000] text-white px-6 py-2 rounded-lg hover:bg-[#B40000] transition-all duration-300 hover:scale-105 font-medium shadow-sm text-center"
            onClick={() => setIsOpen(false)}
          >
            قدّم الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
