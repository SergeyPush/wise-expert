import React from 'react';
import styles from '@/styles/MobileMenu.module.scss';
import LinkList from '@/components/Header/LinkList';
import Button from '@/components/Button/Button';
import IconList from '@/components/Header/IconList';

const MobileMenu = () => {
  return (
    <nav className={styles.wrapper}>
      <div className={'flex items-center justify-center h-full'}>
        <LinkList alignment={'vertical'} className={'flex gap-8 text-center'} />
      </div>
      <div
        className={'h-2/5 bg-color-blue flex flex-col justify-center p-5 gap-6'}
      >
        <a
          href="tel:+380997778810"
          target={'_blank'}
          rel="noreferrer"
          className={'text-2xl text-color-white font-bold text-center'}
        >
          +38(099)777-88-10
        </a>
        <Button
          type={'outlined'}
          text={'Розрахувати вартість'}
          className={'text-xl mb-4'}
        />
        <IconList
          color={'white'}
          className={'flex max-w-xs text-center self-center gap-12'}
        />
      </div>
    </nav>
  );
};

export default MobileMenu;
