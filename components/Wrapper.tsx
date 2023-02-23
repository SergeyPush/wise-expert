import React from 'react';

interface Children {
  children: React.ReactNode;
  className?: string;
}
const Wrapper = ({ children, className }: Children) => {
  return (
    <div className={`w-11/12 xl:w-4/5 lg:w-5/6 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
