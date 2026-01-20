// --- START OF FILE components/Footer.tsx ---
'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';

interface FooterProps {
  lang: string;
  dict: any; // قاموس الترجمة
}

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="bg-[#353535] text-[#F4F4F4] mt-auto">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row justify-between gap-6 md:gap-8">

        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
           {dict.about_title}
          </h3>
          <p className="text-[#B4B4B4] leading-relaxed text-sm sm:text-base">           
           {dict.about_desc1}
          </p>
           <p className="text-[#B4B4B4] leading-relaxed text-sm sm:text-base mt-1">           
          {dict.about_desc2}
          </p>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="flex sm:flex-col gap-4 justify-center items-center sm:items-start">
            <a
              href="https://www.facebook.com/egyptcollectionsco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="w-11 h-11 flex items-center justify-center rounded-full
                         bg-[#2563EB]/20 text-[#2563EB]
                         hover:bg-[#2563EB] hover:text-white
                         transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col gap-3 text-sm sm:text-base justify-center">
            <a href="mailto:Info@egyptcollections.com" className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1">
              <Mail className="w-5 h-5 text-[#2563EB]" />
              {dict.email}
            </a>
            <a href="tel:+201110600280" className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1">
              <Phone className="w-5 h-5 text-[#2563EB]" />
              01110600280
            </a>
            <a href="https://maps.app.goo.gl/isDfvMUx5uzJSqzC9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-all hover:translate-x-1">
              <MapPin className="w-5 h-5 text-[#2563EB]" />
              {dict.address}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#757575] mt-4 py-3">
        <div className="container mx-auto flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center text-xs sm:text-sm text-[#B4B4B4]">
          <div dir="ltr">
            {dict.rights}
          </div>
          <div dir="ltr" className="flex items-center gap-1">
             {dict.powered} 
            <a href="https://www.facebook.com/sayed.khaled.872726" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-dotted underline-offset-4 ml-1">
              Sayed Khaled
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}