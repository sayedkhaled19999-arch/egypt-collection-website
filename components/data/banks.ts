// data/banks.ts
export interface Bank {
  name: string;
  src: string;
}
export const banks: Bank[] = [
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
