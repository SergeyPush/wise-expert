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
      className="flex items-center gap-3 p-4 rounded-xl bg-color-light-gray hover:bg-color-light-blue transition-colors duration-200 group min-w-0"
    >
      <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-color-blue/10 text-color-blue group-hover:bg-color-blue group-hover:text-color-white transition-colors duration-200">
        <Icon className="w-5 h-5" />
      </span>
      <span className="text-sm lg:text-sm xl:text-base font-medium text-color-black whitespace-nowrap">{text}</span>
    </Link>
  );
};

export default ContactItem;
