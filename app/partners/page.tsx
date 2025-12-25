'use client';

import Image from 'next/image';
import Slider from "react-slick";
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

export default function PartnersPage() {

  const sliderSettings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
    swipe: true,
    draggable: true,
    rtl: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen">

      {/* Header */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-4">
          شركائنا المتميزون
        </h1>

        <div className="text-[#4B4B4B] max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-lg md:text-xl">
            شوف شغلنا مع أهم البنوك والمؤسسات المالية في الجمهورية.
          </p>
          <p className="text-lg md:text-xl">
            بنفخر بشراكاتنا اللتي تثبت التزامنا بالجودة والابتكار.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-6xl mx-auto px-4 overflow-hidden">
          <Slider {...sliderSettings}>
            {banks.map((bank, i) => (
              <div key={i} className="flex justify-center">
                <div className="relative w-[120px] h-[80px]">
                  <Image src={bank.src} alt={bank.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Adaptive Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-2 text-center">
          البنوك اللي بنتعامل معاها
        </h2>

        <p className="text-center text-[#2563EB] mb-8 text-lg md:text-xl font-medium">
          فخورين بشركائنا اللي بيخلونا نتميز ونكبر كل يوم
        </p>

        <div
          className="
            grid gap-6 justify-center
            [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]
            sm:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]
            md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]
            lg:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
          "
        >
          {banks.map((bank, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              transition={{ delay: i * 0.1, duration: 0.6 }}
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
    <div
      className="
        bg-white rounded-2xl shadow-lg
        w-full max-w-[240px] h-[200px]
        flex flex-col items-center justify-center p-4
        hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]
        transition-all duration-300
      "
    >
      <div className="relative w-24 h-24 mb-3">
        <Image src={bank.src} alt={bank.name} fill className="object-contain" />
      </div>
      <h3 className="text-sm font-bold text-center line-clamp-2">
        {bank.name}
      </h3>
    </div>
  );
}
