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
import { TOV_SUPPORT_ID } from '@/constants/support.const';
import { TOV_PRICING_ID } from '@/constants/pricing.const';
import { TOV_FAQ_ID } from '@/constants/faq.const';

const SEO = {
  title: 'Бухгалтер для ТОВ — ведення та супровід компаній | WisExpert',
  description:
    'Бухгалтерський супровід ТОВ від WisExpert. Повний облік компанії: податки, ПДВ, звітність, зарплата, кадри та консультації директора.',
  canonical: 'https://wisexpert.com.ua/tov',
};

export default function TovPage({
  slide,
  advantages,
  tiles,
  reviews,
  clients,
  faq,
  support,
  pricing,
}: LandingData) {
  // OG-картинка — то же фото хедера, что и на самой странице (R1: одно фото
  // на всех трёх лендингах). Контентфул отдаёт protocol-relative URL —
  // для OG нужен абсолютный, как в pages/services/[slug].tsx
  const heroImageUrl = slide.image?.fields?.file?.url
    ? `https:${slide.image.fields.file.url}`
    : undefined;

  return (
    <>
      <NextSeo
        title={SEO.title}
        description={SEO.description}
        canonical={SEO.canonical}
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
      heroId: TOV_HERO_ID,
      supportId: TOV_SUPPORT_ID,
      pricingId: TOV_PRICING_ID,
      faqId: TOV_FAQ_ID,
    }),
    revalidate: 3600,
  };
}
