import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GetServerSidePropsContext } from 'next';
import { SERVICE_SLUG_TO_CONTENTFUL_ID } from '@/constants/services.const';

// Кэш и fallback pages/sitemap.xml.tsx: Contentful подменяем моком.
// Лежит не в pages/ — Next считает страницей любой файл там

const contentful = vi.hoisted(() => ({
  getEntries: vi.fn(),
  getEntry: vi.fn(),
}));
vi.mock('@/utils/contentful.api', () => ({ default: contentful }));

const SERVICES = Object.keys(SERVICE_SLUG_TO_CONTENTFUL_ID).length;
const STATIC_PAGES = 5;
const HOUR = 60 * 60 * 1000;

/** Contentful отвечает: 2 статьи блога, у услуг — дата обновления */
function contentfulUp(updatedAt = '2026-11-01T10:00:00Z') {
  contentful.getEntries.mockResolvedValue({
    items: [
      { fields: { slug: 'post-a' }, sys: { updatedAt } },
      { fields: { slug: 'post-b' }, sys: { updatedAt } },
    ],
  });
  contentful.getEntry.mockResolvedValue({ sys: { updatedAt } });
}

function contentfulDown() {
  contentful.getEntries.mockRejectedValue(new Error('Contentful 503'));
  contentful.getEntry.mockRejectedValue(new Error('Contentful 503'));
}

/** Свежий модуль — пустой кэш на уровне модуля */
async function loadSitemap() {
  vi.resetModules();
  return (await import('@/pages/sitemap.xml')).getServerSideProps;
}

/** Вызов getServerSideProps с моком res; возвращает отданный XML */
async function render(
  gssp: Awaited<ReturnType<typeof loadSitemap>>,
): Promise<string> {
  let body = '';
  const res = {
    setHeader: vi.fn(),
    write: (chunk: string) => {
      body += chunk;
    },
    end: vi.fn(),
  };
  await gssp({ res } as unknown as GetServerSidePropsContext);
  return body;
}

const urlCount = (xml: string) => (xml.match(/<loc>/g) ?? []).length;

describe('sitemap.xml', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-10T12:00:00Z'));
    contentful.getEntries.mockReset();
    contentful.getEntry.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('собирает статические страницы, услуги и блог с lastmod из Contentful', async () => {
    contentfulUp();
    const xml = await render(await loadSitemap());
    expect(urlCount(xml)).toBe(STATIC_PAGES + SERVICES + 2);
    expect(xml).toContain('<loc>https://wisexpert.com.ua/blog/post-a</loc>');
    expect(xml).toContain('<lastmod>2026-11-01</lastmod>');
  });

  it('в пределах часа отдаёт кэш без запросов в Contentful', async () => {
    contentfulUp();
    const gssp = await loadSitemap();
    const first = await render(gssp);
    const callsAfterFirst = contentful.getEntry.mock.calls.length;

    vi.advanceTimersByTime(HOUR - 1000);
    const second = await render(gssp);

    expect(second).toBe(first);
    expect(contentful.getEntry.mock.calls.length).toBe(callsAfterFirst);
    expect(contentful.getEntries).toHaveBeenCalledTimes(1);
  });

  it('после часа обновляет данные', async () => {
    contentfulUp('2026-11-01T10:00:00Z');
    const gssp = await loadSitemap();
    await render(gssp);

    vi.advanceTimersByTime(HOUR + 1000);
    contentfulUp('2026-11-09T10:00:00Z');
    const xml = await render(gssp);

    expect(xml).toContain('<lastmod>2026-11-09</lastmod>');
    expect(contentful.getEntries).toHaveBeenCalledTimes(2);
  });

  it('Contentful упал после истечения кэша — отдаёт устаревший кэш', async () => {
    contentfulUp();
    const gssp = await loadSitemap();
    const cached = await render(gssp);

    vi.advanceTimersByTime(HOUR + 1000);
    contentfulDown();
    const xml = await render(gssp);

    expect(xml).toBe(cached);
    // блог не потерялся
    expect(xml).toContain('/blog/post-a');
  });

  it('Contentful упал при пустом кэше — урезанный fallback без блога', async () => {
    contentfulDown();
    const xml = await render(await loadSitemap());

    expect(urlCount(xml)).toBe(STATIC_PAGES + SERVICES);
    expect(xml).not.toContain('/blog/');
    expect(xml).toContain('/services/it</loc>');
  });
});
