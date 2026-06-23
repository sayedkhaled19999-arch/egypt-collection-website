import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { branchesInfo } from '@/components/data/branches-data';
import { breadcrumbSchema, localBusinessSchema, faqSchema, serviceSchema } from '@/lib/schemas';
import BranchClient from './BranchClient';

const SITE_URL = 'https://egyptcollections.com';
const branchCoords: Record<string, { lat: string; lng: string }> = {
  'dokki-headquarters': { lat: '30.0385', lng: '31.2185' },
  'monufia': { lat: '30.5595', lng: '31.0101' },
  'beheira': { lat: '30.8821', lng: '30.5292' },
  'minya': { lat: '28.0954', lng: '30.7508' },
  'ismailia': { lat: '30.5890', lng: '32.2671' },
  'qena': { lat: '26.1646', lng: '32.7273' },
};

export function generateStaticParams() {
  const slugs = branchesInfo.map((b) => b.slug);
  return slugs.flatMap((slug) => [{ lang: 'ar', slug }, { lang: 'en', slug }]);
}

const branchMapEmbeds: Record<string, string> = {
  'dokki-headquarters': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27628.14757805721!2d31.2185!3d30.0385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458413b5b5b5b5b%3A0x5b5b5b5b5b5b5b!2sECC!5e0!3m2!1sen!2seg!4v1',
  'monufia': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d31.0101!3d30.5595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMzJzM0LjIiTiAzMcKwMDAnMzYuNCJF!5e0!3m2!1sen!2seg!4v1',
  'beheira': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d30.5292!3d30.8821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDUyJzU1LjYiTiAzMMKwMzEnNDUuMSJF!5e0!3m2!1sen!2seg!4v1',
  'minya': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d30.7508!3d28.0954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sx0%3A0x0!2zMjjCsDA1JzQzLjQiTiAzMMKwNDUnMDIuOSJF!5e0!3m2!1sen!2seg!4v1',
  'ismailia': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d32.2671!3d30.5890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDM1JzIwLjQiTiAzMsKwMTYnMDEuNiJF!5e0!3m2!1sen!2seg!4v1',
  'qena': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5!2d32.7273!3d26.1646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA5JzUyLjYiTiAzMsKwNDMnMzguMyJF!5e0!3m2!1sen!2seg!4v1',
};

export async function generateMetadata({ params }: { params: { lang: Locale; slug: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  const branch = branchesInfo.find((b) => b.slug === params.slug);
  if (!branch) return {};
  const name = isAr ? branch.nameAr : branch.nameEn;
  return {
    title: `${name} | ${isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.'}`,
    description: isAr
      ? `تعرف على ${branch.nameAr} - ${branch.addressAr}. خدمات التحصيل والاستعلام الائتماني في ${branch.tags.slice(0, 2).join(' و')}.`
      : `Visit ${branch.nameEn} - ${branch.addressEn}. Debt collection and credit investigation services in ${branch.tags.slice(0, 2).join(' and ')}.`,
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/branches/${params.slug}`,
      languages: {
        'ar': `${SITE_URL}/ar/branches/${params.slug}`,
        'en': `${SITE_URL}/en/branches/${params.slug}`,
      },
    },
    openGraph: {
      title: `${name} | ECC`,
      description: isAr ? branch.addressAr : branch.addressEn,
      url: `${SITE_URL}/${params.lang}/branches/${params.slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function BranchPage({ params }: { params: { lang: Locale; slug: string } }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  const branch = branchesInfo.find((b) => b.slug === params.slug);
  if (!branch) notFound();

  const name = isAr ? branch.nameAr : branch.nameEn;
  const branchDict = dict.branchPage;
  const coords = branchCoords[params.slug] || { lat: '30.0385', lng: '31.2185' };
  const jobs = Object.entries(dict.jobsData).filter(([, j]: any) =>
    j.location?.toLowerCase().includes(branch.tags[0]?.toLowerCase() || '') ||
    j.location?.toLowerCase().includes(branch.tags[1]?.toLowerCase() || '')
  );

  const schemas = [
    breadcrumbSchema([
      { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${params.lang}` },
      { name: isAr ? 'فروعنا' : 'Branches', url: `${SITE_URL}/${params.lang}/#branches` },
      { name, url: `${SITE_URL}/${params.lang}/branches/${params.slug}` },
    ]),
    localBusinessSchema(
      name,
      isAr
        ? `فرع ${branch.nameAr} يقدم خدمات التحصيل الميداني والاستعلام الائتماني. ${branch.addressAr}`
        : `${branch.nameEn} offers debt collection and credit investigation services. ${branch.addressEn}`,
      isAr ? branch.addressAr : branch.addressEn,
      branch.tags[0],
      branch.tags[1] || '',
      coords.lat,
      coords.lng,
      '+201110600280',
      `${SITE_URL}/og-image.png`,
      `${SITE_URL}/${params.lang}/branches/${params.slug}`,
    ),
    serviceSchema(
      isAr ? 'خدمات التحصيل' : 'Debt Collection Services',
      isAr ? `خدمات تحصيل ديون احترافية في ${name}` : `Professional debt collection services in ${name}`,
      'Egyptian Collections Co. ECC',
    ),
    serviceSchema(
      isAr ? 'خدمات الاستعلام الائتماني' : 'Credit Investigation Services',
      isAr ? `خدمات استعلام ائتماني ميداني في ${name}` : `Field credit investigation services in ${name}`,
      'Egyptian Collections Co. ECC',
    ),
    faqSchema([
      {
        question: branchDict.faq.q1.replace('{{branch}}', name),
        answer: branchDict.faq.a1.replace('{{branch}}', name),
      },
      {
        question: branchDict.faq.q2.replace('{{branch}}', name),
        answer: branchDict.faq.a2.replace('{{branch}}', name),
      },
      {
        question: branchDict.faq.q3.replace('{{branch}}', name),
        answer: branchDict.faq.a3.replace('{{branch}}', name),
      },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': schemas }) }}
      />
      <BranchClient
        lang={params.lang}
        dict={dict}
        branch={branch}
        jobs={jobs}
        mapEmbed={branchMapEmbeds[params.slug] || branchMapEmbeds['dokki-headquarters']}
      />
    </>
  );
}
