import React from 'react';
import { ILink } from '@/interfaces/link.interface';
import { scrollToId } from '@/utils/scroll.utils';

interface LinkItemInterface {
  item: ILink;
}

const LinkItem = ({ item }: LinkItemInterface) => {
  const handleClick = () => {
    scrollToId(item.id);
  };
  return (
    <li
      className={
        'uppercase hover:text-color-blue cursor-pointer md:text-xs lg:text-sm text-color-extra-black font-medium whitespace-nowrap'
      }
      onClick={handleClick}
    >
      {item.title}
    </li>
  );
};

export default LinkItem;
