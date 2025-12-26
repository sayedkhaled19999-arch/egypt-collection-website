'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
  className={`sticky top-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white/80 shadow-md py-0.5' : 'bg-white py-1'
  }`}
  dir="rtl"
>
  <div className="container mx-auto px-4 flex justify-between items-center">
    <Link href="/" className="relative w-36 h-14 md:w-44 md:h-16">
      <Image
        src="/logo.webp"
        alt="لوجو الشركة"
        fill
        className="object-contain hover:scale-105 transition-transform duration-300"
      />
    </Link>

    <div className="hidden md:flex gap-6 items-center">
      <Link href="/" className="text-[#353535] hover:text-[#2563EB] font-medium transition-all duration-300">
        الرئيسية
      </Link>
      <Link href="/about" className="text-[#353535] hover:text-[#2563EB] font-medium transition-all duration-300">
        من نحن
      </Link>
      <Link href="/partners" className="text-[#353535] hover:text-[#2563EB] font-medium transition-all duration-300">
        شركائنا
      </Link>
      <Link href="/jobs" className="text-[#353535] hover:text-[#2563EB] font-medium transition-all duration-300">
        الوظائف المتاحة
      </Link>
      <Link href="/contact" className="text-[#353535] hover:text-[#2563EB] font-medium transition-all duration-300">
        تواصل معنا
      </Link>
    </div>
    <button 
      className="md:hidden text-[#353535]" 
      onClick={() => setIsOpen(!isOpen)}
      aria-label="فتح القائمة" // 👈 ضيف السطر ده
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
    {isOpen && !isDesktop && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 z-40"></div>}

    <div
      className={`md:hidden fixed top-16 right-0 w-full bg-white z-50 px-4 py-1.5 space-y-1.5 shadow-md transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <Link href="/" className="block text-[#353535] hover:text-[#2563EB]" onClick={() => setIsOpen(false)}>
        الرئيسية
      </Link>
      <Link href="/about" className="block text-[#353535] hover:text-[#2563EB]" onClick={() => setIsOpen(false)}>
        من نحن
      </Link>
      <Link href="/partners" className="block text-[#353535] hover:text-[#2563EB]" onClick={() => setIsOpen(false)}>
        شركائنا
      </Link>
      <Link href="/jobs" className="block text-[#353535] hover:text-[#2563EB]" onClick={() => setIsOpen(false)}>
        الوظائف المتاحة
      </Link>
      <Link href="/contact" className="block text-[#353535] hover:text-[#2563EB]" onClick={() => setIsOpen(false)}>
        تواصل معنا
      </Link>
    </div>
  </div>
</nav>
  );
}
