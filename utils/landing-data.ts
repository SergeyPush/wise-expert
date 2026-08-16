import client from '@/utils/contentful.api';
import { IHero } from '@/interfaces/hero.interface';
import { IAdvantages } from '@/interfaces/advantages.interface';
import { ITiles } from '@/interfaces/tile.interface';
import { ITable } from '@/interfaces/table.interface';
import { IReviews } from '@/interfaces/reviews.interface';
import { IClients } from '@/interfaces/clients.interface';
import { IFAQ } from '@/interfaces/faq.interface';
import { HeroTexts } from '@/constants/hero.const';

/**
 * Записи Contentful, из которых собирается лендинг. Раньше эти ID были
 * рассыпаны по getStaticProps главной — теперь один источник на три страницы.
 */
const ENTRY_IDS = {
  // slide 1 главной; hero-записи для /fop и /tov появятся здесь же, когда
  // контент переедет в Contentful (пока тексты берём из констант)
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
  table: ITable;
  reviews: IReviews;
  clients: IClients;
  faq: IFAQ;
}

/**
 * Данные лендинга одним запросом-пачкой.
 *
 * @param heroTexts — заголовок и подзаголовок под конкретную страницу
 *   (/fop, /tov). Без него отдаём hero главной как есть.
 *
 * Запросы идут через Promise.all: раньше на главной было семь
 * последовательных await — на билде это лишние секунды на каждой странице.
 */
export async function getLandingData(
  heroTexts?: HeroTexts,
): Promise<LandingData> {
  const [hero, advantages, tiles, table, clients, faq, reviews] =
    await Promise.all([
      getFields<IHero>(ENTRY_IDS.hero),
      getFields<IAdvantages>(ENTRY_IDS.advantages),
      getFields<ITiles>(ENTRY_IDS.tiles),
      getFields<ITable>(ENTRY_IDS.table),
      getFields<IClients>(ENTRY_IDS.clients),
      getFields<IFAQ>(ENTRY_IDS.faq),
      getFields<IReviews>(ENTRY_IDS.reviews),
    ]);

  return {
    // фото и разметка hero общие, меняются только тексты страницы
    slide: { ...hero, ...heroTexts },
    advantages,
    tiles,
    table,
    clients,
    faq,
    reviews,
  };
}
