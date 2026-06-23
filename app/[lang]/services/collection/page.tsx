import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import CollectionClient from './CollectionClient';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  return {
    title: { absolute: isAr ? 'خدمات التحصيل | ECC - الشركة المصرية للتحصيلات' : 'Collection Services | ECC - Egyptian Collections Co.' },
    description: isAr
      ? 'خدمات تحصيل ديون احترافية من ECC: تحصيل ميداني، مكتبي، وقانوني في جميع محافظات مصر. نضمن أعلى معدلات التحصيل مع الالتزام بالقوانين.'
      : 'Professional debt collection services from ECC: field, office, and legal collection across all Egypt governorates. Highest collection rates guaranteed.',
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/services/collection`,
      languages: { 'ar': `${SITE_URL}/ar/services/collection`, 'en': `${SITE_URL}/en/services/collection`, 'x-default': `${SITE_URL}/ar/services/collection` },
    },
    openGraph: {
      title: isAr ? 'خدمات التحصيل من ECC' : 'ECC Collection Services',
      description: isAr ? 'تحصيل ديون احترافي - ميداني، مكتبي، قانوني' : 'Professional Debt Collection - Field, Office, Legal',
      url: `${SITE_URL}/${params.lang}/services/collection`,
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  const schemas = [
    breadcrumbSchema([
      { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${params.lang}` },
      { name: isAr ? 'خدماتنا' : 'Services', url: `${SITE_URL}/${params.lang}/services` },
      { name: isAr ? 'خدمات التحصيل' : 'Collection Services', url: `${SITE_URL}/${params.lang}/services/collection` },
    ]),
    serviceSchema(
      isAr ? 'خدمات التحصيل' : 'Debt Collection Services',
      isAr ? dict.servicesPage.collection.desc : dict.servicesPage.collection.desc,
      'Egyptian Collections Co. ECC',
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': schemas }) }}
      />
      <CollectionClient lang={params.lang} dict={dict} />
    </>
  );
}
