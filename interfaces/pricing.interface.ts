import { SupportAccent } from '@/interfaces/support.interface';
import { PricingIconName } from '@/components/Pricing/icons';

/** Акцент секції збігається з акцентом сторінки: синій — ФОП, фіолетовий — ТОВ */
export type PricingAccent = SupportAccent;

export interface IPricingBadge {
  text: string;
  icon: PricingIconName;
}

export interface IPricingItem {
  text: string;
  icon: PricingIconName;
}

export interface IPricingCard {
  title: string;
  /** Короткий опис під заголовком — є не в кожної картки */
  description?: string;
  /** «від» перед сумою; фіксовані ціни йдуть без нього */
  prefix?: string;
  amount: string;
  /** «/ місяць», «/ квартал», «за 1 співробітника» */
  period?: string;
  /** Уточнення під ціною — напр. «за кожного наступного» */
  note?: string;
  /** Список послуг усередині картки (кадровий облік у ТОВ) */
  items?: IPricingItem[];
  /** Картка на всю ширину сітки: список ліворуч, ціна праворуч */
  wide?: boolean;
  /** Іконка у шапці звичайної картки (не показується у group-картках) */
  icon?: PricingIconName;
  /** ФОП-картка: великий номер групи по центру замість звичайного заголовка */
  group?: {
    label: string;
    number: string;
    unit: string;
  };
  /** Акцентна плашка «+500 грн» під ціною у wide-картці */
  plus?: {
    amount: string;
    caption: string;
  };
}

/** Рядок умов під картками: «Якщо є наймані співробітники: 1500 грн …» */
export interface IPricingNote {
  title: string;
  value: string;
  icon: PricingIconName;
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
  badges: IPricingBadge[];
  /** Скільки карток у ряд на десктопі: 3 у ФОП, 2 у ТОВ (третя — на всю ширину) */
  columns: 2 | 3;
  cards: IPricingCard[];
  notes?: IPricingNote[];
  footerText: string;
  footerTextMobile?: string;
  ctaText: string;
}
