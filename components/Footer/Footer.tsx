import React from 'react';
import Wrapper from '@/components/Wrapper';
import IconList from '@/components/Header/IconList';
import { LINKS } from '@/constants/links.const';
import { scrollToId } from '@/utils/scroll.utils';
import { CONTACTS } from '@/constants/contact.const';

const Footer = () => {
  const filteredLinks = [...LINKS];
  filteredLinks.splice(4, 1);

  const handleClick = (id: string) => {
    scrollToId(id);
  };

  return (
    <footer className={'bg-color-extra-black'}>
      <Wrapper>
        {/* Main Footer Content */}
        <div
          className={
            'py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8'
          }
        >
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <span className={'block text-2xl font-bold text-color-white mb-3'}>
              WisExpert
            </span>
            <p className={'text-color-white/60 text-sm mb-6 max-w-xs'}>
              Професійні бухгалтерські послуги для вашого бізнесу
            </p>
            <IconList color={'white'} />
          </div>

          {/* Navigation Links */}
          <div>
            <span className="block text-sm font-semibold text-color-white mb-4 uppercase tracking-wider">
              Навігація
            </span>
            <ul className="space-y-3">
              {filteredLinks.map(({ title, id }, index) => (
                <li
                  key={index}
                  className={'text-color-white/60 hover:text-color-white cursor-pointer transition-colors duration-200 text-sm'}
                  onClick={() => handleClick(id)}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <span className="block text-sm font-semibold text-color-white mb-4 uppercase tracking-wider">
              Контакти
            </span>
            <div className="space-y-3 text-sm">
              <p className={'text-color-white/60'}>
                вулиця Євгена Сверстюка, 11А
              </p>
              <a
                href={CONTACTS.phone}
                className={'block text-color-white/60 hover:text-color-white transition-colors duration-200'}
              >
                {CONTACTS.phoneDisp}
              </a>
              <a
                href={CONTACTS.email}
                className={'block text-color-white/60 hover:text-color-white transition-colors duration-200'}
              >
                {CONTACTS.emailDisp}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <span className="block text-sm font-semibold text-color-white mb-4 uppercase tracking-wider">
              Графік роботи
            </span>
            <div className="space-y-2 text-sm text-color-white/60">
              <p>Пн - Пт: 9:00 - 18:00</p>
              <p>Сб - Нд: Вихідний</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={'border-t border-color-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4'}>
          <p className={'text-color-white/50 text-sm'}>
            &copy; {new Date().getFullYear()} WisExpert. Всі права захищені
          </p>
          <p className={'text-color-white/30 text-xs'}>
            Розроблено з ❤️ в Україні
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
