import client from '@/utils/contentful.api';
import { mapBlogPost } from '@/utils/contentful.utils';
import { getLandingData } from '@/utils/landing-data';
import { SERVICE_PAGES, TILE_SLUG_MAP } from '@/constants/services.const';
import { CONTACTS } from '@/constants/contact.const';
import { FOP_FAQ_ID, TOV_FAQ_ID } from '@/constants/faq.const';
import { FOP_HERO_ID, TOV_HERO_ID } from '@/constants/hero.const';
import { FOP_PRICING_ID, TOV_PRICING_ID } from '@/constants/pricing.const';
import { FOP_SUPPORT_ID, TOV_SUPPORT_ID } from '@/constants/support.const';
import { IBlogPost } from '@/interfaces/blog-post.interface';
import { IFAQ } from '@/interfaces/faq.interface';
import { IPricing } from '@/interfaces/pricing.interface';
import { ITiles } from '@/interfaces/tile.interface';

/**
 * llms.txt / llms-full.txt — карта сайта для LLM-агентов (ChatGPT, Claude,
 * Perplexity и т.п.). Формат markdown по спецификации llmstxt.org: H1 с именем,
 * blockquote с кратким описанием, дальше секции со ссылками.
 *
 * Собирается из тех же записей Contentful, что и сами страницы, — чтобы цены и
 * FAQ в текстовой версии не расходились с сайтом.
 */

export const BASE_URL = 'https://wisexpert.com.ua';

