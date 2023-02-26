import React from 'react';
import { ILink } from '@/interfaces/link.interface';
import LinkItem from '@/components/Header/LinkItem';

const LINKS: ILink[] = [
  { id: 1, title: 'Послуги', link: '' },
  { id: 2, title: 'Ціни', link: '' },
  { id: 3, title: 'Калькулятор вартості', link: '' },
  { id: 4, title: 'Контакти', link: '' },
  { id: 5, title: 'FAQ', link: '' },
];

interface LinkListInterface {
  alignment?: 'vertical' | 'horizontal';
  className?: string;
}
const LinkList = ({ alignment, className }: LinkListInterface) => {
  return (
    <ul
      className={`lg:flex flex-row gap-4 font-bold ${
        alignment === 'vertical' ? 'flex-col' : ''
      } ${className}`}
    >
      {LINKS.map((item) => (
        <LinkItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default LinkList;
