'use client';

import { useState } from 'react';
import Preloader from './Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && children}
    </>
  );
}
