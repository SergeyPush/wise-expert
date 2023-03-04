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
    <div
      className={'pt-12 pb-10 lg:pt-32 lg:pb-20'}
      style={{
        background:
          'radial-gradient(46.56% 196.35% at 6.15% 5.86%, rgba(0, 70, 250, 0.12) 0%, rgba(0, 130, 250, 0.04) 17.49%, rgba(255, 255, 255, 0.4) 79.11%)',
      }}
    >
      <Wrapper>
        <div className={''}>
          <Title text={tiles.title} />
          <TilesSwiper tiles={tiles} />
          <TilesList tiles={tiles} />
        </div>
      </Wrapper>
    </div>
  );
};

export default Tiles;
