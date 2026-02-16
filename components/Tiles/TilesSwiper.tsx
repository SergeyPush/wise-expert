import React from 'react';
import { ITiles } from '@/interfaces/tile.interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import Tile from '@/components/Tiles/Tile';

interface TilesSwiperInterface {
  tiles: ITiles;
}

const TilesSwiper = ({ tiles }: TilesSwiperInterface) => {
  const swiperOptions: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoHeight: true,
    modules: [Pagination],
    pagination: {
      clickable: true,
      bulletClass: 'tiles-swiper-bullet',
      bulletActiveClass: 'tiles-swiper-bullet-active',
      modifierClass: 'tiles-swiper-pagination-',
    },
  };

  return (
    <div className={'lg:hidden pb-12'}>
      <Swiper {...swiperOptions}>
        {tiles.tile.map((item, index) => {
          return (
            <SwiperSlide key={index} className="!pb-4">
              <Tile tile={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default TilesSwiper;
