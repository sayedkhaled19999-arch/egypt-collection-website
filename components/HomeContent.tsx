'use client';

import dynamic from 'next/dynamic';
import HeroCarousel from '@/components/home/HeroCarousel';
import AboutCard from '@/components/home/AboutCard';
import ValuesSection from '@/components/home/ValuesSection';
import CallToAction from '@/components/home/JoinUsSection';

// ✅ التعديل: شيلنا { ssr: false } عشان جوجل يقرأ أسماء البنوك والمحافظات
// وأضفنا loading component عشان الشكل يبقى حلو وهو بيحمل
const customersSection = dynamic(() => import('@/components/home/customersSection'), { 
  loading: () => <div className="h-40 bg-gray-50 animate-pulse rounded-lg my-8" />
});

const BranchesSection = dynamic(() => import('@/components/home/BranchesSection'), { 
  loading: () => <div className="h-60 bg-gray-50 animate-pulse rounded-lg my-8" />
});

export default function HomeContent() {
  return (
    <>
      {/* 
         ممتاز جداً إنك انتبهت لنقطة الـ h1
         كده الصفحة ليها عنوان رئيسي واحد موجود جوه HeroCarousel
         وده صح 100% للـ SEO
      */}
      <HeroCarousel />
      
      <AboutCard />
      
      <ValuesSection />
      
      {/* جوجل دلوقتي هيقدر يقرأ محتوى السكاشن دي بمجرد ما الصفحة تفتح */}
      <customersSection />
      
      <BranchesSection />
      
      <CallToAction />
    </>
  );
}