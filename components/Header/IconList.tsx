import React from 'react';
import { ListIcons } from '@/constants/icons.const';
import IconItem from '@/components/Header/IconItem';

interface IconListInterface {
  color: 'black' | 'white';
  className?: string;
}
const IconList = ({ color, className }: IconListInterface) => {
  return (
    <ul
      className={`flex flex-row gap-5 text justify-between items-center ${className}`}
    >
      {ListIcons.map((item, index) => (
        <IconItem item={item} key={index} color={color} />
      ))}
    </ul>
  );
};

export default IconList;
