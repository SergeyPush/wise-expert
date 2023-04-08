import React from 'react';

interface ButtonInterface {
  format: 'black' | 'white' | 'outlined';
  text: string;
  size?: 'normal' | 'wide';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({
  format,
  text,
  size,
  className,
  type,
  disabled,
  onClick,
}: ButtonInterface) => {
  const renderButton = () => {
    if (format === 'white') {
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          // style={{ backgroundColor: type === "black" ? "#161616" : "" }}
          className={`${className} disabled:bg-color-light-black cursor-pointer text-color-black bg-color-white px-8 py-2 rounded-3xl font-bold hover:bg-color-blue hover:text-color-white duration-300 text-sm lg:text-base ${
            size === 'wide' && 'px-12'
          }`}
        >
          {text}
        </button>
      );
    }
    if (format === 'outlined') {
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          // style={{ backgroundColor: type === "black" ? "#161616" : "" }}
          className={`${className} disabled:bg-color-light-black cursor-pointer text-color-white border-2 border-color-white px-8 py-2 rounded-3xl font-bold hover:border-color-blue hover:text-color-blue duration-300 text-sm lg:text-base ${
            size === 'wide' && 'px-12'
          }`}
        >
          {text}
        </button>
      );
    }
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        // style={{ backgroundColor: type === "black" ? "#161616" : "" }}
        className={`${className} disabled:bg-color-light-black cursor-pointer text-color-white bg-color-black px-8 py-2 rounded-3xl font-bold hover:bg-color-blue hover:text-color-white duration-300 text-sm lg:text-base ${
          size === 'wide' && 'px-12'
        }`}
      >
        {text}
      </button>
    );
  };

  return renderButton();
};

export default Button;
