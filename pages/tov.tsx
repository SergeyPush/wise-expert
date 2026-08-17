import React from 'react';
import { NextSeo } from 'next-seo';
import LandingShell from '@/components/Landing/LandingShell';
import { Calculator, Contacts, Faq, Map } from '@/components/Landing/sections';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Support from '@/components/Support/Support';
import Tiles from '@/components/Tiles/Tiles';
import PricingCards from '@/components/Pricing/PricingCards';
import Reviews from '@/components/Reviews/Reviews';
import Clients from '@/components/Clients/Clients';
import { getLandingData, LandingData } from '@/utils/landing-data';
import { TOV_HERO } from '@/constants/hero.const';
import { TOV_SUPPORT } from '@/constants/support.const';
import { TOV_PRICING } from '@/constants/pricing.const';
import { TOV_FAQ } from '@/constants/faq.const';

const SEO = {
  title: 'Бухгалтер для ТОВ — ведення та супровід компаній | WisExpert',
  description:
    'Бухгалтерський супровід ТОВ від WisExpert. Повний облік компанії: податки, ПДВ, звітність, зарплата, кадри та консультації директора.',
  canonical: 'https://wisexpert.com.ua/tov',
};

export default function TovPage({
  slide,
  advantages,
  tiles,
  reviews,
  clients,
  faq,
}: LandingData) {
  return (
    <>
      <NextSeo
        title={SEO.title}
        description={SEO.description}
        canonical={SEO.canonical}
        openGraph={{
          title: SEO.title,
          description: SEO.description,
          url: SEO.canonical,
          type: 'website',
          locale: 'uk_UA',
        }}
      />
      <LandingShell>
        <HeroSwiper slide={slide} advantages={advantages} />
        <Support data={TOV_SUPPORT} />
        <Tiles tiles={tiles} />
        <PricingCards data={TOV_PRICING} />
        <Reviews reviews={reviews} />
        <Clients clients={clients} />
        <Calculator />
        <Faq faq={faq} />
        <Contacts />
        <Map />
      </LandingShell>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: await getLandingData(TOV_HERO, TOV_FAQ),
    revalidate: 3600,
  };
}
