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
        'uppercase text-color-black tracking-custom-wide hover:text-color-blue cursor-pointer text-xl lg:text-sm'
      }
      onClick={handleClick}
    >
      {item.title}
    </li>
  );
};

export default LinkItem;
