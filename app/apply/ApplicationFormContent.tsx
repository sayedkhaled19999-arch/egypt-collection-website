'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ApplicationFormContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    job: jobId,
    cv: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const jobOptions = [
    { id: 'محصل-مكتبي', label: 'محصل مكتبي' },
    { id: 'محصل-ميداني', label: 'محصل ميداني' },
    { id: 'مستعلم-ميداني', label: 'مستعلم ميداني' },
    { id: 'مدخل-بيانات', label: 'مدخل بيانات' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال النموذج
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form Data:', { ...formData, cv: formData.cv?.name });

    setSubmitStatus('success');
    setIsSubmitting(false);

    setFormData({ fullName: '', email: '', phone: '', job: '', cv: null });
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-l from-[#D90000] to-[#B40000] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">التقديم على وظيفة</h1>
          <p className="text-xl text-gray-100">املأ النموذج أدناه وسنتواصل معك في أقرب وقت</p>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-800 font-medium text-center">
                  تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* الاسم الكامل */}
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D90000]"
                />
              </div>

              {/* البريد الإلكتروني */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D90000]"
                />
              </div>

              {/* رقم الهاتف */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D90000]"
                />
              </div>

              {/* الوظيفة */}
              <div>
                <label htmlFor="job" className="block text-gray-700 font-medium mb-2">
                  الوظيفة المتقدم لها <span className="text-red-500">*</span>
                </label>
                <select
                  id="job"
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D90000]"
                >
                  <option value="">اختر الوظيفة</option>
                  {jobOptions.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* رفع السيرة الذاتية */}
              <div>
                <label htmlFor="cv" className="block text-gray-700 font-medium mb-2">
                  السيرة الذاتية (PDF أو Word) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D90000] file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                {formData.cv && (
                  <p className="mt-2 text-sm text-gray-600">الملف المحدد: {formData.cv.name}</p>
                )}
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D90000] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#B40000] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-red-50 rounded-xl">
              <p className="text-sm text-gray-700 leading-relaxed text-center">
                <strong>ملاحظة:</strong> سيتم مراجعة طلبك من قبل فريق الموارد البشرية وسنتواصل معك خلال 5-7 أيام عمل في حال تطابق مؤهلاتك مع متطلبات الوظيفة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
