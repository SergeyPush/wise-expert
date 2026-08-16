import { IBM_Plex_Mono } from 'next/font/google';

/**
 * Моношрифт для «бухгалтерських» секцій: дати, строки, суми, реєстри.
 * Оголошений один раз і переиспользуется, щоб не тягнути шрифт двічі.
 * preload вимкнено — обидві секції нижче першого екрана.
 */
export const mono = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600'],
  display: 'swap',
  preload: false,
});
