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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg py-2' : 'shadow-md py-3'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* اللوجو */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-32 h-16 md:w-40 md:h-20">
            <Image
              src="/logo.png"
              alt="لوجو الشركة"
              fill
              className="object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        {/* روابط الديسكتوب */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-[#2563EB] font-medium transition-all duration-300">
            الرئيسية
          </Link>
          <Link href="/about" className="hover:text-[#2563EB] font-medium transition-all duration-300">
            من نحن
          </Link>
          <Link href="/partners" className="hover:text-[#2563EB] font-medium transition-all duration-300">
            شركاؤنا
          </Link>
          <Link href="/jobs" className="hover:text-[#2563EB] font-medium transition-all duration-300">
            الوظائف المتاحة
          </Link>
          <Link href="/contact" className="hover:text-[#2563EB] font-medium transition-all duration-300">
            تواصل معنا
          </Link>
        </div>

        {/* زر القائمة للموبايل */}
        <button
          className="md:hidden text-[#353535] focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* قائمة الموبايل */}
        {isOpen && !isDesktop && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
          ></div>
        )}
        <div
          className={`md:hidden bg-white shadow-md px-4 py-3 space-y-3 overflow-hidden fixed top-16 right-0 w-full transition-all duration-300 z-50 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {['/', '/about', '/partners', '/jobs', '/contact'].map((link, idx) => (
            <Link
              key={idx}
              href={link}
              className="block text-[#353535] hover:text-[#2563EB] font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {['الرئيسية', 'من نحن', 'شركاؤنا', 'الوظائف المتاحة', 'تواصل معنا'][idx]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
