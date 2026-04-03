import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { Nunito_Sans } from 'next/font/google';
import client from '@/utils/contentful.api';
import { IServicePageFields } from '@/interfaces/service-page.interface';
import { IHowItWorks } from '@/interfaces/how-it-works.interface';
import { IWhyChooseUs } from '@/interfaces/why-choose-us.interface';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import WhatWeDo from '@/components/ServicePage/WhatWeDo';
import HowItWorks from '@/components/ServicePage/HowItWorks';
import WhyChooseUs from '@/components/ServicePage/WhyChooseUs';
import { useGlobalContext } from '@/context/GlobalContext';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

const SLUG_TO_CONTENTFUL_ID: Record<string, string> = {
  it: '5jyN8q1yHA0UEMyZGwRDFs',
  optova: '14Ufdnf0ubOu9OpwprgmhL',
  rozdribna: '1EepYK0uDkEbPZakyCeDLc',
  vyrobnytstvo: '5LgwI6wbO1UkHaFHZiNd9I',
  horeca: '73drFNQdcTwZkAmht8SJIp',
  posluhy: '3uOw2ZZlRcwy418LYuwIUs',
};

interface ServicePageProps {
  data: IServicePageFields;
  howItWorks: IHowItWorks;
  whyChooseUs: IWhyChooseUs;
}

export default function ServicePage({ data, howItWorks, whyChooseUs }: ServicePageProps) {
  const { setBookCallIsVisible } = useGlobalContext();
  const heroImageUrl = data.heroImage?.fields?.file?.url
    ? `https:${data.heroImage.fields.file.url}`
    : null;

  return (
    <>
      <NextSeo
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={`https://wisexpert.com.ua/services/${data.slug}`}
        openGraph={{
          title: data.seoTitle,
          description: data.seoDescription,
          url: `https://wisexpert.com.ua/services/${data.slug}`,
          type: 'website',
          locale: 'uk_UA',
          siteName: 'WisExpert',
          ...(heroImageUrl && {
            images: [{ url: heroImageUrl, width: 1200, height: 630, alt: data.heroTitle }],
          }),
        }}
        twitter={{
          handle: '@wisexpert',
          site: '@wisexpert',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          { rel: 'alternate', hrefLang: 'uk', href: `https://wisexpert.com.ua/services/${data.slug}` },
          { rel: 'alternate', hrefLang: 'x-default', href: `https://wisexpert.com.ua/services/${data.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: data.heroTitle,
              description: data.seoDescription,
              url: `https://wisexpert.com.ua/services/${data.slug}`,
              provider: {
                '@type': 'AccountingService',
                name: 'WisExpert',
                url: 'https://wisexpert.com.ua',
              },
              ...(data.price && {
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'UAH',
                  price: data.price,
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: data.price,
                    priceCurrency: 'UAH',
                    unitText: 'MONTH',
                  },
                },
              }),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Головна',
                  item: 'https://wisexpert.com.ua',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: data.heroTitle,
                  item: `https://wisexpert.com.ua/services/${data.slug}`,
                },
              ],
            },
          ]),
        }}
      />
      <main className={nunito.className}>
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-color-black to-color-light-black pt-24 pb-0 md:pt-28 overflow-hidden">
          <Wrapper>
            <div className="flex flex-col md:flex-row items-end gap-8 md:gap-12">
              {/* Left content */}
              <div className="flex-1 pb-16 md:pb-20 pt-10">
                <span className="inline-block text-xs font-semibold text-color-blue bg-color-blue/10 border border-color-blue/20 rounded-full px-3 py-1 mb-5 tracking-wide">
                  {data.tag}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-color-white mb-4 tracking-tight leading-tight">
                  {data.heroTitle}
                </h1>
                <p className="text-color-white/70 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
                  {data.heroSubtitle}
                </p>
                <p className="text-color-white/50 text-sm mb-1">від</p>
                <p className="text-color-white text-4xl font-bold mb-8">
                  {data.price} грн
                  <span className="text-color-white/50 text-base font-normal ml-2">
                    /місяць
                  </span>
                </p>
                <Button
                  format="primary"
                  text="Замовити консультацію →"
                  size="wide"
                  onClick={() => setBookCallIsVisible(true)}
                />
              </div>

              {/* Right image */}
              {heroImageUrl && (
                <div className="hidden md:block flex-shrink-0 w-[480px] lg:w-[520px] self-end pb-10 md:pb-14">
                  <div className="relative w-full h-[380px] lg:h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={heroImageUrl}
                      alt={data.heroTitle}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </Wrapper>
        </section>

        <WhatWeDo
          prefix={data.whatWeDoPrefix}
          title={data.whatWeDoTitle}
          subtitle={data.whatWeDoSubtitle}
          cards={data.cards}
        />
        <HowItWorks data={howItWorks} />
        <WhyChooseUs data={whyChooseUs} />

        {/* CTA */}
        <section className="bg-gradient-to-br from-color-black to-color-light-black py-20 md:py-24">
          <Wrapper>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-4">
                {data.ctaTitle}
              </h2>
              <p className="text-color-white/60 text-base md:text-lg mb-8 leading-relaxed">
                {data.ctaSubtitle}
              </p>
              <Button
                format="primary"
                text="Замовити консультацію"
                size="wide"
                onClick={() => setBookCallIsVisible(true)}
              />
            </div>
          </Wrapper>
        </section>

        <Footer />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(SLUG_TO_CONTENTFUL_ID).map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const contentfulId = SLUG_TO_CONTENTFUL_ID[slug];

  if (!contentfulId) return { notFound: true };

  const [{ fields: raw }, { fields: howItWorks }, { fields: whyChooseUs }] =
    await Promise.all([
      client.getEntry(contentfulId),
      client.getEntry('4N6ZqoXb2UZN1AcfUWX55L'),
      client.getEntry('1SqpxKzGIux9TPJvJXlXPO'),
    ]);

  // Contentful rich text fields return {nodeType, content, data} objects.
  // Extract plain text so we can render them as strings.
  const plainText = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.map(plainText).join('');
    if (value && typeof value === 'object') {
      const node = value as { value?: string; content?: unknown[] };
      if (node.value) return node.value;
      if (node.content) return plainText(node.content);
    }
    return '';
  };

  const rawFields = raw as Record<string, unknown>;
  // Cards come as linked Contentful entries — extract their fields
  const rawCards = rawFields.cards as { fields?: Record<string, unknown> }[] ?? [];
  const cards = rawCards.map((c) => c.fields ?? c);

  const data = {
    ...rawFields,
    tag: plainText(rawFields.shortTextTag),
    heroSubtitle: plainText(rawFields.heroSubtitle),
    ctaSubtitle: plainText(rawFields.ctaSubtitle),
    whatWeDoSubtitle: plainText(rawFields.whatWeDoSubtitle),
    cards,
  };

  return { props: { data, howItWorks, whyChooseUs } };
};
