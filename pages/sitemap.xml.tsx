import { GetServerSideProps } from 'next';
import client from '@/utils/contentful.api';

const BASE_URL = 'https://wisexpert.com.ua';

const STATIC_PAGES = [
  { loc: `${BASE_URL}/`, lastmod: '2026-03-29', changefreq: 'weekly', priority: '1.0' },
  { loc: `${BASE_URL}/blog`, lastmod: '2026-03-29', changefreq: 'weekly', priority: '0.7' },
  { loc: `${BASE_URL}/services/it`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/services/optova`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/services/rozdribna`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/services/vyrobnytstvo`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/services/horeca`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/services/posluhy`, lastmod: '2026-03-29', changefreq: 'monthly', priority: '0.9' },
];

function generateSitemap(urls: typeof STATIC_PAGES) {
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

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      select: ['fields.slug', 'sys.updatedAt'],
      limit: 200,
    });

    const blogUrls = response.items
      .map((item) => {
        const f = item.fields as Record<string, unknown>;
        if (typeof f.slug !== 'string') return null;
        const lastmod = item.sys.updatedAt
          ? item.sys.updatedAt.split('T')[0]
          : '2026-03-29';
        return {
          loc: `${BASE_URL}/blog/${f.slug}`,
          lastmod,
          changefreq: 'weekly',
          priority: '0.6',
        };
      })
      .filter(Boolean) as typeof STATIC_PAGES;

    const allUrls = [...STATIC_PAGES, ...blogUrls];
    const sitemap = generateSitemap(allUrls);

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(sitemap);
    res.end();
  } catch {
    const sitemap = generateSitemap(STATIC_PAGES);
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  }

  return { props: {} };
};
