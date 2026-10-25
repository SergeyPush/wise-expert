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
import {
  getLandingData,
  getPricingTable,
  LandingData,
} from '@/utils/landing-data';
import { ITable } from '@/interfaces/table.interface';

/**
 * Таблица цен с вкладками скрыта (правки под политику Google Ads: во вкладке
 * «Разові послуги» — реєстрація, ліквідація, ліцензії). Код и запись в
 * Contentful оставлены — вернуть таблицу можно, поставив true.
 * При false таблица не запрашивается, поэтому её нет ни в HTML, ни в __NEXT_DATA__.
 * Пункт меню «Ціни» на главной скрыт отдельно — см. PRICES_PATHS в utils/nav.utils.ts.
 */
const SHOW_PRICING_TABLE = false;

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
}: LandingData & { table: ITable | null }) {
  return (
    <LandingShell>
      <HeroSwiper slide={slide} advantages={advantages} />
      <Tiles tiles={tiles} />
      {table && <Table table={table} />}
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
  const [data, table] = await Promise.all([
    getLandingData(),
    SHOW_PRICING_TABLE ? getPricingTable() : Promise.resolve(null),
  ]);

  return {
    props: { ...data, table },
    revalidate: 3600,
  };
}
