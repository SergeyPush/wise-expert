import React from 'react';
import Head from 'next/head';
import Wrapper from '@/components/Wrapper';
import { ITiles } from '@/interfaces/tile.interface';
import Title from '@/components/Title';
import TilesList from '@/components/Tiles/TilesList';
import TilesSwiper from '@/components/Tiles/TilesSwiper';
import ScrollReveal from '@/components/ScrollReveal';

interface TilesInterface {
  tiles: ITiles;
}
const Tiles = ({ tiles }: TilesInterface) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: tiles.title,
    itemListElement: tiles.tile.map((tile) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: tile.fields.name,
        description: tile.fields.description.join(' '),
      },
      price: tile.fields.price,
      priceCurrency: 'UAH',
    })),
  };

  return (
    <section
      id={'useful'}
      className={'pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24 bg-color-light-gray'}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Wrapper>
        <ScrollReveal>
          <Title text={tiles.title} />
        </ScrollReveal>
        <TilesSwiper tiles={tiles} />
        <TilesList tiles={tiles} />
      </Wrapper>
    </section>
  );
};

export default Tiles;
