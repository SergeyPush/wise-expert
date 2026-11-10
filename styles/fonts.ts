import { Nunito_Sans } from 'next/font/google';

// Единственный экземпляр шрифта на весь сайт: каждый вызов Nunito_Sans()
// генерирует свой набор @font-face и классов, поэтому импортировать отсюда
export const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  // weight не задан: Nunito Sans вариативный, один файл на подмножество
  // покрывает все начертания (400–800), а @font-face не дублируется под каждый вес
  preload: true,
  variable: '--font-sans',
  // Текст виден сразу системным шрифтом, без невидимого периода (FOIT)
  display: 'swap',
});
