export interface BranchInfo {
  slug: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  mapsUrl: string;
  tags: string[];
}

export const branchesInfo: BranchInfo[] = [
  {
    slug: 'dokki-headquarters',
    nameAr: 'المقر الرئيسي - الدقي',
    nameEn: 'Headquarters - Dokki',
    addressAr: '30 شارع هارون - ميدان المساحه - الدقى - الدور السابع',
    addressEn: '30 Haroun St, El Mesaha Sq, Dokki, 7th Floor',
    mapsUrl: 'https://maps.app.goo.gl/CcmDDN7XqEvbE5Rj6',
    tags: ['الدقي', 'الجيزة', 'القاهرة', 'Dokki', 'Giza', 'Cairo']
  },
  {
    slug: 'monufia',
    nameAr: 'فرع المنوفية',
    nameEn: 'Monufia Branch',
    addressAr: 'برج أحمد الدبور شارع الشهيد عبدالمنعم حمزة- الدور الخامس - أمام مصلحة الجوازات - شبين الكوم - المنوفية',
    addressEn: 'Ahmed El Dabour Tower, Abdel Moneim Hamza St, 5th Floor, opposite Passport Office, Shebin El Kom',
    mapsUrl: 'https://maps.app.goo.gl/dqg9eb1wJUgkLkL78',
    tags: ['المنوفية', 'شبين الكوم', 'Monufia', 'Shebin El Kom']
  },
  {
    slug: 'beheira',
    nameAr: 'فرع البحيرة',
    nameEn: 'Beheira Branch',
    addressAr: 'برج جراند زمزم - الدور السادس - بجوار محكمة إيتاي البارود - مركز إيتاي البارود - البحيرة',
    addressEn: 'Grand Zamzam Tower, 6th Floor, beside Itay El Baroud Court, Itay El Baroud',
    mapsUrl: 'https://maps.app.goo.gl/33a6cXxX7X8bxSZ3A',
    tags: ['البحيرة', 'إيتاي البارود', 'Beheira', 'Itay El Baroud']
  },
  {
    slug: 'minya',
    nameAr: 'فرع المنيا',
    nameEn: 'Minya Branch',
    addressAr: 'شارع أحمد ماهر تقاطع شارع الحسيني البحري الدور الثالث علوي - أمام كبابجي المحمدي - قسم المنيا - محافظة المنيا',
    addressEn: 'Ahmed Maher St & El Husseini El Bahary St intersection, 3rd Floor, opposite El Mohamady Kababji, Minya',
    mapsUrl: 'https://maps.app.goo.gl/o7DP2AMWaXiR17V29',
    tags: ['المنيا', 'Minya']
  },
  {
    slug: 'ismailia',
    nameAr: 'فرع الإسماعيلية',
    nameEn: 'Ismailia Branch',
    addressAr: '2 شارع بحريى تقاطع شارع رضا - عريشة مصر - امام استاد الاسماعلية واعلى سوبر ماركت بيم - الدور الثانى - برج الهادى',
    addressEn: '2 Bahary St & Reda St, Arishat Misr, opposite Ismailia Stadium, above BIM Market, 2nd Floor, El Hady Tower',
    mapsUrl: 'https://maps.app.goo.gl/9gCpoCBsBEi4nE4v5',
    tags: ['الإسماعيلية', 'Ismailia']
  },
  {
    slug: 'qena',
    nameAr: 'فرع قنا',
    nameEn: 'Qena Branch',
    addressAr: 'ميدان الساعة - شارع مصطفي كامل - بجوار كشك اخر ساعة - عمارة رقم 4 الدور الثالث علوي',
    addressEn: 'El Sa\'a Sq, Mostafa Kamel St, beside Akher Sa\'a Kiosk, Building 4, 3rd Floor',
    mapsUrl: 'https://maps.app.goo.gl/4tEakTRTCuUeDNuw5',
    tags: ['قنا', 'Qena']
  }
];
