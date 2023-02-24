import { Inter } from '@next/font/google';
import client from '@/utils/contentful.api';
import { Entry } from 'contentful';
import { IHero } from '@/interfaces/hero.interface';
import HeroSwiper from '@/components/Hero/HeroSwiper';

const inter = Inter({ subsets: ['latin'] });

interface HomeInterface {
  slides: IHero[];
}
export default function Home({ slides }: HomeInterface) {
  return (
    <>
      <main className={inter.className}>
        <HeroSwiper slides={slides} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: 'hero' });
  const data = items.map((item: Entry<any>) => item.fields);
  return { props: { slides: data } };
}
