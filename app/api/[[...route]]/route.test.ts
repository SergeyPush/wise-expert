import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HONEYPOT_FIELD, RATE_MAX_REQUESTS } from '@/utils/submit.utils';

// Поведение /api/submit целиком: статусы ответа в зависимости от того,
// дошла ли заявка в Telegram и/или CRM

const TELEGRAM = 'https://api.telegram.org';
const CRM_URL = 'https://crm.example.test/public/leads';

type Outcome = 'ok' | 'fail' | 'throw';

/** Мок fetch: отдельный исход для Telegram и для CRM */
function mockFetch(telegram: Outcome, crm: Outcome) {
  // сигнатура fetch с init — чтобы в тесте читать тело запроса
  const fetchMock = vi.fn<
    (url: string | URL, init?: RequestInit) => Promise<Response>
  >(async (url) => {
    const outcome = String(url).startsWith(TELEGRAM) ? telegram : crm;
    if (outcome === 'throw') throw new Error('network down');
    return new Response(outcome === 'ok' ? '{}' : 'error', {
      status: outcome === 'ok' ? 200 : 500,
    });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

/** Свежий модуль роута: у каждого теста свой счётчик rate limit */
async function loadRoute() {
  vi.resetModules();
  return (await import('./route')).POST;
}

function submit(
  POST: (req: Request) => Response | Promise<Response>,
  body: unknown,
  ip = '1.2.3.4',
) {
  return POST(
    new Request('http://localhost/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-real-ip': ip },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );
}

const VALID = { name: 'Іван', phone: '+380991112233', question: 'a<b' };

describe('POST /api/submit', () => {
  beforeEach(() => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token');
    vi.stubEnv('TELEGRAM_CHAT_ID', '42');
    vi.stubEnv('CRM_WEB_FORM_URL', CRM_URL);
    vi.stubEnv('CRM_WEB_FORM_TOKEN', 'crm-token');
    // роут логирует сбои каналов — в выводе тестов это шум
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('200, когда заявка дошла в оба канала', async () => {
    const fetchMock = mockFetch('ok', 'ok');
    const res = await submit(await loadRoute(), VALID);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('200, когда Telegram упал, но CRM приняла', async () => {
    mockFetch('fail', 'ok');
    const res = await submit(await loadRoute(), VALID);
    expect(res.status).toBe(200);
  });

  it('200, когда CRM недоступна, но Telegram принял', async () => {
    mockFetch('ok', 'throw');
    const res = await submit(await loadRoute(), VALID);
    expect(res.status).toBe(200);
  });

  it('502, когда не дошло никуда', async () => {
    mockFetch('fail', 'throw');
    const res = await submit(await loadRoute(), VALID);
    expect(res.status).toBe(502);
    expect(await res.json()).toMatchObject({ success: false });
  });

  it('502, когда Telegram упал, а CRM не настроена', async () => {
    vi.stubEnv('CRM_WEB_FORM_URL', '');
    const fetchMock = mockFetch('fail', 'ok');
    const res = await submit(await loadRoute(), VALID);
    expect(res.status).toBe(502);
    // в CRM не ходили — канала нет
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('экранирует HTML в сообщении для Telegram', async () => {
    const fetchMock = mockFetch('ok', 'ok');
    await submit(await loadRoute(), VALID);
    const tgCall = fetchMock.mock.calls.find(([url]) =>
      String(url).startsWith(TELEGRAM),
    )!;
    const sent = JSON.parse(tgCall[1]!.body as string);
    expect(sent.text).toContain('a&lt;b');
  });

  it('400 на невалидный JSON', async () => {
    const fetchMock = mockFetch('ok', 'ok');
    const res = await submit(await loadRoute(), '{not json');
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('400 без обязательного телефона', async () => {
    const fetchMock = mockFetch('ok', 'ok');
    const res = await submit(await loadRoute(), { name: 'Іван' });
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('honeypot: отвечает 200, но никуда не отправляет', async () => {
    const fetchMock = mockFetch('ok', 'ok');
    const res = await submit(await loadRoute(), {
      ...VALID,
      [HONEYPOT_FIELD]: 'http://spam.example',
    });
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('429 после лимита с одного IP, другой IP не затронут', async () => {
    mockFetch('ok', 'ok');
    const POST = await loadRoute();
    for (let i = 0; i < RATE_MAX_REQUESTS; i++) {
      expect((await submit(POST, VALID)).status).toBe(200);
    }
    expect((await submit(POST, VALID)).status).toBe(429);
    expect((await submit(POST, VALID, '5.6.7.8')).status).toBe(200);
  });
});
