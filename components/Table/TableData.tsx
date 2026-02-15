import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface TableDataInterface {
  data: string[][];
}
const TableData = ({ data }: TableDataInterface) => {
  const shouldReduceMotion = useReducedMotion();
  const key = data.map((r) => r[0]).join(',');

  return (
    <div className="mt-8 bg-color-white rounded-2xl shadow-soft overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.table
          key={key}
          className={'w-full'}
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.2 },
              })}
        >
          <tbody>
            {data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={'border-b border-color-border last:border-b-0 hover:bg-color-light-gray transition-colors duration-150'}
                >
                  <td className={'py-4 px-4 md:py-5 md:px-6 text-color-black'}>{item[0]}</td>
                  <td
                    className={
                      'py-4 px-4 md:py-5 md:px-6 text-right text-color-blue font-semibold whitespace-nowrap'
                    }
                  >
                    {item[1]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </motion.table>
      </AnimatePresence>
    </div>
  );
};

export default TableData;
