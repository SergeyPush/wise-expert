export interface IServicePage {
  slug: string;
  title: string;
  description: string;
}

export const SERVICE_PAGES: IServicePage[] = [
  {
    slug: 'it',
    title: 'ІТ індустрія + ДІЯ.City',
    description: 'Бухгалтерські послуги для ІТ компаній та резидентів ДІЯ.City',
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
  'ІТ індустрія + ДІЯ.City': 'it',
  'Оптова торгівля': 'optova',
  'Роздрібна торгівля': 'rozdribna',
  'Виробництво': 'vyrobnytstvo',
  'HORECA': 'horeca',
  'Послуги': 'posluhy',
};
