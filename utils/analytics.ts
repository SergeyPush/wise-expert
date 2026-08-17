/**
 * Аналитика форм и CTA (R10). Три лендинга шлют заявки одним и тем же
 * ContactForm в один Telegram-чат — без признака страницы и места на
 * странице нельзя понять, откуда пришла заявка. Событие пушится в
 * dataLayer (GTM), а не в gtag напрямую — чтобы цели/конверсии в Ads
 * настраивались без релиза кода.
 */

export type PageType = 'main' | 'fop' | 'tov';

/** Где на странице стоит форма: модалка «Замовити дзвінок», калькулятор
 * или блок «Залишились питання» (он есть только на главной) */
export type FormLocation = 'call_modal' | 'calculator' | 'questions';

/** Где стоит CTA-кнопка, ведущая к форме/калькулятору */
export type CtaLocation = 'hero' | 'pricing' | 'support';

/**
 * /fop и /tov — новые лендинги, всё остальное (включая /blog, /services/*)
 * идёт с признаком main. Один хелпер вместо хардкода в каждом вызове.
 */
export function getPageType(pathname: string): PageType {
  if (pathname.startsWith('/fop')) return 'fop';
  if (pathname.startsWith('/tov')) return 'tov';
  return 'main';
}

export function pushEvent(event: string, payload: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event, ...payload });
}
