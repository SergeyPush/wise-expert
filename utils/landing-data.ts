import client from '@/utils/contentful.api';
import { IHero } from '@/interfaces/hero.interface';
import { IAdvantages } from '@/interfaces/advantages.interface';
import { ITiles } from '@/interfaces/tile.interface';
import { ITable } from '@/interfaces/table.interface';
import { IReviews } from '@/interfaces/reviews.interface';
import { IClients } from '@/interfaces/clients.interface';
import { IFAQ } from '@/interfaces/faq.interface';
import { ISupport } from '@/interfaces/support.interface';
import { IPricing } from '@/interfaces/pricing.interface';

/**
 * Записи Contentful, из которых собирается лендинг. Раньше эти ID были
 * рассыпаны по getStaticProps главной — теперь один источник на три страницы.
 */
const ENTRY_IDS = {
  // slide 1 главной; /fop и /tov передают свой heroId в getLandingData
  hero: '5Je6Bd1z5X1lpeWYJSCfXp',
  advantages: '4dDKOTMF5WeR5zIsKOTJyD',
  tiles: '38OxzgLsaAVgHagRJb6L7R',
  table: '7JkauMUL1mb0eiosMdVMLo',
  clients: '6edFDs7Q0MuqIhyxT3jVGX',
  faq: '4eCRCqmvlHL2fjo8FfxVNi',
  reviews: '3xWTayfXkmbwu66K0Z87DK',
} as const;

/**
 * Кэш записей на процесс. Три страницы тянут одни и те же шесть записей —
 * без кэша на билде это 21 запрос в Contentful вместо 7.
 *
 * TTL нужен, потому что тот же модуль живёт в проде и обслуживает ISR:
 * вечный кэш заморозил бы контент до перезапуска сервера. Минуты хватает,
 * чтобы билд успел собрать все страницы, и она не мешает revalidate: 3600.
 * В dev кэш выключен — правки в Contentful должны быть видны сразу.
 */
const CACHE_TTL_MS = process.env.NODE_ENV === 'production' ? 60_000 : 0;

const cache = new Map<string, { at: number; fields: Promise<unknown> }>();

async function getFields<T>(id: string): Promise<T> {
  const hit = cache.get(id);

  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return hit.fields as Promise<T>;
  }

  const fields = client.getEntry(id).then((entry) => entry.fields as unknown);
  // ошибку не кэшируем: следующий вызов должен повторить запрос.
  // catch здесь же гасит unhandled rejection — сама ошибка уходит вызвавшему
  fields.catch(() => cache.delete(id));
  cache.set(id, { at: Date.now(), fields });

  return fields as Promise<T>;
}

export interface LandingData {
  slide: IHero;
  advantages: IAdvantages;
  tiles: ITiles;
  reviews: IReviews;
  clients: IClients;
  faq: IFAQ;
  // блок «Супровід»; на главной null — секция не рендерится
  support: ISupport | null;
  // карточки цен (R4); на главной null — там старая таблица с вкладками
  pricing: IPricing | null;
}

/**
 * Таблица цен с вкладками — только для главной. У /fop и /tov свои карточки
 * тарифов, и тянуть сюда таблицу нельзя: она уехала бы в __NEXT_DATA__
 * страницы вместе с вкладкой «Неприбуткові організації».
 */
export function getPricingTable(): Promise<ITable> {
  return getFields<ITable>(ENTRY_IDS.table);
}

export interface GetLandingDataOptions {
  /** Entry ID hero-записи конкретной страницы (/fop, /tov). Без него — hero главной. */
  heroId?: string;
  /** Entry ID записи «Супровід» (/fop, /tov). Без него секция не рендерится (главная). */
  supportId?: string;
  /** Entry ID записи «Ціни» (/fop, /tov). Без него — null, главная остаётся на таблице. */
  pricingId?: string;
  /**
   * Свой набор вопросов страницы (R7: у /fop и /tov он разный и не совпадает
   * с главной). Без него — общая запись Contentful, как раньше. Когда передан,
   * запись faq вообще не тянем — до появления записей `faq`/`faQs` это лишний запрос.
   */
  faqOverride?: IFAQ;
}

/** Данные лендинга одним запросом-пачкой. */
export async function getLandingData({
  heroId,
  supportId,
  pricingId,
  faqOverride,
}: GetLandingDataOptions = {}): Promise<LandingData> {
  const [hero, advantages, tiles, clients, faq, reviews, support, pricing] = await Promise.all([
    getFields<IHero>(heroId ?? ENTRY_IDS.hero),
    getFields<IAdvantages>(ENTRY_IDS.advantages),
    getFields<ITiles>(ENTRY_IDS.tiles),
    getFields<IClients>(ENTRY_IDS.clients),
    faqOverride ? Promise.resolve(faqOverride) : getFields<IFAQ>(ENTRY_IDS.faq),
    getFields<IReviews>(ENTRY_IDS.reviews),
    supportId ? getFields<ISupport>(supportId) : Promise.resolve(null),
    pricingId ? getFields<IPricing>(pricingId) : Promise.resolve(null),
  ]);

  return {
    slide: hero,
    advantages,
    tiles,
    clients,
    faq,
    reviews,
    support,
    pricing,
  };
}
