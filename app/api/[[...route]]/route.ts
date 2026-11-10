import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import {
  createRateLimiter,
  FormData,
  isHoneypotFilled,
  prepareTelegramMessage,
  validateBody,
} from '@/utils/submit.utils';

const app = new Hono().basePath('/api');

const isRateLimited = createRateLimiter();

// ---------- Telegram ----------
async function sendToTelegram(formData: FormData): Promise<boolean> {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram env is not configured');
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: prepareTelegramMessage(formData),
        parse_mode: 'HTML',
      }),
      signal: AbortSignal.timeout(10_000),
    });
    // fetch не бросает на 4xx/5xx — проверяем статус сами, иначе отказ
    // Telegram проходит незамеченным и заявка теряется
    if (!res.ok) {
      console.error('Telegram send failed', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Telegram send failed', err);
    return false;
  }
}

// ---------- CRM ----------
// Дублируем заявку в CRM. /public/leads всегда отвечает 200, но таймаут и
// catch нужны на нашей стороне на случай сетевой задержки.
let crmNotConfiguredLogged = false;

/** null — CRM не настроена (канала нет), false — настроена, но не дошло */
async function sendToCrm(formData: FormData): Promise<boolean | null> {
  const CRM_URL = process.env.CRM_WEB_FORM_URL;
  const CRM_TOKEN = process.env.CRM_WEB_FORM_TOKEN;
  if (!CRM_URL || !CRM_TOKEN) {
    // один раз за жизнь процесса, чтобы не путать с падением CRM в логах
    if (!crmNotConfiguredLogged) {
      console.warn('CRM env is not configured, leads go to Telegram only');
      crmNotConfiguredLogged = true;
    }
    return null;
  }
  try {
    const res = await fetch(CRM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-web-form-token': CRM_TOKEN },
      body: JSON.stringify(formData),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error('CRM lead submit failed', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('CRM lead submit failed', err);
    return false;
  }
}

// ---------- Роут ----------
app.post('/submit', async (c) => {
  // nginx проставляет X-Real-IP; без прокси (dev) заголовка нет — все в одной
  // корзине. Порт 3000 в docker-compose привязан к 127.0.0.1, так что
  // подделать заголовок напрямую с интернета нельзя
  const ip =
    c.req.header('x-real-ip') ??
    c.req.header('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';
  if (isRateLimited(ip)) {
    return c.json({ success: false, error: 'Too many requests' }, 429);
  }

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ success: false, error: 'Invalid JSON' }, 400);
  }

  const validated = validateBody(body);
  if (typeof validated === 'string') {
    return c.json({ success: false, error: validated }, 400);
  }

  // Бот заполнил ловушку — отвечаем «успех», чтобы не подсказывать, что
  // он пойман, но никуда ничего не отправляем
  if (isHoneypotFilled(validated)) {
    return c.json({ success: true });
  }

  // Каналы независимы — шлём параллельно
  const [telegramOk, crmOk] = await Promise.all([
    sendToTelegram(validated),
    sendToCrm(validated),
  ]);

  // Заявка дошла хотя бы в один канал — для пользователя это успех.
  // Ни одного — честный 502, форма покажет ошибку и сохранит введённое
  if (!telegramOk && crmOk !== true) {
    return c.json({ success: false, error: 'Delivery failed' }, 502);
  }
  return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
