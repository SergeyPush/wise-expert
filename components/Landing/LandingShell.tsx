import React from 'react';
import dynamic from 'next/dynamic';
import { nunito } from '@/styles/fonts';
import Footer from '@/components/Footer/Footer';

const Confirmation = dynamic(() => import('@/components/Common/Confirmation'), {
  ssr: false,
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
