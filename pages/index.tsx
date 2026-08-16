import React from 'react';
import LandingPage from '@/components/Landing/LandingPage';
import Table from '@/components/Table/Table';
import { getLandingData, LandingData } from '@/utils/landing-data';

// Главная: тот же LandingPage, что и у /fop, /tov, но со старой таблицей
// цен (вкладки) и блоком «Залишились питання»
export default function Home({ table, ...data }: LandingData) {
  return (
    <LandingPage {...data} pricing={<Table table={table} />} withQuestions />
  );
}

export async function getStaticProps() {
  return {
    props: await getLandingData(),
    revalidate: 3600,
  };
}
