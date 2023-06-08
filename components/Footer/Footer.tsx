import React from 'react';
import Wrapper from '@/components/Wrapper';
import IconList from '@/components/Header/IconList';
import { LINKS } from '@/constants/links.const';
import { scrollToId } from '@/utils/scroll.utils';
import { CONTACTS } from '@/constants/contact.const';

const Footer = () => {
  // const filteredLinks = LINKS.splice(3, 1);
  const filteredLinks = [...LINKS];
  filteredLinks.splice(4, 1);

  const handleClick = (id: string) => {
    scrollToId(id);
  };

  return (
    <footer className={'bg-color-black pt-8'}>
      <Wrapper>
        <div
          className={
            'text-color-white pb-8 pt-8 border-b border-color-light-gray border-t flex flex-col md:flex-row gap-12 md:gap-20'
          }
        >
          <div>
            <span className={'block text-2xl mb-4'}>WiseExpert</span>
            <p className={'text-sm mb-8'}>Бухгалтерська компанія WisеExpert</p>
            <IconList color={'white'} className={'w-1/6'} />
          </div>
          <div className={'flex flex-col md:flex-row gap-6 md:gap-20'}>
            <ul>
              {filteredLinks.map(({ title, id }, index) => (
                <li
                  key={index}
                  className={'mb-3 uppercase cursor-pointer'}
                  onClick={() => handleClick(id)}
                >
                  {title}
                </li>
              ))}
            </ul>
            <div className={'text-color-white '}>
              <span className={'uppercase block mb-3'}>Контакти</span>
              <span className={'block mb-1'}>
                Адреса: вулиця Євгена Сверстюка, 11А
              </span>
              <a href={CONTACTS.phone} className={'block mb-1'}>
                Телефон: {CONTACTS.phoneDisp}
              </a>
              <a href={CONTACTS.email} className={'block mb-1'}>
                Email: {CONTACTS.emailDisp}
              </a>
            </div>
          </div>
        </div>
        <div className={'text-color-white pt-4 pb-4 text-base'}>
          &copy; WisExpert. All rights reserved
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
