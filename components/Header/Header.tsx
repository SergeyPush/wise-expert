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
        // background:
        //   "radial-gradient(46.56% 196.35% at 6.15% 5.86%, rgba(0, 70, 250, 0.12) 0%, rgba(0, 130, 250, 0.03) 17.49%, rgba(255, 255, 255, 0.3) 79.11%)",
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
