import React from 'react';
import { IPricingCard, PricingAccent } from '@/interfaces/pricing.interface';

interface PricingCardProps {
  card: IPricingCard;
  accent: PricingAccent;
  /** Порядковый номер — для лесенки появления, как в секции «Супровід» */
  index: number;
  inView: boolean;
}

// Классы прописаны целиком: Tailwind не видит строки, собранные конкатенацией
const AMOUNT: Record<PricingAccent, string> = {
  blue: 'text-color-blue',
  violet: 'text-color-violet',
};

const CARD_HOVER: Record<PricingAccent, string> = {
  blue: 'hover:border-color-blue-light/40',
  violet: 'hover:border-color-violet/30',
};

const MARKER: Record<PricingAccent, string> = {
  blue: 'bg-color-blue',
  violet: 'bg-color-violet',
};

/** Одна карточка тарифа. Широкая (`wide`) кладёт список услуг слева, цену справа */
const PricingCard = ({ card, accent, index, inView }: PricingCardProps) => {
  const price = (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {card.prefix && (
        <span className="text-base font-medium text-color-muted">
          {card.prefix}
        </span>
      )}
      <span
        className={`text-3xl font-extrabold tracking-tight md:text-4xl ${AMOUNT[accent]}`}
      >
        {card.amount}
      </span>
      {card.period && (
        <span className="text-sm font-medium text-color-muted md:text-base">
          {card.period}
        </span>
      )}
    </p>
  );

  return (
    <article
      style={{ transitionDelay: inView ? `${index * 90}ms` : '0ms' }}
      className={`rounded-2xl border border-color-border bg-color-white p-6 shadow-soft transition-all duration-500 motion-reduce:transition-none md:p-7 hover:-translate-y-1 hover:shadow-elevated ${
        CARD_HOVER[accent]
      } ${card.wide ? 'sm:col-span-2' : ''} ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      <div
        className={
          card.wide
            ? 'flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10'
            : // на мобильной карточка — горизонтальная строка: назва ліворуч, ціна праворуч
              'flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start lg:gap-5'
        }
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-color-black md:text-xl">
            {card.title}
          </h3>
          {card.description && (
            <p className="text-sm leading-relaxed text-color-muted md:text-base">
              {card.description}
            </p>
          )}
          {card.items && (
            <ul className="mt-2 flex flex-col gap-2">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-color-muted md:text-base"
                >
                  <span
                    aria-hidden
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${MARKER[accent]}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1 text-right md:items-start md:text-left lg:items-start lg:text-left">
          {price}
          {card.note && (
            <span className="text-sm text-color-muted">{card.note}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default PricingCard;
