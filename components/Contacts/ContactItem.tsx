import { IIcon } from '@/interfaces/icon.interface';
import Link from 'next/link';

interface ContactItemInterface {
  item: IIcon;
}

const ContactItem = ({ item: { Icon, text, link } }: ContactItemInterface) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center hover:text-color-blue text-xl md:text-lg mb-1 md:mb-0"
    >
      <Icon className="mr-2" />
      <span>{text}</span>
    </Link>
  );
};

export default ContactItem;
