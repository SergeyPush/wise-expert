import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      // Алиас '@/…' из tsconfig. Регулярка, а не просто '@': иначе под алиас
      // попали бы npm-пакеты вида '@contentful/…'
      { find: /^@\//, replacement: fileURLToPath(new URL('./', import.meta.url)) },
    ],
  },
  test: {
    // .next содержит скомпилированные копии исходников — не тестируем их
    exclude: ['node_modules/**', '.next/**', '.agents/**'],
  },
});
