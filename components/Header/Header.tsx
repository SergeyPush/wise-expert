import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import { Inter } from 'next/font/google';
import LinkList from '@/components/Header/LinkList';
import IconList from '@/components/Header/IconList';
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
  const [bookCallIsVisible, setBookCallIsVisible] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
        <Wrapper>
          <div className="flex flex-row items-center justify-between gap-4">
            {/* Logo */}
            <span
              className={`${inter.className} text-xl lg:text-2xl relative z-20 font-bold tracking-tight ${
                mobileMenuIsActive ? 'text-color-white' : isScrolled ? 'text-color-black' : 'text-color-white'
              } transition-colors duration-300`}
            >
              WisExpert
            </span>

            {/* Navigation Links - Center */}
            <LinkList className={'hidden'} isScrolled={isScrolled} />

            {/* Right Section */}
            <div className={'flex flex-row gap-3 lg:gap-6 items-center'}>
              <IconList
                color={isScrolled ? 'black' : 'white'}
                className={'hidden lg:flex'}
              />
              <Button
                format={isScrolled ? 'primary' : 'white'}
                text={'Замовити дзвінок'}
                size={'normal'}
                className={'relative z-20 hidden sm:block'}
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
        </Wrapper>
      </nav>
    </>
  );
};

export default Header;
