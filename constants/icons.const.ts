import { MdPhoneEnabled } from 'react-icons/md';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';
import { IoMdMail } from 'react-icons/io';
import { IIcon } from '@/interfaces/icon.interface';
import { CONTACTS } from '@/constants/contact.const';
import { FaLinkedinIn } from 'react-icons/fa6';

export const ICONS = {
  PHONE: MdPhoneEnabled,
  TELEGRAM: FaTelegramPlane,
  FACEBOOK: GrFacebookOption,
  INSTAGRAM: FaInstagram,
  MAIL: IoMdMail,
  LINKEDIN: FaLinkedinIn,
};

export const ListIcons: IIcon[] = [
  {
    Icon: ICONS.PHONE,
    link: CONTACTS.phone,
    label: 'Телефон',
    text: '+38(099)3811118',
  },
  {
    Icon: ICONS.TELEGRAM,
    link: 'tg://resolve?domain=@WisExpert',
    label: 'Telegram',
    text: '@WisExpert',
  },
  {
    Icon: ICONS.FACEBOOK,
    link: 'https://facebook.com/wisexpert',
    label: 'Facebook',
    text: 'Wisexpert',
  },
  {
    Icon: ICONS.INSTAGRAM,
    link: 'https://www.instagram.com/wisexpert_buh',
    label: 'Instagram',
    text: 'wisexpert_buh',
  },
  {
    Icon: ICONS.LINKEDIN,
    link: 'https://www.linkedin.com/company/бухгалтерська-компанія-wisexpert/',
    label: 'LinkedIn',
    text: 'wisexpert',
  },
];

/** Same as ListIcons but without the phone — used in the contacts social cards,
 *  where the phone has its own CTA (PhoneButton) */
export const NavIcons: IIcon[] = ListIcons.filter(
  (item) => item.Icon !== ICONS.PHONE,
);
