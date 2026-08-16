/** Акцент секції: синій — ФОП, фіолетовий — ТОВ */
export type SupportAccent = 'blue' | 'violet';

/** Ключі іконок; самі SVG лежать у компоненті, щоб константи були чистими даними */
export type SupportIconName =
  | 'tax'
  | 'calendar'
  | 'question'
  | 'shield'
  | 'vat'
  | 'people'
  | 'docs';

/** Картка «зона відповідальності, яка переходить до нас» */
export interface ISupportItem {
  icon: SupportIconName;
  title: string;
  text: string;
  /** Колір іконки — чергується всередині сітки, щоб ряд не був монотонним */
  accent: SupportAccent;
}

export interface ISupport {
  /**
   * `grid` — центрований хед + 4 картки в рядок (ФОП).
   * `split` — текст ліворуч (липкий) + сітка 2×2 праворуч (ТОВ).
   */
  layout: 'grid' | 'split';
  /** Основний акцент: чип, підсвітка в заголовку, CTA */
  accent: SupportAccent;
  kicker: string;
  /** Коротший чип для мобільної — довгий не влазить у рядок */
  kickerMobile?: string;
  /** Заголовок розбитий на три частини: середня підсвічується акцентом */
  title: string;
  titleAccent: string;
  titleTail?: string;
  lead: string;
  /** Виноска під лідом — тільки для layout: 'split' */
  quote?: string;
  items: ISupportItem[];
  /** Смуга з CTA під сіткою */
  stripText: string;
  stripTextMobile?: string;
  ctaText: string;
}
