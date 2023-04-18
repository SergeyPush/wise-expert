import React from 'react';

interface TableDataInterface {
  data: string[][];
}
const TableData = ({ data }: TableDataInterface) => {
  return (
    <table className={'ml-auto mr-auto'}>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr
              key={index}
              className={'odd:bg-color-light-blue even:bg-color-light-gray'}
            >
              <td className={'p-2 md:py-3 md:px-3  md:w-5/6'}>{item[0]}</td>
              <td
                className={
                  'p-2 md:py-3 md:px-3 w-3/12 md:w-1/6 text-left text-color-blue font-bold'
                }
              >
                {item[1]}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableData;
