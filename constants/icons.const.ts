import { MdPhoneEnabled } from 'react-icons/md';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';
import { IoMdMail } from 'react-icons/io';
import { IIcon } from '@/interfaces/icon.interface';

export const ICONS = {
  PHONE: MdPhoneEnabled,
  TELEGRAM: FaTelegramPlane,
  FACEBOOK: GrFacebookOption,
  INSTAGRAM: FaInstagram,
  MAIL: IoMdMail,
};

export const ListIcons: IIcon[] = [
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
