import React from 'react';
import styles from '@/styles/MobileMenu.module.scss';
import LinkList from '@/components/Header/LinkList';
import Button from '@/components/Button/Button';
import IconList from '@/components/Header/IconList';
import { CONTACTS } from '@/constants/contact.const';

const MobileMenu = () => {
  return (
    <div className={styles.wrapper}>
      <div className={'flex items-center justify-center h-full'}>
        <LinkList alignment={'vertical'} className={'flex gap-8 text-center'} />
      </div>
      <div
        className={'h-4/5 bg-color-blue flex flex-col justify-center p-5 gap-6'}
      >
        <a
          href={CONTACTS.phone}
          target={'_blank'}
          rel="noreferrer"
          className={'text-2xl text-color-white font-bold text-center'}
        >
          {CONTACTS.phoneDisp}
        </a>
        <Button
          format={'outlined'}
          text={'Розрахувати вартість'}
          className={'text-xl mb-4'}
        />
        <IconList
          color={'white'}
          className={
            'flex max-w-xs text-center self-center gap-12 text-2xl hover:text-color-white visited:text-color-white'
          }
        />
      </div>
    </div>
  );
};

export default MobileMenu;
