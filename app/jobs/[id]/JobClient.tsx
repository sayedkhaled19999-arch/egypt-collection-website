'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, MapPin, Laptop, Briefcase, CheckCircle, X, FileText, User, Phone } from 'lucide-react';

// تعريف البيانات الكاملة (للعرض داخل الصفحة)
interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  workHours: string;
  vacation: string;
  fullDetails: string;
  extraDetails: string[];
}

const jobs: Job[] = [
  {
    id: "office-collector",
    title: "محصل مكتبي",
    description: "هتتابع العملاء على التليفون وتساعدهم يخرجوا منتظمين.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
    salary: "راتب ثابت + عمولات وحوافز مجزية",
    workHours: "من 8:30 صباحًا لـ 6:30 مساءً",
    vacation: "إجازة أسبوعية يوم الجمعة من كل أسبوع",
    fullDetails: `
- متابعة العملاء المتأخرين عن السداد بطريقة ودية واحترافية.
- تقديم حلول عملية علشان يرجعوا منتظمين في السداد.
- تسجيل ومتابعة كل المكالمات والملاحظات بدقة.
- التواصل مع الإدارات المختلفة لتنسيق طرق التحصيل.
- التعامل مع كل أنواع العملاء وحل المشاكل بسرعة وكفاءة.
- تدريب مستمر على أساليب التحصيل وتحسين مهارات التواصل.
- فرصة للتطور والترقي حسب الأداء.
- بيئة عمل منظمة وودية تدعم نموك المهني.
- فترة التدريب مدفوعة الأجر من أول يوم.
    `,
    extraDetails: [
      "المظهر: رسمي ومرتب",
      "الانتظام: الالتزام بالمواعيد مهم",
      "الأمانة: الشغل بشفافية ودقة",
      "مهارات: تواصل ممتاز وحل مشكلات",
      "المقابلات بدون أي رسوم",
      "تأمين اجتماعي بعد التثبيت"
    ]
  },
  {
    id: "field-collector",
    title: "محصل ميداني",
    description: "هتزور العملاء اللي متأخرين في السداد وتساعدهم يسددوا المديونية المتأخرة.",
    location: "جميع محافظات مصر",
    type: "دوام كامل",
    salary: "راتب ثابت + عمولات وحوافز مجزية",
    workHours: "من 8:30 صباحًا لـ 5:00 مساءً مع زيارات ميدانية حسب الجدول",
    vacation: "إجازة أسبوعية يوم الجمعة من كل أسبوع",
    fullDetails: `
- القيام بزيارات ميدانية للعملاء لتسوية المديونيات.
- تقييم حالة العميل واقتراح حلول مناسبة لسداد الديون.
- إعداد تقارير دقيقة عن كل زيارة وتقديمها للإدارة.
- الالتزام بمعايير السلامة المهنية أثناء التحرك.
- استخدام الأجهزة والبرامج الخاصة بالتوثيق والمتابعة.
- تدريب مستمر على أساليب التحصيل والتواصل الفعال.
- فرصة للتطور الوظيفي داخل الفريق.
- فترة التدريب مدفوعة الأجر من أول يوم.
    `,
    extraDetails: [
      "المظهر: مناسب وعملي أثناء الزيارات",
      "الانتظام: الالتزام بالجدول الميداني",
      "الأمانة: الشغل بدقة وشفافية",
      "مهارات: التعامل مع مواقف صعبة",
      "المقابلات بدون أي رسوم",
      "تأمين اجتماعي بعد التثبيت"
    ]
  },
  {
    id: "field-investigator",
    title: "مستعلم ميداني",
    description: "هتزور مواقع العملاء وتجمع بيانات دقيقة وتقدم تقارير واضحة للإدارة.",
    location: "الجيزة - القاهرة",
    type: "دوام كامل",
    salary: "راتب ثابت + حوافز حسب الأداء",
    workHours: "من 7:30 صباحًا لـ 4 مساءً مع الزيارات الميدانية حسب الجدول",
    vacation: "إجازة أسبوعية يومي الجمعة والسبت من كل أسبوع",
    fullDetails: `
- زيارة مواقع العملاء والتحقق من بياناتهم.
- جمع معلومات دقيقة وموثوقة عن الحالات المختلفة.
- إعداد تقارير مفصلة لكل زيارة.
- التواصل مع الإدارات لتحديث قاعدة البيانات.
- الالتزام بسياسات الشركة وأخلاقيات الشغل.
- تدريب مستمر على استخدام التقنيات الحديثة لجمع البيانات.
- فرصة للتطور الوظيفي داخل قسم الاستعلام والتحليل.
- فترة التدريب مدفوعة الأجر من أول يوم.
    `,
    extraDetails: [
      "المظهر: رسمي ومرتب",
      "الانتظام: الالتزام بالمواعيد والجدول الميداني",
      "الأمانة: جمع البيانات بدقة وشفافية",
      "مهارات: دقة وتحليل المعلومات",
      "المقابلات بدون أي رسوم",
      "تأمين اجتماعي بعد التثبيت"
    ]
  },
  {
    id: "data-entry",
    title: "مدخل بيانات",
    description: "هتدخل بيانات العملاء والمعاملات بدقة وسرعة باستخدام برامج الاوفيس.",
    location: "الدقي - الجيزة",
    type: "دوام كامل",
    salary: "مرتبات تصل الي 7000 جنيه شهريًا حسب الكفاءة",
    workHours: "من 8:30 صباحًا لـ 6:30 مساءً",
    vacation: "إجازة أسبوعية يوم الجمعة من كل أسبوع",
    fullDetails: `
- إدخال كل بيانات العملاء والمعاملات بدقة.
- تحديث قاعدة البيانات باستمرار والتأكد من صحة المعلومات.
- التعامل بكفاءة مع برامج الاوفيس (Excel, Word).
- تحسين جودة البيانات وتقليل الأخطاء.
- التعاون مع الإدارات المختلفة لضمان سلاسة التدفق المعلوماتي.
- تدريب مستمر على أدوات وتقنيات تحسين الإنتاجية.
- فترة التدريب مدفوعة الأجر من أول يوم.
    `,
    extraDetails: [
      "المظهر: نظيف ومرتب",
      "الانتظام: الالتزام بالمواعيد مهم",
      "الأمانة: حماية البيانات وخصوصية العملاء",
      "مهارات: سرعة ودقة في إدخال البيانات",
      "المقابلات بدون أي رسوم",
      "تأمين اجتماعي بعد التثبيت"
    ]
  }
];

