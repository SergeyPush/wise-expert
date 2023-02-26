import React, { Dispatch, SetStateAction } from 'react';

interface HamburgerInterface {
  className?: string;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Hamburger = ({
  isActive,
  setIsActive,
  className,
}: HamburgerInterface) => {
  return (
    <div
      className={`menu-toggle${isActive ? ' active' : ''} ${className}`}
      onClick={() => {
        setIsActive((prevState) => !prevState);
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
