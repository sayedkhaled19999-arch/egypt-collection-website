import { notFound } from "next/navigation";
import { JobCardProps } from "@/components/JobCard";

const jobs: JobCardProps[] = [
  {
    id: "office-collector",
    title: "محصل مكتبي",
    description:
      "متابعة العملاء المتأخرين عن السداد عبر الهاتف وتقديم حلول مناسبة لإنهاء المديونية. يشترط اللباقة في الحديث والقدرة على الإقناع.",
    location: "مدينة نصر - القاهرة",
    type: "دوام كامل",
  },
  {
    id: "field-collector",
    title: "محصل ميداني",
    description:
      "زيارة العملاء ميدانياً لمتابعة حالات السداد وجمع المستحقات. يشترط وجود خبرة ورخصة قيادة.",
    location: "الإسكندرية",
    type: "دوام كامل",
  },
  {
    id: "field-investigator",
    title: "مستعلم ميداني",
    description:
      "إجراء زيارات ميدانية لجمع بيانات دقيقة عن العملاء وتقديم تقارير واضحة للإدارة. يشترط مهارات تواصل ممتازة.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
  },
  {
    id: "data-entry",
    title: "مدخل بيانات",
    description:
      "إدخال بيانات العملاء والمعاملات بدقة وسرعة باستخدام الأنظمة الإلكترونية. يشترط إجادة برامج الأوفيس.",
    location: "القاهرة",
    type: "جزئي",
  },
];

interface JobPageProps {
  params: { id: string };
}

export default function JobPage({ params }: JobPageProps) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-l from-[#D90000] to-[#B40000] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{job?.title}</h1>
          <p className="text-xl text-gray-100">تفاصيل الوظيفة</p>
        </div>
      </section>

      {/* Job Details */}
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{job?.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{job?.description}</p>

          <div className="flex flex-col gap-2 text-gray-600 mb-8">
            <p>
              <span className="font-semibold">📍 الموقع: </span>
              {job?.location}
            </p>
            <p>
              <span className="font-semibold">💼 نوع العمل: </span>
              {job?.type}
            </p>
          </div>

          {/* Apply Button */}
          <a
            href={`/apply?job=${encodeURIComponent(job!.id)}`}
            className="block w-full bg-[#D90000] text-white text-center py-3 rounded-xl hover:bg-[#B40000] transition-all font-semibold"
          >
            قدّم الآن
          </a>
        </div>
      </section>
    </div>
  );
}
