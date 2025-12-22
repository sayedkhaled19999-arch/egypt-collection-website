'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Shadow عند الاسكرول
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (path: string) =>
    `relative font-medium transition-all duration-300 ${
      pathname === path
        ? 'text-[#D90000] font-bold after:absolute after:-bottom-1 after:right-0 after:w-full after:h-[2px] after:bg-[#D90000]'
        : 'text-[#353535] hover:text-[#D90000]'
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-md'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* ===== اللوجو فقط ===== */}
        <Link href="/" className="flex items-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Image
              src="/logo.png"
              alt="المصرية للتحصيلات كولكشن"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* ===== روابط الديسكتوب ===== */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass('/')}>
            الرئيسية
          </Link>
          <Link href="/about" className={linkClass('/about')}>
            من نحن
          </Link>
          <Link href="/clients" className={linkClass('/clients')}>
            شركاؤنا
          </Link>
          <Link href="/jobs" className={linkClass('/jobs')}>
            الوظائف المتاحة
          </Link>
          <Link href="/contact" className={linkClass('/contact')}>
            تواصل معنا
          </Link>

          <Link
            href="/apply"
            className="bg-[#D90000] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#B40000] transition-all duration-300 shadow-md"
          >
            انضم إلينا
          </Link>
        </div>

        {/* ===== زر الموبايل ===== */}
        <button
          className="md:hidden text-[#353535] z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ===== قائمة الموبايل ===== */}
      <div
        className={`md:hidden fixed top-[96px] right-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6 text-right">
          <Link href="/" className={linkClass('/')} onClick={() => setIsOpen(false)}>
            الرئيسية
          </Link>
          <Link href="/about" className={linkClass('/about')} onClick={() => setIsOpen(false)}>
            من نحن
          </Link>
          <Link href="/clients" className={linkClass('/clients')} onClick={() => setIsOpen(false)}>
            شركاؤنا
          </Link>
          <Link href="/jobs" className={linkClass('/jobs')} onClick={() => setIsOpen(false)}>
            الوظائف المتاحة
          </Link>
          <Link href="/contact" className={linkClass('/contact')} onClick={() => setIsOpen(false)}>
            تواصل معنا
          </Link>

          <Link
            href="/apply"
            className="mt-4 bg-[#D90000] text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-[#B40000] transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            انضم إلينا
          </Link>
        </div>
      </div>
    </nav>
  );
}
