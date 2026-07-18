import React, { Dispatch, SetStateAction } from 'react';

interface HamburgerInterface {
  className?: string;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  isScrolled?: boolean;
}

const Hamburger = ({
  isActive,
  setIsActive,
  className,
  isScrolled,
}: HamburgerInterface) => {
  return (
    // Остаётся <div>, а не <button>: у <button> ломалось отображение иконки.
    // Доступность с клавиатуры добираем вручную — role/tabIndex/onKeyDown
    <div
      role="button"
      tabIndex={0}
      aria-label={isActive ? 'Закрити меню' : 'Відкрити меню'}
      aria-expanded={isActive}
      className={`menu-toggle${isActive ? ' active' : ''}${isScrolled ? ' scrolled' : ''} ${className}`}
      onClick={() => {
        setIsActive((prevState) => !prevState);
      }}
      onKeyDown={(e) => {
        // нативная кнопка срабатывает на Enter и Space — повторяем это поведение
        if (e.key === 'Enter' || e.key === ' ') {
          // Space иначе прокрутит страницу
          e.preventDefault();
          setIsActive((prevState) => !prevState);
        }
      }}
    >
      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="cross">
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Hamburger;
