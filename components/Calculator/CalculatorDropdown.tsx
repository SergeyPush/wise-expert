import React, { Dispatch, SetStateAction, useId } from 'react';
import { IDropdown } from '@/interfaces/form.interface';
import Select from 'react-select';
import InputLabel from '@/components/Contacts/InputLabel';
import colorStyles from '@/components/Calculator/CalculatorDropdownStyles';

interface CalculatorDropdownInterface {
  options: IDropdown[];
  label: string;
  isMulti?: boolean;
  className?: string;
  name: string;
  setState: Dispatch<SetStateAction<{}>>;
  value: string | IDropdown | IDropdown[];
}

const CalculatorDropdown = ({
  options,
  label,
  isMulti,
  className,
  name,
  setState,
  value,
}: CalculatorDropdownInterface) => {
  const handleChange = (data: IDropdown | IDropdown[]) => {
    setState((prevState) => ({ ...prevState, [name]: data }));
  };

  return (
    <div className={className}>
      <InputLabel text={label} className={'text-color-white'} />
      <Select
        value={value}
        isMulti={isMulti}
        options={options}
        instanceId={useId()}
        placeholder={'Оберіть варіант'}
        styles={colorStyles}
        closeMenuOnSelect={true}
        hideSelectedOptions={true}
        onChange={(selected) =>
          handleChange(selected as IDropdown | IDropdown[])
        }
        name={name}
      />
    </div>
  );
};

export default CalculatorDropdown;
