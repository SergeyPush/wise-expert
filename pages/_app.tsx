import '@/styles/globals.scss';
// Базовые стили Swiper — глобально для всех слайдеров (Clients, Tiles)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ContextProvider } from '@/context/GlobalContext';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <GoogleAnalytics gaId="AW-16666601833" />
        <Component {...pageProps} key={router.pathname} />
      </Layout>
    </ContextProvider>
  );
}
