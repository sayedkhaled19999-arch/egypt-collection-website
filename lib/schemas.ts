const SITE_URL = 'https://egyptcollections.com';

export function websiteSchema(lang: string) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${lang}`,
    name: lang === 'ar' ? 'الشركة المصرية للتحصيلات ECC' : 'Egyptian Collections CO.',
    inLanguage: lang === 'ar' ? 'ar-EG' : 'en-US',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function organizationSchema() {
  return {
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#organization`,
    name: 'الشركة المصرية للتحصيلات ECC',
    legalName: 'Egyptian Collections Company',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
    image: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '30 Haroun St, El Mesaha Sq',
      addressLocality: 'Dokki',
      addressRegion: 'Giza',
      postalCode: '12611',
      addressCountry: 'EG',
    },
    geo: { '@type': 'GeoCoordinates', latitude: '30.0385', longitude: '31.2185' },
    telephone: '+201110600280',
    email: 'info@egyptcollections.com',
    sameAs: ['https://www.facebook.com/egyptcollectionsco'],
    priceRange: '$$',
    areaServed: { '@type': 'Country', name: 'Egypt' },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:30',
      closes: '18:30',
    }],
  };
}

export function localBusinessSchema(
  name: string,
  description: string,
  streetAddress: string,
  addressLocality: string,
  addressRegion: string,
  latitude: string,
  longitude: string,
  telephone: string,
  image: string,
  url: string,
) {
  return {
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    telephone,
    image: { '@type': 'ImageObject', url: image },
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality,
      addressRegion,
      addressCountry: 'EG',
    },
    geo: { '@type': 'GeoCoordinates', latitude, longitude },
    priceRange: '$$',
    areaServed: { '@type': 'Country', name: 'Egypt' },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:30',
      closes: '18:30',
    }],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(
  name: string,
  description: string,
  providerName: string,
  areaServed = 'Egypt',
) {
  return {
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: providerName },
    areaServed: { '@type': 'Country', name: areaServed },
    serviceType: name,
  };
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function blogPostingSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  authorName: string,
  image?: string,
) {
  return {
    '@type': 'BlogPosting',
    headline,
    description,
    url,
    datePublished,
    author: { '@type': 'Person', name: authorName },
    image: image || `${SITE_URL}/og-image.png`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function jobPostingSchema(
  title: string,
  description: string,
  url: string,
  employmentType: string,
  datePosted: string,
  validThrough: string,
  addressLocality: string,
  salaryCurrency = 'EGP',
) {
  return {
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: { '@type': 'Organization', name: 'الشركة المصرية للتحصيلات ECC', sameAs: SITE_URL },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality, addressCountry: 'EG' } },
    salaryCurrency,
    url,
  };
}

export function productSchema(name: string, description: string, category: string) {
  return {
    '@type': 'Product',
    name,
    description,
    category,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EGP', availability: 'https://schema.org/InStock' },
  };
}
