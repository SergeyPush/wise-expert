import React from 'react';

interface InputLabelInterface {
  text: string;
  className?: string;
  htmlFor?: string;
}
const InputLabel = ({ text, className, htmlFor }: InputLabelInterface) => {
  return (
    <label
      className={`mb-1 text-base font-bold ml-2 text-color-black block ${className}`}
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
};

export default InputLabel;
