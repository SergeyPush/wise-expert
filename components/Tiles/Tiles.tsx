import React from 'react';
import Wrapper from '@/components/Wrapper';
import { ITiles } from '@/interfaces/tile.interface';
import Title from '@/components/Title';
import Tile from '@/components/Tiles/Tile';
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
          'radial-gradient(91.81% 116.89% at 6.15% 5.86%, rgba(0, 250, 208, 0.12) 0%, rgba(0, 97, 250, 0.03) 17.49%, rgba(255, 255, 255, 0.3) 79.11%) ',
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
