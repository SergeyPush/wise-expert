import React from 'react';
import Wrapper from '@/components/Wrapper';
import CalculatorForm from '@/components/Calculator/CalculatorForm';

const Calculator = () => {
  return (
    <div className={'bg-color-blue pt-20 pb-20'} id={'calc'}>
      <Wrapper>
        <CalculatorForm />
      </Wrapper>
    </div>
  );
};

export default Calculator;
