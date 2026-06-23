import Link from 'next/link';
import type { Locale } from '@/i18n-config';

export default function NotFound({ params }: { params: { lang: Locale } }) {
  const isAr = params?.lang === 'ar';
  return (
    <main className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-extrabold text-[#2563EB]/20 mb-6">404</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#333] mb-4">
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-[#4B4B4B] text-lg mb-8">
          {isAr ? 'الصفحة اللي بتدور عليها مش موجودة أو اتنقلت. ممكن ترجع للرئيسية أو تشوف الوظائف المتاحة.'
            : 'The page you are looking for does not exist or has been moved. Go back home or check available jobs.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${params?.lang || 'ar'}`}
            className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-all shadow-lg">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <Link href={`/${params?.lang || 'ar'}/jobs`}
            className="bg-white text-[#2563EB] px-8 py-3 rounded-full font-bold border border-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all">
            {isAr ? 'الوظائف المتاحة' : 'Available Jobs'}
          </Link>
        </div>
      </div>
    </main>
  );
}
