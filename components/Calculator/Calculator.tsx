import React from 'react';
import Wrapper from '@/components/Wrapper';
import ContactForm from '@/components/Contacts/ContactForm';

const Calculator = () => {
  return (
    <div className={'bg-color-blue pt-12 pb-12'}>
      <Wrapper>
        <ContactForm />
      </Wrapper>
    </div>
  );
};

export default Calculator;
