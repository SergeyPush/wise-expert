import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ILink } from '@/interfaces/link.interface';
import ServicesDropdown from '@/components/Header/ServicesDropdown';
import { scrollToId } from '@/utils/scroll.utils';
import { isLandingPath } from '@/utils/nav.utils';

interface LinkItemInterface {
  item: ILink;
  isScrolled?: boolean;
}

const linkClass = (isScrolled?: boolean) =>
  // px-2 вместо px-3: 7 ссылок × 8px = 56px, которых не хватало, чтобы в
  // строку поместились и все пять иконок соцсетей, и CTA в одну строку
  `px-2 py-2 rounded-lg hover:bg-color-black/5 cursor-pointer text-sm font-medium whitespace-nowrap transition-all duration-200 ${
    isScrolled
      ? 'text-color-muted hover:text-color-black'
      : 'text-color-white/80 hover:text-color-white hover:bg-color-white/10'
  }`;

const LinkItem = ({ item, isScrolled }: LinkItemInterface) => {
  const { pathname } = useRouter();

  if (item.children) {
    return (
      <ServicesDropdown
        item={item}
        isScrolled={isScrolled}
        className={linkClass(isScrolled)}
      />
    );
  }

  if (item.link) {
    return (
      <li>
        <Link href={item.link} className={linkClass(isScrolled)}>
          {item.title}
        </Link>
      </li>
    );
  }

  // якорные секции есть на всех лендингах — скроллим по текущей странице,
  // а уводим на главную только оттуда, где этих секций нет (/blog, /services)
  if (isLandingPath(pathname)) {
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
