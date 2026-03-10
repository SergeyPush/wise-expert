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
              logo: 'https://wisexpert.com.ua/logo.png',
              image: 'https://wisexpert.com.ua/og-image.png',
              description:
                'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва',
              telephone: '+380993811118',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'UA',
                addressLocality: 'Київ',
                streetAddress: 'вул. Сверстюка, 11а',
                postalCode: '02002',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+380993811118',
                contactType: 'customer service',
                availableLanguage: ['Ukrainian', 'Russian'],
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
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
