import { Inter } from '@next/font/google';
import client from '@/utils/contentful.api';
import { Entry } from 'contentful';
import { IHero } from '@/interfaces/hero.interface';
import SlideOne from '@/components/Hero/SlideOne';
import SlideTwo from '@/components/Hero/SlideTwo';

const inter = Inter({ subsets: ['latin'] });

interface HomeInterface {
  slides: IHero[];
}
export default function Home({ slides }: HomeInterface) {
  return (
    <>
      <main className={inter.className}>
        {/*<SlideOne data={slides[0]} />*/}
        <SlideTwo data={slides[1]} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: 'hero' });
  const data = items.map((item: Entry<any>) => item.fields);
  return { props: { slides: data } };
}
