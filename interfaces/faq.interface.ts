export interface IFAQ {
  title: string;
  faqs: FAQFields[];
}

export interface FAQFields {
  fields: FAQ;
}

export interface FAQ {
  question: string;
  answer: string;
}
