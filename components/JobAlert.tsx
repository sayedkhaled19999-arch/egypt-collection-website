'use client';

import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface JobAlertProps {
  lang: string;
  dict: any;
}

export default function JobAlert({ lang, dict }: JobAlertProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('type', 'job-alert');
      formData.append('email', email);

      const res = await fetch('/api/send-email', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        toast.success(dict.jobAlert.success);
        setEmail('');
      } else {
        toast.error(dict.jobAlert.error);
      }
    } catch {
      toast.error(dict.jobAlert.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{dict.jobAlert.title}</h3>
          <p className="text-white/80 mb-6">{dict.jobAlert.desc}</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.jobAlert.email_placeholder}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-[#2563EB] font-bold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 min-w-[130px]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {dict.jobAlert.submitting}
                </>
              ) : (
                dict.jobAlert.submit_btn
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
