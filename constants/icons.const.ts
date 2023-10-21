import { MdPhoneEnabled } from 'react-icons/md';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';
import { IoMdMail } from 'react-icons/io';
import { IIcon } from '@/interfaces/icon.interface';
import { CONTACTS } from '@/constants/contact.const';

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
    link: CONTACTS.phone,
    text: '+38(099)381-11-18',
  },
  {
    Icon: ICONS.TELEGRAM,
    link: 'tg://resolve?domain=@WisExpert',
    text: '@WisExpert',
  },
  {
    Icon: ICONS.FACEBOOK,
    link: 'https://facebook.com/wisexpert',
    text: 'wisexpert',
  },
  {
    Icon: ICONS.INSTAGRAM,
    link: 'https://www.instagram.com/wisexpert_buh',
    text: 'wisexpert_buh',
  },
  {
    Icon: ICONS.MAIL,
    link: CONTACTS.email,
    text: 'info@wisexpert.com.ua',
  },
];
