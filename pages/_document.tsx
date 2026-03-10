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
              '@type': 'AccountingService',
              name: 'WisExpert',
              url: 'https://wisexpert.com.ua',
              logo: 'https://wisexpert.com.ua/favicon.png',
              image: 'https://wisexpert.com.ua/og-image.png',
              description:
                'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва',
              telephone: '+380993811118',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'UA',
                addressLocality: 'Україна',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+380993811118',
                contactType: 'customer service',
                availableLanguage: ['Ukrainian', 'Russian'],
              },
              sameAs: [
                'https://facebook.com/wisexpert',
                'https://www.instagram.com/wisexpert_buh',
              ],
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
