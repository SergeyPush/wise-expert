import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Nunito_Sans } from 'next/font/google';
import { SERVICE_PAGES, IServicePage } from '@/constants/services.const';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import Contacts from '@/components/Contacts/Contacts';
import { scrollToId } from '@/utils/scroll.utils';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

interface ServicePageProps {
  service: IServicePage;
}

export default function ServicePage({ service }: ServicePageProps) {
  return (
    <>
      <NextSeo
        title={`${service.title} — WisExpert | Бухгалтерські послуги`}
        description={service.description}
        canonical={`https://wisexpert.com.ua/services/${service.slug}`}
      />
      <main className={nunito.className}>
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-color-black to-color-light-black pt-40 pb-20 md:pt-48 md:pb-28">
          <Wrapper>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-white mb-4 tracking-tight">
              {service.title}
            </h1>
            <p className="text-color-white/70 text-base md:text-lg max-w-xl mb-8">
              {service.description}
            </p>
            <Button
              format="primary"
              text="Отримати консультацію"
              size="wide"
              onClick={() => scrollToId('contacts')}
            />
          </Wrapper>
        </section>

        {/* Contacts */}
        <Contacts />

        <Footer />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SERVICE_PAGES.map((s) => ({ params: { slug: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const service = SERVICE_PAGES.find((s) => s.slug === slug);

  if (!service) return { notFound: true };

  return { props: { service } };
};
