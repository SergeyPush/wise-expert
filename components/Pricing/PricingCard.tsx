import React from 'react';
import PricingIcon from '@/components/Pricing/icons';
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

const ICON_BG: Record<PricingAccent, string> = {
  blue: 'bg-color-light-blue text-color-blue',
  violet: 'bg-color-light-violet text-color-violet',
};

const GROUP_SEP: Record<PricingAccent, string> = {
  blue: 'bg-color-blue-light/40',
  violet: 'bg-color-violet/30',
};

const GROUP_PILL: Record<PricingAccent, string> = {
  blue: 'bg-color-light-blue text-color-blue-dark',
  violet: 'bg-color-light-violet text-color-violet-dark',
};

const PLUS_BADGE: Record<PricingAccent, string> = {
  blue: 'bg-color-light-blue text-color-blue-dark',
  violet: 'bg-color-light-violet text-color-violet-dark',
};

// Ціна в макеті — число й валюта різного розміру/кольору, а не один рядок
const splitAmount = (amount: string): [string, string] => {
  const idx = amount.lastIndexOf(' ');
  return idx === -1 ? [amount, ''] : [amount.slice(0, idx), amount.slice(idx + 1)];
};

/**
 * Одна карточка тарифу. Три варіанти вёрстки, як у макеті:
 * — `group` (ФОП): великий номер групи по центру, ціна пігулкою;
 * — `wide` (ТОВ, кадровий облік): список ліворуч, ціна праворуч за роздільником;
 * — звичайна: іконка, заголовок, ціна рядком.
 */
const PricingCard = ({ card, accent, index, inView }: PricingCardProps) => {
  const transitionStyle = { transitionDelay: inView ? `${index * 90}ms` : '0ms' };
  const baseCard = `rounded-2xl border border-color-border bg-color-white shadow-soft transition-all duration-500 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-elevated ${
    CARD_HOVER[accent]
  } ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`;

  // ФОП: велика цифра групи по центру, на мобільній — горизонтальний рядок
  if (card.group) {
    const [amt, cur] = splitAmount(card.amount);
    return (
      /* Відступи виміряні по макету (не рівномірний gap): щільно біля номера групи,
         просторіше перед роздільником і пігулкою періоду */
      /* mt-0 на мобільних дітях: глобальний ресет (`article > * + *`) вішає кожному
         прямому нащадку article margin-top:1em — для колонки на десктопі це навмисно
         перебито своїми md:mt-*, а для мобільного рядка забули, тому items-center
         центрував уже роздутий invisible-margin box, і контент «тонув» до низу картки */
      <article style={transitionStyle} className={`${baseCard} flex flex-row items-center gap-3 px-4 py-4 text-left md:flex-col md:items-center md:gap-0 md:px-6 md:pt-6 md:pb-6 md:text-center`}>
        <span className="hidden text-xs font-bold uppercase tracking-[2px] text-color-muted md:block">
          {card.group.label}
        </span>
        <span className={`mt-0 text-4xl font-extrabold leading-none tracking-tight md:mt-4 md:text-5xl md:tracking-[-2px] ${AMOUNT[accent]}`}>
          {card.group.number}
        </span>
        <span className="mt-0 text-xs font-bold uppercase tracking-wide text-color-muted md:hidden">
          {card.group.unit}
        </span>
        <span className="hidden text-xs font-bold uppercase tracking-[2px] text-color-muted md:mt-5 md:block">
          {card.group.unit}
        </span>
        <span className={`hidden h-0.5 w-14 rounded-full md:mt-3.5 md:block ${GROUP_SEP[accent]}`} />
        <span className="ml-auto mt-0 flex items-baseline gap-1.5 md:ml-0 md:mt-3">
          <span className="text-2xl font-extrabold tracking-tight text-color-black md:text-3xl">{amt}</span>
          {cur && <span className="text-sm font-bold text-color-muted md:text-sm">{cur}</span>}
        </span>
        {card.period && (
          // min-w на мобільній: «/ місяць» і «/ квартал» різної ширини, без
          // фіксованої ширини пігулка зсуває ціну (ml-auto) і цифри «стрибають» між картками
          <span className={`mt-0 shrink-0 rounded-full px-3 py-1.5 text-center text-xs font-bold md:mt-3.5 md:w-auto md:min-w-0 md:px-5 md:py-1.5 md:text-lg ${GROUP_PILL[accent]} min-w-[92px]`}>
            {card.period}
          </span>
        )}
      </article>
    );
  }

  const [amt, cur] = splitAmount(card.amount);
  const price = (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {card.prefix && (
        <span className="text-base font-medium text-color-muted">{card.prefix}</span>
      )}
      <span className={`text-3xl font-extrabold tracking-tight md:text-4xl ${AMOUNT[accent]}`}>{amt}</span>
      {cur && <span className="text-sm font-medium text-color-muted md:text-base">{cur}</span>}
    </p>
  );

  return (
    <article
      style={transitionStyle}
      className={`${baseCard} p-6 md:p-7 ${card.wide ? 'sm:col-span-2' : ''}`}
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
          {card.icon && !card.wide && (
            <span className={`mb-1 grid h-11 w-11 place-items-center rounded-xl ${ICON_BG[accent]}`}>
              <PricingIcon name={card.icon} className="h-5 w-5" />
            </span>
          )}
          {card.wide ? (
            <h3 className="flex items-center gap-3 text-lg font-bold leading-snug tracking-tight text-color-black md:text-xl">
              {card.icon && (
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${ICON_BG[accent]}`}>
                  <PricingIcon name={card.icon} className="h-5 w-5" />
                </span>
              )}
              {card.title}
            </h3>
          ) : (
            <h3 className="text-lg font-bold leading-snug tracking-tight text-color-black md:text-xl">
              {card.title}
            </h3>
          )}
          {card.description && (
            <p className="text-sm leading-relaxed text-color-muted md:text-base">
              {card.description}
            </p>
          )}
          {card.items && (
            <ul className="mt-2 flex flex-col gap-3">
              {card.items.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-sm leading-relaxed text-color-muted md:text-base"
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${ICON_BG[accent]}`}>
                    <PricingIcon name={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="pt-1">{item.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={
            card.wide
              ? `flex shrink-0 flex-col gap-3 border-t border-color-border pt-6 md:min-w-[220px] md:border-l md:border-t-0 md:pl-9 md:pt-0`
              : 'flex shrink-0 flex-col items-end gap-1 text-right md:items-start md:text-left lg:items-start lg:text-left'
          }
        >
          {price}
          {/* підпис під ціною показуємо тільки у wide-картці (кадровий облік) —
             у звичайних картках макет ціну підписом не супроводжує */}
          {card.wide && card.period && (
            <span className="text-sm text-color-muted">{card.period}</span>
          )}
          {card.note && <span className="text-sm text-color-muted">{card.note}</span>}
          {card.plus && (
            <span className={`flex w-fit items-baseline gap-1.5 rounded-2xl px-4 py-2.5 ${PLUS_BADGE[accent]}`}>
              <span className="text-lg font-extrabold tracking-tight md:text-2xl">{card.plus.amount}</span>
            </span>
          )}
          {card.plus && <span className="text-sm text-color-muted">{card.plus.caption}</span>}
        </div>
      </div>
    </article>
  );
};

export default PricingCard;
