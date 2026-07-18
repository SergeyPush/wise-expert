import React from 'react';
import { ListIcons } from '@/constants/icons.const';
import IconItem from '@/components/Header/IconItem';
import { IIcon } from '@/interfaces/icon.interface';

interface IconListInterface {
  color: 'black' | 'white';
  className?: string;
  icons?: IIcon[];
  /** Отдельный проп, а не класс в className: gap-* из className конфликтует
   *  с базовым gap-4 — какой из них победит, зависит от порядка правил в
   *  собранном CSS, а не от порядка в атрибуте */
  gap?: string;
}
const IconList = ({
  color,
  className,
  icons = ListIcons,
  gap = 'gap-4',
}: IconListInterface) => {
  return (
    <ul
      className={`flex flex-row ${gap} items-center ${className}`}
    >
      {icons.map((item, index) => (
        <IconItem item={item} key={index} color={color} />
      ))}
    </ul>
  );
};

export default IconList;
