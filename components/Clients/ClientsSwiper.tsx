import React from 'react';
import { IClients } from '@/interfaces/clients.interface';
import { Pagination, SwiperOptions, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageSlide from '@/components/Clients/ImageSlide';

interface ClientSwiperInterface {
  clients: IClients;
}
const ClientsSwiper = ({ clients }: ClientSwiperInterface) => {
  const swiperOptions: SwiperOptions = {
    spaceBetween: 1,
    loop: true,
    speed: 1000,
    loopedSlides: 0,
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
  const arrayOfImages = [
    ...clients.images,
    ...clients.images,
    ...clients.images,
  ];
  return (
    <div className={'overflow-hidden'}>
      <Swiper {...swiperOptions}>
        {arrayOfImages.map((image, index) => {
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
