import { GetServerSideProps } from 'next';
import { buildLlmsFullTxt, BASE_URL } from '@/utils/llms-txt';

// Полный текст сайта одним файлом по /llms-full.txt — цены, FAQ, услуги.
export default function LlmsFullTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let body: string;

  try {
    body = await buildLlmsFullTxt();
  } catch (e) {
    // логируем: иначе недоступный Contentful выглядит как успешный ответ
    console.error('Failed to build llms-full.txt:', e);
    body = `# WisExpert — бухгалтерська компанія в Києві

Повний текст тимчасово недоступний. Актуальні послуги та ціни: ${BASE_URL}/
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
