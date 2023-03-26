import React, { Dispatch, SetStateAction } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface FaqTitleInterface {
  question: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const FaqTitle = ({ question, active, setActive }: FaqTitleInterface) => {
  const handleClick = () => {
    setActive((prev) => !prev);
  };
  const variants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <div
      onClick={handleClick}
      className={
        'flex flex-row justify-between font-bold text-lg text-color-black mb-5 cursor-pointer items-center'
      }
    >
      <span>{question}</span>
      <motion.span variants={variants} animate={active ? 'open' : 'closed'}>
        <IoChevronDownOutline />
      </motion.span>
    </div>
  );
};

export default FaqTitle;
