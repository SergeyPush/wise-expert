import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ContextProvider } from '@/context/GlobalContext';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <ContextProvider>
        <Component {...pageProps} key={router.pathname} />
      </ContextProvider>
    </Layout>
  );
}
