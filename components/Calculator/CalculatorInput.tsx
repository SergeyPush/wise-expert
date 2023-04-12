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
      <InputLabel text={label} className={'text-color-white'} />
      <input
        placeholder={placeholder}
        className={
          'rounded-3xl placeholder:text-color-white border-color-white bg-color-blue w-full text-color-white hover:border-color-light-gray text-[14px] font-light placeholder:text-[14px]'
        }
        style={{ borderWidth: '0.4px', padding: '8px 14px' }}
        name={name}
        onChange={(e) => handleChange(e.target.value)}
        value={value as string}
        type={'number'}
      />
    </div>
  );
};

export default CalculatorInput;
