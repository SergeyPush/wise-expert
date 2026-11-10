/**
 * Чистая логика /api/submit: валидация тела, honeypot, rate limit,
 * сборка Telegram-сообщения. Вынесена из роута, чтобы покрыть юнит-тестами
 * (utils/submit.utils.test.ts) без поднятия Next.
 */

// ---------- Ограничения на тело заявки ----------
// Форма шлёт name, phone, question + до 7 полей калькулятора. Лимиты с запасом,
// но так, чтобы бот не мог прислать мегабайтный JSON или сотню полей.
export const MAX_FIELDS = 20;
export const MAX_KEY_LENGTH = 64;
export const MAX_VALUE_LENGTH = 2000;
export const REQUIRED_FIELDS = ['name', 'phone'] as const;

/**
 * Имя honeypot-поля в ContactForm. Намеренно бессмысленное: Chrome и менеджеры
 * паролей автозаполняют поля с именами вида website/url/company даже за экраном,
 * и живая заявка улетала бы в спам.
 */
export const HONEYPOT_FIELD = 'xq_ref';

// Telegram режет текст сообщения на 4096 символах и отвечает 400
// «message is too long» — оставляем запас под пометку об обрезке
export const TELEGRAM_MAX_LENGTH = 4096;
const TELEGRAM_TRUNCATE_AT = 4000;
const TRUNCATED_MARK = '\n…(обрезано)';

export type FormData = Record<string, string>;

// ---------- Валидация ----------
/** Возвращает очищенные данные или строку с причиной отказа */
export function validateBody(body: unknown): FormData | string {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'body must be an object';
  }
  const entries = Object.entries(body as Record<string, unknown>);
  if (entries.length > MAX_FIELDS) return 'too many fields';

  const data: FormData = {};
  for (const [key, value] of entries) {
    if (key.length > MAX_KEY_LENGTH) return 'field name too long';
    // formatData на клиенте отдаёт строки; пустые поля калькулятора пропускаем
    if (value === undefined || value === null) continue;
    if (typeof value !== 'string') return `field "${key}" must be a string`;
    if (value.length > MAX_VALUE_LENGTH) return `field "${key}" too long`;
    // trim до проверки на пустоту: строка из пробелов — тоже пустое поле
    const trimmed = value.trim();
    if (!trimmed) continue;
    data[key] = trimmed;
  }
  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) return `field "${field}" is required`;
  }
  return data;
}

/** Бот заполнил ловушку: у человека поля нет в data (пустое отброшено валидацией) */
export function isHoneypotFilled(data: FormData): boolean {
  return Boolean(data[HONEYPOT_FIELD]);
}

// ---------- Telegram ----------
// parse_mode: 'HTML' — Telegram отвергает сообщение целиком, если в тексте
// незакрытый '<' или '&' вне сущности. Раньше клиент писал в вопросе «a<b» —
// Telegram отвечал 400, а сайт всё равно говорил «успешно». Экранируем.
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function prepareTelegramMessage(formData: FormData): string {
  let message = '<b>Новая заявка</b>\n\n';
  for (const [key, value] of Object.entries(formData)) {
    message += `<b>${escapeHtml(key)}:</b> ${escapeHtml(value)}\n`;
  }
  if (message.length <= TELEGRAM_MAX_LENGTH) return message;
  // Обрезаем по границе строки, чтобы не оставить незакрытый <b> или
  // разрезанную сущность &amp; — иначе Telegram снова ответит 400
  const cut = message.slice(0, TELEGRAM_TRUNCATE_AT);
  const lastLine = cut.lastIndexOf('\n');
  return (lastLine > 0 ? cut.slice(0, lastLine) : cut) + TRUNCATED_MARK;
}

// ---------- Rate limit ----------
// Один контейнер, поэтому хватает памяти процесса: окно 10 минут, 5 заявок с IP.
// Nginx дополнительно режет /api/ через limit_req (см. nginx/default.conf), но
// защита в коде не зависит от конфигурации сервера.
export const RATE_WINDOW_MS = 10 * 60_000;
export const RATE_MAX_REQUESTS = 5;
const CLEANUP_THRESHOLD = 10_000;

export function createRateLimiter(
  windowMs = RATE_WINDOW_MS,
  maxRequests = RATE_MAX_REQUESTS,
  now: () => number = Date.now,
) {
  const hits = new Map<string, number[]>();

  return function isRateLimited(ip: string): boolean {
    const ts = now();
    const recent = (hits.get(ip) ?? []).filter((t) => ts - t < windowMs);
    recent.push(ts);
    hits.set(ip, recent);
    // чистим карту от устаревших IP, чтобы она не росла бесконечно
    if (hits.size > CLEANUP_THRESHOLD) {
      for (const [key, times] of hits) {
        if (times.every((t) => ts - t >= windowMs)) hits.delete(key);
      }
    }
    return recent.length > maxRequests;
  };
}
