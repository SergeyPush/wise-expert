// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import notion from '@/utils/notion.api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'POST':
      const { source } = JSON.parse(req.body);

      notion.pages
        .create({
          parent: {
            database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string,
          },
          properties: {
            Date: {
              date: {
                start: new Date().toISOString(),
              },
            },
            Source: {
              title: [
                {
                  type: 'text',
                  text: {
                    content: source,
                  },
                },
              ],
            },
          },
        })
        .catch((err) => console.log(err));
      res.status(200).json({
        message: `You submitted the following data: ${req.body.source}`,
      });
    default:
      res.status(200).json({ message: 'Welcome to API Routes!' });
  }
  res.status(200).json({ name: 'John Doe' });
}
