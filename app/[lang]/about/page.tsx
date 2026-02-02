// --- START OF FILE app/[lang]/about/page.tsx ---

import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  
  return {
    title: {
      absolute: isAr 
        ? 'من نحن | الشركة المصرية للتحصيلات ECC - تاريخ من الثقة'
        : 'About Us | ECC - Egyptian Collections Company History',
    },
    description: isAr
      ? 'تعرف على الشركة المصرية للتحصيلات (ECC). نحن رواد تحصيل الديون في مصر منذ 2001. فريقنا القانوني والميداني يخدم كبرى البنوك والشركات.'
      : 'Learn about Egyptian Collections Co. (ECC). Leading debt collection agency in Egypt since 2001. Our legal and field teams serve major banks.',
    keywords: isAr 
       ? ['عن ECC', 'تاريخ الشركة المصرية للتحصيلات', 'وائل سويلم', 'شركات تحصيل ديون', 'فريق التحصيل', 'خدمات بنكية']
       : ['About ECC', 'ECC History', 'Wael Sweilem', 'Collection Team', 'Debt Collection Agency Egypt', 'Banking Services'],
    
    // --- الربط العالمي (Hreflang) ---
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/about`,
      languages: {
        'ar': `${SITE_URL}/ar/about`,
        'en': `${SITE_URL}/en/about`,
        'x-default': `${SITE_URL}/about`, // الرابط المحايد للزوار الجدد
      },
    },

    openGraph: {
      title: dict.aboutPage.hero_title,
      description: dict.aboutPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/about`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About ECC Team' }],
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/${params.lang}/about/#webpage`,
        'url': `${SITE_URL}/${params.lang}/about`,
        'name': `${dict.navbar.about} | ${orgName}`,
        'inLanguage': isAr ? 'ar-EG' : 'en-US',
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'description': isAr ? 'صفحة معلومات عن الشركة المصرية للتحصيلات وتاريخها.' : 'Information page about ECC history and profile.',
        'about': { '@id': `${SITE_URL}/#organization` } // ربط الصفحة بالشركة
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.about, 'item': `${SITE_URL}/${params.lang}/about` }
        ]
      },
      // بيانات الشركة (كاملة مكملة)
      {
        '@type': 'FinancialService', 
        '@id': `${SITE_URL}/#organization`, // نفس الـ ID المستخدم في الصفحة الرئيسية
        'name': orgName,
        'legalName': 'Egyptian Collections Company',
        'url': `${SITE_URL}/${params.lang}`,
        'logo': `${SITE_URL}/icon.png`,
        'image': `${SITE_URL}/og-image.png`,
        'telephone': '+201110600280',
        'email': 'info@egyptcollections.com',
        'priceRange': '$$',
        
        // النطاق الجغرافي للخدمة (مهم جداً للـ Local SEO)
        'areaServed': {
          '@type': 'Country',
          'name': 'Egypt'
        },
        
        // التخصصات (Semantic SEO)
        'knowsAbout': [
          isAr ? 'تحصيل الديون' : 'Debt Collection',
          isAr ? 'الاستعلام الائتماني' : 'Credit Investigation',
          isAr ? 'التحصيل القانوني' : 'Legal Collection'
        ],

        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 Haroun St, El Mesaha Sq',
          'addressLocality': 'Dokki',
          'addressRegion': 'Giza',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        'foundingDate': '2001',
        'founder': {
          '@type': 'Person',
          'name': 'Wael Swellam',
          'jobTitle': 'CEO & Founder',
          'url': `${SITE_URL}/${params.lang}/about`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient dict={dict} />
    </>
  );
}