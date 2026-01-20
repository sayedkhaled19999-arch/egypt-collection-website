// --- START OF FILE middleware.ts ---
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// قائمة أكواد الدول العربية (ISO Alpha-2)
const ARAB_COUNTRIES = [
  'EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'LB', 'JO', 'IQ', 
  'YE', 'SY', 'PS', 'SD', 'LY', 'DZ', 'MA', 'TN', 'MR', 'KM', 'DJ', 'SO'
];

function getLocale(request: NextRequest): string | undefined {
  // 1. الخطوة الأولى: التحقق من دولة الزائر
  // Vercel بتوفر الهيدر ده اوتوماتيك عشان تعرف الدولة
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country');

  // لو الزائر من دولة عربية، نرجعله العربي فوراً
  if (country && ARAB_COUNTRIES.includes(country)) {
    return 'ar';
  }

  // 2. الخطوة الثانية: لو مش من دولة عربية، نشوف لغة المتصفح بتاعته
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    // بنشوف أقرب لغة بيفضلها المتصفح من اللغات اللي عندنا
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    // لو فشل في المعرفة، يرجع الافتراضي (تأكد ان الافتراضي في ملف i18n-config هو ar)
    return 'ar'; 
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // التحقق هل الرابط يحتوي على لغة بالفعل (مثل /ar أو /en)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // لو الرابط مفيهوش لغة، هنحدد اللغة ونوجهه
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // بنستبعد ملفات الـ API والصور والملفات الثابتة من الميدل وير عشان السرعة
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|avif|webp)$).*)'
  ],
};