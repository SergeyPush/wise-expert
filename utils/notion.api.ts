import { Client } from '@notionhq/client';

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string;
const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
});

export default notion;

export const getDB = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string,
  });
  console.log(response);
  return response;
};
