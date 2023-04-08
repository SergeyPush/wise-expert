import React from 'react';
import Backdrop from '@/components/Common/Backdrop';

interface BookCallInterface {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const BookCall = ({ isVisible, setIsVisible }: BookCallInterface) => {
  return <div>{isVisible && <Backdrop setIsVisible={setIsVisible} />}</div>;
};

export default BookCall;
