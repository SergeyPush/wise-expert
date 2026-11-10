import { GetServerSideProps } from 'next';
import client from '@/utils/contentful.api';
import { SERVICE_SLUG_TO_CONTENTFUL_ID } from '@/constants/services.const';

const BASE_URL = 'https://wisexpert.com.ua';

const FALLBACK_DATE = '2026-03-29';

// Сколько держать готовый sitemap в памяти процесса: без кэша каждый заход
// бота = 7 запросов в Contentful (nginx ответ не кэширует)
const CACHE_TTL_MS = 60 * 60 * 1000;

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

// Кэш на уровне модуля: живёт, пока жив Node-процесс контейнера
let cache: { xml: string; expiresAt: number } | null = null;

function generateSitemap(urls: SitemapUrl[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;
}

// Статические страницы; lastmod блога подставляется из свежей статьи, если есть
function staticUrls(blogLastmod = FALLBACK_DATE): SitemapUrl[] {
  return [
    { loc: `${BASE_URL}/`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '1.0' },
    { loc: `${BASE_URL}/fop`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_URL}/tov`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_URL}/dija`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '0.9' },
    { loc: `${BASE_URL}/blog`, lastmod: blogLastmod, changefreq: 'weekly', priority: '0.7' },
  ];
}

// Полный список URL с реальными lastmod из Contentful; бросает при ошибке API
async function fetchUrls(): Promise<SitemapUrl[]> {
  const [blogResponse, ...serviceEntries] = await Promise.all([
    client.getEntries({
      content_type: 'blog',
      select: ['fields.slug', 'sys.updatedAt'],
      limit: 200,
    }),
    ...Object.values(SERVICE_SLUG_TO_CONTENTFUL_ID).map((id) =>
      client.getEntry(id, { select: ['sys.updatedAt'] } as never),
    ),
  ]);

  const serviceUrls = Object.keys(SERVICE_SLUG_TO_CONTENTFUL_ID).map((slug, i) => ({
    loc: `${BASE_URL}/services/${slug}`,
    lastmod: serviceEntries[i].sys.updatedAt?.split('T')[0] ?? FALLBACK_DATE,
    changefreq: 'monthly',
    priority: '0.9',
  }));

  const blogUrls = blogResponse.items
    .map((item) => {
      const f = item.fields as Record<string, unknown>;
      if (typeof f.slug !== 'string') return null;
      return {
        loc: `${BASE_URL}/blog/${f.slug}`,
        lastmod: item.sys.updatedAt?.split('T')[0] ?? FALLBACK_DATE,
        changefreq: 'weekly',
        priority: '0.6',
      };
    })
    .filter(Boolean) as SitemapUrl[];

  return [...staticUrls(blogUrls[0]?.lastmod), ...serviceUrls, ...blogUrls];
}

// Минимальный sitemap без обращения к Contentful
function fallbackUrls(): SitemapUrl[] {
  return [
    ...staticUrls(),
    ...Object.keys(SERVICE_SLUG_TO_CONTENTFUL_ID).map((slug) => ({
      loc: `${BASE_URL}/services/${slug}`,
      lastmod: FALLBACK_DATE,
      changefreq: 'monthly',
      priority: '0.9',
    })),
  ];
}

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let xml: string;

  if (cache && cache.expiresAt > Date.now()) {
    // Свежий кэш — без запросов в Contentful
    xml = cache.xml;
  } else {
    try {
      xml = generateSitemap(await fetchUrls());
      cache = { xml, expiresAt: Date.now() + CACHE_TTL_MS };
    } catch {
      // Contentful недоступен: устаревший кэш лучше урезанного fallback
      xml = cache?.xml ?? generateSitemap(fallbackUrls());
    }
  }

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
};
