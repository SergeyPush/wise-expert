import React from 'react';
import { motion } from 'framer-motion';

interface FaqBodyInterface {
  response: string;
  active: boolean;
}
const FaqBody = ({ response, active }: FaqBodyInterface) => {
  const variants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
  };
  return (
    <>
      {active && (
        <motion.div
          variants={variants}
          initial={'hidden'}
          animate={'show'}
          exit={{ opacity: 0 }}
          className={`font-light`}
        >
          {response}
        </motion.div>
      )}
    </>
  );
};

export default FaqBody;
