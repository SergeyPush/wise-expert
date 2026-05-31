'use client';

import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './Reviews.module.scss';

const TINTS: Record<string, { bg: string; fg: string }> = {
  blue:   { bg: 'oklch(0.95 0.03 255)', fg: 'oklch(0.52 0.16 255)' },
  indigo: { bg: 'oklch(0.95 0.03 285)', fg: 'oklch(0.52 0.16 285)' },
  teal:   { bg: 'oklch(0.95 0.03 195)', fg: 'oklch(0.52 0.13 195)' },
  green:  { bg: 'oklch(0.95 0.03 160)', fg: 'oklch(0.52 0.13 160)' },
  amber:  { bg: 'oklch(0.95 0.035 70)', fg: 'oklch(0.55 0.13 70)'  },
  rose:   { bg: 'oklch(0.95 0.03 20)',  fg: 'oklch(0.55 0.15 20)'  },
};

const REVIEWS = [
  {
    name: 'Олена Кравченко', role: 'Засновниця', company: 'IT-студія Nordwave',
    sphere: 'IT + ДІЯ.City', tint: 'blue', rating: 5,
    quote: 'Перевели команду на ДІЯ.City разом з WisExpert — оформили резидентство швидко й без зайвого стресу. Податки оптимізували легально, звітність завжди вчасно, питань від ДПС не виникало жодного разу.',
  },
  {
    name: 'Андрій Мельник', role: 'ФОП 3 групи', company: 'Магазин «Сезон»',
    sphere: 'Роздрібна торгівля', tint: 'green', rating: 5,
    quote: 'Раніше плутався з ПРРО і дедлайнами по єдиному податку. Тепер усе автоматизовано: мені просто приходить нагадування, скільки і коли сплатити. Економлю купу часу й нервів.',
  },
  {
    name: 'Ірина Бондаренко', role: 'Фінансовий директор', company: 'ТОВ «Стандарт-Пак»',
    sphere: 'Виробництво', tint: 'indigo', rating: 5,
    quote: 'Налаштували управлінський облік по нашій продукції й порахували реальну собівартість. Завдяки цьому ми побачили, де втрачали маржу, і за квартал вирівняли показники.',
  },
  {
    name: 'Сергій Ткаченко', role: 'Власник мережі', company: 'Кав\'ярні «Друкарня»',
    sphere: 'HORECA', tint: 'amber', rating: 5,
    quote: 'Відкривали другу точку — допомогли з усіма дозволами та обліком «під ключ». Реагують на запити того ж дня, інколи навіть у вихідні. Відчуття, що бухгалтерія завжди поруч.',
  },
  {
    name: 'Наталія Шевченко', role: 'Директорка', company: 'ТОВ «Опт-Лідер»',
    sphere: 'Оптова торгівля', tint: 'teal', rating: 5,
    quote: 'Працюємо у власній системі — інтеграцію зробили без проблем, документообіг із контрагентами став прозорим. ПДВ і акти тепер закриваються вчасно, без нічних авралів.',
  },
  {
    name: 'Дмитро Коваль', role: 'Засновник', company: 'Сервіс «Майстер Поруч»',
    sphere: 'Послуги', tint: 'rose', rating: 5,
    quote: 'Починали як зовсім маленький бізнес — тариф від 500 грн був рятівним. Виросли в команду з 12 людей, і WisExpert зростав разом з нами. Жодного разу не пошкодував про вибір.',
  },
];

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('');
}

function StarIcon({ on = true }: { on?: boolean }) {
  return (
    <svg
      className={styles.star + (on ? '' : ' ' + styles.starOff)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.6l2.74 5.96 6.51.66-4.86 4.4 1.36 6.42L12 17.9l-5.75 3.14 1.36-6.42-4.86-4.4 6.51-.66z" />
    </svg>
  );
}

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} з 5`}>
      {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} on={i < rating} />)}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className={styles.quoteIcon}>
      <path d="M19 8c-6.6 2.2-11 7.8-11 16.6V40h15V25H12.6c0-5.6 2.4-8.8 7.4-10.4L19 8zm21 0c-6.6 2.2-11 7.8-11 16.6V40h15V25H33.6c0-5.6 2.4-8.8 7.4-10.4L40 8z" />
    </svg>
  );
}

function ArrowIcon({ dir = 'right' }: { dir?: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Avatar({ r, size = 60 }: { r: typeof REVIEWS[0]; size?: number }) {
  const t = TINTS[r.tint] || TINTS.blue;
  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, background: t.bg, color: t.fg }}
    >
      {initials(r.name)}
    </div>
  );
}

function SphereTag({ r }: { r: typeof REVIEWS[0] }) {
  const t = TINTS[r.tint] || TINTS.blue;
  return (
    <span className={styles.tag}>
      <i className={styles.tagDot} style={{ background: t.fg }} />
      {r.sphere}
    </span>
  );
}

export default function Reviews() {
  const [idx, setIdx] = useState(0);
  const [bump, setBump] = useState(0);
  const r = REVIEWS[idx];

  const go = (d: number) => {
    setIdx((p) => (p + d + REVIEWS.length) % REVIEWS.length);
    setBump((b) => b + 1);
  };
  const jump = (n: number) => {
    setIdx(n);
    setBump((b) => b + 1);
  };

  return (
    <section className={styles.section} id="reviews">
      <Wrapper>
        <ScrollReveal>
          <div className={styles.body}>
            {/* Left column — heading + controls */}
            <div className={styles.left}>
              <h2 className={styles.title}>
                Реальні історії наших клієнтів
              </h2>
              <p className={styles.lead}>
                Ми поруч на кожному етапі — від реєстрації до масштабування. Ось що про це кажуть власники бізнесу.
              </p>

              <div className={styles.rateRow}>
                <span className={styles.rateNum}>4.9</span>
                <div className={styles.rateMeta}>
                  <Stars rating={5} />
                  <span className={styles.rateLabel}>середня оцінка · 200+ компаній</span>
                </div>
              </div>

              <div className={styles.nav}>
                <button
                  className={styles.arrow}
                  onClick={() => go(-1)}
                  aria-label="Попередній"
                >
                  <ArrowIcon dir="left" />
                </button>
                <button
                  className={styles.arrow}
                  onClick={() => go(1)}
                  aria-label="Наступний"
                >
                  <ArrowIcon dir="right" />
                </button>
                <span className={styles.count}>
                  <b>{String(idx + 1).padStart(2, '0')}</b>
                  {' / '}
                  {String(REVIEWS.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Right column — featured card + thumbnails */}
            <div className={styles.right}>
              <article className={styles.card} key={bump}>
                <span className={styles.cardMark}>
                  <QuoteIcon />
                </span>
                <Stars rating={r.rating} />
                <div className={styles.cardTag}>
                  <SphereTag r={r} />
                </div>
                <p className={styles.cardQuote}>{r.quote}</p>
                <div className={styles.cardAuthor}>
                  <Avatar r={r} />
                  <div>
                    <div className={styles.cardName}>{r.name}</div>
                    <div className={styles.cardRole}>{r.role} · {r.company}</div>
                  </div>
                </div>
              </article>

              <div className={styles.thumbs}>
                {REVIEWS.map((rr, n) => {
                  const tt = TINTS[rr.tint] || TINTS.blue;
                  return (
                    <button
                      key={n}
                      className={styles.thumb + (n === idx ? ' ' + styles.thumbActive : '')}
                      style={{ background: tt.bg, color: tt.fg }}
                      onClick={() => jump(n)}
                      aria-label={rr.name}
                    >
                      {initials(rr.name)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Wrapper>
    </section>
  );
}
