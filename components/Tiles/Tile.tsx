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
      className={`bg-color-white p-6 md:p-8 rounded-2xl h-full shadow-soft hover:shadow-elevated transition-shadow duration-300 flex flex-col ${classname}`}
    >
      <p
        className={
          'text-lg md:text-xl text-color-blue mb-3 md:mb-4 font-bold'
        }
      >
        {fields.name}
      </p>
      <ul className={'mb-6 flex-1 space-y-2'}>
        {fields.description.map((field, idx) => (
          <li key={idx} className={'text-color-muted pl-4 relative before:content-[""] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-color-blue before:rounded-full'}>
            {field}
          </li>
        ))}
      </ul>
      <div className="pt-4 border-t border-color-border">
        <p className={'font-bold text-xl text-color-black'}>{fields.price}</p>
      </div>
    </li>
  );
};

export default Tile;
