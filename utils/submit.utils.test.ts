import { describe, expect, it } from 'vitest';
import {
  createRateLimiter,
  escapeHtml,
  HONEYPOT_FIELD,
  isHoneypotFilled,
  MAX_FIELDS,
  MAX_VALUE_LENGTH,
  prepareTelegramMessage,
  TELEGRAM_MAX_LENGTH,
  validateBody,
} from './submit.utils';

const valid = { name: 'Іван', phone: '+38(099)123-45-67' };

describe('validateBody', () => {
  it('принимает минимальную заявку и обрезает пробелы', () => {
    expect(validateBody({ name: '  Іван ', phone: ' 123 ' })).toEqual({
      name: 'Іван',
      phone: '123',
    });
  });

  it('отбрасывает не-объекты', () => {
    expect(validateBody(null)).toBe('body must be an object');
    expect(validateBody([1, 2])).toBe('body must be an object');
    expect(validateBody('str')).toBe('body must be an object');
  });

  it('требует name и phone', () => {
    expect(validateBody({ name: 'a' })).toBe('field "phone" is required');
    expect(validateBody({ phone: '1' })).toBe('field "name" is required');
  });

  it('строка из пробелов считается пустой', () => {
    expect(validateBody({ ...valid, question: '   ' })).toEqual(valid);
    expect(validateBody({ name: '   ', phone: '1' })).toBe('field "name" is required');
  });

  it('пропускает пустые, null и undefined поля калькулятора', () => {
    expect(validateBody({ ...valid, TaxSystem: '', DiyaCity: null, x: undefined })).toEqual(valid);
  });

  it('не принимает нестроковые значения', () => {
    expect(validateBody({ ...valid, phone: { x: 1 } })).toBe('field "phone" must be a string');
    expect(validateBody({ ...valid, n: 5 })).toBe('field "n" must be a string');
  });

  it('ограничивает длину значения и число полей', () => {
    expect(validateBody({ ...valid, question: 'a'.repeat(MAX_VALUE_LENGTH) })).toMatchObject(valid);
    expect(validateBody({ ...valid, question: 'a'.repeat(MAX_VALUE_LENGTH + 1) })).toBe(
      'field "question" too long',
    );
    const many = Object.fromEntries(Array.from({ length: MAX_FIELDS + 1 }, (_, i) => [`k${i}`, 'v']));
    expect(validateBody({ ...valid, ...many })).toBe('too many fields');
    expect(validateBody({ ...valid, ['k'.repeat(65)]: 'v' })).toBe('field name too long');
  });
});

describe('honeypot', () => {
  it('пустая ловушка не попадает в данные — заявка от человека', () => {
    const data = validateBody({ ...valid, [HONEYPOT_FIELD]: '' });
    expect(typeof data).toBe('object');
    expect(isHoneypotFilled(data as Record<string, string>)).toBe(false);
  });

  it('заполненная ловушка — спам', () => {
    const data = validateBody({ ...valid, [HONEYPOT_FIELD]: 'http://spam' });
    expect(isHoneypotFilled(data as Record<string, string>)).toBe(true);
  });
});

describe('escapeHtml / prepareTelegramMessage', () => {
  it('экранирует символы, ломающие parse_mode HTML', () => {
    expect(escapeHtml('a<b & c>d')).toBe('a&lt;b &amp; c&gt;d');
  });

  it('собирает сообщение с экранированными ключами и значениями', () => {
    const msg = prepareTelegramMessage({ name: 'Іван', question: '1<2' });
    expect(msg).toBe('<b>Новая заявка</b>\n\n<b>name:</b> Іван\n<b>question:</b> 1&lt;2\n');
  });

  it('обрезает длинное сообщение до лимита Telegram по границе строки', () => {
    const data = Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [`f${i}`, 'x'.repeat(MAX_VALUE_LENGTH)]),
    );
    const msg = prepareTelegramMessage(data);
    expect(msg.length).toBeLessThanOrEqual(TELEGRAM_MAX_LENGTH);
    expect(msg.endsWith('…(обрезано)')).toBe(true);
    // нет разрезанного тега: каждая строка либо целая, либо отсутствует
    expect(msg.split('\n…')[0].split('\n').every((l) => !l || l.startsWith('<b>'))).toBe(true);
  });
});

describe('createRateLimiter', () => {
  it('пропускает первые N запросов и режет следующий', () => {
    const t = 0;
    const limited = createRateLimiter(1000, 3, () => t);
    expect(limited('ip')).toBe(false);
    expect(limited('ip')).toBe(false);
    expect(limited('ip')).toBe(false);
    expect(limited('ip')).toBe(true);
  });

  it('считает IP независимо и забывает после окна', () => {
    let t = 0;
    const limited = createRateLimiter(1000, 1, () => t);
    expect(limited('a')).toBe(false);
    expect(limited('b')).toBe(false);
    expect(limited('a')).toBe(true);
    t = 1001;
    expect(limited('a')).toBe(false);
  });
});
