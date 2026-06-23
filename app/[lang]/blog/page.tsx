import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import BlogClient from './BlogClient';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isAr = params.lang === 'ar';
  return {
    title: { absolute: isAr ? 'المدونة الوظيفية | ECC - نصائح وإرشادات التوظيف' : 'Career Blog | ECC - Job Tips & Guidance' },
    description: isAr
      ? 'نصائح وإرشادات للباحثين عن عمل في مجال التحصيل والاستعلام الائتماني. تعرف على كيفية التقديم وأفضل الممارسات.'
      : 'Tips and guidance for job seekers in collection and credit investigation. Learn how to apply and best practices.',
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/blog`,
      languages: { 'ar': `${SITE_URL}/ar/blog`, 'en': `${SITE_URL}/en/blog`, 'x-default': `${SITE_URL}/ar/blog` },
    },
    openGraph: {
      title: isAr ? 'المدونة الوظيفية - ECC' : 'ECC Career Blog',
      description: isAr ? 'نصائح للباحثين عن عمل في التحصيل والاستعلام' : 'Job seeking tips in collection and investigation',
      url: `${SITE_URL}/${params.lang}/blog`,
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return <BlogClient lang={params.lang} dict={dict} />;
}
