# План технической реализации: страницы /fop и /tov

Требования: [requirements-fop-tov.md](requirements-fop-tov.md).

Что кастомизируется на новых страницах: hero-тексты (R1), новый блок «Супровід» (R2), цены карточками (R4), свой FAQ (R7), навигация с дропдауном (R9), аналитика (R10), SEO (R11). Остальные блоки переиспользуются как есть. Блок «Залишились питання» на новых страницах не выводится.

## Текущая архитектура (как приходят данные)

- Next.js **Pages Router**, SSG + ISR (`revalidate: 3600`).
- Весь контент — из **Contentful** (`utils/contentful.api.ts`, клиент по `NEXT_PUBLIC_CONTENTFUL_SPACE/TOKEN`).
- `pages/index.tsx` → `getStaticProps` делает 6 последовательных запросов по захардкоженным entry ID (advantages, tiles, table, clients, faq, reviews) + `getEntries({ content_type: 'hero' })` для hero.
- Hero: `HeroSwiper` берёт первый слайд (sort по `slide`) → `SlideOne` рендерит `title`, `subtitle`, `image`; кнопки («Розрахувати вартість» + телефон) захардкожены и не меняются (R1).
- Цены главной: запись `7JkauMUL1mb0eiosMdVMLo`, поля `fop | tov | people | services: string[][]`, вкладки в `TableHeader.tsx`, активная — `useState` в `Table.tsx`.
- FAQ: тип `faQs` (секция: `title`, `subtitle`, `faqs[]`, `ctaTitle`, `ctaText`) ссылается на записи типа `faq` (вопрос + ответ). JSON-LD `FAQPage` отдаёт сам компонент `Faq` — дубль в `pages/index.tsx` уже удалён.
- Навигация: `constants/links.const.ts` → `LinkList`/`LinkItem` (десктоп), `MobileMenu` (гамбургер), `Footer`. Якоря скроллят только при `pathname === '/'`, иначе `/#id`.
- Формы: один `ContactForm` (модалка «Замовити дзвінок», калькулятор, блок «Залишились питання»), отправка в Telegram (`utils/telegram.utils`), уже есть `dataLayer.push({ event: 'form_success' })`.
- Паттерн доп. страниц: `pages/services/[slug].tsx` (map slug→entryId, `NextSeo`, canonical, OG).
- Sitemap: `pages/sitemap.xml.tsx` — `staticUrls` в основной ветке + дубль перечня в `catch`-ветке.
- В `tailwind.config.js` уже есть фиолетовая палитра (`color-violet*`), в `Button` — формат `primary-violet`. Эти правки остаются в рабочем дереве, они нужны блоку «Супровід».
- **Папка `archive/`** — прежние наработки, вынесенные из сборки (`tsconfig.exclude`): `Support`, `WhyUs`, `TaxYear`, `TrueCost` с их константами и интерфейсами, `styles/fonts.ts`, временная страница `tmp-taxyear-preview.tsx`. `Support` возвращаем в `components/` на шаге 4; `WhyUs`, `TaxYear`, `TrueCost` в этот этап не входят.

## Принципы реализации (React-стиль)

Новые секции пишем в том же стиле, что и текущий код, без параллельных подходов:

