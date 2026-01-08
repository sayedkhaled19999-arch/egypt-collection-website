'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#353535] text-[#F4F4F4] mt-auto" dir="rtl">
      {/* 
         تم تقليل الـ padding الرأسي:
         كان py-6 md:py-8 
         بقى py-4 md:py-6 (عشان الارتفاع يقل)
      */}
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between gap-6 md:gap-8">

        {/* عن الشركة - النص ثابت كما هو */}
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
           الشركة المصرية للتحصيلات (ECC)
          </h3>
          <p className="text-[#B4B4B4] leading-relaxed text-sm sm:text-base">           
           متخصصة في تقديم خدمات التحصيل والاستعلام المالي بكفاءة واحترافية.
          </p>
           <p className="text-[#B4B4B4] leading-relaxed text-sm sm:text-base mt-1">           
          تأسست الشركة عام 2001، وتهدف إلى دعم العملاء في إدارة وتحصيل مستحقاتهم المالية بشكل آمن وموثوق.
          </p>
        </div>

        {/* التواصل + السوشيال */}
        <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-10">

          {/* أيقونات السوشيال (تم حذف لينكد إن + توسيط الفيسبوك) */}
          {/* justify-center: بتخلي الأيقونة في النص سواء موبايل أو ديسكتوب */}
          <div className="flex sm:flex-col gap-4 justify-center items-center sm:items-start">
            <a
              href="https://www.facebook.com/EgyptCollectionsCo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="صفحتنا على فيسبوك"
              className="w-11 h-11 flex items-center justify-center rounded-full
                         bg-[#2563EB]/20 text-[#2563EB]
                         hover:bg-[#2563EB] hover:text-white
                         transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
          </div>

          {/* بيانات الاتصال */}
          <div className="flex flex-col gap-3 text-sm sm:text-base justify-center">
            <a
              href="mailto:Info@egyptcollections.com"
              className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1"
            >
              <Mail className="w-5 h-5 text-[#2563EB]" />
              Info@egyptcollections.com
            </a>

            <a
              href="tel:+201110600280"
              className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1"
            >
              <Phone className="w-5 h-5 text-[#2563EB]" />
              01110600280
            </a>

            <a
              href="https://maps.app.goo.gl/isDfvMUx5uzJSqzC9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1"
            >
              <MapPin className="w-5 h-5 text-[#2563EB]" />
              30 ش هارون، ميدان المساحة، الدقي
            </a>
          </div>
        </div>
      </div>

      {/* الشريط السفلي - تم تقليل المسافات */}
      <div className="border-t border-[#757575] mt-4 py-3">
        <div className="container mx-auto flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center text-xs sm:text-sm text-[#B4B4B4]">

          <div dir="ltr">
            © Egyptian Collections Co. 2001 - {new Date().getFullYear()}. All rights reserved.
          </div>

          <div dir="ltr" className="flex items-center gap-1">
            © Powered by 
            <a 
              href="https://www.facebook.com/sayed.khaled.872726"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              Sayed Khaled
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}