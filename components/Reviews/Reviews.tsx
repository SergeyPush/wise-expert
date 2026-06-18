import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './Reviews.module.scss';
import type { IReviews, IReviewItem } from '@/interfaces/reviews.interface';

// oklch palette — equal lightness/chroma, varied hue per reviewer
const TINTS: Record<string, { bg: string; fg: string }> = {
  blue:   { bg: 'oklch(0.95 0.03 255)', fg: 'oklch(0.52 0.16 255)' },
  indigo: { bg: 'oklch(0.95 0.03 285)', fg: 'oklch(0.52 0.16 285)' },
  teal:   { bg: 'oklch(0.95 0.03 195)', fg: 'oklch(0.52 0.13 195)' },
  green:  { bg: 'oklch(0.95 0.03 160)', fg: 'oklch(0.52 0.13 160)' },
  amber:  { bg: 'oklch(0.95 0.035 70)', fg: 'oklch(0.55 0.13 70)'  },
  rose:   { bg: 'oklch(0.95 0.03 20)',  fg: 'oklch(0.55 0.15 20)'  },
};

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

function Avatar({ r, size = 60 }: { r: IReviewItem; size?: number }) {
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

function SphereTag({ r }: { r: IReviewItem }) {
  if (!r.sphere) return null;
  const t = TINTS[r.tint] || TINTS.blue;
  return (
    <span className={styles.tag}>
      <i className={styles.tagDot} style={{ background: t.fg }} />
      {r.sphere}
    </span>
  );
}

interface ReviewsProps {
  reviews: IReviews;
}

export default function Reviews({ reviews }: ReviewsProps) {
  const [idx, setIdx] = useState(0);
  // bump key forces card re-mount so the CSS fade animation replays on each change
  const [bump, setBump] = useState(0);
  const items = reviews.items;
  const r = items[idx];

  const go = (d: number) => {
    setIdx((p) => (p + d + items.length) % items.length);
    setBump((b) => b + 1);
  };
  // jump directly to a reviewer via thumbnail click
  const jump = (n: number) => {
    setIdx(n);
    setBump((b) => b + 1);
  };

  return (
    <section className={styles.section} id="reviews">
      <Wrapper>
        <ScrollReveal>
          <div className={styles.body}>
            <div className={styles.left}>
              <h2 className={styles.title}>{reviews.title}</h2>
              <p className={styles.lead}>{reviews.lead}</p>

              <div className={styles.rateRow}>
                <span className={styles.rateNum}>{reviews.averageRating}</span>
                <div className={styles.rateMeta}>
                  <Stars rating={5} />
                  <span className={styles.rateLabel}>
                    середня оцінка · {reviews.totalCompanies} компаній
                  </span>
                </div>
              </div>

              <div className={styles.nav}>
                <button className={styles.arrow} onClick={() => go(-1)} aria-label="Попередній">
                  <ArrowIcon dir="left" />
                </button>
                <button className={styles.arrow} onClick={() => go(1)} aria-label="Наступний">
                  <ArrowIcon dir="right" />
                </button>
                <span className={styles.count}>
                  <b>{String(idx + 1).padStart(2, '0')}</b>
                  {' / '}
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className={styles.right}>
              <article
                className={styles.card + (r.link ? ' ' + styles.cardLinked : '')}
                key={bump}
                {...(r.link ? {
                  role: 'link',
                  onClick: () => window.open(r.link, '_blank', 'noopener,noreferrer'),
                  tabIndex: 0,
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') window.open(r.link, '_blank', 'noopener,noreferrer');
                  },
                } : {})}
              >
                <span className={styles.cardMark}>
                  <QuoteIcon />
                </span>
                <Stars rating={r.rating} />
                <div className={styles.cardTag}>
                  <SphereTag r={r} />
                  {r.link && (
                    <span className={styles.googleBadge} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </span>
                  )}
                </div>
                <p className={styles.cardQuote}>{r.quote}</p>
                <div className={styles.cardAuthor}>
                  <Avatar r={r} />
                  <div>
                    <div className={styles.cardName}>{r.name}</div>
                    {(r.role || r.company) && (
                      <div className={styles.cardRole}>
                        {[r.role, r.company].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>
                </div>
              </article>

              <div className={styles.thumbs}>
                {items.map((rr: IReviewItem, n: number) => {
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
