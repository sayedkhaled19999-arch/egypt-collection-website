import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { websiteSchema, organizationSchema } from '@/lib/schemas';

const SITE_URL = 'https://egyptcollections.com';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === 'ar';

  return {
    title: {
      absolute: isAr
        ? 'الشركة المصرية للتحصيلات ECC | الأولى في تحصيل الديون والاستعلام'
        : 'Egyptian Collections CO. | #1 Debt Collection & Credit Investigation',
    },
    description: isAr
      ? 'ECC تقدم حلولاً قانونية شاملة في تحصيل الديون المتعثرة، الاستعلام الائتماني، والتحصيل الميداني للبنوك والشركات الكبرى في جميع محافظات مصر.'
      : 'ECC provides comprehensive legal solutions in debt collection, credit investigation, and field recovery for major banks and corporations across Egypt.',
    keywords: isAr
      ? ['تحصيل ديون', 'الشركة المصرية للتحصيلات', 'ECC', 'استعلام ائتماني', 'تحصيل ميداني', 'تسوية مديونيات', 'شركات تحصيل في مصر', 'حلول مالية']
      : ['Debt Collection Egypt', 'ECC', 'Credit Investigation', 'Field Collection', 'Debt Recovery Agency', 'Financial Services Egypt', 'Bad Debt Recovery'],
    alternates: {
      canonical: `${SITE_URL}/${params.lang}`,
      languages: {
        'ar': `${SITE_URL}/ar`,
        'en': `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      title: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      description: dict.metadata.description,
      url: `${SITE_URL}/${params.lang}`,
      siteName: isAr ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ECC Logo' }],
    },
  };
}

function generateJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(lang),
      organizationSchema(),
    ],
  };
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const jsonLd = generateJsonLd(params.lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent lang={params.lang} dict={dict} />
    </>
  );
}
