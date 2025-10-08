'use client';

import { MapPin, X } from 'lucide-react';
import { JobCardProps } from './JobCard';
import { motion, AnimatePresence } from 'framer-motion';

interface JobDetailsModalProps {
  job: JobCardProps;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailsModalAnimated({ job, isOpen, onClose }: JobDetailsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* الخلفية المظلمة */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />

          {/* محتوى الـ Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg mx-4 sm:mx-6 md:mx-0 h-full sm:h-auto max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>

            {/* العنوان */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h2>

            {/* الوصف */}
            <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

            {/* المعلومات الإضافية */}
            <div className="flex flex-col gap-2 text-gray-600 mb-6">
              <p>
                <span className="font-semibold">📍 الموقع: </span>{job.location}
              </p>
              <p>
                <span className="font-semibold">💼 نوع العمل: </span>{job.type}
              </p>
            </div>

            {/* زر التقديم */}
            <a
              href={`/apply?job=${encodeURIComponent(job.id)}`}
              className="block w-full bg-[#D90000] text-white text-center py-3 rounded-xl hover:bg-[#B40000] transition-all font-semibold"
            >
              قدّم الآن
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
