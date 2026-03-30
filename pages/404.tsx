import React from 'react';
import Link from 'next/link';
import { Nunito_Sans } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

export default function NotFoundPage() {
  return (
    <main className={nunito.className}>
      <section className="min-h-[calc(100vh-80px)] flex items-center bg-color-white">
        <Wrapper>
          <div className="flex flex-col items-center text-center py-24">
            <span className="block text-[160px] md:text-[220px] font-extrabold text-color-light-gray leading-none select-none">
              404
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-color-black mt-4 mb-4">
              Сторінку не знайдено
            </h1>
            <p className="text-color-muted text-base max-w-md mb-10 leading-relaxed">
              На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
              Перевірте правильність URL-адреси або скористайтесь посиланнями нижче.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="cursor-pointer font-semibold transition-all duration-200 text-sm lg:text-base rounded-xl text-center px-6 py-2.5 text-color-white bg-color-blue hover:bg-color-blue-dark active:scale-[0.98] shadow-soft hover:shadow-elevated"
              >
                На головну →
              </Link>
              <Link
                href="/blog"
                className="cursor-pointer font-semibold transition-all duration-200 text-sm lg:text-base rounded-xl text-center px-6 py-2.5 text-color-black border-2 border-color-border bg-transparent hover:border-color-blue hover:text-color-blue"
              >
                Перейти до блогу
              </Link>
            </div>
          </div>
        </Wrapper>
      </section>
      <Footer />
    </main>
  );
}
