import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import ArticleClient from './ArticleClient';
import { notFound } from 'next/navigation';

const SITE_URL = 'https://egyptcollections.com';

export async function generateStaticParams() {
  const slugs = ['how-to-apply', 'office-vs-field', 'field-investigator-guide', 'data-entry-career'];
  const locales = ['ar', 'en'];
  return locales.flatMap(locale => slugs.map(slug => ({ lang: locale, slug })));
}

export async function generateMetadata({ params }: { params: { slug: string; lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const article = (dict.blogPage.articles as any)[params.slug];
  if (!article) return { title: 'Not Found' };
  const isAr = params.lang === 'ar';
  return {
    title: { absolute: `${article.title} | ${isAr ? 'ECC المدونة' : 'ECC Blog'}` },
    description: article.desc,
    alternates: {
      canonical: `${SITE_URL}/${params.lang}/blog/${params.slug}`,
      languages: { 'ar': `${SITE_URL}/ar/blog/${params.slug}`, 'en': `${SITE_URL}/en/blog/${params.slug}`, 'x-default': `${SITE_URL}/ar/blog/${params.slug}` },
    },
    openGraph: {
      title: article.title,
      description: article.desc,
      url: `${SITE_URL}/${params.lang}/blog/${params.slug}`,
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: { slug: string; lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const article = (dict.blogPage.articles as any)[params.slug];
  if (!article) notFound();
  return <ArticleClient lang={params.lang} slug={params.slug} dict={dict} article={article} />;
}
