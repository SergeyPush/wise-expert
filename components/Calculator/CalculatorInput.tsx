import React, { Dispatch, SetStateAction } from 'react';
import InputLabel from '@/components/Contacts/InputLabel';
import { IDropdown } from '@/interfaces/form.interface';

interface CalculatorInterface {
  label: string;
  placeholder: string;
  name: string;
  setState: Dispatch<SetStateAction<{}>>;
  value: string | IDropdown | IDropdown[];
}
const CalculatorInput = ({
  label,
  placeholder,
  name,
  setState,
  value,
}: CalculatorInterface) => {
  const handleChange = (data: string) => {
    setState((prevState) => ({ ...prevState, [name]: data }));
  };

  return (
    <div className={'flex-1'}>
      <InputLabel text={label} className={'text-color-white/80'} />
      <input
        placeholder={placeholder}
        className={
          'rounded-xl bg-color-white/[0.08] border border-color-white/[0.15] w-full text-color-white placeholder:text-color-white/50 text-[14px] px-4 py-3 transition-all duration-200 hover:border-color-white/[0.25] hover:bg-color-white/10 focus:border-color-blue-light focus:bg-color-white/10 focus:outline-none'
        }
        name={name}
        onChange={(e) => handleChange(e.target.value)}
        value={value as string}
      />
    </div>
  );
};

export default CalculatorInput;
