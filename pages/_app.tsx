import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ContextProvider } from '@/context/GlobalContext';
import Script from 'next/script';
import { useEffect } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <ContextProvider>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11421126867"
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date()); 
          gtag('config', 'AW-11421126867'); 
        `}
        </Script>
        <Script id="notion">
          {`
            try {
              const path = window.location.href;
              const url = new URL(path);
              const value = url.searchParams.get("source");
              const origin = window.location.origin;
              if (value) {
                fetch(origin + "/api/notion", {
                  method: "POST",
                  body: JSON.stringify({ source: value }),
                }).catch((err) => console.log(err));
              }
            } catch (e) {
              console.log(e);
            }
          `}
        </Script>
        <Component {...pageProps} key={router.pathname} />
      </ContextProvider>
    </Layout>
  );
}
