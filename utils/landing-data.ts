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
      client.getEntry(ENTRY_IDS.hero),
      client.getEntry(ENTRY_IDS.advantages),
      client.getEntry(ENTRY_IDS.tiles),
      client.getEntry(ENTRY_IDS.table),
      client.getEntry(ENTRY_IDS.clients),
      client.getEntry(ENTRY_IDS.faq),
      client.getEntry(ENTRY_IDS.reviews),
    ]);

  return {
    // фото и разметка hero общие, меняются только тексты страницы
    slide: { ...(hero.fields as unknown as IHero), ...heroTexts },
    advantages: advantages.fields as unknown as IAdvantages,
    tiles: tiles.fields as unknown as ITiles,
    table: table.fields as unknown as ITable,
    clients: clients.fields as unknown as IClients,
    faq: faq.fields as unknown as IFAQ,
    reviews: reviews.fields as unknown as IReviews,
  };
}
