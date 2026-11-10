import React from 'react';
import Select, { Props } from 'react-select';
import colorStyles from '@/components/Calculator/CalculatorDropdownStyles';

// Отдельный модуль, чтобы react-select (+ emotion) ушёл в свой чанк
// и грузился через dynamic() только когда калькулятор рядом с экраном
const CalculatorSelect = (props: Props) => (
  <Select styles={colorStyles} {...props} />
);

export default CalculatorSelect;
