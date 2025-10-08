import Link from 'next/link';
import Image from 'next/image';
import { UserCheck, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#F4F4F4] text-[#353535]" dir="rtl">
      {/* ===== قسم Hero الرئيسي ===== */}
      <section className="relative bg-[#D90000] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            مرحباً بك في المصرية للتحصيلات كولكشن
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#F4F4F4] leading-relaxed">
            نحن نبني المستقبل معاً من خلال الابتكار والتميز في تقديم الحلول
          </p>
          <div className="flex justify-center">
            <Link
              href="/jobs"
              className="inline-block bg-white text-[#D90000] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#B4B4B4] transition-colors shadow-lg"
            >
              استكشف الوظائف المتاحة
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F4F4F4] to-transparent"></div>
      </section>

      {/* ===== قسم نبذة عن الشركة ===== */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* النص */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#353535] mb-6">
                نبذة عن الشركة
              </h2>
              <p className="text-[#757575] text-lg leading-relaxed mb-6">
                تأسست شركتنا على مبادئ التميز والابتكار والالتزام بتقديم أفضل
                الخدمات لعملائنا. نحن نؤمن بأن النجاح يأتي من خلال العمل الجماعي
                والتفاني في تحقيق الأهداف.
              </p>
              <p className="text-[#757575] text-lg leading-relaxed mb-6">
                لدينا فريق متميز من المحترفين الذين يعملون بشغف لتحقيق رؤيتنا في
                أن نكون الشركة الرائدة في مجالنا.
              </p>
              <div className="flex gap-8 mt-8 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D90000] mb-2">
                    10+
                  </div>
                  <div className="text-[#353535]">سنوات من الخبرة</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D90000] mb-2">
                    500+
                  </div>
                  <div className="text-[#353535]">موظف متميز</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D90000] mb-2">
                    1000+
                  </div>
                  <div className="text-[#353535]">عميل راضٍ</div>
                </div>
              </div>
            </div>

            {/* صورة رئيس الشركة */}
            <div className="order-first md:order-last flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#B4B4B4] w-[320px] h-[320px]">
                <Image
                  src="/ceo.png"
                  alt="رئيس الشركة"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-[#353535]">
                  المستشار / وائل سويلم
                </h3>
                <p className="text-[#757575]">رئيس الشركة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== قسم دعوة للعمل ===== */}
      <section className="py-20 bg-[#F4F4F4] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#353535] mb-6">
            هل أنت مستعد للانضمام إلينا؟
          </h2>
          <p className="text-xl text-[#757575] mb-8 max-w-2xl mx-auto leading-relaxed">
            نحن دائماً نبحث عن مواهب جديدة لتنضم إلى فريقنا المتميز. اطلع على
            الفرص الوظيفية المتاحة وابدأ رحلتك المهنية معنا اليوم.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-[#D90000] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#B40000] transition-colors shadow-lg"
          >
            قدّم على وظيفة
          </Link>
        </div>
      </section>

      {/* ===== قسم القيم ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#353535] mb-12 text-center">
            قيمنا الأساسية
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* حسن المظهر */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-[#D90000]" />
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-3">حسن المظهر</h3>
              <p className="text-[#757575] leading-relaxed">
                نهتم بمظهرنا وصورتنا أمام العملاء لنترك انطباعاً إيجابياً دائماً
              </p>
            </div>

            {/* الالتزام */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#D90000]" />
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-3">الالتزام</h3>
              <p className="text-[#757575] leading-relaxed">
                نلتزم بوعودنا ومعايير الجودة في كل ما نقدمه
              </p>
            </div>

            {/* الأمانة */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-[#D90000]" />
              </div>
              <h3 className="text-xl font-bold text-[#353535] mb-3">الأمانة</h3>
              <p className="text-[#757575] leading-relaxed">
                نضع الأمانة كقيمة أساسية في تعاملاتنا مع عملائنا وزملائنا
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
