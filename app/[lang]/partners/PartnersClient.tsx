// --- START OF FILE components/PartnersClient.tsx ---

'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

interface Bank {
  nameAr: string;
  nameEn: string;
  src: string;
}

const banks: Bank[] = [
  { nameAr: 'بنك الأهلي المصري', nameEn: 'National Bank of Egypt', src: '/banks/ahly.svg' },
  { nameAr: 'بنك مصر', nameEn: 'Banque Misr', src: '/banks/banquemisr.svg' },
  { nameAr: 'بنك القاهرة', nameEn: 'Banque du Caire', src: '/banks/cairobank.svg' },
  { nameAr: 'بنك التعمير والاسكان', nameEn: 'Housing & Development Bank', src: '/banks/housingbank.svg' },
  { nameAr: 'بنك الامارات دبي الوطني', nameEn: 'Emirates NBD', src: '/banks/NBDEmirate.svg' },
  { nameAr: 'مصرف ابو ظبي الاسلامي', nameEn: 'Abu Dhabi Islamic Bank', src: '/banks/Adib.svg' },
  { nameAr: 'بنك الكويتي الوطني', nameEn: 'National Bank of Kuwait', src: '/banks/NationalBankofKuwait.svg' },
  { nameAr: 'بنك المصري الخليجي', nameEn: 'EGBANK', src: '/banks/EGBANK.svg' },
  { nameAr: 'بنك العربي الأفريقي', nameEn: 'Arab African Int. Bank', src: '/banks/ArabAfricanBank.svg' },
  { nameAr: 'بنك الأهلي الكويتي', nameEn: 'Al Ahli Bank of Kuwait', src: '/banks/AlAhliBankofKuwait.svg' },
  { nameAr: 'بنك قناة السويس', nameEn: 'Suez Canal Bank', src: '/banks/SuezCanalBank.svg' },
  { nameAr: 'بنك المشرق', nameEn: 'Mashreq Bank', src: '/banks/Mashreq.svg' },
  { nameAr: 'بنك نكست', nameEn: 'Bank NXT', src: '/banks/BankNXT.svg' },
];

const infiniteBanks = [...banks, ...banks];

interface PartnersClientProps {
  lang: string;
  dict: any;
}

export default function PartnersClient({ lang, dict }: PartnersClientProps) {

  const sliderSettings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 6000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
    swipe: false,
    draggable: false,
    rtl: lang === 'ar', 
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3, autoplaySpeed: 2000 } },
      { breakpoint: 480, settings: { slidesToShow: 2, autoplaySpeed: 2000 } },
    ],
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      
      {/* ===== HEADER ===== */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-4">
          {dict.partnersPage.hero_title}
        </h1>

        <div className="text-[#4B4B4B] max-w-3xl mx-auto mb-12 space-y-3 px-4">
          <p className="text-lg md:text-xl">
            {dict.partnersPage.hero_desc1}
          </p>
          <p className="text-lg md:text-xl">
            {dict.partnersPage.hero_desc2}
          </p>
        </div>

        {/* ===== SEAMLESS SLIDER ===== */}
        <div className="max-w-6xl mx-auto px-4 overflow-hidden" key={lang}>
          <Slider {...sliderSettings}>
            {infiniteBanks.map((bank, i) => (
              <div key={i}>
                <div className="flex items-center justify-center h-[90px] sm:h-[120px] md:h-[140px]">
                  <div className="relative w-[80px] h-[60px] sm:w-[110px] sm:h-[80px] md:w-[130px] md:h-[90px]">
                    <Image
                      src={bank.src || '/banks/default.svg'}
                      alt={lang === 'ar' ? bank.nameAr : bank.nameEn}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-2 text-center">
          {dict.partnersPage.grid_title}
        </h2>

        <p className="text-center text-[#2563EB] mb-8 text-lg md:text-xl font-medium px-4">
          {dict.partnersPage.grid_subtitle}
        </p>

        <div
          className="
            grid gap-6
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
          "
        >
          {banks.map((bank, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <BankCard bank={bank} language={lang} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BankCard({ bank, language }: { bank: Bank, language: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-4 h-40 hover:scale-105 transition border border-transparent hover:border-[#2563EB]/20">
      <div className="relative w-24 h-20 mb-2">
        <Image
          src={bank.src || '/banks/default.svg'}
          alt={language === 'ar' ? bank.nameAr : bank.nameEn}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-sm font-bold text-center text-[#353535]">
        {language === 'ar' ? bank.nameAr : bank.nameEn}
      </h3>
    </div>
  );
}