export default function JobClient({ id }: { id: string }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    job: '',
    experience: 'no',
    previousCompanies: '',
    cv: null as File | null
  });

  const job = jobs.find(j => j.id === id);

  if (!job) return <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">الوظيفة غير موجودة</div>;

  const getIcon = () => {
    switch (job.id) {
      case "office-collector": return <Home className="w-7 h-7 text-blue-500" />;
      case "field-collector":
      case "field-investigator": return <MapPin className="w-7 h-7 text-blue-500" />;
      case "data-entry": return <Laptop className="w-7 h-7 text-blue-500" />;
      default: return <Briefcase className="w-7 h-7 text-blue-500" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('jobTitle', job?.title || '');
      data.append('experience', formData.experience);
      data.append('previousCompanies', formData.previousCompanies);
      
      if (formData.cv) {
        data.append('cv', formData.cv);
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        // --- بداية كود واجهة API التحويلات (Facebook CAPI) ---
        try {
          // توليد ID فريد للحدث بشكل آمن داخل المتصفح
          const eventId = crypto.randomUUID();
          
          // محاولة تقسيم الاسم لتحسين جودة المطابقة
          const nameParts = formData.fullName.trim().split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

          // إرسال الحدث إلى نقطة النهاية الخاصة بنا (في الخلفية)
          fetch('/api/conversion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: "SubmitApplication", // اسم الحدث: تقديم على وظيفة
              email: "no-email-provided@placeholder.com", // النموذج لا يحتوي على حقل بريد إلكتروني، نرسل قيمة مؤقتة لتجنب خطأ السيرفر
              phone: formData.phone,
              firstName: firstName,
              lastName: lastName,
              jobTitle: job?.title || '',
              url: window.location.href,
              userEventId: eventId
            }),
          }).catch(err => console.error('FB Event Error (Background):', err));
          
        } catch (capiError) {
          console.error('CAPI Setup Error:', capiError);
        }
        // --- نهاية كود واجهة API التحويلات ---

        alert('تم إرسال بياناتك بنجاح! بالتوفيق يا بطل 🚀');
        setModalOpen(false);
        setFormData({
          fullName: '', phone: '', address: '', job: '', 
          experience: 'no', previousCompanies: '', cv: null
        });
      } else {
        alert('حصل مشكلة أثناء الإرسال، حاول تاني أو كلمنا واتساب.');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ غير متوقع، تأكد من اتصال الإنترنت.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* تم إزالة سكربت JSON-LD من هنا لأنه موجود في صفحة السيرفر */}

      {/* Header */}
      <div className="bg-gray-100 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{job.title}</h1>
        <p className="text-blue-500 text-lg md:text-2xl font-bold">فرصتك تلمع وتكبر معانا 💼</p>
      </div>

      {/* Job Card */}
      <section className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-6 hover:scale-105 transition-transform duration-300">
          
          {/* Title */}
          <div className="flex items-center gap-3 mb-6 border-l-4 border-blue-500 pl-4">
            {getIcon()}
            <h2 className="text-3xl font-extrabold text-gray-900">{job.title}</h2>
          </div>

          {/* Extra Details */}
          {job.extraDetails && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-xl shadow-inner border-l-4 border-yellow-500">
              {job.extraDetails.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <p className="text-gray-700 font-bold">{d}</p>
                </div>
              ))}
            </div>
          )}

          {/* Full Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-inner border-l-4 border-purple-500 space-y-3">
            {job.fullDetails.split('\n').filter(l => l.trim() !== '').map((line, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <p className="text-gray-700 font-semibold">{line.replace(/^- /, '')}</p>
              </div>
            ))}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-xl shadow-inner border-l-4 border-red-500">
            {job.salary && <p className="flex items-center gap-2 font-bold text-gray-800">💰 <span className="text-blue-600">الراتب:</span> {job.salary}</p>}
            {job.workHours && <p className="flex items-center gap-2 font-bold text-gray-800">🕘 <span className="text-blue-600">مواعيد العمل:</span> {job.workHours}</p>}
            {job.vacation && <p className="flex items-center gap-2 font-bold text-gray-800">🛌 <span className="text-blue-600">الإجازة:</span> {job.vacation}</p>}
            <p className="flex items-center gap-2 font-bold text-gray-800">📍 <span className="text-blue-600">الموقع:</span> {job.location}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors duration-300 shadow-lg" onClick={() => setModalOpen(true)}>قدم الآن</button>
            <button onClick={() => router.push('/jobs')} className="flex-1 text-center px-4 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300 shadow-lg">ارجع للوظائف</button>
          </div>
        </motion.div>
      </section>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl p-8 w-full max-w-lg relative">
            <X className="w-6 h-6 absolute top-4 left-4 cursor-pointer" onClick={() => setModalOpen(false)} />
            <h2 className="text-2xl font-bold mb-4 text-center">قدم على {job.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2"><User className="w-5 h-5 text-gray-500"/> <input type="text" placeholder="الاسم الثلاثي" required className="w-full p-3 border rounded-xl" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
              <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-gray-500"/> <input type="tel" placeholder="رقم الموبايل" required className="w-full p-3 border rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-gray-500"/> <input type="text" placeholder="العنوان" required className="w-full p-3 border rounded-xl" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></div>
              <div className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-gray-500"/> <input type="text" value={job.title} readOnly className="w-full p-3 border rounded-xl bg-gray-100" /></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="radio" name="experience" value="yes" checked={formData.experience==='yes'} onChange={e=>setFormData({...formData, experience: e.target.value})}/> عندي خبرة سابقة</label>
                <label className="flex items-center gap-2"><input type="radio" name="experience" value="no" checked={formData.experience==='no'} onChange={e=>setFormData({...formData, experience: e.target.value})}/> معنديش خبرة</label>
              </div>
              {formData.experience==='yes' && <input type="text" placeholder="الشركات اللي اشتغلت فيها قبل كدا (اختياري)" className="w-full p-3 border rounded-xl" value={formData.previousCompanies} onChange={e=>setFormData({...formData, previousCompanies: e.target.value})} />}
              <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-gray-500"/> <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setFormData({...formData, cv: e.target.files?.[0] || null})} className="w-full"/> <span className="text-gray-500 text-sm">ارسال السيرة الذاتية إن وجدت</span></div>
              
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}