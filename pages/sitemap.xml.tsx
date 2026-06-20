import { GetServerSideProps } from 'next';
import client from '@/utils/contentful.api';

const BASE_URL = 'https://wisexpert.com.ua';

const FALLBACK_DATE = '2026-03-29';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SERVICE_SLUG_TO_ID: Record<string, string> = {
  it: '5jyN8q1yHA0UEMyZGwRDFs',
  optova: '14Ufdnf0ubOu9OpwprgmhL',
  rozdribna: '1EepYK0uDkEbPZakyCeDLc',
  vyrobnytstvo: '5LgwI6wbO1UkHaFHZiNd9I',
  horeca: '73drFNQdcTwZkAmht8SJIp',
  posluhy: '3uOw2ZZlRcwy418LYuwIUs',
};

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

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const [blogResponse, ...serviceEntries] = await Promise.all([
      client.getEntries({
        content_type: 'blog',
        select: ['fields.slug', 'sys.updatedAt'],
        limit: 200,
      }),
      ...Object.values(SERVICE_SLUG_TO_ID).map((id) =>
        client.getEntry(id, { select: ['sys.updatedAt'] } as never),
      ),
    ]);

    // Build service URLs with real lastmod from Contentful
    const serviceUrls = Object.keys(SERVICE_SLUG_TO_ID).map((slug, i) => ({
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

    const staticUrls: SitemapUrl[] = [
      { loc: `${BASE_URL}/`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '1.0' },
      { loc: `${BASE_URL}/blog`, lastmod: blogUrls[0]?.lastmod ?? FALLBACK_DATE, changefreq: 'weekly', priority: '0.7' },
    ];

    const allUrls = [...staticUrls, ...serviceUrls, ...blogUrls];
    const sitemap = generateSitemap(allUrls);

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(sitemap);
    res.end();
  } catch {
    const fallbackUrls: SitemapUrl[] = [
      { loc: `${BASE_URL}/`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '1.0' },
      { loc: `${BASE_URL}/blog`, lastmod: FALLBACK_DATE, changefreq: 'weekly', priority: '0.7' },
      ...Object.keys(SERVICE_SLUG_TO_ID).map((slug) => ({
        loc: `${BASE_URL}/services/${slug}`,
        lastmod: FALLBACK_DATE,
        changefreq: 'monthly',
        priority: '0.9',
      })),
    ];
    const sitemap = generateSitemap(fallbackUrls);
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  }

  return { props: {} };
};
