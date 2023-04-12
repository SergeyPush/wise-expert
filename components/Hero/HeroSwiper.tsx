import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { IHero } from '@/interfaces/hero.interface';
import SlideOne from '@/components/Hero/SlideOne';
import SlideTwo from '@/components/Hero/SlideTwo';

interface HeroSwiperInterface {
  slides: IHero[];
}
const HeroSwiper = ({ slides }: HeroSwiperInterface) => {
  const [first, second] = slides.sort((a, b) => (a.slide > b.slide ? 1 : -1));

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      speed={800}
      loop={true}
      pagination={{
        clickable: true,
        bulletClass: 'hero-swiper-bullet',
        bulletActiveClass: 'hero-swiper-bullet-active',
        modifierClass: 'hero-swiper-pagination-',
      }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <SlideOne data={first} />
      </SwiperSlide>
      <SwiperSlide>
        <SlideTwo data={second} />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSwiper;
