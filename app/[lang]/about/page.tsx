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
      absolute: dict.aboutPage.hero_title + ' | ' + (isAr ? 'الشركة المصرية للتحصيلات ECC' : 'ECC'),
    },
    description: dict.aboutPage.hero_desc.substring(0, 160), // SEO Best practice limit
    keywords: isAr 
       ? ['عن ECC', 'تاريخ الشركة المصرية للتحصيلات', 'وائل سويلم', 'رؤية الشركة', 'فريق التحصيل']
       : ['About ECC', 'ECC History', 'Wael Sweilem', 'Collection Team', 'Company Vision'],
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/about`,
      languages: {
        'ar-EG': `${SITE_URL}/ar/about`,
        'en-US': `${SITE_URL}/en/about`,
      },
    },
    openGraph: {
      title: dict.aboutPage.hero_title,
      description: dict.aboutPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/about`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About ECC' }],
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
        'about': { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': dict.navbar.about, 'item': `${SITE_URL}/${params.lang}/about` }
        ]
      },
      // نربطها بالمنظمة المعرفة في الصفحة الرئيسية
      {
        '@type': 'FinancialService', 
        '@id': `${SITE_URL}/#organization`,
        'name': orgName,
        'url': `${SITE_URL}/${params.lang}`,
        'logo': `${SITE_URL}/icon.png`,
        
        // --- التعديلات: إضافة البيانات الناقصة ---
        'telephone': '+201110600280', // حل مشكلة telephone
        'image': `${SITE_URL}/og-image.png`, // حل مشكلة image
        'priceRange': '$$', // حل مشكلة priceRange
        
        // حل المشكلة الحرجة (Critical: address)
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '30 Haroun St, El Mesaha Sq',
          'addressLocality': 'Dokki',
          'addressRegion': 'Giza',
          'postalCode': '12611',
          'addressCountry': 'EG'
        },
        // ----------------------------------------

        'foundingDate': '2001',
        'founder': {
          '@type': 'Person',
          'name': 'Wael Swellam',
          'jobTitle': 'CEO & Founder'
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