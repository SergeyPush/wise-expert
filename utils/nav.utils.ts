/**
 * Страницы, на которых есть все якорные секции (#prices, #calc, #faq …).
 * На них пункты меню скроллят по текущей странице, а не уводят на главную.
 */
const LANDING_PATHS = ['/', '/fop', '/tov'];

export const isLandingPath = (pathname?: string | null): boolean =>
  !!pathname && LANDING_PATHS.includes(pathname);
