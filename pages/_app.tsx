import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <AnimatePresence>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </Layout>
  );
}
