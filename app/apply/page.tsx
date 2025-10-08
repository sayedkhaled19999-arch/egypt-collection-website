import { Suspense } from "react";
import ApplicationFormContent from "./ApplicationFormContent";

export const metadata = {
  title: "التقديم على وظيفة - المصرية للتحصيلات",
  description: "املأ نموذج التقديم على الوظائف وسنتواصل معك في أقرب وقت",
};

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ApplicationFormContent />
    </Suspense>
  );
}
