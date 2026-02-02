// --- START OF FILE app/[lang]/privacy/page.tsx ---

import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: dict.privacyPage.hero_title + ' | ' + (isAr ? 'سياسة الخصوصية - ECC' : 'Privacy Policy - ECC'),
    },
    description: isAr 
       ? 'تعرف على سياسة الخصوصية وحماية بيانات المستخدمين في الشركة المصرية للتحصيلات ECC. نحن نلتزم بأقصى معايير السرية والأمان.'
       : 'Read ECC Privacy Policy regarding user data protection and security standards. We are committed to full confidentiality.',
    keywords: isAr 
       ? ['سياسة الخصوصية', 'حماية البيانات', 'حقوق المستخدم', 'شروط الاستخدام', 'أمان المعلومات']
       : ['Privacy Policy', 'Data Protection', 'GDPR Compliance', 'User Rights', 'Data Security'],
    
    // --- (World Class SEO) الربط العالمي ---
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/privacy`,
      languages: {
        'ar': `${SITE_URL}/ar/privacy`,
        'en': `${SITE_URL}/en/privacy`,
        'x-default': `${SITE_URL}/privacy`, // الرابط الذكي
      },
    },

    openGraph: {
      title: dict.privacyPage.hero_title,
      description: dict.privacyPage.hero_desc,
      url: `${SITE_URL}/${params.lang}/privacy`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC Privacy Policy' }],
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const lastUpdated = new Date().toISOString().split('T')[0]; // تاريخ اليوم كأنه آخر تحديث
  const isAr = params.lang === 'ar';
  const orgName = isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${params.lang}/privacy/#webpage`,
        'url': `${SITE_URL}/${params.lang}/privacy`,
        'name': `${dict.privacyPage.hero_title} | ${orgName}`,
        'description': dict.privacyPage.hero_desc,
        'datePublished': "2024-01-01",
        'dateModified': lastUpdated, // بيخلي جوجل يشوف الصفحة "طازجة"
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'inLanguage': isAr ? 'ar-EG' : 'en-US',
        
        // ربط الصفحة بالناشر (الشركة) - مهم جداً للمصداقية القانونية
        'publisher': {
           '@type': 'Organization',
           '@id': `${SITE_URL}/#organization`,
           'name': orgName,
           'logo': {
             '@type': 'ImageObject',
             'url': `${SITE_URL}/icon.png`
           }
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': dict.navbar.home, 'item': `${SITE_URL}/${params.lang}` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Privacy', 'item': `${SITE_URL}/${params.lang}/privacy` }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrivacyClient dict={dict} />
    </>
  );
}