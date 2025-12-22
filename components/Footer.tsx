'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#353535] text-[#F4F4F4] mt-auto" dir="rtl">
      <div className="container mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row justify-between gap-8">

        {/* عن الشركة */}
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
           الشركة المصرية للتحصيلات – ECC Collections
          </h3>
          <p className="text-[#B4B4B4] leading-relaxed text-sm sm:text-base">           
           متخصصة في تقديم خدمات التحصيل والاستعلام المالي بكفاءة واحترافية.
          </p>
           <p className="text-[#B4B4B4] leading-relaxed text-sm sm:text-base">           
          تأسست الشركة عام 2002، وتهدف إلى دعم العملاء في إدارة وتحصيل مستحقاتهم المالية بشكل آمن وموثوق.
          </p>
        </div>

        {/* التواصل + السوشيال */}
        <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-10">

          {/* أيقونات السوشيال */}
          <div className="flex sm:flex-col gap-4 justify-start">
            <a
              href="https://facebook.com/your-page"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full
                         bg-[#2563EB]/20 text-[#2563EB]
                         hover:bg-[#2563EB] hover:text-white
                         transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com/company/your-company"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full
                         bg-[#0A66C2]/20 text-[#0A66C2]
                         hover:bg-[#0A66C2] hover:text-white
                         transition-all duration-300 hover:scale-110"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>

          {/* بيانات الاتصال */}
          <div className="flex flex-col gap-4 text-sm sm:text-base">
            <a
              href="mailto:Employment@collection.eg"
              className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1"
            >
              <Mail className="w-5 h-5 text-[#2563EB]" />
              Employment@collection.eg
            </a>

            <a
              href="tel:01098025745"
              className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1"
            >
              <Phone className="w-5 h-5 text-[#2563EB]" />
              01098025745
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

      {/* الشريط السفلي */}
      <div className="border-t border-[#757575] mt-6 py-3">
        <div className="container mx-auto flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center text-xs sm:text-sm text-[#B4B4B4]">

          <div dir="ltr">
            © Egyptian Collection Co 2002 - {new Date().getFullYear()}. All rights reserved.
          </div>

          <div dir="ltr">
            © Powered by Sayed Khaled
          </div>

        </div>
      </div>
    </footer>
  );
}
