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
    // 1.1: краешек следующей карточки виден — подсказка, что можно свайпать
    slidesPerView: 1.1,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 1.15,
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
            // !h-auto: слайды растягиваются flex-ом до самой высокой карточки
            <SwiperSlide key={index} className="!pb-4 !h-auto">
              <Tile tile={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default TilesSwiper;
