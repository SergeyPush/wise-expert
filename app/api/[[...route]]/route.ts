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
  }).catch((err) => console.error('Telegram send failed', err));

  // Дублируем заявку в CRM. Не блокирует и не роняет ответ сайта пользователю,
  // если CRM недоступна, — /public/leads всегда отвечает 200, но таймаут и
  // catch всё равно нужны на нашей стороне, на случай сетевой задержки.
  const CRM_URL = process.env.CRM_WEB_FORM_URL;
  const CRM_TOKEN = process.env.CRM_WEB_FORM_TOKEN;
  if (CRM_URL && CRM_TOKEN) {
    await fetch(CRM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-web-form-token': CRM_TOKEN },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(5000),
    }).catch((err) => console.error('CRM lead submit failed', err));
  }

  return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
