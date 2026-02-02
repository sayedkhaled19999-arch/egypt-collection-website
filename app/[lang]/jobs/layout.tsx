// --- START OF FILE app/[lang]/jobs/layout.tsx ---
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // بنسيبها فاضية أو عامة لأن page.tsx هيعملها override
  title: 'ECC Jobs', 
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
}