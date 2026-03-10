import React, { FC } from 'react';
import Header from '@/components/Header/Header';
import { DefaultSeo } from 'next-seo';

interface Children {
  children: React.ReactNode;
}

const Layout: FC<Children> = ({ children }) => {
  return (
    <>
      <DefaultSeo
        title={'WisExpert | Бухгалтерська компанія'}
        description={
          'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва та ін. Дізнайтесь ціни та умови на сайті'
        }
        canonical="https://wisexpert.com.ua/"
        openGraph={{
          siteName: 'WisExpert',
          type: 'website',
          title: 'Бухгалтерська компанія WisExpert',
          url: 'https://wisexpert.com.ua/',
          locale: 'uk_UA',
          description:
            'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва та ін. Дізнайтесь ціни та умови на сайті',
          images: [
            {
              url: 'https://wisexpert.com.ua/og-image.png',
              width: 1200,
              height: 630,
              alt: 'WisExpert - Бухгалтерська компанія',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@wisexpert',
          handle: '@wisexpert',
        }}
        additionalLinkTags={[
          { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/png' },
          { rel: 'icon', href: '/favicon.ico' },
          { rel: 'alternate', hrefLang: 'uk', href: 'https://wisexpert.com.ua/' },
          { rel: 'alternate', hrefLang: 'x-default', href: 'https://wisexpert.com.ua/' },
        ]}
        additionalMetaTags={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          {
            name: 'keywords',
            content:
              'бухгалтер, налог, отчет, бухгалтерія, звіт, податок, учет, ФОП, ТОВ, ФЛП, ООО, консультація, РРО, ЕСВ, ЄСВ, Бухгалтерская компания, Бухгальтерська фірма, компанія, послуги бухгалтера, услуги бухгалтера',
          },
          {
            name: 'author',
            content: 'WisExpert',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
        ]}
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;
