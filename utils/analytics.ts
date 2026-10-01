/**
 * Аналитика форм и CTA (R10). Три лендинга шлют заявки одним и тем же
 * ContactForm в один Telegram-чат — без признака страницы и места на
 * странице нельзя понять, откуда пришла заявка. Событие пушится в
 * dataLayer (GTM), а не в gtag напрямую — чтобы цели/конверсии в Ads
 * настраивались без релиза кода.
 */

export type PageType = 'main' | 'fop' | 'tov' | 'dija';

/** Где на странице стоит форма: модалка «Замовити дзвінок», калькулятор
 * или блок «Залишились питання» (он есть только на главной) */
export type FormLocation = 'call_modal' | 'calculator' | 'questions';

/**
 * Отдельное событие успешной отправки на каждую форму (ТЗ правок): header —
 * модалка «Замовити дзвінок», main — форма у калькулятора. «Залишились
 * питання» по решению заказчика считается как header.
 */
export const FORM_SUBMIT_EVENTS: Record<FormLocation, string> = {
  call_modal: 'form_submit_header',
  calculator: 'form_submit_main',
  questions: 'form_submit_header',
};

/** Где стоит CTA-кнопка, ведущая к форме/калькулятору */
export type CtaLocation = 'hero' | 'pricing' | 'support';

/**
 * /fop, /tov и /dija — лендинги услуг, всё остальное (включая /blog,
 * /services/*) идёт с признаком main. Один хелпер вместо хардкода в каждом вызове.
 */
export function getPageType(pathname: string): PageType {
  if (pathname.startsWith('/fop')) return 'fop';
  if (pathname.startsWith('/tov')) return 'tov';
  if (pathname.startsWith('/dija')) return 'dija';
  return 'main';
}

export function pushEvent(event: string, payload: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event, ...payload });
}
