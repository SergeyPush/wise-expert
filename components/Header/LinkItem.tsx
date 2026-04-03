import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ILink } from '@/interfaces/link.interface';
import { scrollToId } from '@/utils/scroll.utils';

interface LinkItemInterface {
  item: ILink;
  isScrolled?: boolean;
}

const linkClass = (isScrolled?: boolean) =>
  `px-3 py-2 rounded-lg hover:bg-color-black/5 cursor-pointer text-sm font-medium whitespace-nowrap transition-all duration-200 ${
    isScrolled
      ? 'text-color-muted hover:text-color-black'
      : 'text-color-white/80 hover:text-color-white hover:bg-color-white/10'
  }`;

const LinkItem = ({ item, isScrolled }: LinkItemInterface) => {
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  if (item.link) {
    return (
      <li>
        <Link href={item.link} className={linkClass(isScrolled)}>
          {item.title}
        </Link>
      </li>
    );
  }

  if (isHome) {
    return (
      <li>
        <button
          type="button"
          onClick={() => scrollToId(item.id)}
          className={linkClass(isScrolled)}
        >
          {item.title}
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/#${item.id}`} className={linkClass(isScrolled)}>
        {item.title}
      </Link>
    </li>
  );
};

export default LinkItem;
