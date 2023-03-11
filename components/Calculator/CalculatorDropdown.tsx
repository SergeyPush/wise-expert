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
}

const CalculatorDropdown = ({
  options,
  label,
  isMulti,
  className,
  name,
  setState,
}: CalculatorDropdownInterface) => {
  // const ValueContainer = ({
  //   children,
  //   ...props
  // }: ValueContainerProps<IDropdown>) => {
  //   let [values, input] = children as any;
  //
  //   if (Array.isArray(values) && values.length > 2) {
  //     const plural = values.length === 1 ? '' : 's';
  //     values = `3 Обрано`;
  //   }
  //
  //   return (
  //     <components.ValueContainer {...props}>
  //       {values}
  //       {input}
  //     </components.ValueContainer>
  //   );
  // };
  //TODO https://codesandbox.io/s/custom-visible-multivalues-8zh8c?file=/example.js

  const handleChange = (data: IDropdown | IDropdown[]) => {
    if (Array.isArray(data)) {
      setState((prevState) => ({
        ...prevState,
        ...{ [name]: data.map((item) => item.value).join(', ') },
      }));
    } else {
      setState((prevState) => ({ ...prevState, ...{ [name]: data.value } }));
    }
  };

  return (
    <div className={className}>
      <InputLabel text={label} className={'text-color-white'} />
      <Select
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
