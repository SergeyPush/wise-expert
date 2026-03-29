export interface IServiceCard {
  icon: string;
  title: string;
  description: string;
}

export interface IServicePageFields {
  slug: string;
  shortTextTag: string;
  tag: string;
  heroTitle: string;
  heroSubtitle: string;
  price: string;
  heroImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  seoTitle: string;
  seoDescription: string;
  whatWeDoPrefix: string;
  whatWeDoTitle: string;
  whatWeDoSubtitle: string;
  cards: IServiceCard[];
  ctaTitle: string;
  ctaSubtitle: string;
}
