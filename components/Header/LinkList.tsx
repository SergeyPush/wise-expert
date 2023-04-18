import React from 'react';
import LinkItem from '@/components/Header/LinkItem';
import { LINKS } from '@/constants/links.const';

interface LinkListInterface {
  alignment?: 'vertical' | 'horizontal';
  className?: string;
}
const LinkList = ({ alignment, className }: LinkListInterface) => {
  return (
    <ul
      className={`lg:flex flex-row gap-5 font-bold ${
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
