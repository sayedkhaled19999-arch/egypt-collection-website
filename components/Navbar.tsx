// --- START OF FILE components/Navbar.tsx ---
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  lang: string;
  dict: any; // قاموس الترجمة اللي جي من السيرفر
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  // دالة ذكية لحساب رابط تغيير اللغة
  // لو أنا في /ar/about وعايز احول انجليزي، هتوديني /en/about
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale; // استبدال ar بـ en أو العكس
    return segments.join('/');
  };

  const navLinks = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.about, href: `/${lang}/about` },
    { name: dict.partners, href: `/${lang}/partners` },
    { name: dict.jobs, href: `/${lang}/jobs` },
    { name: dict.contact, href: `/${lang}/contact` },
  ];

  // دالة لفحص الرابط النشط بدقة
  const isActive = (href: string) => {
    // الصفحة الرئيسية حالة خاصة
    if (href === `/${lang}` && pathname === `/${lang}`) return true;
    // باقي الصفحات
    return href !== `/${lang}` && pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-1' : 'bg-white py-2'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* اللوجو */}
        <Link href={`/${lang}`} className="relative w-32 h-12 md:w-40 md:h-14">
          <Image
            src="/logo.webp"
            alt={lang === 'ar' ? "شعار الشركة المصرية للتحصيلات ECC" : "ECC Logo"}
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* روابط الديسكتوب + زر اللغة */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm lg:text-base font-medium transition-all duration-300 relative
                ${isActive(link.href) ? 'text-[#2563EB] font-bold' : 'text-[#353535] hover:text-[#2563EB]'}
              `}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-[#2563EB] rounded-full"></span>
              )}
            </Link>
          ))}
          
          {/* زر تغيير اللغة (بدون context) */}
          <div className="mr-2 border-r pr-2 border-gray-300">
             <Link
                href={redirectedPathName(lang === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all text-sm font-bold"
                aria-label="Switch Language"
             >
                <Globe size={16} />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
             </Link>
          </div>
        </div>

        {/* زر الموبايل */}
        <div className="flex items-center gap-3 md:hidden">
            {/* زر اللغة في الموبايل */}
            <Link
                href={redirectedPathName(lang === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1 px-2 py-1 rounded border border-[#2563EB] text-[#2563EB] text-xs font-bold"
             >
                <span>{lang === 'ar' ? 'EN' : 'ع'}</span>
             </Link>

            <button 
              className="text-[#353535] hover:text-[#2563EB] transition-colors" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {/* Backdrop */}
        {isOpen && !isDesktop && (
          <div 
            onClick={() => setIsOpen(false)} 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          ></div>
        )}

        {/* قائمة الموبايل */}
        <div
          className={`md:hidden fixed top-[60px] w-full bg-white z-50 shadow-lg transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 py-4 border-t right-0' : 'max-h-0 opacity-0 py-0 right-0'
          }`}
        >
          <div className="flex flex-col px-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block px-2 py-2 rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#2563EB]/10 text-[#2563EB] font-bold'
                    : 'text-[#353535] hover:bg-gray-50 hover:text-[#2563EB]'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}