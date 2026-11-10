import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-config-next 15 отдаёт конфиг в старом формате — подключаем через FlatCompat
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    // Сборка, зависимости и локальные заметки не линтим
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'docs/**',
      'next-env.d.ts',
      // служебные скрипты агентных скиллов, не код сайта
      '.agents/**',
    ],
  },
  // Правила Next (включая Core Web Vitals) + TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Конфиги Node в CommonJS — require() там норма
    files: ['*.config.js', 'next.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    rules: {
      // console.log в проде — ошибка; warn/error оставляем для логов сервера
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
];

export default eslintConfig;
