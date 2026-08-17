import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nunito_Sans } from 'next/font/google';
import styles from '@/styles/MobileMenu.module.scss';
import Button from '@/components/Button/Button';
import IconList from '@/components/Header/IconList';
import { CONTACTS } from '@/constants/contact.const';
import { LINKS } from '@/constants/links.const';
import { scrollToId } from '@/utils/scroll.utils';
import { isLandingPath } from '@/utils/nav.utils';
import MobileMenuGroup from '@/components/Header/MobileMenuGroup';

// Меню — сиблинг <nav>, не <main>, поэтому шрифт не наследуется ниоткуда
// и без этого падает на дефолтный стек Tailwind
const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: false,
  variable: '--font-sans',
});

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const { pathname } = useRouter();
  // на /fop и /tov те же секции, что и на главной — скроллим локально
  const isLanding = isLandingPath(pathname);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleScrollClick = (id: string) => {
    onClose();
    setTimeout(() => {
      scrollToId(id);
    }, 100);
  };

  const btnClass = "w-full text-left text-2xl font-semibold text-color-white py-3 px-4 rounded-xl hover:bg-color-white/10 transition-colors duration-200";

  return (
    <div className={`${nunito.className} ${styles.wrapper}`}>
      {/* Top spacing for header */}
      <div className="h-20" />

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col justify-center px-8 py-8">
        <nav>
          <ul className="space-y-2">
            {LINKS.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <MobileMenuGroup
                    item={item}
                    itemClass={btnClass}
                    onClose={onClose}
                  />
                ) : item.link ? (
                  <Link href={item.link} onClick={onClose} className={btnClass}>
                    {item.title}
                  </Link>
                ) : isLanding ? (
                  <button onClick={() => handleScrollClick(item.id)} className={btnClass}>
                    {item.title}
                  </button>
                ) : (
                  <Link href={`/#${item.id}`} onClick={onClose} className={btnClass}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="bg-color-blue/20 p-6 space-y-5">
        <a
          href={CONTACTS.phone}
          target="_blank"
          rel="noreferrer"
          className="block text-2xl text-color-white font-bold text-center"
        >
          {CONTACTS.phoneDisp}
        </a>
        <Button
          format="primary"
          text="Розрахувати вартість"
          size="wide"
          className="w-full"
          onClick={() => handleScrollClick('calc')}
        />
        <IconList
          color="white"
          className="flex justify-center gap-8 text-xl pt-2"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
