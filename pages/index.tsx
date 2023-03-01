import { Inter } from '@next/font/google';
import client from '@/utils/contentful.api';
import { Entry } from 'contentful';
import { IHero } from '@/interfaces/hero.interface';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Tiles from '@/components/Tiles/Tiles';
import { ITiles } from '@/interfaces/tile.interface';

const inter = Inter({ subsets: ['latin'] });

interface HomeInterface {
  slides: IHero[];
  tiles: ITiles;
}
export default function Home({ slides, tiles }: HomeInterface) {
  return (
    <>
      <main className={inter.className}>
        <HeroSwiper slides={slides} />
        <Tiles tiles={tiles} />
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

  return { props: { slides: data, tiles: tilesResponse } };
}
