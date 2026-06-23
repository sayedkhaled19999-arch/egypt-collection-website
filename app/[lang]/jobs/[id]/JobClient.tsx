'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, MapPin, Laptop, Briefcase, CheckCircle, X,
  User, Phone, DollarSign, Clock, Calendar, ArrowRight, ChevronRight, Star, UploadCloud
} from 'lucide-react';

interface JobClientProps {
  id: string;
  lang: string;
  dict: any;
}

export default function JobClient({ id, lang, dict }: JobClientProps) {
  const router = useRouter();
  const job = (dict.jobsData as any)[id];
  const isAr = lang === 'ar';

  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '',
    experience: 'no', previousCompanies: '', cv: null as File | null
  });

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400 gap-4 bg-[#F8F9FA]">
        <h2 className="text-2xl font-bold">{isAr ? 'الوظيفة غير متاحة' : 'Job Not Found'}</h2>
        <button onClick={() => router.push(`/${lang}/jobs`)} className="text-[#2563EB] hover:underline font-medium">
          {isAr ? 'العودة للوظائف' : 'Back to Jobs'}
        </button>
      </div>
    );
  }

  const getIcon = () => {
    if (id.includes('office')) return <Home className="w-6 h-6" />;
    if (id.includes('data')) return <Laptop className="w-6 h-6" />;
    if (id.includes('field')) return <MapPin className="w-6 h-6" />;
    return <Briefcase className="w-6 h-6" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('jobTitle', job.title);
      data.append('experience', formData.experience);
      data.append('previousCompanies', formData.previousCompanies);
      if (formData.cv) data.append('cv', formData.cv);

      const response = await fetch('/api/send-email', { method: 'POST', body: data });
      const result = await response.json();

      if (result.success) {
        alert(dict.jobDetails.form.success_msg);
        setModalOpen(false);
        setFormData({ fullName: '', phone: '', address: '', experience: 'no', previousCompanies: '', cv: null });
      } else {
        alert(dict.jobDetails.form.error_msg);
      }
    } catch {
      alert(dict.jobDetails.form.error_msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir={isAr ? 'rtl' : 'ltr'}>
      <section className="pt-28 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => router.push(`/${lang}/jobs`)}
              className="text-sm text-gray-400 hover:text-[#2563EB] transition-colors mb-6 flex items-center gap-1"
            >
              {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 rotate-180" />}
              {isAr ? 'العودة للوظائف' : 'Back to Jobs'}
            </button>

            <div className="flex items-start gap-5 mb-6">
              <div className="p-3.5 bg-[#2563EB] rounded-xl text-white shrink-0 shadow-sm">
                {getIcon()}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                    {job.location}
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">
                    {job.type}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 space-y-8"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  {isAr ? 'تفاصيل الوظيفة' : 'Job Details'}
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: DollarSign, label: dict.jobDetails.salary, val: job.salary },
                    { icon: Clock, label: dict.jobDetails.work_hours, val: job.hours },
                    { icon: Calendar, label: dict.jobDetails.vacation, val: job.vacation },
                    { icon: MapPin, label: dict.jobDetails.location, val: job.location },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <p className="font-medium text-gray-800 text-sm">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {job.details.map((line: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                      <p className="text-gray-600 leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-[#1d4ed8] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mb-6"
                >
                  {dict.jobDetails.apply_now}
                  <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </button>

                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {dict.jobDetails.extra_labels.skills}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements?.map((req: string, idx: number) => (
                    <span key={idx} className="bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 border border-gray-100">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{dict.jobDetails.form.title}</h2>
                  <p className="text-sm text-[#2563EB] font-medium mt-0.5">{job.title}</p>
                </div>
                <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600" onClick={() => setModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <User className="absolute mt-3.5 ml-3 text-gray-400 w-5 h-5" />
                    <input type="text" required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                      placeholder={dict.jobDetails.form.name}
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Phone className="absolute mt-3.5 ml-3 text-gray-400 w-5 h-5" />
                    <input type="tel" required dir="ltr"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <MapPin className="absolute mt-3.5 ml-3 text-gray-400 w-5 h-5" />
                    <input type="text" required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                      placeholder={dict.jobDetails.form.address}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobDetails.form.experience_label}</label>
                    <div className="flex gap-3">
                      {['yes', 'no'].map((val) => (
                        <label key={val}
                          className={`flex-1 cursor-pointer py-2.5 px-4 rounded-xl border-2 text-center transition-all text-sm ${
                            formData.experience === val
                              ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-medium'
                              : 'border-gray-200 hover:border-blue-200 text-gray-500'
                          }`}
                        >
                          <input type="radio" name="experience" value={val} className="hidden"
                            checked={formData.experience === val}
                            onChange={e => setFormData({ ...formData, experience: e.target.value })}
                          />
                          {val === 'yes' ? dict.jobDetails.form.exp_yes : dict.jobDetails.form.exp_no}
                        </label>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.experience === 'yes' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobDetails.form.prev_companies}</label>
                        <input type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none bg-gray-50 text-sm"
                          value={formData.previousCompanies}
                          onChange={e => setFormData({ ...formData, previousCompanies: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{dict.jobDetails.form.cv_label}</label>
                    <div className="relative cursor-pointer">
                      <input type="file" accept=".pdf,.doc,.docx"
                        onChange={e => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                      />
                      <div className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
                        formData.cv ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-[#2563EB] hover:bg-blue-50'
                      }`}>
                        <UploadCloud className={`w-7 h-7 mx-auto mb-1 ${formData.cv ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`text-xs font-medium ${formData.cv ? 'text-green-700' : 'text-gray-500'}`}>
                          {formData.cv ? formData.cv.name : (isAr ? 'اضغط لرفع الملف' : 'Click to upload CV')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-[#1d4ed8] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0 flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {dict.jobDetails.form.sending}</>
                    ) : dict.jobDetails.form.submit_btn}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
