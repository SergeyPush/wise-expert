import { ILink } from '@/interfaces/link.interface';

/**
 * Меню однакове на всіх сторінках. Пункт «Послуги» веде не на окрему
 * сторінку, а розкриває список: сторінки /fop і /tov. Пункт «Клієнти»
 * прибрано з навігації — сам блок з логотипами на сторінках лишився.
 */
export const LINKS: ILink[] = [
  {
    id: 'services',
    title: 'Послуги',
    link: '',
    children: [
      { id: 'fop', title: 'ФОП', link: '/fop' },
      { id: 'tov', title: 'ТОВ', link: '/tov' },
    ],
  },
  { id: 'useful', title: 'Кому корисні', link: '' },
  { id: 'prices', title: 'Ціни', link: '' },
  { id: 'calc', title: 'Калькулятор', link: '' },
  { id: 'faq', title: 'FAQ', link: '' },
  { id: 'contacts', title: 'Контакти', link: '' },
  { id: 'blog', title: 'Блог', link: '/blog' },
];
