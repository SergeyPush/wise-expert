import React from 'react';
import { IIcon } from '@/interfaces/icon.interface';
import Link from 'next/link';

interface IconItemInterface {
  item: IIcon;
  color: 'black' | 'white';
}
const IconItem = ({ item: { link, Icon }, color }: IconItemInterface) => {
  const colorClasses =
    color === 'white'
      ? 'text-color-white/70 hover:text-color-white'
      : 'text-color-muted hover:text-color-blue';

  return (
    <li>
      <Link
        href={link}
        target="_blank"
        className={`${colorClasses} transition-colors duration-200 block p-1`}
      >
        <Icon className="w-5 h-5" />
      </Link>
    </li>
  );
};

export default IconItem;
