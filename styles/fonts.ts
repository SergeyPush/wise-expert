import { Nunito_Sans } from 'next/font/google';

// Единственный экземпляр шрифта на весь сайт: каждый вызов Nunito_Sans()
// генерирует свой набор @font-face и классов, поэтому импортировать отсюда
export const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  // Текст виден сразу системным шрифтом, без невидимого периода (FOIT)
  display: 'swap',
});
