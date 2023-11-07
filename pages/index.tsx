import { Inter } from 'next/font/google';
import client from '@/utils/contentful.api';
import { Entry } from 'contentful';
import { IHero } from '@/interfaces/hero.interface';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Tiles from '@/components/Tiles/Tiles';
import { ITiles } from '@/interfaces/tile.interface';
import Table from '@/components/Table/Table';
import { ITable } from '@/interfaces/table.interface';
import { IClients } from '@/interfaces/clients.interface';
import Clients from '@/components/Clients/Clients';
import Calculator from '@/components/Calculator/Calculator';
import Faq from '@/components/Faq/Faq';
import { IFAQ } from '@/interfaces/faq.interface';
import Map from '@/components/Map/Map';
import Questions from '@/components/Questions/Questions';
import Footer from '@/components/Footer/Footer';
import Confirmation from '@/components/Common/Confirmation';
import React from 'react';
import Contacts from '@/components/Contacts/Contacts';
import { useRouter } from 'next/router';
import notion from '@/utils/notion.api';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

interface HomeInterface {
  slides: IHero[];
  tiles: ITiles;
  table: ITable;
  clients: IClients;
  faq: IFAQ;
}
export default function Home({
  slides,
  tiles,
  table,
  clients,
  faq,
}: HomeInterface) {
  const router = useRouter();
  const path = router.asPath;
  const value = path.split('=')[1];
  if (value) {
    notion.pages
      .create({
        parent: {
          database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string,
        },
        properties: {
          Date: {
            date: {
              start: new Date().toISOString(),
            },
          },
          Source: {
            title: [
              {
                type: 'text',
                text: {
                  content: value,
                },
              },
            ],
          },
        },
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <main className={inter.className}>
        <HeroSwiper slides={slides} />
        <Tiles tiles={tiles} />
        <Table table={table} />
        <Clients clients={clients} />
        <Calculator />
        <Faq faq={faq} />
        <Contacts />
        <Map />
        <Questions />
        <Footer />
        <Confirmation />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: 'hero' });
  const data = items.map((item: Entry<any>) => item.fields);
  const { fields: tilesResponse } = await client.getEntry(
    '38OxzgLsaAVgHagRJb6L7R'
  );

  const { fields: tableResponse } = await client.getEntry(
    '7JkauMUL1mb0eiosMdVMLo'
  );

  const { fields: clientResponse } = await client.getEntry(
    '6edFDs7Q0MuqIhyxT3jVGX'
  );

  const { fields: faqResponse } = await client.getEntry(
    '4eCRCqmvlHL2fjo8FfxVNi'
  );

  return {
    revalidate: 60 * 60 * 2,
    props: {
      slides: data,
      tiles: tilesResponse,
      table: tableResponse,
      clients: clientResponse,
      faq: faqResponse,
    },
  };
}
function getDb() {
  throw new Error('Function not implemented.');
}
