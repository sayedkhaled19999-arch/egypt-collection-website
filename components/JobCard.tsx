'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import JobDetailsModal from "@/components/JobDetailsModal";

export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

export default function JobCard({ id, title, description, location, type }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        dir="rtl"
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 
                   hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        {/* العنوان + نوع الوظيفة */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <span className="bg-red-100 text-[#D90000] text-sm font-medium px-4 py-1.5 rounded-full">
            {type}
          </span>
        </div>

        {/* الوصف */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* الموقع */}
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <MapPin className="w-5 h-5 text-[#D90000]" />
          <span>{location}</span>
        </div>

        {/* زر التفاصيل */}
        <button
          onClick={handleOpenModal}
          className="block w-full bg-[#D90000] text-white text-center py-3 
                     rounded-xl hover:bg-[#B40000] hover:scale-[1.02] 
                     transition-all duration-300 font-semibold"
        >
          عرض التفاصيل
        </button>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={{ id, title, description, location, type }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
