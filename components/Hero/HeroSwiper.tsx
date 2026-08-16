import React from 'react';
import { IHero } from '@/interfaces/hero.interface';
import { IAdvantages } from '@/interfaces/advantages.interface';
import SlideOne from '@/components/Hero/SlideOne';

interface HeroSwiperInterface {
  slide: IHero;
  advantages: IAdvantages;
}

// Слайдер убран: на всех страницах один hero, запись приходит из
// getLandingData (у /fop и /tov отличаются только тексты)
const HeroSwiper = ({ slide, advantages }: HeroSwiperInterface) => {
  return <SlideOne data={slide} advantages={advantages} />;
};

export default HeroSwiper;
