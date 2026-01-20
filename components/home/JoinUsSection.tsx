'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { 
  Briefcase, Trophy, Clock, Users, 
  ShieldCheck, HeartHandshake, TrendingUp, 
  GraduationCap, FileText, Gem, Lock, Star 
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

interface JoinUsProps {
  lang: string;
  dict: any;
}

export default function JoinUsSection({ lang, dict }: JoinUsProps) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const perks = [
    { 
      icon: <Briefcase className="w-10 h-10" />, 
      title: dict.perks.salary, 
      description: dict.perks.salary_desc 
    },
    { 
      icon: <Trophy className="w-10 h-10" />, 
      title: dict.perks.rewards, 
      description: dict.perks.rewards_desc 
    },
    { 
      icon: <TrendingUp className="w-10 h-10" />, 
      title: dict.perks.commission, 
      description: dict.perks.commission_desc 
    },
    { 
      icon: <Clock className="w-10 h-10" />, 
      title: dict.perks.hours, 
      description: dict.perks.hours_desc 
    },
    { 
      icon: <ShieldCheck className="w-10 h-10" />, 
      title: dict.perks.insurance, 
      description: dict.perks.insurance_desc 
    },
    { 
      icon: <HeartHandshake className="w-10 h-10" />, 
      title: dict.perks.environment, 
      description: dict.perks.environment_desc 
    },
    { 
      icon: <Users className="w-10 h-10" />, 
      title: dict.perks.team, 
      description: dict.perks.team_desc 
    },
    { 
      icon: <Lock className="w-10 h-10" />, 
      title: dict.perks.stability, 
      description: dict.perks.stability_desc 
    },
    { 
      icon: <GraduationCap className="w-10 h-10" />, 
      title: dict.perks.training, 
      description: dict.perks.training_desc 
    },
    { 
      icon: <FileText className="w-10 h-10" />, 
      title: dict.perks.contracts, 
      description: dict.perks.contracts_desc 
    },
    { 
      icon: <Gem className="w-10 h-10" />, 
      title: dict.perks.appreciation, 
      description: dict.perks.appreciation_desc 
    },
    { 
      icon: <Star className="w-10 h-10" />, 
      title: dict.perks.opportunity, 
      description: dict.perks.opportunity_desc 
    }
  ];

  return (
    <section className="py-16 md:py-20 flex justify-center bg-[#F4F4F4]">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14 max-w-6xl w-full">

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-12">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#2563EB] mb-4">
              {dict.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[#4B4B4B] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              {dict.desc}
            </motion.p>
          </div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={containerVariants}>
            {perks.map((perk, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="group relative overflow-hidden flex flex-col items-center text-center gap-3 p-6 bg-[#F8F9FA] rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-100"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/0 via-white/0 to-blue-50/50 transition-all duration-300 rounded-2xl" />
                
                <div className="relative z-10 text-[#2563EB] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {perk.icon}
                </div>
                
                <h3 className="relative z-10 text-lg font-bold text-[#353535] transition-colors duration-300 group-hover:text-[#2563EB]">
                  {perk.title}
                </h3>
                
                <p className="relative z-10 text-sm text-[#666] leading-relaxed group-hover:text-[#4B4B4B]">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-14 text-center">
            <Link 
              href={`/${lang}/jobs`} 
              className="inline-block bg-[#2563EB] text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[#1e4db7] hover:scale-105 hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              {dict.btn}
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}