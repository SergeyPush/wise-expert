export interface IServicePage {
  slug: string;
  title: string;
  description: string;
}

export const SERVICE_PAGES: IServicePage[] = [
  {
    slug: 'it',
    title: 'ІТ-компанії',
    description: 'Бухгалтерські послуги для ІТ-компаній',
  },
  {
    slug: 'optova',
    title: 'Оптова торгівля',
    description: 'Бухгалтерський супровід оптової торгівлі',
  },
  {
    slug: 'rozdribna',
    title: 'Роздрібна торгівля',
    description: 'Бухгалтерський супровід роздрібної торгівлі',
  },
  {
    slug: 'vyrobnytstvo',
    title: 'Виробництво',
    description: 'Бухгалтерські послуги для виробничих підприємств',
  },
  {
    slug: 'horeca',
    title: 'HORECA',
    description: 'Бухгалтерські послуги для ресторанів, готелів та кафе',
  },
  {
    slug: 'posluhy',
    title: 'Послуги',
    description: 'Бухгалтерські послуги для сервісних компаній',
  },
];

/** Map tile name (from Contentful) to service page slug */
export const TILE_SLUG_MAP: Record<string, string> = {
  'ІТ-компанії': 'it',
  'Оптова торгівля': 'optova',
  'Роздрібна торгівля': 'rozdribna',
  'Виробництво': 'vyrobnytstvo',
  'HORECA': 'horeca',
  'Послуги': 'posluhy',
};

/** Slug страницы услуги → Entry ID в Contentful.
 *  Единый источник для /services/[slug] (getStaticPaths/Props) и sitemap.xml */
export const SERVICE_SLUG_TO_CONTENTFUL_ID: Record<string, string> = {
  it: '5jyN8q1yHA0UEMyZGwRDFs',
  optova: '14Ufdnf0ubOu9OpwprgmhL',
  rozdribna: '1EepYK0uDkEbPZakyCeDLc',
  vyrobnytstvo: '5LgwI6wbO1UkHaFHZiNd9I',
  horeca: '73drFNQdcTwZkAmht8SJIp',
  posluhy: '3uOw2ZZlRcwy418LYuwIUs',
};
