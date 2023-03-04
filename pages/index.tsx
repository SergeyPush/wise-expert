import { Inter } from '@next/font/google';
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

const inter = Inter({ subsets: ['latin'] });

interface HomeInterface {
  slides: IHero[];
  tiles: ITiles;
  table: ITable;
  clients: IClients;
}
export default function Home({ slides, tiles, table, clients }: HomeInterface) {
  return (
    <>
      <main className={inter.className}>
        <HeroSwiper slides={slides} />
        <Tiles tiles={tiles} />
        <Table table={table} />
        <Clients clients={clients} />
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

  return {
    props: {
      slides: data,
      tiles: tilesResponse,
      table: tableResponse,
      clients: clientResponse,
    },
  };
}
