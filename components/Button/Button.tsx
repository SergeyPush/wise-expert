import React from 'react';

interface ButtonInterface {
  format: 'black' | 'white' | 'outlined' | 'primary' | 'outline-dark' | 'ghost';
  text: string;
  size?: 'normal' | 'wide';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  // если передан href — рендерится <a> (например, tel:/mailto: ссылки)
  href?: string;
}

const Button = ({
  format,
  text,
  size,
  className,
  type,
  disabled,
  onClick,
  href,
}: ButtonInterface) => {
  const baseStyles =
    'cursor-pointer font-semibold transition-all duration-200 text-sm lg:text-base rounded-xl text-center';
  const sizeStyles = size === 'wide' ? 'px-8 py-3' : 'px-6 py-2.5';

  const formatStyles: Record<string, string> = {
    primary:
      'text-color-white bg-color-blue hover:bg-color-blue-dark active:scale-[0.98] shadow-soft hover:shadow-elevated',
    white:
      'text-color-black bg-color-white hover:bg-color-light-gray hover:shadow-elevated active:scale-[0.98] shadow-soft',
    outlined:
      'text-color-white border-2 border-color-white/80 bg-transparent hover:bg-color-white/10 backdrop-blur-sm',
    'outline-dark':
      'text-color-black border-2 border-color-border bg-transparent hover:border-color-blue hover:text-color-blue',
    black:
      'text-color-white bg-color-black hover:bg-color-light-black active:scale-[0.98]',
    ghost:
      'text-color-blue bg-transparent hover:bg-color-blue/10 active:scale-[0.98]',
  };

  const classes = `${baseStyles} ${sizeStyles} ${formatStyles[format]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${classes} inline-block`}>
        {text}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
    >
      {text}
    </button>
  );
};

export default Button;
