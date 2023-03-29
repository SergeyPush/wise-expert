import React from 'react';
import Wrapper from '@/components/Wrapper';
import ContactForm from '@/components/Contacts/ContactForm';

const Questions = () => {
  return (
    <div className="bg-color-black">
      <Wrapper>
        <div
          className={'pt-14 pb-10 lg:pb-16 flex flex-col lg:flex-row gap-10'}
        >
          <div
            className={
              'text-color-white flex flex-col justify-center lg:w-2/5 '
            }
          >
            <p className={'text-3xl lg:text-5xl mb-1 lg:mb-5'}>
              Залишились питання?
            </p>
            <p className={'md:text-lg'}>
              Заповніть форму і ми зв’яжемось з Вами
            </p>
          </div>
          <ContactForm />
        </div>
      </Wrapper>
    </div>
  );
};

export default Questions;
