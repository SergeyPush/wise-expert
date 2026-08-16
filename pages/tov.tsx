import React from 'react';
import { NextSeo } from 'next-seo';
import LandingPage from '@/components/Landing/LandingPage';
import Table from '@/components/Table/Table';
import { getLandingData, LandingData } from '@/utils/landing-data';
import { TOV_HERO } from '@/constants/hero.const';

const SEO = {
  title: 'Бухгалтер для ТОВ — ведення та супровід компаній | WisExpert',
  description:
    'Бухгалтерський супровід ТОВ від WisExpert. Повний облік компанії: податки, ПДВ, звітність, зарплата, кадри та консультації директора.',
  canonical: 'https://wisexpert.com.ua/tov',
};

export default function TovPage({ table, ...data }: LandingData) {
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
      {/* TODO: заменить на <PricingCards> — тарифы ТОВ (R4.2) */}
      <LandingPage {...data} pricing={<Table table={table} />} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: await getLandingData(TOV_HERO),
    revalidate: 3600,
  };
}
