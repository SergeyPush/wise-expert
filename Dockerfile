# syntax=docker/dockerfile:1.7
# Директива syntax включает cache-mount'ы ниже (RUN --mount=type=cache).

# ---------- deps: только установка зависимостей ----------
# Отдельный слой от исходников: пересобирается лишь когда меняется
# package-lock.json, а не при каждой правке компонента.
FROM node:22-alpine3.20 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm ci вместо npm install: ставит ровно то, что в lock-файле, и не тратит
# время на разрешение диапазонов версий.
# Cache-mount на ~/.npm переживает --no-cache и смену lock-файла: даже при
# полной пересборке пакеты берутся с диска, а не из сети.
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci

# ---------- builder: сборка Next ----------
FROM node:22-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Сборка блога ходит в Contentful из getStaticProps, поэтому ключи нужны
# уже на этапе build. Раньше они попадали внутрь вместе с `COPY . .` и
# оставались лежать в слое образа — вместе с серверным TELEGRAM_BOT_TOKEN,
# который в рантайме приходит из env_file и в образе не нужен вовсе.
# secret-mount даёт файл только на время этого RUN и в слой его не пишет.
#
# Монтируем в /run/secrets, а не в /app/.env, и подгружаем переменные в
# окружение через `set -a`. Если положить .env в корень проекта, его копирует
# в свой выхлоп сам `output: standalone` — и секрет снова уезжает в образ,
# уже мимо secret-mount. Через process.env Next читает те же значения.
#
# .next/cache — инкрементальный кэш Next (компиляция модулей, оптимизация).
# Как cache-mount он не попадает в слой образа, но сохраняется между сборками,
# поэтому вторая сборка компилирует только изменившееся.
RUN --mount=type=secret,id=env \
    --mount=type=cache,target=/app/.next/cache,sharing=locked \
    set -a && . /run/secrets/env && set +a && npm run build

# ---------- runner: то, что реально едет на сервер ----------
# Отдельная стадия, чтобы в финальный образ не попали devDependencies,
# исходники и тулчейн сборки.
FROM node:22-alpine3.20 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000

# Не root: процессу Next не нужны привилегии внутри контейнера.
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# output: 'standalone' складывает в .next/standalone минимальный набор
# node_modules, который реально импортируется в рантайме.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
# standalone кладёт собственный сервер; next start здесь не используется.
CMD ["node", "server.js"]