- **Только функциональные компоненты** с типизированными пропсами (`interface XProps`), без классов, без `any`. Интерфейсы данных — в `interfaces/*.interface.ts`, как для `Support`.
- **Презентационные компоненты не ходят за данными.** Все запросы — в `getStaticProps` страницы; вниз данные идут пропсами. Хуки только для UI-состояния (`useState`, `useInView`, `useGlobalContext`).
- **Композиция вместо флагов.** Секцию цен пробрасываем в лендинг слотом (`ReactNode`), а не пропом `variant`, чтобы `LandingPage` не разрастался ветвлениями `if (page === 'fop')`.
- **Сначала переиспользуем, потом создаём.** Готовое: `Wrapper`, `Button` (форматы `primary` / `primary-violet` / `outline-dark`), `Title`, `Subtitle`, `ScrollReveal`, `useInView`, `scrollToId`, `useGlobalContext().setBookCallIsVisible`, `Faq`, `Tiles`, `Reviews`, `Clients`, `Calculator`, `Contacts`, `Map`, `Footer`.
- **Новые компоненты — маленькие и по папкам** (`components/Pricing/PricingCards.tsx` + `PricingCard.tsx`), один файл — одна ответственность, вёрстка на Tailwind-классах проекта (цвета только из палитры `tailwind.config.js`).
- **Никакого нового `dangerouslySetInnerHTML`** — кроме уже существующих мест (hero-заголовки из Contentful, JSON-LD).
- Below-the-fold секции подключаем через `next/dynamic` с `ssr: true`, как на главной.
- Комментарии — на русском/украинском по месту, как в остальном коде: зачем, а не что.

## Шаг 1. Каркас страниц

Общий компонент лендинга + две тонкие страницы:

```
components/Landing/LandingPage.tsx   — композиция секций, только props
pages/fop.tsx                        — getStaticProps + NextSeo + <LandingPage …>
pages/tov.tsx                        — то же
pages/index.tsx                      — остаётся главной, переезжает на тот же LandingPage
```

Пропсы `LandingPage` (данные + слоты, без флагов страницы):

| Проп                | Тип                | Назначение                                              |
| ------------------- | ------------------ | ------------------------------------------------------- |
| `slide`             | `IHero`            | hero-запись страницы                                    |
| `advantages`        | `IAdvantages`      | счётчики под hero                                       |
| `support`           | `ISupport \| null` | блок «Супровід»; на главной `null` — секция не рендерится |
| `tiles`             | `ITiles`           | «Кому корисні»                                          |
| `pricing`           | `ReactNode`        | слот: `<Table>` на главной, `<PricingCards>` на /fop, /tov |
| `reviews/clients`   | —                  | без изменений                                           |
| `faq`               | `IFAQ`             | свой набор на каждой странице                           |
| `withQuestions`     | `boolean`          | блок «Залишились питання»: `true` только на главной      |

Порядок секций внутри — по таблице из ТЗ: Hero → Support → Tiles → Pricing → Reviews → Clients → Calculator → Faq → Contacts → Map → (Questions) → Footer → Confirmation.

Риск: главная не должна измениться визуально. Поэтому шаг делаем первым и отдельным коммитом — сравнить главную до/после.

## Шаг 2. Данные: один загрузчик на три страницы

`utils/landing-data.ts`:

- Константа `ENTRY_IDS` (advantages, tiles, clients, reviews + по странице: `hero`, `faq`, `pricing`).
- `getLandingData({ heroId, faqId })` — все запросы через `Promise.all` вместо текущих последовательных `await` (заодно ускорит билд).
- Возврат типизированного объекта; страницы только раскладывают его по пропсам.

**Важно по hero:** сейчас главная тянет `getEntries({ content_type: 'hero' })` — все записи. Как только появятся hero-записи для ФОП и ТОВ, они попадут в выборку главной. Поэтому все три страницы переводим на `getEntry(id)`, а `HeroSwiper` принимает одну запись (`slide: IHero`) вместо массива — сортировка по `slide` там уже не нужна, слайдера нет.

## Шаг 3. Hero (R1)

- Компоненты **не меняем**: `HeroSwiper` (кроме пропа выше) и `SlideOne` — кнопки те же («Розрахувати вартість» → `scrollToId('calc')` + телефон), тексты и фото приходят из Contentful.
- Contentful (в конце работ): 2 новые записи типа `hero` (ФОП и ТОВ) с текстами из R1.1/R1.2. **Фото — тот же asset, что на главной** (переиспользуем ссылку, новых загрузок не нужно). До этого тексты берём из констант, чтобы не блокировать вёрстку.

