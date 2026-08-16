import React from 'react';
import LandingShell from '@/components/Landing/LandingShell';
import {
  Calculator,
  Contacts,
  Faq,
  Map,
  Questions,
} from '@/components/Landing/sections';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Tiles from '@/components/Tiles/Tiles';
import Table from '@/components/Table/Table';
import Reviews from '@/components/Reviews/Reviews';
import Clients from '@/components/Clients/Clients';
import { getLandingData, LandingData } from '@/utils/landing-data';

// Главная: цены таблицей с вкладками и блок «Залишились питання» —
// на /fop и /tov этих двух секций нет
export default function Home({
  slide,
  advantages,
  tiles,
  table,
  reviews,
  clients,
  faq,
}: LandingData) {
  return (
    <LandingShell>
      <HeroSwiper slide={slide} advantages={advantages} />
      <Tiles tiles={tiles} />
      <Table table={table} />
      <Reviews reviews={reviews} />
      <Clients clients={clients} />
      <Calculator />
      <Faq faq={faq} />
      <Contacts />
      <Map />
      <Questions />
    </LandingShell>
  );
}

export async function getStaticProps() {
  return {
    props: await getLandingData(),
    revalidate: 3600,
  };
}
