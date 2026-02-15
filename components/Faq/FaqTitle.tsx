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
        `flex flex-row justify-between font-semibold text-base md:text-lg cursor-pointer items-center gap-4 px-5 py-5 md:px-6 md:py-6 transition-colors duration-200 ${
          active ? 'text-color-blue' : 'text-color-black hover:text-color-blue'
        }`
      }
    >
      <span>{question}</span>
      <motion.span
        variants={variants}
        animate={active ? 'open' : 'closed'}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 text-color-muted"
      >
        <IoChevronDownOutline className="w-5 h-5" />
      </motion.span>
    </div>
  );
};

export default FaqTitle;
