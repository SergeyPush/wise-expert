/** Рядок «рахунку» за самостійне ведення */
export interface ITrueCostItem {
  label: string;
  /** Пояснення дрібним шрифтом під рядком — звідки взялася сума */
  note?: string;
  /** Сума рядка, вже відформатована: «17 000 грн», «від 340 грн» */
  amount: string;
}

/** Знята заперечення: те, що тримає клієнта на щомісячному супроводі */
export interface ITrueCostGuarantee {
  title: string;
  text: string;
}

export interface ITrueCost {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Шапка чека */
  receiptTitle: string;
  receiptMeta: string;
  items: ITrueCostItem[];
  totalLabel: string;
  totalAmount: string;
  /** Рядок-відповідь: скільки це коштує з нами */
  offerLabel: string;
  offerAmount: string;
  offerNote: string;
  guarantees: ITrueCostGuarantee[];
  ctaText: string;
}
