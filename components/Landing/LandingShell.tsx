import React from 'react';
import dynamic from 'next/dynamic';
import { Nunito_Sans } from 'next/font/google';
import Footer from '@/components/Footer/Footer';

const Confirmation = dynamic(() => import('@/components/Common/Confirmation'), {
  ssr: false,
});

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Оболочка лендинга: шрифт, футер и модалка подтверждения — всё, что
 * одинаково на /, /fop и /tov. Список секций каждая страница задаёт сама,
 * поэтому здесь нет ни флагов страницы, ни слотов.
 */
const LandingShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={nunito.className}>
      {children}
      <Footer />
      <Confirmation />
    </main>
  );
};

export default LandingShell;
