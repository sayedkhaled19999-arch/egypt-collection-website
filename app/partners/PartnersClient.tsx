'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

interface Bank {
  name: string;
  src: string;
}

const banks: Bank[] = [
  { name: 'بنك الأهلي المصري', src: '/banks/ahly.svg' },
  { name: 'بنك مصر', src: '/banks/banquemisr.svg' },
  { name: 'بنك القاهرة', src: '/banks/cairobank.svg' },
  { name: 'بنك التعمير والاسكان', src: '/banks/housingbank.svg' },
  { name: 'بنك الامارات دبي الوطني', src: '/banks/NBDEmirate.svg' },
  { name: 'مصرف ابو ظبي الاسلامي', src: '/banks/Adib.svg' },
  { name: 'بنك الكويتي الوطني', src: '/banks/NationalBankofKuwait.svg' },
  { name: 'بنك المصري الخليجي', src: '/banks/EGBANK.svg' },
  { name: 'بنك العربي الأفريقي', src: '/banks/ArabAfricanBank.svg' },
  { name: 'بنك الأهلي الكويتي', src: '/banks/AlAhliBankofKuwait.svg' },
  { name: 'بنك قناة السويس', src: '/banks/SuezCanalBank.svg' },
  { name: 'بنك المشرق', src: '/banks/Mashreq.svg' },
  { name: 'بنك نكست', src: '/banks/BankNXT.svg' },
];

// تكرار البنوك = seamless loop حقيقي
const infiniteBanks = [...banks, ...banks];

export default function PartnersClient() {
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
    rtl: true,
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
    <div className="bg-[#F4F4F4] min-h-screen" dir="rtl">
      {/* ===== HEADER ===== */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-4">
          شركائنا المتميزون
        </h1>

        <div className="text-[#4B4B4B] max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-lg md:text-xl">
            شوف شغلنا مع أهم البنوك والمؤسسات المالية في الجمهورية.
          </p>
          <p className="text-lg md:text-xl">
            بنفخر بشراكاتنا اللي بتأكد التزامنا بالجودة والاحتراف.
          </p>
        </div>

        {/* ===== SEAMLESS SLIDER ===== */}
        <div className="max-w-6xl mx-auto px-4 overflow-hidden">
          <Slider {...sliderSettings}>
            {infiniteBanks.map((bank, i) => (
              <div key={i}>
                <div className="flex items-center justify-center h-[90px] sm:h-[120px] md:h-[140px]">
                  <div className="relative w-[80px] h-[60px] sm:w-[110px] sm:h-[80px] md:w-[130px] md:h-[90px]">
                    <Image
                      src={bank.src || '/banks/default.svg'}
                      alt={bank.name}
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
          البنوك اللي بنتعامل معاها
        </h2>

        <p className="text-center text-[#2563EB] mb-8 text-lg md:text-xl font-medium">
          فخورين بشركائنا اللي بيخلونا نكبر كل يوم
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
              <BankCard bank={bank} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BankCard({ bank }: { bank: Bank }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-4 h-40 hover:scale-105 transition">
      <div className="relative w-24 h-20 mb-2">
        <Image
          src={bank.src || '/banks/default.svg'}
          alt={bank.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-sm font-bold text-center">{bank.name}</h3>
    </div>
  );
}