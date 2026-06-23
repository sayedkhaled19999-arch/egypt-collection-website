import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import InvestigationClient from './InvestigationClient';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';
  return {
    title: { absolute: isAr ? 'خدمات الاستعلام | ECC - الشركة المصرية للتحصيلات' : 'Investigation Services | ECC - Egyptian Collections Co.' },
    description: isAr
      ? 'خدمات استعلام ميداني وائتماني احترافية للبنوك والشركات في مصر. دقة تتعدى 95% وتغطية جميع المحافظات.'
      : 'Professional field and credit investigation services for banks and companies in Egypt. Over 95% accuracy, covering all governorates.',
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/services/investigation`,
      languages: { 'ar': `${SITE_URL}/ar/services/investigation`, 'en': `${SITE_URL}/en/services/investigation`, 'x-default': `${SITE_URL}/ar/services/investigation` },
    },
    openGraph: {
      title: isAr ? 'خدمات الاستعلام من ECC' : 'ECC Investigation Services',
      description: isAr ? 'استعلام ميداني دقيق للبنوك والشركات' : 'Accurate field investigation for banks and companies',
      url: `${SITE_URL}/${params.lang}/services/investigation`,
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
      { name: isAr ? 'خدمات الاستعلام' : 'Investigation Services', url: `${SITE_URL}/${params.lang}/services/investigation` },
    ]),
    serviceSchema(
      isAr ? 'خدمات الاستعلام الائتماني' : 'Credit Investigation Services',
      isAr ? dict.servicesPage.investigation.desc : dict.servicesPage.investigation.desc,
      'Egyptian Collections Co. ECC',
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': schemas }) }}
      />
      <InvestigationClient lang={params.lang} dict={dict} />
    </>
  );
}
