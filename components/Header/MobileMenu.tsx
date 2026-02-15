import React, { useEffect } from 'react';
import styles from '@/styles/MobileMenu.module.scss';
import Button from '@/components/Button/Button';
import IconList from '@/components/Header/IconList';
import { CONTACTS } from '@/constants/contact.const';
import { LINKS } from '@/constants/links.const';
import { scrollToId } from '@/utils/scroll.utils';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLinkClick = (id: string) => {
    onClose();
    setTimeout(() => {
      scrollToId(id);
    }, 100);
  };

  return (
    <div className={styles.wrapper}>
      {/* Top spacing for header */}
      <div className="h-20" />

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col justify-center px-8 py-8">
        <nav>
          <ul className="space-y-2">
            {LINKS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className="w-full text-left text-2xl font-semibold text-color-white py-3 px-4 rounded-xl hover:bg-color-white/10 transition-colors duration-200"
                >
                  {item.title}
                </button>
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
          onClick={() => handleLinkClick('calc')}
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
