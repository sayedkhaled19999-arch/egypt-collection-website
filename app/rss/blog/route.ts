const SITE_URL = 'https://egyptcollections.com';

const articles: Record<string, { title: string; desc: string; date: string }[]> = {
  ar: [
    { title: 'ازاي تتقدم لوظيفة في شركة تحصيل؟', desc: 'دليل شامل خطوة بخطوة للتقديم على وظائف التحصيل والاستعلام في مصر.', date: '2026-01-15' },
    { title: 'المحصل المكتبي ولا الميداني؟ أيهما المناسب ليك؟', desc: 'مقارنة شاملة بين وظيفة المحصل المكتبي والمحصل الميداني.', date: '2026-02-01' },
    { title: 'دليل المستعلم الميداني: المهارات المطلوبة ونصائح النجاح', desc: 'كل اللي محتاج تعرفه عن وظيفة المستعلم الميداني.', date: '2026-02-15' },
    { title: 'وظيفة مدخل بيانات: المهارات المطلوبة وفرص النمو', desc: 'تعرف على وظيفة مدخل البيانات وفرص التطور الوظيفي.', date: '2026-03-01' },
    { title: 'أفضل طرق تحصيل الديون: دليل شامل للبنوك والشركات', desc: 'دليل احترافي لأحدث طرق تحصيل الديون المتعثرة.', date: '2026-03-15' },
    { title: 'الاستعلام الائتماني: خط الدفاع الأول للبنوك', desc: 'كل ما تريد معرفته عن الاستعلام الائتماني.', date: '2026-04-01' },
    { title: 'الشركة المصرية للتحصيلات ECC: الرائدة في التحصيل والاستعلام', desc: 'تعرف على تاريخ الشركة المصرية للتحصيلات.', date: '2026-04-15' },
    { title: 'ازاي تبني مستقبل مهني في مجال التحصيل والاستعلام؟', desc: 'دليل شامل للشباب الراغب في بناء مستقبل مهني.', date: '2026-05-01' },
  ],
  en: [
    { title: 'How to Apply for a Job at a Collection Company?', desc: 'A step-by-step guide to applying for collection and investigation jobs in Egypt.', date: '2026-01-15' },
    { title: 'Office vs Field Collector: Which Is Right for You?', desc: 'A comprehensive comparison between office and field collection jobs.', date: '2026-02-01' },
    { title: 'Field Investigator Guide: Required Skills & Tips', desc: 'Everything you need to know about being a field investigator.', date: '2026-02-15' },
    { title: 'Data Entry Job: Required Skills & Growth Opportunities', desc: 'Learn about data entry jobs and career growth.', date: '2026-03-01' },
    { title: 'Best Debt Collection Methods: Guide for Banks', desc: 'A professional guide to debt collection best practices.', date: '2026-03-15' },
    { title: 'Credit Investigation: The First Line of Defense for Banks', desc: 'Everything about credit investigation and risk management.', date: '2026-04-01' },
    { title: 'ECC: Leader in Collection & Investigation Since 2001', desc: 'Learn about ECC history, vision, and mission.', date: '2026-04-15' },
    { title: 'How to Build a Career in Collection & Investigation', desc: 'A guide for young professionals seeking a career in the field.', date: '2026-05-01' },
  ],
};

export async function GET() {
  const link = (slug: string) => `${SITE_URL}/en/blog/${slug}`;
  const slugs = ['how-to-apply', 'office-vs-field', 'field-investigator-guide', 'data-entry-career', 'debt-collection-tips', 'credit-investigation-guide', 'ecc-company-profile', 'career-in-collection'];

  const items = articles.en.map((a, i) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <description><![CDATA[${a.desc}]]></description>
      <link>${link(slugs[i])}</link>
      <guid>${link(slugs[i])}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ECC Blog - Egyptian Collections Company</title>
    <description>Latest articles about debt collection, credit investigation, and career opportunities at ECC.</description>
    <link>${SITE_URL}/en/blog</link>
    <atom:link href="${SITE_URL}/rss/blog" rel="self" type="application/rss+xml"/>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
