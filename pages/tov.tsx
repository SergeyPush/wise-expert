import React from 'react';
import { NextSeo } from 'next-seo';
import LandingShell from '@/components/Landing/LandingShell';
import { Calculator, Contacts, Faq, Map } from '@/components/Landing/sections';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Tiles from '@/components/Tiles/Tiles';
import Table from '@/components/Table/Table';
import Reviews from '@/components/Reviews/Reviews';
import Clients from '@/components/Clients/Clients';
import { getLandingData, LandingData } from '@/utils/landing-data';
import { TOV_HERO } from '@/constants/hero.const';

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
  table,
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
        {/* TODO: <Support data={TOV_SUPPORT} /> — раскладка split, фиолетовый акцент (R2.2) */}
        <Tiles tiles={tiles} />
        {/* TODO: заменить на <PricingCards data={TOV_PRICING} /> — три тарифа ТОВ (R4.2) */}
        <Table table={table} />
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
    props: await getLandingData(TOV_HERO),
    revalidate: 3600,
  };
}
