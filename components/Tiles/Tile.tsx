import React from 'react';
import Link from 'next/link';
import { ITile } from '@/interfaces/tile.interface';
import { TILE_SLUG_MAP } from '@/constants/services.const';

interface TileInterface {
  tile: ITile;
  classname?: string;
}
const Tile = ({ tile, classname }: TileInterface) => {
  const { fields } = tile;
  const slug = TILE_SLUG_MAP[fields.name];

  const content = (
    <>
      <p className={'text-lg md:text-xl text-color-blue mb-3 md:mb-4 font-bold'}>
        {fields.name}
      </p>
      <ul className={'mb-6 flex-1 space-y-2'}>
        {fields.description.map((field, idx) => (
          <li key={idx} className={'text-color-muted pl-4 relative before:content-[""] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-color-blue before:rounded-full'}>
            {field}
          </li>
        ))}
      </ul>
      <div className="pt-5 mt-2 border-t border-color-border">
        <p className={'font-bold text-xl text-color-black'}>{fields.price}</p>
      </div>
      {slug && (
        <span className="mt-4 text-sm font-medium text-color-blue">
          Дізнатися більше →
        </span>
      )}
    </>
  );

  if (slug) {
    return (
      <li className={`bg-color-white p-6 md:p-8 rounded-2xl h-full shadow-soft hover:shadow-elevated transition-shadow duration-300 flex flex-col ${classname}`}>
        <Link href={`/services/${slug}`} className="flex flex-col flex-1">
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={`bg-color-white p-6 md:p-8 rounded-2xl h-full shadow-soft hover:shadow-elevated transition-shadow duration-300 flex flex-col ${classname}`}
    >
      {content}
    </li>
  );
};

export default Tile;
