import React from 'react';
import { ITile } from '@/interfaces/tile.interface';

interface TileInterface {
  tile: ITile;
  classname?: string;
}
const Tile = ({ tile, classname }: TileInterface) => {
  const { fields } = tile;
  return (
    <li
      className={`border-2 py-5 pl-8 pr-3 border-color-light-blue font-light rounded-3xl h-full ${classname}`}
    >
      <p
        className={
          'text-lg md:text-2xl text-color-blue uppercase mb-2 md:mb-4 font-bold'
        }
      >
        {fields.name}
      </p>
      <ul className={'mb-5'}>
        {fields.description.map((field, idx) => (
          <li key={idx} className={'mb-2 list-disc'}>
            {field}
          </li>
        ))}
      </ul>
      <p className={'font-bold mt-4 text-lg'}>{fields.price}</p>
    </li>
  );
};

export default Tile;
