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

// قائمة المسارات اللي مش محتاجة redirect
const EXCLUDED_PATHS = [
  '/api',
  '/_next',
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
  '/og-image.png',
  '/icon.png',
  '/apple-icon.png',
  '/logo.webp',
];

// قائمة الامتدادات المسموح بها للملفات الثابتة
const STATIC_FILE_EXTENSIONS = /\.(svg|png|jpg|jpeg|gif|avif|webp|ico|css|js|woff2|woff|ttf|eot)$/i;

// اللغة الافتراضية
const DEFAULT_LOCALE = 'ar';

function getLocale(request: NextRequest): string {
  // 1. فحص الكوكيز أولاً (للزائرين اللي زاروا الموقع قبل كده)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // 2. تحديد الدولة من هيدر Vercel
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country');

  // لو الدولة عربية أو مش معروفة -> عربي
  if (!country || ARAB_COUNTRIES.includes(country)) {
    return DEFAULT_LOCALE;
  }

  // 3. لو الدولة أجنبية، نجيب لغة المتصفح
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = [...i18n.locales];
  
  try {
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const matchedLocale = matchLocale(languages, locales, 'en');
    return matchedLocale || DEFAULT_LOCALE;
  } catch (e) {
    return 'en';
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================================
  // 1. السماح للمسارات المستثناة (API، ملفات ثابتة، إلخ)
  // ============================================================
  
  // نسمح للمسارات المحددة
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // نسمح للملفات الثابتة
  if (STATIC_FILE_EXTENSIONS.test(pathname)) {
    return NextResponse.next();
  }

  // ============================================================
  // 2. السماح للمسارات اللي فيها لغة بالفعل
  // ============================================================
  
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    
    // نضيف headers للـ SEO
    response.headers.set('X-Robots-Tag', 'index, follow');
    response.headers.set('Cache-Control', 'public, max-age=3600');
    
    return response;
  }

  // ============================================================
  // 3. لو مفيش لغة في الرابط، نحول للغة المناسبة
  // ============================================================
  
  const locale = getLocale(request);
  
  // بناء الرابط الجديد مع اللغة
  const newPathname = pathname === '/' ? '' : pathname;
  const newUrl = new URL(`/${locale}${newPathname}`, request.url);
  
  // نعمل redirect مع حفظ اللغة في كوكيز
  const response = NextResponse.redirect(newUrl, 308); // 308 Permanent Redirect
  
  // ✅ التصحيح هنا: نتأكد إن locale قيمة نصية مش undefined
  if (locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 30, // 30 يوم
      path: '/',
      sameSite: 'lax' as const,
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - image files (svg, png, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|avif|webp|ico|css|js|woff2)$).*)',
  ],
};