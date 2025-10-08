'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { JobCardProps } from './JobCard';

interface JobDetailsModalProps {
  job: JobCardProps;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Job Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{job.title}</h2>

              {/* Job Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

              {/* Job Details */}
              <div className="flex flex-col gap-2 text-gray-600 mb-6">
                <p>
                  <span className="font-semibold">📍 الموقع: </span>
                  {job.location}
                </p>
                <p>
                  <span className="font-semibold">💼 نوع العمل: </span>
                  {job.type}
                </p>
              </div>

              {/* Apply Button */}
              <a
                href={`/apply?job=${encodeURIComponent(job.id)}`}
                className="block w-full bg-gradient-to-r from-[#D90000] to-[#B40000] text-white text-center py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
              >
                قدّم الآن
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
