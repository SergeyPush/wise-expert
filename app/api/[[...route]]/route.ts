import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.post('/submit', async (c) => {
  const message = await c.req.json();

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  type TelegramFormData = Record<string, string>;

  const prepareTelegramMessage = (formData: TelegramFormData): string => {
    let message = '<b>Новая заявка</b>\n\n';
    for (const [key, value] of Object.entries(formData)) {
      message += `<b>${key}:</b> ${value}\n`;
    }
    return message;
  };
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: prepareTelegramMessage(message),
      parse_mode: 'HTML',
    }),
  });

  return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