/** Убирает HTML-разметку из CMS-ответов FAQ и схлопывает пробелы. */
function stripHtml(html: string): string {
  return html
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/(p|div|ul|ol|li|br)[^>]*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Короткое описание для списка ссылок.
 *
 * У постов блога поле excerpt в Contentful часто содержит весь текст статьи
 * (mapBlogPost падает на `f.text`), поэтому в карте сайта его нужно резать:
 * llms.txt — это индекс, полный текст живёт в llms-full.txt.
 */
function summarize(text: string, limit = 180): string {
  const clean = stripHtml(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  // обрезаем по границе слова, чтобы не рвать слово посередине
  return `${cut.slice(0, cut.lastIndexOf(' ')).trimEnd()}…`;
}

/** Q&A одной страницы в виде markdown-блока. */
function faqBlock(faq: IFAQ): string {
  return faq.faqs
    .map((item) => {
      const { question, answer } = item.fields;
      return `### ${question}\n\n${stripHtml(answer)}`;
    })
    .join('\n\n');
}

/** Тарифные карточки /fop и /tov в виде списка «название — цена». */
function pricingBlock(pricing: IPricing | null): string {
  if (!pricing) return '';
  const rows = pricing.cards.map((card) => {
    const name = card.group
      ? `${card.group.label} ${card.group.number} ${card.group.unit}`.trim()
      : card.title;
    const price = [card.prefix, card.amount, card.period]
      .filter(Boolean)
      .join(' ');
    const extras = card.items?.length
      ? ` (${card.items.map((i) => i.text).join('; ')})`
      : '';
    return `- ${name} — ${price}${card.note ? `, ${card.note}` : ''}${extras}`;
  });
  // title в Contentful уже с двоеточием на конце — убираем, чтобы не было «::»
  const notes =
    pricing.notes?.map(
      (n) => `- ${n.title.replace(/:\s*$/, '')}: ${n.value}`,
    ) ?? [];
  return [...rows, ...notes].join('\n');
}

interface LlmsData {
  tiles: ITiles;
  faqMain: IFAQ;
  faqFop: IFAQ;
  faqTov: IFAQ;
  pricingFop: IPricing | null;
  pricingTov: IPricing | null;
  posts: IBlogPost[];
}

/**
 * Кэш на процесс, свой у этого модуля.
 *
 * Полная версия llms-файла — это 8 записей Contentful плюс блог. Кэш
 * getLandingData в dev отключён (правки в CMS должны быть видны сразу), так что
 * без своего кэша частые обращения к /llms.txt и /llms-full.txt выбирали бы
 * лимит Contentful и роняли бы вместе с собой остальные страницы.
 */
const CACHE_TTL_MS = 60_000;

interface CacheSlot<T> {
  at: number;
  data: Promise<T>;
}

/** Ссылка на слот, чтобы memo мог его перезаписать (примитив по значению — нет). */
interface CacheRef<T> {
  current: CacheSlot<T> | null;
}

function memo<T>(ref: CacheRef<T>, fetcher: () => Promise<T>): Promise<T> {
  const hit = ref.current;
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return hit.data;
  }

  const entry: CacheSlot<T> = { at: Date.now(), data: fetcher() };
  // ошибку не кэшируем: следующий запрос должен повторить попытку. Сбрасываем
  // только свою запись — пока запрос шёл, слот мог занять уже успешный ответ,
  // и обнулять его из-за старого реджекта нельзя
  entry.data.catch(() => {
    if (ref.current === entry) ref.current = null;
  });
  ref.current = entry;

  return entry.data;
}

const postsCache: CacheRef<IBlogPost[]> = { current: null };
const fullCache: CacheRef<LlmsData> = { current: null };

/** Список статей — единственное, что нужно короткой версии llms.txt. */
function getBlogPosts(): Promise<IBlogPost[]> {
  return memo(postsCache, async () => {
    const blog = await client.getEntries({
      content_type: 'blog',
      include: 1,
      order: '-sys.createdAt' as never,
      limit: 100,
    });
    return blog.items.map(mapBlogPost);
  });
}

function getLlmsData(): Promise<LlmsData> {
  return memo(fullCache, fetchLlmsData);
}

async function fetchLlmsData(): Promise<LlmsData> {
  // getLandingData кэширует записи на процесс — три вызова не бьют по Contentful
  // трижды за одними и теми же tiles/faq. Блог берём через getBlogPosts:
  // короткая версия его уже могла прогреть.
  const [main, fop, tov, posts] = await Promise.all([
    getLandingData(),
    getLandingData({
      heroId: FOP_HERO_ID,
      supportId: FOP_SUPPORT_ID,
      pricingId: FOP_PRICING_ID,
      faqId: FOP_FAQ_ID,
    }),
    getLandingData({
      heroId: TOV_HERO_ID,
      supportId: TOV_SUPPORT_ID,
      pricingId: TOV_PRICING_ID,
      faqId: TOV_FAQ_ID,
    }),
    getBlogPosts(),
  ]);

  return {
    tiles: main.tiles,
    faqMain: main.faq,
    faqFop: fop.faq,
    faqTov: tov.faq,
    pricingFop: fop.pricing,
    pricingTov: tov.pricing,
    posts,
  };
}

const INTRO = `# WisExpert — бухгалтерська компанія в Києві

> Аутсорсинг бухгалтерії для ФОП і ТОВ в Україні: ведення обліку, податки, звітність, кадри, РРО/ПРРО, реєстрація бізнесу, супровід податкових перевірок. 10+ років досвіду, 20+ галузей, 100+ клієнтів на постійному супроводі.

Ключові дані:

- Компанія: WisExpert (бухгалтерські послуги, аутсорсинг бухгалтерії)
- Адреса: вул. Сверстюка, 11а, Київ, 02002, Україна
- Телефон: ${CONTACTS.phoneDisp}
- Email: ${CONTACTS.emailDisp}
- Робочі години: Пн–Пт, 09:00–18:00 (EET)
- Мова обслуговування: українська
- Обслуговуємо: усю Україну (дистанційно) та Київ (офіс)
- Спеціалізація: ІТ і Дія.City, оптова та роздрібна торгівля, виробництво, HORECA, сфера послуг`;

/** Короткая версия — карта сайта со ссылками и описаниями. */
export async function buildLlmsTxt(): Promise<string> {
  // здесь нужен только блог: услуги и разделы описаны статикой ниже,
  // тянуть ради них tiles, FAQ и прайсы из Contentful незачем
  const posts = await getBlogPosts();

  const servicePages = SERVICE_PAGES.map(
    (s) => `- [${s.title}](${BASE_URL}/services/${s.slug}): ${s.description}`,
  ).join('\n');

  const blogLinks = posts
    .map((p) => {
      const summary = p.excerpt ? `: ${summarize(p.excerpt)}` : '';
      return `- [${p.title}](${BASE_URL}/blog/${p.slug})${summary}`;
    })
    .join('\n');

  return `${INTRO}

## Основні сторінки

- [Головна](${BASE_URL}/): послуги, ціни, калькулятор вартості, відгуки клієнтів
- [Бухгалтер для ФОП](${BASE_URL}/fop): ведення ФОП — облік, податки, звітність, РРО/ПРРО, тарифи по групах єдиного податку
- [Бухгалтерське обслуговування ТОВ](${BASE_URL}/tov): повний супровід компаній — облік, ПДВ, кадри, звітність, тарифи
- [Блог](${BASE_URL}/blog): статті про податки, звітність і облік для українського бізнесу

## Галузеві напрямки

${servicePages}

## Блог

${blogLinks}

## Повний текст

- [llms-full.txt](${BASE_URL}/llms-full.txt): усі послуги, ціни та відповіді на часті запитання одним файлом
`;
}

/** Полная версия — весь ключевой контент сайта в одном текстовом файле. */
export async function buildLlmsFullTxt(): Promise<string> {
  const { tiles, faqMain, faqFop, faqTov, pricingFop, pricingTov, posts } =
    await getLlmsData();

  const tilesBlock = tiles.tile
    .map((t) => {
      const f = t.fields;
      const bullets = f.description.map((d) => `- ${d}`).join('\n');
      // price в Contentful — уже готовая строка вида «Ціна від 10000 грн/місяць*»
      const slug = TILE_SLUG_MAP[f.name];
      const link = slug ? `\n\nДетальніше: ${BASE_URL}/services/${slug}` : '';
      return `### ${f.name}\n\n${bullets}\n\n${f.price}${link}`;
    })
    .join('\n\n');

  // В полной версии текст статьи даём целиком — это и есть то, что цитируют
  const blogBlock = posts
    .map(
      (p) =>
        `### ${p.title}\n\n${stripHtml(p.excerpt)}\n\nЧитати: ${BASE_URL}/blog/${p.slug}`,
    )
    .join('\n\n');

  return `${INTRO}

## Послуги за галузями

${tilesBlock}

## Ціни на бухгалтерські послуги для ФОП

${pricingBlock(pricingFop) || 'Актуальні тарифи — на сторінці ' + BASE_URL + '/fop'}

## Ціни на бухгалтерські послуги для ТОВ

${pricingBlock(pricingTov) || 'Актуальні тарифи — на сторінці ' + BASE_URL + '/tov'}

## Часті запитання про роботу з WisExpert

${faqBlock(faqMain)}

## Часті запитання про бухгалтерію для ФОП

${faqBlock(faqFop)}

## Часті запитання про бухгалтерію для ТОВ

${faqBlock(faqTov)}

## Статті блогу

${blogBlock}

## Контакти

- Телефон: ${CONTACTS.phoneDisp}
- Email: ${CONTACTS.emailDisp}
- Адреса: вул. Сверстюка, 11а, Київ, 02002
- Telegram: https://t.me/WisExpert
- Сайт: ${BASE_URL}
`;
}
