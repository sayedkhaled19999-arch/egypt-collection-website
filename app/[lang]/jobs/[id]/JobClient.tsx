// --- START OF FILE app/[lang]/jobs/[id]/JobClient.tsx ---
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, MapPin, Laptop, Briefcase, CheckCircle, X, 
  User, Phone, DollarSign, Clock, Calendar, ArrowRight, ChevronRight, ChevronLeft, Star, UploadCloud 
} from 'lucide-react';

interface JobClientProps {
  id: string;
  lang: string;
  dict: any;
}

export default function JobClient({ id, lang, dict }: JobClientProps) {
  const router = useRouter();
  // @ts-ignore
  const job = dict.jobsData[id];

  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '',
    experience: 'no', previousCompanies: '', cv: null as File | null
  });

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 gap-4 bg-[#F8F9FA]">
        <h2 className="text-2xl font-bold">{lang === 'ar' ? 'الوظيفة غير متاحة' : 'Job Not Found'}</h2>
        <button onClick={() => router.push(`/${lang}/jobs`)} className="text-[#2563EB] hover:underline font-bold">
          {lang === 'ar' ? 'العودة للوظائف' : 'Back to Jobs'}
        </button>
      </div>
    );
  }

  const getIcon = () => {
    if (id.includes('office')) return <Home className="w-8 h-8 text-white" />;
    if (id.includes('data')) return <Laptop className="w-8 h-8 text-white" />;
    if (id.includes('field')) return <MapPin className="w-8 h-8 text-white" />;
    return <Briefcase className="w-8 h-8 text-white" />;
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
    } catch (error) {
      alert(dict.jobDetails.form.error_msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const BackIcon = lang === 'ar' ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Banner - Clean & Professional (No Blue Background) */}
      <div className="pt-28 pb-10 text-center container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
                {job.title}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                {job.desc}
            </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 max-w-5xl mx-auto border border-gray-100"
        >
          
          {/* Card Header Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b pb-10 border-gray-100">
            <div className="p-6 bg-[#2563EB] rounded-2xl shadow-lg shadow-blue-500/20 shrink-0">
                {getIcon()}
            </div>
            <div className="text-center md:ltr:text-left md:rtl:text-right flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{job.title}</h2>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
                        {job.location}
                    </span>
                    <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-100">
                        {job.type}
                    </span>
                </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Sidebar info */}
            <div className="md:col-span-1 space-y-8">
                <div className="bg-[#FAFAFA] p-6 rounded-3xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-lg">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        {dict.jobDetails.extra_labels.skills}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {job.requirements && job.requirements.map((req: string, idx: number) => (
                            <span key={idx} className="bg-white px-3 py-2 rounded-lg text-xs font-bold text-gray-600 shadow-sm border border-gray-200">{req}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Details */}
            <div className="md:col-span-2 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                        { icon: DollarSign, label: dict.jobDetails.salary, val: job.salary },
                        { icon: Clock, label: dict.jobDetails.work_hours, val: job.hours },
                        { icon: Calendar, label: dict.jobDetails.vacation, val: job.vacation },
                        { icon: MapPin, label: dict.jobDetails.location, val: job.location }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group">
                            <div className="bg-blue-50 p-3 rounded-xl text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                                <p className="font-bold text-gray-900 text-sm md:text-base">{item.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-2xl text-gray-900 border-b pb-4">{lang === 'ar' ? 'تفاصيل الوظيفة' : 'Job Description'}</h3>
                    <div className="space-y-4">
                        {job.details.map((line: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="mt-1.5 shrink-0">
                                    <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg">{line}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Action Buttons (Bottom) */}
          <div className="mt-14 pt-10 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* زر العودة للوظائف - لون هادي */}
            <button 
                onClick={() => router.push(`/${lang}/jobs`)} 
                className="order-2 md:order-1 px-8 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <BackIcon className="w-5 h-5" />
              {dict.jobDetails.back_to_jobs}
            </button>

            {/* زر التقديم - لون أساسي */}
            <button 
                onClick={() => setModalOpen(true)}
                className="order-1 md:order-2 bg-[#2563EB] text-white py-4 px-12 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/30 hover:bg-[#1d4ed8] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 w-full md:w-auto"
            >
              {dict.jobDetails.apply_now}
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </motion.div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{dict.jobDetails.form.title}</h2>
                    <p className="text-[#2563EB] font-medium text-sm mt-1">{job.title}</p>
                </div>
                <button 
                    className="p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border border-gray-100" 
                    onClick={() => setModalOpen(false)}
                >
                    <X size={20} />
                </button>
            </div>
            
            {/* Modal Form */}
            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Personal Info */}
                <div className="space-y-4">
                    <div className="relative group">
                        <User className="absolute top-3.5 left-3 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-[#2563EB] transition-colors" />
                        <input 
                            type="text" required 
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder={dict.jobDetails.form.name}
                            value={formData.fullName} 
                            onChange={e => setFormData({...formData, fullName: e.target.value})} 
                        />
                    </div>
                    
                    <div className="relative group">
                        <Phone className="absolute top-3.5 left-3 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-[#2563EB] transition-colors" />
                        <input 
                            type="tel" required dir="ltr"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all bg-gray-50 focus:bg-white text-right placeholder:text-left"
                            placeholder="01xxxxxxxxx"
                            value={formData.phone} 
                            onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                    </div>

                    <div className="relative group">
                        <MapPin className="absolute top-3.5 left-3 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-[#2563EB] transition-colors" />
                        <input 
                            type="text" required 
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder={dict.jobDetails.form.address}
                            value={formData.address} 
                            onChange={e => setFormData({...formData, address: e.target.value})} 
                        />
                    </div>
                </div>

                {/* Experience Section */}
                <div className="pt-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">{dict.jobDetails.form.experience_label}</label>
                    <div className="flex gap-4">
                        <label className={`flex-1 cursor-pointer py-3 px-4 rounded-xl border-2 text-center transition-all ${formData.experience === 'yes' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold' : 'border-gray-200 hover:border-blue-200 text-gray-600'}`}>
                            <input type="radio" name="experience" value="yes" className="hidden" checked={formData.experience === 'yes'} onChange={e => setFormData({...formData, experience: e.target.value})}/> 
                            {dict.jobDetails.form.exp_yes}
                        </label>
                        <label className={`flex-1 cursor-pointer py-3 px-4 rounded-xl border-2 text-center transition-all ${formData.experience === 'no' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold' : 'border-gray-200 hover:border-blue-200 text-gray-600'}`}>
                            <input type="radio" name="experience" value="no" className="hidden" checked={formData.experience === 'no'} onChange={e => setFormData({...formData, experience: e.target.value})}/> 
                            {dict.jobDetails.form.exp_no}
                        </label>
                    </div>
                </div>

                {/* Previous Companies (Animation) */}
                <AnimatePresence>
                    {formData.experience === 'yes' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{dict.jobDetails.form.prev_companies}</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none bg-gray-50"
                                value={formData.previousCompanies} 
                                onChange={e => setFormData({...formData, previousCompanies: e.target.value})} 
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CV Upload */}
                <div className="pt-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">{dict.jobDetails.form.cv_label}</label>
                    <div className="relative group cursor-pointer">
                        <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFormData({...formData, cv: e.target.files?.[0] || null})} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"/>
                        <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${formData.cv ? 'border-green-500 bg-green-50' : 'border-gray-300 group-hover:border-[#2563EB] group-hover:bg-blue-50'}`}>
                            <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${formData.cv ? 'text-green-600' : 'text-gray-400 group-hover:text-[#2563EB]'}`} />
                            <span className={`text-sm font-medium ${formData.cv ? 'text-green-700' : 'text-gray-500 group-hover:text-[#2563EB]'}`}>
                                {formData.cv ? formData.cv.name : (lang === 'ar' ? 'اضغط لرفع الملف (PDF, Word)' : 'Click to upload CV')}
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#1d4ed8] hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0 flex items-center justify-center gap-2 mt-4"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                            {dict.jobDetails.form.sending}
                        </>
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