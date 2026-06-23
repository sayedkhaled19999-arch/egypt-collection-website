import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { branchesInfo } from '@/components/data/branches-data';
import CareerBranchClient from './CareerBranchClient';
import { notFound } from 'next/navigation';

const SITE_URL = 'https://egyptcollections.com';

export async function generateStaticParams() {
  const slugs = branchesInfo.map(b => b.slug);
  const locales = ['ar', 'en'];
  return locales.flatMap(locale => slugs.map(slug => ({ lang: locale, slug })));
}

export async function generateMetadata({ params }: { params: { slug: string; lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const branch = branchesInfo.find(b => b.slug === params.slug);
  if (!branch) return { title: 'Not Found' };
  const isAr = params.lang === 'ar';
  const name = isAr ? branch.nameAr : branch.nameEn;

  return {
    title: { absolute: isAr ? `وظائف في ${name} | ECC` : `Jobs in ${name} | ECC` },
    description: isAr
      ? `فرص عمل متاحة في ${name} - وظائف تحصيل واستعلام. قدم الآن وانضم لفريق الشركة المصرية للتحصيلات ECC.`
      : `Job opportunities available in ${name} - collection and investigation jobs. Apply now and join ECC team.`,
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/careers/${params.slug}`,
      languages: { 'ar': `${SITE_URL}/ar/careers/${params.slug}`, 'en': `${SITE_URL}/en/careers/${params.slug}`, 'x-default': `${SITE_URL}/ar/careers/${params.slug}` },
    },
    openGraph: {
      title: isAr ? `وظائف ${name}` : `Jobs in ${name}`,
      description: isAr ? `فرص عمل في ${name}` : `Job opportunities in ${name}`,
      url: `${SITE_URL}/${params.lang}/careers/${params.slug}`,
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: { slug: string; lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const branch = branchesInfo.find(b => b.slug === params.slug);
  if (!branch) notFound();
  return <CareerBranchClient lang={params.lang} branch={branch} dict={dict} />;
}
