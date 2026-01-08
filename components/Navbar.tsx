'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation'; // 1. استيراد عشان نعرف احنا في انهي صفحة

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 2. هوك لمعرفة المسار الحالي
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

  // 3. مصفوفة الروابط (عشان منكررش الكود ونقدر نتحكم في الستايل بسهولة)
  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'شركاء النجاح', href: '/Customers' }, // عدلنا الاسم والرابط لحروف صغيرة
    { name: 'الوظائف المتاحة', href: '/jobs' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-1' // ضفنا backdrop-blur لتأثير الزجاج
          : 'bg-white py-2'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* اللوجو */}
        <Link href="/" className="relative w-32 h-12 md:w-40 md:h-14">
          <Image
            src="/logo.webp"
            // تحسين الـ alt عشان الـ SEO
            alt="شعار الشركة المصرية للتحصيلات ECC"
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
            priority // عشان اللوجو يحمل بسرعة لأنه في أول الشاشة
          />
        </Link>

        {/* روابط الديسكتوب */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm lg:text-base font-medium transition-all duration-300 relative
                ${pathname === link.href ? 'text-[#2563EB] font-bold' : 'text-[#353535] hover:text-[#2563EB]'}
              `}
            >
              {link.name}
              {/* خط صغير تحت الرابط النشط (لمسة جمالية) */}
              {pathname === link.href && (
                <span className="absolute -bottom-1 right-0 w-full h-0.5 bg-[#2563EB] rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* زر الموبايل */}
        <button 
          className="md:hidden text-[#353535] hover:text-[#2563EB] transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "غلق القائمة" : "فتح القائمة"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* الخلفية المعتمة للموبايل (Backdrop) */}
        {isOpen && !isDesktop && (
          <div 
            onClick={() => setIsOpen(false)} 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          ></div>
        )}

        {/* قائمة الموبايل */}
        <div
          className={`md:hidden fixed top-[60px] right-0 w-full bg-white z-50 shadow-lg transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 py-4 border-t' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className="flex flex-col px-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block px-2 py-2 rounded-md transition-colors ${
                  pathname === link.href 
                    ? 'bg-[#2563EB]/10 text-[#2563EB] font-bold' // تمييز الصفحة الحالية في الموبايل
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