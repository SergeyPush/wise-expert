import React, { useState } from 'react';
import Link from 'next/link';
import { ILink } from '@/interfaces/link.interface';

interface MobileMenuGroupProps {
  item: ILink;
  /** Класс пункта верхнего уровня — берём тот же, что у остальных пунктов меню */
  itemClass: string;
  onClose: () => void;
}

/**
 * «Послуги» в гамбургере: выпадающего меню на мобильной нет, поэтому пункт
 * разворачивается аккордеоном. Отступы и типографика — как у соседних пунктов.
 */
const MobileMenuGroup = ({ item, itemClass, onClose }: MobileMenuGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const children = item.children ?? [];

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`${itemClass} flex items-center justify-between`}
      >
        {item.title}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul className="mt-1 space-y-1 pl-4">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={child.link}
                onClick={onClose}
                className="block rounded-xl px-4 py-2.5 text-xl font-medium text-color-white/80 transition-colors duration-200 hover:bg-color-white/10 hover:text-color-white"
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MobileMenuGroup;
