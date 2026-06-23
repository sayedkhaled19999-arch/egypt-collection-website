'use client';
import { useState } from 'react';

const LOCALES = ['ar', 'en'];

const ALL_URLS = [
  '/',
  '/about',
  '/partners',
  '/contact',
  '/jobs',
  '/blog',
  '/faq',
  '/privacy',
  '/services/collection',
  '/services/investigation',
  ...['office-collector', 'field-collector', 'field-investigator', 'data-entry'].map(id => `/jobs/${id}`),
  ...['dokki-headquarters', 'monufia', 'beheira', 'minya', 'ismailia', 'qena'].flatMap(slug => [`/careers/${slug}`, `/branches/${slug}`]),
  ...['how-to-apply', 'office-vs-field', 'field-investigator-guide', 'data-entry-career', 'debt-collection-tips', 'credit-investigation-guide', 'ecc-company-profile', 'career-in-collection'].map(slug => `/blog/${slug}`),
].flatMap(path => LOCALES.map(lang => `https://egyptcollections.com/${lang}${path}`));

export default function IndexingPage() {
  const [status, setStatus] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const startIndexing = async () => {
    setRunning(true);
    setStatus([]);
    for (const url of ALL_URLS) {
      try {
        const res = await fetch('/api/google-index', {
          method: 'POST',
          body: JSON.stringify({ url }),
        });
        const data = await res.json();
        setStatus(prev => [...prev, `${url}: ${data.success ? '✅' : '❌ ' + (data.error || 'unknown')}`]);
      } catch {
        setStatus(prev => [...prev, `${url}: ❌ connection error`]);
      }
    }
    setRunning(false);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto" dir="ltr">
      <h1 className="text-2xl font-bold mb-2">Google Indexing API - ECC</h1>
      <p className="text-gray-500 mb-5 text-sm">{ALL_URLS.length} URLs will be submitted</p>
      <button
        onClick={startIndexing}
        disabled={running}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {running ? 'Indexing...' : `Submit ${ALL_URLS.length} URLs 🚀`}
      </button>
      <div className="mt-10 space-y-1 font-mono text-xs max-h-[70vh] overflow-y-auto">
        {status.map((s, i) => <p key={i} className="border-b pb-1">{s}</p>)}
      </div>
    </div>
  );
}
