import { SupportAccent } from '@/interfaces/support.interface';

/** Акцент секції збігається з акцентом сторінки: синій — ФОП, фіолетовий — ТОВ */
export type PricingAccent = SupportAccent;

export interface IPricingCard {
  title: string;
  /** Короткий опис під заголовком — є не в кожної картки */
  description?: string;
  /** «від» перед сумою; фіксовані ціни йдуть без нього */
  prefix?: string;
  amount: string;
  /** «/ місяць», «/ квартал», «за 1 співробітника» */
  period?: string;
  /** Уточнення під ціною — напр. «кожний наступний +500 грн» */
  note?: string;
  /** Список послуг усередині картки (кадровий облік у ТОВ) */
  items?: string[];
  /** Картка на всю ширину сітки: список ліворуч, ціна праворуч */
  wide?: boolean;
}

/** Рядок умов під картками: «Якщо є наймані співробітники: 1500 грн …» */
export interface IPricingNote {
  title: string;
  value: string;
}

export interface IPricing {
  accent: PricingAccent;
  kicker: string;
  /** Заголовок розбитий на частини: середня підсвічується акцентом */
  title: string;
  titleAccent: string;
  titleTail?: string;
  subtitle: string;
  /** Коротший підзаголовок для мобільної */
  subtitleMobile?: string;
  /** Бейджі під підзаголовком; з третього ховаються на мобільній */
  badges: string[];
  /** Скільки карток у ряд на десктопі: 3 у ФОП, 2 у ТОВ (третя — на всю ширину) */
  columns: 2 | 3;
  cards: IPricingCard[];
  notes?: IPricingNote[];
  footerText: string;
  footerTextMobile?: string;
  ctaText: string;
}
