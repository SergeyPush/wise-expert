import React from 'react';

interface Children {
  children: React.ReactNode;
  className?: string;
  // Ширина базового брейкпоинта — переопределяется, когда секции нужна
  // другая мобильная ширина (напр. Contacts во всю ширину экрана)
  width?: string;
}
const Wrapper = ({ children, className = '', width = 'w-11/12' }: Children) => {
  return (
    <div className={`${width} xl:w-4/5 lg:w-5/6 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
