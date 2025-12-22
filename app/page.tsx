'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import HomeContent from '@/app/HomeContent';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      <div
        className={`transition-opacity duration-1000 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {!loading && (
          <>
            <HomeContent />
          </>
        )}
      </div>
    </>
  );
}
