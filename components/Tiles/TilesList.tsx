import React from 'react';
import { ITiles } from '@/interfaces/tile.interface';
import Tile from '@/components/Tiles/Tile';

interface TilesListInterface {
  tiles: ITiles;
}
const TilesList = ({ tiles }: TilesListInterface) => {
  return (
    <ul
      className={
        'grid gap-5 md:gap-6 lg:gap-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 hidden lg:grid'
      }
    >
      {tiles.tile.map((tile, index) => (
        <Tile tile={tile} key={index} />
      ))}
    </ul>
  );
};

export default TilesList;
