import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'WisExpert',
              url: 'https://wisexpert.com.ua',
              logo: 'https://wisexpert.com.ua/favicon.png',
              description:
                'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'UA',
                addressLocality: 'Ukraine',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['Ukrainian', 'Russian'],
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
