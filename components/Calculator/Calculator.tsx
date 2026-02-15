import React from 'react';
import Wrapper from '@/components/Wrapper';
import CalculatorForm from '@/components/Calculator/CalculatorForm';
import ScrollReveal from '@/components/ScrollReveal';

const Calculator = () => {
  return (
    <section className={'bg-gradient-to-br from-color-black to-color-light-black pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28'} id={'calc'}>
      <Wrapper>
        <ScrollReveal>
          <CalculatorForm />
        </ScrollReveal>
      </Wrapper>
    </section>
  );
};

export default Calculator;
