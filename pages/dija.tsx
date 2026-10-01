import React from 'react';
import { NextSeo } from 'next-seo';
import LandingShell from '@/components/Landing/LandingShell';
import { Calculator, Contacts, Faq, Map } from '@/components/Landing/sections';
import HeroSwiper from '@/components/Hero/HeroSwiper';
import Support from '@/components/Support/Support';
import Tiles from '@/components/Tiles/Tiles';
import PricingCards from '@/components/Pricing/PricingCards';
import Reviews from '@/components/Reviews/Reviews';
import Clients from '@/components/Clients/Clients';
import { getLandingData, LandingData } from '@/utils/landing-data';
import { TOV_HERO_ID } from '@/constants/hero.const';
import {
  DIJA_FAQ,
  DIJA_HERO,
  DIJA_PRICING,
  DIJA_SUPPORT,
} from '@/constants/dija.const';

const SEO = {
  title: 'Бухгалтер для резидентів Дія.City — супровід IT-компаній | WisExpert',
  description:
    'Бухгалтерський супровід резидентів Дія.City від WisExpert. Податок на виведений капітал, гіг-контракти, зарплата, щорічний звіт резидента та контроль умов статусу.',
  canonical: 'https://wisexpert.com.ua/dija',
};

/**
 * Лендинг для резидентов Дія.City — структура как у /tov. Тексты пока
 * локальные (constants/dija.const.ts), в Contentful перенесём позже.
 */
export default function DijaPage({
  slide,
  advantages,
  tiles,
  reviews,
  clients,
  faq,
  support,
  pricing,
}: LandingData) {
  // OG-картинка — фото хедера; Contentful отдаёт protocol-relative URL
  const heroImageUrl = slide.image?.fields?.file?.url
    ? `https:${slide.image.fields.file.url}`
    : undefined;

  return (
    <>
      <NextSeo
        title={SEO.title}
        description={SEO.description}
        canonical={SEO.canonical}
        // TODO: страница временно скрыта (нет в меню и sitemap) — убрать
        // noindex/nofollow после согласования цен и текстов
        noindex
        nofollow
        openGraph={{
          title: SEO.title,
          description: SEO.description,
          url: SEO.canonical,
          type: 'website',
          locale: 'uk_UA',
          siteName: 'WisExpert',
          ...(heroImageUrl && {
            images: [
              {
                url: heroImageUrl,
                width: 1200,
                height: 630,
                alt: 'Команда WisExpert',
              },
            ],
          }),
        }}
        twitter={{
          handle: '@wisexpert',
          site: '@wisexpert',
          cardType: 'summary_large_image',
        }}
      />
      <LandingShell>
        <HeroSwiper slide={slide} advantages={advantages} />
        {support && <Support data={support} />}
        {pricing && <PricingCards data={pricing} />}
        <Tiles tiles={tiles} />
        <Reviews reviews={reviews} />
        <Clients clients={clients} />
        <Calculator />
        <Faq faq={faq} />
        <Contacts />
        <Map />
      </LandingShell>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: await getLandingData({
      // фото hero — из записи /tov, тексты — локальные
      heroId: TOV_HERO_ID,
      local: {
        hero: DIJA_HERO,
        support: DIJA_SUPPORT,
        pricing: DIJA_PRICING,
        faq: DIJA_FAQ,
      },
    }),
    revalidate: 3600,
  };
}
