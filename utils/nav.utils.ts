import { ILink } from '@/interfaces/link.interface';
import { LINKS } from '@/constants/links.const';

/**
 * Страницы, на которых есть все якорные секции (#prices, #calc, #faq …).
 * На них пункты меню скроллят по текущей странице, а не уводят на главную.
 */
const LANDING_PATHS = ['/', '/fop', '/tov', '/dija'];

export const isLandingPath = (pathname?: string | null): boolean =>
  !!pathname && LANDING_PATHS.includes(pathname);

/**
 * Страницы с секцией #prices (карточки тарифов). На главной таблица цен
 * скрыта (SHOW_PRICING_TABLE в pages/index.tsx), поэтому её здесь нет.
 */
const PRICES_PATHS = ['/fop', '/tov', '/dija'];

/**
 * Пункты меню для текущей страницы: «Ціни» показываем только там, где есть
 * секция цен. С остальных страниц он вёл бы на /#prices, а на главной
 * этой секции больше нет.
 */
export const getNavLinks = (pathname?: string | null): ILink[] =>
  !!pathname && PRICES_PATHS.includes(pathname)
    ? LINKS
    : LINKS.filter((link) => link.id !== 'prices');
