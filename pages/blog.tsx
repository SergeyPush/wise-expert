import React from 'react';
import { NextSeo } from 'next-seo';
import { Nunito_Sans } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

export default function BlogPage() {
  return (
    <>
      <NextSeo
        title="Блог — WisExpert | Бухгалтерські поради для бізнесу"
        description="Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу від WisExpert."
        canonical="https://wisexpert.com.ua/blog"
        openGraph={{
          title: 'Блог — WisExpert | Бухгалтерські поради для бізнесу',
          description: 'Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу від WisExpert.',
          url: 'https://wisexpert.com.ua/blog',
          type: 'website',
          locale: 'uk_UA',
          siteName: 'WisExpert',
          images: [{ url: 'https://wisexpert.com.ua/og-image.png', width: 1200, height: 630, alt: 'WisExpert блог' }],
        }}
      />
      <main className={nunito.className}>
        <Header />
        <section className="bg-gradient-to-br from-color-black to-color-light-black pt-40 pb-20 md:pt-48 md:pb-28">
          <Wrapper>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-white mb-4 tracking-tight">
              Блог
            </h1>
            <p className="text-color-white/70 text-base md:text-lg max-w-xl">
              Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу
            </p>
          </Wrapper>
        </section>

        <section className="pt-16 pb-20 md:pt-20 md:pb-28 bg-color-light-gray">
          <Wrapper>
            <p className="text-center text-color-muted text-lg py-20">
              Статті незабаром з&apos;являться тут
            </p>
          </Wrapper>
        </section>

        <Footer />
      </main>
    </>
  );
}
