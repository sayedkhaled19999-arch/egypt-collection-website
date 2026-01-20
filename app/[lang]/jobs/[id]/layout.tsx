// --- START OF FILE app/[lang]/jobs/[id]/layout.tsx ---

export default function JobDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // نفس الكلام: ممنوع html و body هنا
  return (
    <>
      {children}
    </>
  );
}