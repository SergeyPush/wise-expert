import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import { Nunito_Sans } from '@next/font/google';
import LinkList from '@/components/Header/LinkList';
import IconList from '@/components/Header/IconList';
import Button from '@/components/Button/Button';
import Hamburger from '@/components/Button/Hamburger';
import MobileMenu from '@/components/Header/MobileMenu';
import BookCall from '@/components/Header/BookCall';
const nunito = Nunito_Sans({
  subsets: ['latin'],
  style: 'normal',
  weight: '400',
});

const Header = () => {
  const [mobileMenuIsActive, setMobileMenuIsActive] = useState<boolean>(false);
  const [bookCallIsVisible, setBookCallIsVisible] = useState<boolean>(false);

  return (
    <nav
      className={`${nunito.className} py-4 relative z-10`}
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      {mobileMenuIsActive && <MobileMenu />}
      <BookCall
        isVisible={bookCallIsVisible}
        setIsVisible={setBookCallIsVisible}
      />
      <Wrapper>
        <div className="flex flex-row items-center justify-between gap-3">
          <span className="text-xl relative z-20 font-bold">WisExpert</span>
          <LinkList className={'hidden'} />
          <div className={'flex flex-row gap-4 lg:gap-10 items-center'}>
            <IconList color={'black'} className={'hidden lg:flex'} />
            <Button
              format={'black'}
              text={'Замовити дзвінок'}
              size={'normal'}
              className={'relative z-20'}
              onClick={() => setBookCallIsVisible(true)}
            />
            <Hamburger
              className={'lg:hidden'}
              isActive={mobileMenuIsActive}
              setIsActive={setMobileMenuIsActive}
            />
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Header;
