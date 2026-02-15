import React from 'react';
import Wrapper from '@/components/Wrapper';
import ContactForm from '@/components/Contacts/ContactForm';

const Questions = () => {
  return (
    <section className="bg-gradient-to-br from-color-black to-color-light-black">
      <Wrapper>
        <div
          className={'py-16 md:py-20 lg:py-28 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center'}
        >
          <div
            className={
              'text-color-white flex flex-col justify-center lg:w-full'
            }
          >
            <h2 className={'text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-5 tracking-tight'}>
              Залишились питання?
            </h2>
            <p className={'text-color-white/70 text-base md:text-lg max-w-md'}>
              Заповніть форму і ми зв&apos;яжемось з Вами найближчим часом
            </p>
          </div>
          <div className={'flex justify-center items-center w-full lg:w-auto lg:min-w-[400px]'}>
            <ContactForm className={'flex-1 max-w-md lg:max-w-none'} />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Questions;
