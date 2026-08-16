import React from 'react';
import dynamic from 'next/dynamic';
import { Nunito_Sans } from 'next/font/google';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Tiles from '@/components/Tiles/Tiles';
import Reviews from '@/components/Reviews/Reviews';
import Clients from '@/components/Clients/Clients';
import Footer from '@/components/Footer/Footer';
import { IHero } from '@/interfaces/hero.interface';
import { IAdvantages } from '@/interfaces/advantages.interface';
import { ITiles } from '@/interfaces/tile.interface';
import { IReviews } from '@/interfaces/reviews.interface';
import { IClients } from '@/interfaces/clients.interface';
import { IFAQ } from '@/interfaces/faq.interface';

// Lazy load below-the-fold components
const Calculator = dynamic(() => import('@/components/Calculator/Calculator'), {
  ssr: true,
});
const Faq = dynamic(() => import('@/components/Faq/Faq'), {
  ssr: true,
});
const Contacts = dynamic(() => import('@/components/Contacts/Contacts'), {
  ssr: true,
});
const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: true,
});
const Questions = dynamic(() => import('@/components/Questions/Questions'), {
  ssr: true,
});
const Confirmation = dynamic(() => import('@/components/Common/Confirmation'), {
  ssr: false,
});

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

interface LandingPageProps {
  slide: IHero;
  advantages: IAdvantages;
  tiles: ITiles;
  reviews: IReviews;
  clients: IClients;
  faq: IFAQ;
  /**
   * Секция цен — слотом, а не флагом страницы: на главной это таблица с
   * вкладками, на /fop и /tov — карточки тарифов (R4).
   */
  pricing: React.ReactNode;
  /** Блок «Супровід» (R2) — только на /fop и /tov, у каждой своя раскладка */
  support?: React.ReactNode;
  /** Блок «Залишились питання»: по R8 выводим лишь на главной */
  withQuestions?: boolean;
}

/**
 * Общая композиция лендинга для /, /fop и /tov. Порядок блоков — из ТЗ
 * («Порядок блоків на сторінці»), данные приходят готовыми из getStaticProps.
 */
const LandingPage = ({
  slide,
  advantages,
  tiles,
  reviews,
  clients,
  faq,
  pricing,
  support,
  withQuestions,
}: LandingPageProps) => {
  return (
    <main className={nunito.className}>
      <HeroSwiper slide={slide} advantages={advantages} />
      {support}
      <Tiles tiles={tiles} />
      {pricing}
      <Reviews reviews={reviews} />
      <Clients clients={clients} />
      <Calculator />
      <Faq faq={faq} />
      <Contacts />
      <Map />
      {withQuestions && <Questions />}
      <Footer />
      <Confirmation />
    </main>
  );
};

export default LandingPage;
