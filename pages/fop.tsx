import React from 'react';
import { NextSeo } from 'next-seo';
import LandingShell from '@/components/Landing/LandingShell';
import { Calculator, Contacts, Faq, Map } from '@/components/Landing/sections';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Support from '@/components/Support/Support';
import Tiles from '@/components/Tiles/Tiles';
import Table from '@/components/Table/Table';
import Reviews from '@/components/Reviews/Reviews';
import Clients from '@/components/Clients/Clients';
import { getLandingData, LandingData } from '@/utils/landing-data';
import { FOP_HERO } from '@/constants/hero.const';
import { FOP_SUPPORT } from '@/constants/support.const';

const SEO = {
  title: 'Бухгалтер для ФОП — ведення та супровід ФОП | WisExpert',
  description:
    'Бухгалтерський супровід ФОП від WisExpert. Ведення обліку, податки, звітність, РРО/ПРРО, консультації. Працюйте з бізнесом — бухгалтерію залиште нам.',
  canonical: 'https://wisexpert.com.ua/fop',
};

export default function FopPage({
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
        <Support data={FOP_SUPPORT} />
        <Tiles tiles={tiles} />
        {/* TODO: заменить на <PricingCards data={FOP_PRICING} /> — три группы ФОП (R4.1) */}
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
    props: await getLandingData(FOP_HERO),
    revalidate: 3600,
  };
}
