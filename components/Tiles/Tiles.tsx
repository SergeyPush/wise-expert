import React from 'react';
import Wrapper from '@/components/Wrapper';
import { ITiles } from '@/interfaces/tile.interface';
import Title from '@/components/Title';
import TilesList from '@/components/Tiles/TilesList';
import TilesSwiper from '@/components/Tiles/TilesSwiper';

interface TilesInterface {
  tiles: ITiles;
}
const Tiles = ({ tiles }: TilesInterface) => {
  return (
    <section
      id={'useful'}
      className={'pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24 bg-color-light-gray'}
    >
      <Wrapper>
        <Title text={tiles.title} />
        <TilesSwiper tiles={tiles} />
        <TilesList tiles={tiles} />
      </Wrapper>
    </section>
  );
};

export default Tiles;
