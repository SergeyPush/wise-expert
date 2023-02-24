import React, { useState } from 'react';

const Hamburger = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`hamburger hamburger--slider${isActive ? ' is-active' : ''}`}
      type="button"
      onClick={() => {
        setIsActive((prevState) => !prevState);
      }}
    >
      <span className="hamburger-box hamburger--slider">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default Hamburger;
