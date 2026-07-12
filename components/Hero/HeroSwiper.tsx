import React from 'react';
import { IHero } from '@/interfaces/hero.interface';
import { IAdvantages } from '@/interfaces/advantages.interface';
import SlideOne from '@/components/Hero/SlideOne';

interface HeroSwiperInterface {
  slides: IHero[];
  advantages: IAdvantages;
}
const HeroSwiper = ({ slides, advantages }: HeroSwiperInterface) => {
  // Слайдер убран: показываем только первый слайд с фото девушек
  // копия перед сортировкой — не мутируем проп slides
  const [first] = [...slides].sort((a, b) => (a.slide > b.slide ? 1 : -1));

  return <SlideOne data={first} advantages={advantages} />;
};

export default HeroSwiper;
