import { Nunito_Sans } from 'next/font/google';
import client from '@/utils/contentful.api';
import { Entry } from 'contentful';
import { IHero } from '@/interfaces/hero.interface';
import { IAdvantages } from '@/interfaces/advantages.interface';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Tiles from '@/components/Tiles/Tiles';
import { ITiles } from '@/interfaces/tile.interface';
import Table from '@/components/Table/Table';
import { ITable } from '@/interfaces/table.interface';
import Reviews from '@/components/Reviews/Reviews';
import type { IReviews } from '@/interfaces/reviews.interface';
import { IClients } from '@/interfaces/clients.interface';
import Clients from '@/components/Clients/Clients';
import { IFAQ } from '@/interfaces/faq.interface';
import Footer from '@/components/Footer/Footer';
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Lazy load below-the-fold components
const Calculator = dynamic(() => import('@/components/Calculator/Calculator'), {
  ssr: true,
});
const Faq = dynamic(() => import('@/components/Faq/Faq'), {
  ssr: true,
});
const Contacts = dynamic(() => import('@/components/Contacts/Contacts'), {
  ssr: true,
});
const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: true,
});
const Questions = dynamic(() => import('@/components/Questions/Questions'), {
  ssr: true,
});
const Confirmation = dynamic(() => import('@/components/Common/Confirmation'), {
  ssr: false,
});

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800'],
//   preload: false,
//   variable: '--font-inter',
// });

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

interface HomeInterface {
  slides: IHero[];
  advantages: IAdvantages;
  tiles: ITiles;
  table: ITable;
  reviews: IReviews;
  clients: IClients;
  faq: IFAQ;
}

export default function Home({
  slides,
  advantages,
  tiles,
  table,
  reviews,
  clients,
  faq,
}: HomeInterface) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.faqs.map(({ fields }) => ({
                '@type': 'Question',
                name: fields.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: fields.answer,
                },
              })),
            }),
          }}
        />
      </Head>
      <main className={nunito.className}>
        <HeroSwiper slides={slides} advantages={advantages} />
        <Tiles tiles={tiles} />
        <Table table={table} />
        <Reviews reviews={reviews} />
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

  const { fields: advantagesResponse } = await client.getEntry(
    '4dDKOTMF5WeR5zIsKOTJyD',
  );

  const { fields: tilesResponse } = await client.getEntry(
    '38OxzgLsaAVgHagRJb6L7R',
  );

  const { fields: tableResponse } = await client.getEntry(
    '7JkauMUL1mb0eiosMdVMLo',
  );

  const { fields: clientResponse } = await client.getEntry(
    '6edFDs7Q0MuqIhyxT3jVGX',
  );

  const { fields: faqResponse } = await client.getEntry(
    '4eCRCqmvlHL2fjo8FfxVNi',
  );

  const { fields: reviewsResponse } = await client.getEntry(
    '3xWTayfXkmbwu66K0Z87DK',
  );

  return {
    props: {
      slides: data,
      advantages: advantagesResponse,
      tiles: tilesResponse,
      table: tableResponse,
      reviews: reviewsResponse,
      clients: clientResponse,
      faq: faqResponse,
    },
    revalidate: 3600,
  };
}
