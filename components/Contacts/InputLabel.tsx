import React from 'react';

interface InputLabelInterface {
  text: string;
  className?: string;
  htmlFor?: string;
  // обязательное поле — помечаем красной звёздочкой справа от подписи
  required?: boolean;
}
const InputLabel = ({
  text,
  className,
  htmlFor,
  required,
}: InputLabelInterface) => {
  return (
    <label
      className={`mb-2 text-sm font-medium text-color-black block ${className}`}
      htmlFor={htmlFor}
    >
      {text}
      {required && (
        <span className={'text-color-red ml-1'} aria-hidden={'true'}>
          *
        </span>
      )}
    </label>
  );
};

export default InputLabel;
