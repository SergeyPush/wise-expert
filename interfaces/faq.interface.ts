export interface IFAQ {
  title: string;
  faqs: FAQFields[];
  // необязательные тексты из Contentful (лид + CTA-блок)
  subtitle?: string;
  ctaTitle?: string;
  ctaText?: string;
}

export interface FAQFields {
  fields: FAQ;
}

export interface FAQ {
  question: string;
  answer: string;
}
