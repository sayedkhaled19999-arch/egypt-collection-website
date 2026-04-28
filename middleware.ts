// --- START OF FILE middleware.ts ---
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// قائمة الدول العربية
const ARAB_COUNTRIES = [
  'EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'LB', 'JO', 'IQ', 
  'YE', 'SY', 'PS', 'SD', 'LY', 'DZ', 'MA', 'TN', 'MR', 'KM', 'DJ', 'SO'
];

function getLocale(request: NextRequest): string | undefined {
  // 1. تحديد الدولة من هيدر Vercel
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country');

  // لو الدولة عربية OR لو الدولة غير معروفة (زي Localhost) -> رجع عربي
  if (!country || ARAB_COUNTRIES.includes(country)) {
    return 'ar';
  }

  // 2. لو الزائر من دولة أجنبية مؤكدة، نشوف لغة متصفحه
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // ✅ التعديل هنا: عملنا نسخة من الـ locales عشان تبقى قابلة للتغيير
  const locales = [...i18n.locales];
  
  try {
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    return matchLocale(languages, locales, 'en');
  } catch (e) {
    return 'en';
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // التحقق من وجود اللغة في الرابط
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // ✅ إضافة status 301 عشان التحويل يكون Permanent
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      ),
      { status: 301 }
    );
  }
  
  // ✅ إضافة header عشان جوجل يفهم إن الصفحة صحيحة
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'index, follow');
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|avif|webp)$).*)'
  ],
};