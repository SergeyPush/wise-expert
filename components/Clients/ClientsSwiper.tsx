import React from 'react';
import { IClients } from '@/interfaces/clients.interface';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import ImageSlide from '@/components/Clients/ImageSlide';

interface ClientSwiperInterface {
  clients: IClients;
}
const ClientsSwiper = ({ clients }: ClientSwiperInterface) => {
  const swiperOptions: SwiperOptions = {
    spaceBetween: 1,
    loop: true,
    speed: 1000,
    slidesPerView: 2,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 1,
      },
    },
    autoHeight: true,
    modules: [Pagination, Autoplay],
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
    },
  };
  // Без утроения массива: loop в Swiper 12 сам переставляет слайды,
  // а 16 логотипов при максимум 4 на экране хватает для бесконечной ленты.
  // Утроение давало 48 <img> в DOM и лишний layout
  return (
    <div className={'overflow-hidden'}>
      <Swiper {...swiperOptions}>
        {clients.images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <ImageSlide
                name={image.fields.title}
                url={image.fields.file.url}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ClientsSwiper;
