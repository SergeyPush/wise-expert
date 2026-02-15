import React from 'react';
import LinkItem from '@/components/Header/LinkItem';
import { LINKS } from '@/constants/links.const';

interface LinkListInterface {
  alignment?: 'vertical' | 'horizontal';
  className?: string;
  isScrolled?: boolean;
}
const LinkList = ({ alignment, className, isScrolled }: LinkListInterface) => {
  return (
    <ul
      className={`lg:flex flex-row gap-1 xl:gap-2 items-center ${
        alignment === 'vertical' ? 'flex-col gap-4' : ''
      } ${className}`}
    >
      {LINKS.map((item) => (
        <LinkItem item={item} key={item.id} isScrolled={isScrolled} />
      ))}
    </ul>
  );
};

export default LinkList;
