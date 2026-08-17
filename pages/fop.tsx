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
import { FOP_HERO_ID } from '@/constants/hero.const';
import { FOP_SUPPORT_ID } from '@/constants/support.const';
import { FOP_PRICING_ID } from '@/constants/pricing.const';
import { FOP_FAQ_ID } from '@/constants/faq.const';

const SEO = {
  title: 'Бухгалтер для ФОП — ведення та супровід ФОП | WisExpert',
  description:
    'Бухгалтерський супровід ФОП від WisExpert. Ведення обліку, податки, звітність, РРО/ПРРО, консультації. Працюйте з бізнесом — бухгалтерію залиште нам.',
  canonical: 'https://wisexpert.com.ua/fop',
};

export default function FopPage({
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
      heroId: FOP_HERO_ID,
      supportId: FOP_SUPPORT_ID,
      pricingId: FOP_PRICING_ID,
      faqId: FOP_FAQ_ID,
    }),
    revalidate: 3600,
  };
}
