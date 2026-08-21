import { Html, Head, Main, NextScript } from 'next/document';
import { TEAM, teamSchema } from '@/constants/team.const';
import { jsonLd } from '@/utils/json-ld';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="CCN5Ef4V+irpRbTS0S90+g"
          async
        ></script>
        {/* Google Search Console verification — replace content value with your actual code */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        {/*
          Граф сущностей сайта. Раньше здесь была одна карточка AccountingService —
          теперь связанный @graph: организация, сайт и человек за ней. LLM собирают
          сущность из таких связей: без Person и WebSite компания для них — просто
          набор страниц без авторства и экспертизы.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'AccountingService',
                  '@id': 'https://wisexpert.com.ua/#organization',
                  name: 'WisExpert',
                  alternateName: 'Бухгалтерська компанія WisExpert',
                  url: 'https://wisexpert.com.ua',
                  logo: {
                    '@type': 'ImageObject',
                    '@id': 'https://wisexpert.com.ua/#logo',
                    url: 'https://wisexpert.com.ua/logo.png',
                  },
                  image: 'https://wisexpert.com.ua/og-image.png',
                  description:
                    'Якісні бухгалтерські послуги для ІТ компаній, ресторанів, виробництва, торгівлі, будівництва',
                  telephone: '+380993811118',
                  email: 'w.expert.company@gmail.com',
                  priceRange: '$$',
                  currenciesAccepted: 'UAH',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'UA',
                    addressLocality: 'Київ',
                    streetAddress: 'вул. Сверстюка, 11а',
                    postalCode: '02002',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 50.44911482766101,
                    longitude: 30.600674534902755,
                  },
                  // Обслуживание дистанционное по всей стране, офис — в Киеве
                  areaServed: [
                    { '@type': 'Country', name: 'Україна' },
                    { '@type': 'City', name: 'Київ' },
                  ],
                  // Темы, по которым компания компетентна: помогает LLM понять,
                  // на какие вопросы этот сайт — релевантный источник
                  knowsAbout: [
                    'Бухгалтерський облік',
                    'Оподаткування ФОП',
                    'Оподаткування ТОВ',
                    'Єдиний податок',
                    'Податок на додану вартість (ПДВ)',
                    'Дія.City',
                    'Кадровий облік',
                    'РРО та ПРРО',
                    'Реєстрація бізнесу в Україні',
                    'Податкова звітність',
                    'Супровід податкових перевірок',
                    'Зовнішньоекономічна діяльність',
                  ],
                  knowsLanguage: ['uk'],
                  // TEAM может остаться пустым при правке constants/team.const.ts —
                  // _document рендерится на каждой странице, и падение здесь
                  // уронило бы весь сайт, поэтому обращение опциональное
                  ...(TEAM.length > 0 && {
                    founder: { '@id': TEAM[0].id },
                    employee: TEAM.map((member) => ({ '@id': member.id })),
                  }),
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+380993811118',
                    email: 'w.expert.company@gmail.com',
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
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://wisexpert.com.ua/#website',
                  url: 'https://wisexpert.com.ua',
                  name: 'WisExpert',
                  inLanguage: 'uk-UA',
                  publisher: { '@id': 'https://wisexpert.com.ua/#organization' },
                },
                // Команда — из constants/team.const.ts; те же @id стоят в author
                // статей блога, поэтому люди, статьи и компания связаны
                ...teamSchema(),
              ],
            }),
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TJGZ6TK6');`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJGZ6TK6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
