import React, { useContext } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { GlobalContext } from '@/context/GlobalContext';

const Confirmation = () => {
  const { confirmationIsVisible } = useContext(GlobalContext);

  return (
    <>
      {confirmationIsVisible && (
        <div
          className={
            'fixed z-50 w-[400px] bg-color-black rounded-3xl left-0 right-0 top-[40%] ml-auto mr-auto text-color-white p-6 bg-opacity-60 flex justify-center items-center flex-col gap-3 border border-color-white'
          }
        >
          <BsCheckCircle className={'text-5xl'} />
          <span className={'text-center'}>
            Ваше повідомлення відправлене. <br /> Ми скоро звʼяжемость з Вами
          </span>
        </div>
      )}
    </>
  );
};

export default Confirmation;
