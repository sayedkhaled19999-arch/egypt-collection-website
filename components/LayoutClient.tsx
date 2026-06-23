'use client';

import { useState } from 'react';
import CookieConsent from './CookieConsent';
import SearchModal from './SearchModal';
import JobAlert from './JobAlert';

interface Props {
  children: React.ReactNode;
  lang: string;
  dict: any;
}

export default function LayoutClient({ children, lang, dict }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {children}
      <CookieConsent dict={dict.cookie} />
      <SearchModal
        lang={lang}
        dict={dict}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <JobAlert lang={lang} dict={dict} />
    </>
  );
}
