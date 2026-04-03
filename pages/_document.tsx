import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="CCN5Ef4V+irpRbTS0S90+g" async></script>
        {/* Google Search Console verification — replace content value with your actual code */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AccountingService',
              '@id': 'https://wisexpert.com.ua/#organization',
              name: 'WisExpert',
              url: 'https://wisexpert.com.ua',
              logo: {
                '@type': 'ImageObject',
                url: 'https://wisexpert.com.ua/logo.png',
              },
              image: 'https://wisexpert.com.ua/og-image.png',
              description:
                'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва',
              telephone: '+380993811118',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'UA',
                addressLocality: 'Київ',
                streetAddress: 'вул. Сверстюка, 11а',
                postalCode: '02002',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 50.4501,
                longitude: 30.5234,
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+380993811118',
                contactType: 'customer service',
                areaServed: 'UA',
                availableLanguage: ['Ukrainian'],
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
                'https://www.linkedin.com/company/бухгалтерська-компанія-wisexpert/',
                'https://t.me/WisExpert',
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
