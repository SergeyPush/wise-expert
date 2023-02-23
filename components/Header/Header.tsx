import React from 'react';
import Wrapper from '@/components/Wrapper';
import { Nunito_Sans } from '@next/font/google';
import LinkList from '@/components/Header/LinkList';
import IconList from '@/components/Header/IconList';
import Button from '@/components/Button/Button';
const nunito = Nunito_Sans({
  subsets: ['latin'],
  style: 'normal',
  weight: '400',
});

const Header = () => {
  return (
    <nav
      className={`${nunito.className} py-4`}
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <Wrapper>
        <div className="flex flex-row items-center justify-between">
          <span className="text-xl">WisExpert</span>
          <LinkList />
          <div className={'flex flex-row gap-10 items-center'}>
            <IconList color={'black'} />
            <Button type={'black'} text={'Замовити дзвінок'} size={'normal'} />
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Header;
