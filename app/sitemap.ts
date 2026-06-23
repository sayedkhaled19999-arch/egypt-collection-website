import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://egyptcollections.com';
  const locales = ['ar', 'en'];

  const staticPaths = [
    '', '/about', '/contact', '/jobs', '/partners', '/privacy',
    '/blog', '/faq', '/services/collection', '/services/investigation',
  ];

  const jobIds = ['office-collector', 'field-collector', 'field-investigator', 'data-entry'];
  const branchSlugs = ['dokki-headquarters', 'monufia', 'beheira', 'minya', 'ismailia', 'qena'];

  const blogSlugs = [
    'how-to-apply', 'office-vs-field', 'field-investigator-guide', 'data-entry-career',
    'debt-collection-tips', 'credit-investigation-guide', 'ecc-company-profile', 'career-in-collection',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  staticPaths.forEach((path) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/jobs' || path === '/blog' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.startsWith('/services') ? 0.9 : 0.8,
      });
    });
  });

  jobIds.forEach((id) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/jobs/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.95,
      });
    });
  });

  branchSlugs.forEach((slug) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/careers/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  branchSlugs.forEach((slug) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/branches/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    });
  });

  blogSlugs.forEach((slug) => {
    locales.forEach((lang) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
