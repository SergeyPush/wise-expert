import React from 'react';
import Wrapper from '@/components/Wrapper';
import CalculatorForm from '@/components/Calculator/CalculatorForm';

const Calculator = () => {
  return (
    <section className={'bg-gradient-to-br from-color-black to-color-light-black pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28'} id={'calc'}>
      <Wrapper>
        <CalculatorForm />
      </Wrapper>
    </section>
  );
};

export default Calculator;
