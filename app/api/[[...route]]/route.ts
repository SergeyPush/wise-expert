import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

// ---------- Ограничения на тело заявки ----------
// Форма шлёт name, phone, question + до 7 полей калькулятора. Лимиты с запасом,
// но так, чтобы бот не мог прислать мегабайтный JSON или сотню полей.
const MAX_FIELDS = 20;
const MAX_KEY_LENGTH = 64;
const MAX_VALUE_LENGTH = 2000;
const REQUIRED_FIELDS = ['name', 'phone'] as const;
// Скрытое поле-ловушка (honeypot) в ContactForm: человек его не видит и не
// заполняет, бот заполняет всё подряд. Непустое значение = спам.
const HONEYPOT_FIELD = 'website';

// ---------- Rate limit ----------
// Один контейнер, поэтому хватает памяти процесса: окно 10 минут, 5 заявок с IP.
// Nginx дополнительно режет /api/ через limit_req (см. nginx/default.conf), но
// защита в коде не зависит от конфигурации сервера.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX_REQUESTS = 5;
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  rateMap.set(ip, recent);
  // чистим карту от устаревших IP, чтобы она не росла бесконечно
  if (rateMap.size > 10_000) {
    for (const [key, times] of rateMap) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateMap.delete(key);
    }
  }
  return recent.length > RATE_MAX_REQUESTS;
}

// ---------- Валидация ----------
type FormData = Record<string, string>;

/** Возвращает очищенные данные или строку с причиной отказа */
function validateBody(body: unknown): FormData | string {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'body must be an object';
  }
  const entries = Object.entries(body as Record<string, unknown>);
  if (entries.length > MAX_FIELDS) return 'too many fields';

  const data: FormData = {};
  for (const [key, value] of entries) {
    if (key.length > MAX_KEY_LENGTH) return 'field name too long';
    // formatData на клиенте отдаёт строки; пустые/undefined поля калькулятора пропускаем
    if (value === undefined || value === null || value === '') continue;
    if (typeof value !== 'string') return `field "${key}" must be a string`;
    if (value.length > MAX_VALUE_LENGTH) return `field "${key}" too long`;
    data[key] = value.trim();
  }
  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) return `field "${field}" is required`;
  }
  return data;
}

// ---------- Telegram ----------
// parse_mode: 'HTML' — Telegram отвергает сообщение целиком, если в тексте
// незакрытый '<' или '&' вне сущности. Раньше клиент писал в вопросе «a<b» —
// Telegram отвечал 400, а сайт всё равно говорил «успешно». Экранируем.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function prepareTelegramMessage(formData: FormData): string {
  let message = '<b>Новая заявка</b>\n\n';
  for (const [key, value] of Object.entries(formData)) {
    message += `<b>${escapeHtml(key)}:</b> ${escapeHtml(value)}\n`;
  }
  return message;
}

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
async function sendToCrm(formData: FormData): Promise<boolean> {
  const CRM_URL = process.env.CRM_WEB_FORM_URL;
  const CRM_TOKEN = process.env.CRM_WEB_FORM_TOKEN;
  // CRM не настроена — не считаем это ни успехом, ни ошибкой
  if (!CRM_URL || !CRM_TOKEN) return false;
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
  // nginx проставляет X-Real-IP; без прокси (dev) заголовка нет — все в одной корзине
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
  if (validated[HONEYPOT_FIELD]) {
    return c.json({ success: true });
  }
  delete validated[HONEYPOT_FIELD];

  // Каналы независимы — шлём параллельно
  const [telegramOk, crmOk] = await Promise.all([
    sendToTelegram(validated),
    sendToCrm(validated),
  ]);

  // Заявка дошла хотя бы в один канал — для пользователя это успех.
  // Ни одного — честный 502, форма покажет ошибку и сохранит введённое
  if (!telegramOk && !crmOk) {
    return c.json({ success: false, error: 'Delivery failed' }, 502);
  }
  return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
