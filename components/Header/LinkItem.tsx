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
        'uppercase tracking-custom-wide hover:text-color-blue cursor-pointer text-base lg:text-sm text-color-extra-black'
      }
      onClick={handleClick}
    >
      {item.title}
    </li>
  );
};

export default LinkItem;
