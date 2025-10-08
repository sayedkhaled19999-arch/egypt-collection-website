import { Metadata } from "next";
import JobCard, { JobCardProps } from "@/components/JobCard";

export const metadata = {
  title: 'الوظائف المتاحة - المصرية للتحصيلات',
  description: 'استعرض الفرص الوظيفية المتاحة وانضم لفريقنا المتميز',
};

const jobs: JobCardProps[] = [
  {
    id: "office-collector",
    title: "محصل مكتبي",
    description:
      "متابعة العملاء المتأخرين عن السداد عبر الهاتف وتقديم حلول مناسبة لإنهاء المديونية.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
  },
  {
    id: "field-collector",
    title: "محصل ميداني",
    description:
      "زيارة العملاء ميدانياً لمتابعة حالات السداد وجمع المستحقات. يشترط وجود رخصة قيادة.",
    location: "جميع محافظات مصر",
    type: "دوام كامل",
  },
  {
    id: "field-investigator",
    title: "مستعلم ميداني",
    description:
      "إجراء زيارات ميدانية لجمع بيانات دقيقة عن العملاء وتقديم تقارير واضحة للإدارة.",
    location: "الجيزة - القاهرة",
    type: "دوام كامل",
  },
  {
    id: "data-entry",
    title: "مدخل بيانات",
    description:
      "إدخال بيانات العملاء والمعاملات بدقة وسرعة باستخدام الأنظمة الإلكترونية.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-l from-[#D90000] to-[#B40000] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الوظائف المتاحة</h1>
          <p className="text-xl text-gray-100">
            اكتشف الفرصة المثالية لك وانضم إلى فريقنا المتميز
          </p>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-gray-600 text-lg">
          لدينا{" "}
          <span className="font-bold text-[#D90000]">{jobs.length}</span> وظيفة متاحة حالياً
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </section>
    </div>
  );
}
