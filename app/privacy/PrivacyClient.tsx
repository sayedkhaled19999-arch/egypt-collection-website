'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Server,
  Phone,
  Facebook,
} from 'lucide-react';

/* ================= Animations ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

/* ================= Client Component ================= */
export default function PrivacyClient() {
  return (
    <main className="bg-[#F4F4F4] overflow-hidden" dir="rtl">

      {/* ================= Hero ================= */}
      <section className="py-24 px-4 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-8"
        >
          سياسة الخصوصية
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed text-[#4B4B4B] mb-10"
        >
          في <strong>ECC Collections</strong>، إحنا فاهمين كويس يعني إيه "بيانات عملاء بنوك". 
          عشان كدا، الخصوصية وأمان المعلومات عندنا مش مجرد كلام، دي <strong>أساس شغلنا</strong> وجزء من التزامنا قدام الجهات الرقابية.
        </motion.p>

        <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-3">
          <Highlight icon={<Lock size={28} />} text="سرية تامة للبيانات" />
          <Highlight icon={<Server size={28} />} text="التزام بمعايير البنوك" />
          <Highlight icon={<UserCheck size={28} />} text="استخدام قانوني فقط" />
        </div>
      </section>

      {/* ================= Main Content ================= */}
      <section className="max-w-5xl mx-auto px-4 space-y-12 pb-24">
        
        {/* 1. مقدمة هامة */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-[#2563EB] mb-6 flex items-center gap-2">
                <ShieldCheck /> إحنا بنجمع بيانات إيه وليه؟
            </h2>
            <Paragraph>
                إحنا شركة "خدمات"، يعني دورنا تنفيذي. البيانات اللي بنتعامل معاها بتجيلنا من مصدرين أساسيين:
            </Paragraph>
            <ul className="list-disc list-inside space-y-3 mt-4 text-[#4B4B4B] text-lg leading-loose marker:text-[#2563EB]">
                <li><strong>بيانات من البنوك الموكلة لينا:</strong> دي بيانات بتجيلنا بتفويض رسمي عشان نؤدي مهام الاستعلام أو التحصيل، وبنتعامل معاها بمنتهى السرية وبنرجعها للبنك تاني بمجرد انتهاء المأمورية.</li>
                <li><strong>بيانات بتقدمها أنت بنفسك:</strong> زي لما تبعتلنا الـ CV بتاعك للتوظيف، أو لما تملى استمارة تواصل على صفحتنا أو موقعنا عشان تستفسر عن خدمة.</li>
            </ul>
        </div>

        {/* 2. التوظيف وإعلانات فيسبوك */}
        <div className="grid gap-8 md:grid-cols-2">
            <InfoCard 
                icon={<FileText size={32} />}
                title="التقديم للوظائف"
                text="لو بعتلنا الـ CV بتاعك، تأكد إنه هيفضل في إدارة الـ HR بس، ومش هيتم استخدامه لأي غرض غير إننا نتواصل معاك لو ليك نصيب تشتغل معانا."
            />
            <InfoCard 
                icon={<Facebook size={32} />}
                title="إعلانات فيسبوك"
                text="لما تملى (Form) على إعلاناتنا، إحنا بناخد الاسم ورقم التليفون عشان نكلمك نرد على استفسارك بخصوص خدماتنا للشركات والبنوك، مش عشان نبيع رقمك لحد."
            />
        </div>

        {/* 3. مشاركة البيانات */}
        <div className="bg-[#2563EB] text-white rounded-3xl p-8 md:p-12 shadow-lg text-center">
             <h2 className="text-2xl font-bold mb-4">هل بنشارك بياناتك مع حد؟</h2>
             <p className="text-lg leading-loose max-w-3xl mx-auto opacity-90">
                إجابة قاطعة: <strong>لا.</strong><br/>
                إحنا لا بنبيع بيانات، ولا بنأجرها، ولا بنطلعها لأي طرف تالت.
                بيانات البنوك خط أحمر، وبيانات المتقدمين للوظائف أمانة عندنا.
             </p>
        </div>

        {/* 4. التواصل */}
        <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-[#4B4B4B] mb-4">عندك استفسار؟</h3>
            <p className="text-[#4B4B4B] mb-6">لو عندك أي قلق أو سؤال بخصوص بياناتك، تقدر تكلمنا أو تزورنا في مقر الشركة.</p>
            <div className="inline-flex flex-col items-center bg-white px-8 py-6 rounded-2xl shadow-md">
                <div className="text-[#2563EB] mb-2"><Phone size={24} /></div>
                <p className="font-bold text-lg text-[#4B4B4B]">30 شارع هارون - ميدان المساحة - الدقي</p>
                <p className="text-[#4B4B4B] mt-1">Info@egyptcollections.com</p>
            </div>
        </div>

      </section>
    </main>
  );
}

/* ================= Helper Components ================= */
function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="text-lg leading-[2] text-[#4B4B4B]"
    >
      {children}
    </motion.div>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-8 shadow-md text-center border border-gray-100"
    >
      <div className="flex justify-center text-[#2563EB] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#333]">{title}</h3>
      <p className="text-[#4B4B4B] leading-relaxed text-sm md:text-base">{text}</p>
    </motion.div>
  );
}

function Highlight({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
    >
      <div className="text-[#2563EB] mb-2">
        {icon}
      </div>
      <p className="font-semibold text-[#4B4B4B] text-sm">{text}</p>
    </motion.div>
  );
}