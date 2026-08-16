import React from 'react';
import { NextSeo } from 'next-seo';
import LandingPage from '@/components/Landing/LandingPage';
import Table from '@/components/Table/Table';
import { getLandingData, LandingData } from '@/utils/landing-data';
import { FOP_HERO } from '@/constants/hero.const';

const SEO = {
  title: 'Бухгалтер для ФОП — ведення та супровід ФОП | WisExpert',
  description:
    'Бухгалтерський супровід ФОП від WisExpert. Ведення обліку, податки, звітність, РРО/ПРРО, консультації. Працюйте з бізнесом — бухгалтерію залиште нам.',
  canonical: 'https://wisexpert.com.ua/fop',
};

export default function FopPage({ table, ...data }: LandingData) {
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
      {/* TODO: заменить на <PricingCards> — карточки тарифов ФОП (R4.1) */}
      <LandingPage {...data} pricing={<Table table={table} />} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: await getLandingData(FOP_HERO),
    revalidate: 3600,
  };
}
