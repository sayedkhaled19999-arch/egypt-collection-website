'use client';
import { useEffect, useState } from 'react';
import Preloader from './Preloader';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