## Шаг 4. Блок «Супровід» (R2)

- Компонент **написан заранее и лежит в `archive/`**: вернуть `archive/components/Support/` → `components/Support/`, `archive/constants/support.const.ts` → `constants/`, `archive/interfaces/support.interface.ts` → `interfaces/`. Данные — `FOP_SUPPORT` / `TOV_SUPPORT`, обе раскладки (`grid` / `split`) уже реализованы.
- Подключаем в `LandingPage` через проп `support`; на главной не выводится.
- Проверить: CTA открывает модалку (соответствует правилу CTA из ТЗ), якорь `id="support"` ни с чем не конфликтует, фиолетовый акцент на /tov.

## Шаг 5. Цены карточками (R4) — новый компонент

Старый `Table` с вкладками остаётся **только на главной**, не трогаем. Новое:

```
components/Pricing/PricingCards.tsx   — секция: чип, H2, подзаголовок, бейджи, сетка карточек, notes, полоса + CTA
components/Pricing/PricingCard.tsx    — одна карточка (сумма, период, опционально список услуг)
interfaces/pricing.interface.ts       — IPricing, IPricingCard, IPricingNote
constants/pricing.const.ts            — FOP_PRICING / TOV_PRICING (для вёрстки, до создания content type)
```

- Секция обязана сохранить `id="prices"` — на него ведёт пункт меню.
- CTA под карточками → `scrollToId('calc')` (кнопка обещает расчёт).
- Раскладки: /fop — 3 карточки в ряд + 2 строки условий, на мобильной горизонтальные строки; /tov — 2 карточки в ряд + третья на всю ширину (список услуг слева, цена справа). Разница описывается данными (`items`, `wide`), а не отдельными компонентами.
- Мобильные варианты текстов — поля `subtitleMobile` / `footerTextMobile`, показ через `md:hidden` / `hidden md:inline` (тот же приём, что в `Support`).
- Contentful: новый content type `pricingCards` (поля — в R4.3), 2 записи, подключение по entry ID. Порядок: сначала вёрстка на константах, потом переключение источника на Contentful одной правкой в `getStaticProps`.

## Шаг 6. FAQ (R7)

- Компонент `Faq` **без изменений** — он уже принимает `title`, `subtitle`, `faqs`, `ctaTitle`, `ctaText` и сам отдаёт JSON-LD `FAQPage`.
- Contentful (в конце работ): 10 записей `faq` для /fop, 12 для /tov + 2 записи `faQs`, которые на них ссылаются. До этого — те же тексты из констант, форма данных совпадает с `IFAQ`.
- Текст кнопки внутри FAQ — общий на все страницы, менять не нужно.
- Дубль JSON-LD на главной **уже убран** (`pages/index.tsx`).

## Шаг 7. Навигация (R9)

Новые компоненты:

```
components/Header/ServicesDropdown.tsx  — десктопный пункт «Послуги» ▾
components/Header/MobileMenuGroup.tsx   — та же группа в гамбургере (аккордеон)
utils/nav.utils.ts                      — isLandingPath(pathname)
```

- `constants/links.const.ts`: убрать `clients`; первым пунктом «Послуги» с вложенным списком (расширить `ILink` полем `children?: ILink[]`); остальные пункты как есть.
- `ServicesDropdown`: открытие по hover и по клику/Enter, закрытие по Esc, клику вне (`useEffect` + `ref`) и при переходе; `aria-haspopup="menu"`, `aria-expanded`, навигация стрелками; активное состояние, когда открыт `/fop` или `/tov`.
- `MobileMenuGroup`: раскрывающийся пункт в стиле текущего гамбургера (те же отступы и типографика). **Гамбургер остаётся `div`** — обёртка в `<button>` ломала рендер, не переделывать.
- Локальные якоря: в `LinkItem`, `MobileMenu`, `Footer` заменить `pathname === '/'` на `isLandingPath(pathname)` (`/`, `/fop`, `/tov`). С `/blog` и `/services/*` поведение прежнее — переход на главную.
- Футер: `splice(4, 1)` → `LINKS.filter((l) => l.id !== 'faq')`; «Послуги» разворачиваем в два плоских пункта ФОП и ТОВ.
- Мобильную раскладку показать скриншотом на согласование (отдельного макета нет).

