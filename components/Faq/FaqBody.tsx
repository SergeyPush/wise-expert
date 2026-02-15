import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FaqBodyInterface {
  response: string;
  active: boolean;
}
const FaqBody = ({ response, active }: FaqBodyInterface) => {
  return (
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div
            dangerouslySetInnerHTML={{ __html: response }}
            className="px-5 pb-5 md:px-6 md:pb-6 text-color-muted leading-relaxed"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FaqBody;
