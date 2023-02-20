import React from 'react';
import { ILink } from '@/interfaces/link.interface';

interface LinkItemInterface {
  item: ILink;
}

const LinkItem = ({ item }: LinkItemInterface) => {
  return (
    <li
      className={
        'uppercase text-color-black tracking-custom-wide hover:text-color-blue cursor-pointer text-sm'
      }
    >
      {item.title}
    </li>
  );
};

export default LinkItem;
