import React from 'react';
import { IIcon } from '@/interfaces/icon.interface';
import Link from 'next/link';

interface IconItemInterface {
  item: IIcon;
  color: 'black' | 'white';
}
const IconItem = ({ item: { link, Icon }, color }: IconItemInterface) => {
  return (
    <li>
      <Link href={link} target="_blank">
        <Icon className={`hover:text-color-blue text-color-${color}`} />
      </Link>
    </li>
  );
};

export default IconItem;
