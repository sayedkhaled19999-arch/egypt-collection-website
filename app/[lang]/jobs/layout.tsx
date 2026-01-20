// --- START OF FILE app/[lang]/jobs/layout.tsx ---
import type { Metadata } from 'next';

// الميتا داتا هنا اختيارية، ممكن تشيلها لو عايز تعتمد على page.tsx
export const metadata: Metadata = {
  title: 'ECC Jobs',
  description: 'Join ECC Team',
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // لاحظ: شيلنا html و body
  // بنرجع المحتوى زي ما هو (Fragment)
  return (
    <>
      {children}
    </>
  );
}