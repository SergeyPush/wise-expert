import '@/styles/globals.scss';
// Базовые стили Swiper — глобально для всех слайдеров (Clients, Tiles)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { ContextProvider } from '@/context/GlobalContext';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        {/* Тег Google Ads AW-16666601833 здесь не нужен: его, 9 тегов конверсий
            и Conversion Linker грузит GTM-контейнер из _document (GTM-TJGZ6TK6).
            Раньше он ставился дважды — лишние ~50 КБ JS и двойной page_view */}
        <Component {...pageProps} key={router.pathname} />
      </Layout>
    </ContextProvider>
  );
}
