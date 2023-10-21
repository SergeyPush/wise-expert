import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ContextProvider } from '@/context/GlobalContext';
import Script from 'next/script';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <ContextProvider>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-N8DNF3Y98H"
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N8DNF3Y98H');
        `}
        </Script>
        <Component {...pageProps} key={router.pathname} />
      </ContextProvider>
    </Layout>
  );
}
