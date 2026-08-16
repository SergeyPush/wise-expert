import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ILink } from '@/interfaces/link.interface';

interface ServicesDropdownProps {
  item: ILink;
  isScrolled?: boolean;
  className: string;
}

/**
 * Десктопный пункт «Послуги» со списком ФОП / ТОВ. Отдельной страницы услуг
 * нет, поэтому сам пункт не ссылка, а кнопка: открывается наведением и
 * клавиатурой, закрывается по Esc, клику вне и переходу по ссылке.
 */
const ServicesDropdown = ({
  item,
  isScrolled,
  className,
}: ServicesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);
  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const { pathname } = useRouter();

  const children = item.children ?? [];
  // пункт подсвечен, пока открыта одна из его страниц
  const isActive = children.some((child) => child.link === pathname);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  const focusItem = (index: number) => {
    const total = children.length;
    // по кругу: с последнего пункта стрелка вниз возвращает на первый
    itemsRef.current[(index + total) % total]?.focus();
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(true);
      // ждём рендер списка, только потом переводим фокус на первый пункт
      requestAnimationFrame(() => focusItem(0));
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(index + 1);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(index - 1);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      wrapperRef.current?.querySelector('button')?.focus();
    }
  };

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        className={`${className} inline-flex items-center gap-1 ${
          isActive
            ? isScrolled
              ? 'text-color-blue'
              : 'text-color-white bg-color-white/10'
            : ''
        }`}
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
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="absolute left-0 top-full z-50 min-w-[160px] overflow-hidden rounded-xl border border-color-border bg-color-white py-1 shadow-elevated"
        >
          {children.map((child, index) => (
            <li key={child.id} role="none">
              <Link
                href={child.link}
                role="menuitem"
                ref={(node) => {
                  itemsRef.current[index] = node;
                }}
                onClick={() => setIsOpen(false)}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-color-light-blue ${
                  child.link === pathname
                    ? 'text-color-blue'
                    : 'text-color-light-black hover:text-color-blue'
                }`}
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default ServicesDropdown;
