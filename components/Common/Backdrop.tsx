import React from 'react';
import ContactForm from '@/components/Contacts/ContactForm';

interface BackdropInterface {
  // children: React.ReactNode;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Backdrop = ({ setIsVisible }: BackdropInterface) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    setIsVisible((prevState) => !prevState);
  };
  return (
    <div
      className={
        'absolute w-full h-screen z-40 top-0 bottom-0 left-0 right-0 bg-color-black flex justify-center items-center bg-opacity-20 p-4'
      }
      onClick={(e) => handleClick(e)}
    >
      <ContactForm
        className={'flex-grow md:flex-grow-0'}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};

export default Backdrop;
