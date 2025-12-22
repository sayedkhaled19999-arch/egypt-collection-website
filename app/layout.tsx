import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'المصرية للتحصيلات كولكشن',
  description: 'موقع الشركة الرسمي للتحصيلات الميدانية',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} flex flex-col min-h-screen`}>
        <Navbar />
        <ClientWrapper>
          <main className="flex-grow">{children}</main>
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
