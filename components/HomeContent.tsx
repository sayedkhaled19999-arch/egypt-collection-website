'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserCheck, CheckCircle, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HomeContent() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#F4F4F4] text-[#353535]" dir="rtl">
      {/* Hero */}
      <section className="relative bg-[#2563EB] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">مرحباً بك في المصرية للتحصيلات كولكشن</h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">نحن نبني المستقبل معاً من خلال الابتكار والتميز في تقديم الحلول</p>
          <div className="flex justify-center">
            <Link href="/jobs" className="inline-block bg-white text-[#2563EB] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#B4CFFF] transition-colors shadow-lg">استكشف الوظائف المتاحة</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">نبذة عن الشركة</h2>
            <p className="text-[#757575] text-lg leading-relaxed mb-6">تأسست شركتنا على مبادئ التميز والابتكار والالتزام بتقديم أفضل الخدمات لعملائنا.</p>
            <p className="text-[#757575] text-lg leading-relaxed mb-6">لدينا فريق متميز من المحترفين لتحقيق رؤيتنا في أن نكون الشركة الرائدة.</p>
          </div>
          <div data-aos="fade-left" className="flex justify-center">
            <div className="relative w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-2xl bg-[#B4B4B4]">
              <Image src="/ceo.png" alt="رئيس الشركة" fill className="object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-up">شركاؤنا</h2>
          {/* شعارات العملاء */}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[{icon:UserCheck, title:'حسن المظهر', desc:'نهتم بمظهرنا وصورتنا أمام العملاء'},
            {icon:CheckCircle, title:'الالتزام', desc:'نلتزم بوعودنا ومعايير الجودة'},
            {icon:ShieldCheck, title:'الأمانة', desc:'نضع الأمانة كقيمة أساسية'}].map((val, i) => (
            <div key={i} className="text-center p-6" data-aos="fade-up" data-aos-delay={i*200}>
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <val.icon className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{val.title}</h3>
              <p className="text-[#757575] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 bg-[#F4F4F4] text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">هل أنت مستعد للانضمام إلينا؟</h2>
        <p className="text-xl text-[#757575] mb-8 max-w-2xl mx-auto leading-relaxed">نحن دائماً نبحث عن مواهب جديدة. اطلع على الفرص المتاحة وابدأ رحلتك المهنية معنا.</p>
        <Link href="/jobs" className="inline-block bg-[#2563EB] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#1D4ED8] transition-colors shadow-lg">قدّم على وظيفة</Link>
      </section>
    </div>
  );
}
