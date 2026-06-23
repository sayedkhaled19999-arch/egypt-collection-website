'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppProps {
  dict: any;
}

export default function WhatsAppButton({ dict }: WhatsAppProps) {
  const phone = '201110600280';
  const encodedMsg = encodeURIComponent(dict.message || "Hello, I'm interested in ECC jobs");

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
      <span className="hidden md:inline text-sm font-bold">{dict.text}</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
    </a>
  );
}
