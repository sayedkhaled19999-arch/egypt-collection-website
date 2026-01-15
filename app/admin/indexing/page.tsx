'use client';
import { useState } from 'react';

const LINKS = [
  'https://egyptcollections.com/',
  'https://egyptcollections.com/about',
  'https://egyptcollections.com/customers',
  'https://egyptcollections.com/contact',
  'https://egyptcollections.com/jobs',
  'https://egyptcollections.com/jobs/office-collector',
  'https://egyptcollections.com/jobs/field-collector',
  'https://egyptcollections.com/jobs/field-investigator',
  'https://egyptcollections.com/jobs/data-entry'
];

export default function IndexingPage() {
  const [status, setStatus] = useState<string[]>([]);

  const startIndexing = async () => {
    setStatus([]);
    for (const link of LINKS) {
      try {
        const res = await fetch('/api/google-index', {
          method: 'POST',
          body: JSON.stringify({ url: link }),
        });
        const data = await res.json();
        setStatus(prev => [...prev, `${link}: ${data.success ? '✅ نجح' : '❌ فشل: ' + data.error}`]);
      } catch (e) {
        setStatus(prev => [...prev, `${link}: ❌ خطأ اتصال`]);
      }
    }
  };

  return (
    <div className="p-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-5">مسرع أرشفة جوجل (ECC)</h1>
      <button 
        onClick={startIndexing}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
      >
        أرشفة 9 صفحات الآن 🚀
      </button>
      <div className="mt-10 space-y-2">
        {status.map((s, i) => <p key={i} className="text-sm border-b pb-1">{s}</p>)}
      </div>
    </div>
  );
}