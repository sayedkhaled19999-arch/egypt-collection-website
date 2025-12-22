'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#353535] text-[#F4F4F4] mt-auto" dir="rtl">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">المصرية للتحصيلات كولكشن</h3>
          <p className="text-[#B4B4B4] leading-relaxed text-base sm:text-lg">
            نحن شركة رائدة في مجال التحصيلات والاستعلام الميداني، نلتزم بتقديم أفضل الحلول والخدمات لعملائنا منذ عام 2002.
          </p>
        </div>

        <div>
          <ul className="space-y-4 text-base sm:text-lg">
            <li>
              <a href="mailto:Employment@collection.eg" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                Employment@collection.eg
              </a>
            </li>
            <li>
              <a href="tel:01098025745" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                01098025745
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/isDfvMUx5uzJSqzC9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                30 ش هارون، ميدان المساحة، الدقي
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#757575] mt-6 pt-4 text-center text-[#B4B4B4] text-xs sm:text-sm">
        <p>© 2002 - {new Date().getFullYear()} المصرية للتحصيلات كولكشن. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
