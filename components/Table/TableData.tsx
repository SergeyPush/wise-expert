import React from 'react';

interface TableDataInterface {
  data: string[][];
}
const TableData = ({ data }: TableDataInterface) => {
  return (
    <div className="mt-8 bg-color-white rounded-2xl shadow-soft overflow-hidden">
      <table className={'w-full'}>
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
      </table>
    </div>
  );
};

export default TableData;
