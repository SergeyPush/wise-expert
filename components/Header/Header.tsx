import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import LinkList from '@/components/Header/LinkList';
import IconList from '@/components/Header/IconList';
import { ICONS, ListIcons, CompactIcons } from '@/constants/icons.const';
import { CONTACTS } from '@/constants/contact.const';
import Button from '@/components/Button/Button';
import Hamburger from '@/components/Button/Hamburger';
import MobileMenu from '@/components/Header/MobileMenu';
import BookCall from '@/components/Header/BookCall';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  preload: false,
  variable: '--font-sans',
});

const Header = () => {
  const [mobileMenuIsActive, setMobileMenuIsActive] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { bookCallIsVisible, setBookCallIsVisible } = useGlobalContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // passive: обработчик не вызывает preventDefault, флаг снимает с браузера
    // необходимость ждать его выполнения перед прокруткой
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {mobileMenuIsActive && <MobileMenu onClose={() => setMobileMenuIsActive(false)} />}
      <nav
        className={`${inter.className} fixed top-0 left-0 right-0 transition-all duration-300 ${
          mobileMenuIsActive
            ? 'py-3 bg-transparent z-[70]'
            : isScrolled
            ? 'py-3 bg-color-white/90 backdrop-blur-xl shadow-soft z-50'
            : 'py-5 bg-transparent z-50'
        }`}
      >
        <BookCall
          isVisible={bookCallIsVisible}
          setIsVisible={setBookCallIsVisible}
        />
        {/* Не Wrapper: у него на lg ширина сужается до w-5/6 — контентной
            колонки, — и строке меню на 1024px не хватало места. Здесь
            w-11/12 до xl (+85px на 1024px), а с xl возвращаемся к w-4/5,
            чтобы логотип снова совпал по левому краю с контентом секций */}
        <div className="w-11/12 xl:w-4/5 mx-auto">
          <div className="flex flex-row items-center justify-between gap-2 xl:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className={`${inter.className} text-xl lg:text-2xl relative z-20 font-bold tracking-tight ${
                mobileMenuIsActive ? 'text-color-white' : isScrolled ? 'text-color-black' : 'text-color-white'
              } transition-colors duration-300`}
            >
              WisExpert
            </Link>

            {/* Navigation Links - Center */}
            <LinkList className={'hidden'} isScrolled={isScrolled} />

            {/* Right Section */}
            <div className={'flex flex-row gap-3 xl:gap-6 items-center'}>
              {/* На 1024–1279px показываем три канала связи вместо пяти:
                  полный набор (~204px) не помещался в строку меню, из-за чего
                  кнопка «Замовити дзвінок» уезжала за край экрана и
                  обрезалась (overflow-x: hidden на body). С xl — все пять */}
              <IconList
                color={isScrolled ? 'black' : 'white'}
                className={'hidden lg:flex xl:hidden'}
                gap={'gap-2'}
                icons={CompactIcons}
              />
              <IconList
                color={isScrolled ? 'black' : 'white'}
                className={'hidden xl:flex'}
                icons={ListIcons}
              />
              {/* Телефон — слева от гамбургера. Скрыт при открытом меню:
                  там свой блок с номером. С lg телефон уже есть в IconList */}
              {!mobileMenuIsActive && (
                <a
                  href={CONTACTS.phone}
                  aria-label={CONTACTS.phoneDisp}
                  className={`lg:hidden relative z-20 block p-1 transition-colors duration-200 ${
                    isScrolled
                      ? 'text-color-muted hover:text-color-blue'
                      : 'text-color-white/70 hover:text-color-white'
                  }`}
                >
                  <ICONS.PHONE className="w-6 h-6" aria-hidden="true" />
                </a>
              )}
              <Button
                format={isScrolled ? 'primary' : 'white'}
                text={'Замовити дзвінок'}
                size={'normal'}
                className={'relative z-20 hidden sm:block whitespace-nowrap'}
                onClick={() => setBookCallIsVisible(true)}
              />
              <Hamburger
                className={'lg:hidden relative z-50'}
                isActive={mobileMenuIsActive}
                setIsActive={setMobileMenuIsActive}
                isScrolled={isScrolled && !mobileMenuIsActive}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
