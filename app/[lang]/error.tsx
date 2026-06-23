'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#333] mb-4">Something went wrong!</h1>
        <p className="text-[#4B4B4B] mb-8">An unexpected error occurred. Please try again.</p>
        <button onClick={reset}
          className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-all shadow-lg">
          Try Again
        </button>
      </div>
    </div>
  );
}
