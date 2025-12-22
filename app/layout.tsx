import './globals.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import ClientWrapper from '@/components/ClientWrapper';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'المصرية للتحصيلات كولكشن',
  description: 'موقع الشركة الرسمي للتحصيلات والاستعلامات الميدانية',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} flex flex-col min-h-screen`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