## Шаг 8. Аналитика (R10)

```
utils/analytics.ts   — pushEvent(event, payload), getPageType(pathname)
```

- `ContactForm` получает проп `location: 'call_modal' | 'calculator' | 'questions'` и пушит его вместе с `page_type` / `page_path` (тип страницы — из `useRouter`, не хардкодом).
- Имя события успешной отправки **не меняем** — остаётся `form_success` (в GTM/Ads на него настроены цели), добавляем только параметры.
- События CTA: hero, блок цен, блок «Супровід», открытие модалки; ошибка отправки формы.
- Проверка в GTM Preview после релиза.

## Шаг 9. SEO и sitemap (R11)

- `pages/fop.tsx` / `pages/tov.tsx`: `NextSeo` с согласованными title/description из R11, canonical `https://wisexpert.com.ua/fop|/tov`, OG — по паттерну `services/[slug].tsx`.
- `pages/sitemap.xml.tsx`: добавить `/fop` и `/tov` в `staticUrls` **и в `catch`-ветку** (перечень там дублируется), priority 0.9, changefreq weekly.

## Шаг 10. Проверка

- `npx tsc --noEmit` и `npm run build` — три страницы генерируются, главная без визуальных изменений (сравнить скриншоты до/после шага 1).
- Прогон по правилу CTA: hero и кнопка под ценами → скролл к калькулятору; «Супровід», FAQ, хедер → модалка.
- Навигация: якоря скроллят внутри /fop и /tov, дропдаун на десктопе (мышь + клавиатура), аккордеон в гамбургере, футер без «Клієнти», FAQ на месте.
- Мобильная: hero с фиксированной высотой не трогать (Android vh-баг), проверить карточки цен и «Супровід» на 360px.
- Lighthouse на /fop (LCP — hero-картинка, preload уже есть в `SlideOne`).
- Формы с новых страниц реально доходят в Telegram; в `dataLayer` видно `page_type` и `form_location`.
- Секции `WhyUs`, `TaxYear`, `TrueCost` и временная страница превью лежат в `archive/`, в сборку не попадают и на страницах не подключаются.

## Порядок работ

**Сначала весь код на константах, Contentful — в конце.** Это решение: пока компоненты не готовы, структура полей может меняться, и переделывать content type дважды не нужно.

1. Шаг 1–2: `LandingPage` + `landing-data`, главная переезжает на них без визуальных изменений (отдельный коммит).
2. `pages/fop.tsx`, `pages/tov.tsx` + возврат `Support` из `archive/` + SEO. Hero-тексты временно из констант.
3. `PricingCards` на `constants/pricing.const.ts`, подключение вместо `Table` на новых страницах.
4. FAQ на константах (тексты из R7.1/R7.2).
5. Навигация: дропдаун, гамбургер, футер, локальные якоря.
6. Аналитика.
7. Sitemap.
8. Build, прогон по чек-листу шага 10, скриншоты мобильного меню на согласование.
9. **Contentful в самом конце**: content type `pricingCards`, записи `hero`, `faq`/`faQs`; источник данных переключается правкой в `getStaticProps`, вёрстка не меняется.
10. Сверка цен из макета с текущей таблицей — после реализации, правится в записях без релиза.

## Решено

- Наполнение Contentful — после реализации компонентов (п. 9 выше).
- Цены сверяем после реализации.
- Событие `form_success` не переименовываем.
- Фото hero — одно и то же на всех трёх страницах.
