import React from 'react';
import { IIcon } from '@/interfaces/icon.interface';
import { ICONS } from '@/constants/icons.const';
import IconItem from '@/components/Header/IconItem';

const ListIcons: IIcon[] = [
  {
    Icon: ICONS.PHONE,
    link: 'tel:+380997778810',
  },
  {
    Icon: ICONS.TELEGRAM,
    link: 'tg://resolve?domain=@WisExpert',
  },
  {
    Icon: ICONS.FACEBOOK,
    link: 'https://facebook.com/wisexpert',
  },
  {
    Icon: ICONS.INSTAGRAM,
    link: 'https://www.instagram.com/wisexpert_buh',
  },
  {
    Icon: ICONS.MAIL,
    link: 'mailto:info@wisexpert.com.ua',
  },
];
interface IconListInterface {
  color: 'black' | 'white';
}
const IconList = ({ color }: IconListInterface) => {
  return (
    <ul className="hidden lg:flex flex-row gap-5 text justify-between items-center ">
      {ListIcons.map((item, index) => (
        <IconItem item={item} key={index} color={color} />
      ))}
    </ul>
  );
};

export default IconList;
