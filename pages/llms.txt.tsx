import { GetServerSideProps } from 'next';
import { buildLlmsTxt, BASE_URL } from '@/utils/llms-txt';

// Отдаётся как text/plain по /llms.txt — карта сайта для LLM-агентов.
export default function LlmsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let body: string;

  try {
    body = await buildLlmsTxt();
  } catch (e) {
    // Contentful недоступен — отдаём минимальную карту, а не 500:
    // агенту лучше получить ссылки, чем ошибку. Но ошибку логируем: молчаливый
    // фолбэк скрыл бы протухший токен CMS — файл отдаётся, всё «работает».
    console.error('Failed to build llms.txt:', e);
    body = `# WisExpert — бухгалтерська компанія в Києві

> Аутсорсинг бухгалтерії для ФОП і ТОВ: облік, податки, звітність, кадри.

## Основні сторінки

- [Головна](${BASE_URL}/)
- [Бухгалтер для ФОП](${BASE_URL}/fop)
- [Бухгалтерське обслуговування ТОВ](${BASE_URL}/tov)
- [Блог](${BASE_URL}/blog)
`;
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  );
  res.write(body);
  res.end();

  return { props: {} };
};
