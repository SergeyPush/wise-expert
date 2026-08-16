import React from 'react';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import PricingCard from '@/components/Pricing/PricingCard';
import { useInView } from '@/hooks/useInView';
import { scrollToId } from '@/utils/scroll.utils';
import { IPricing, PricingAccent } from '@/interfaces/pricing.interface';

interface PricingCardsProps {
  data: IPricing;
}

// Классы прописаны целиком: Tailwind не видит строки, собранные конкатенацией
const CHIP: Record<PricingAccent, string> = {
  blue: 'bg-color-light-blue text-color-blue-dark',
  violet: 'bg-color-light-violet text-color-violet-dark',
};

const TITLE_ACCENT: Record<PricingAccent, string> = {
  blue: 'text-color-blue',
  violet: 'text-color-violet',
};

const NOTE_VALUE: Record<PricingAccent, string> = {
  blue: 'text-color-blue-dark',
  violet: 'text-color-violet-dark',
};

const CTA_FORMAT: Record<PricingAccent, 'primary' | 'primary-violet'> = {
  blue: 'primary',
  violet: 'primary-violet',
};

const GRID: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
};

/**
 * Цены карточками для /fop и /tov (R4). Вместо таблицы с вкладками, которая
 * осталась на главной: у ФОП три группы в ряд, у ТОВ два тарифа плюс широкая
 * карточка кадрового учёта.
 *
 * Кнопка под карточками скроллит к калькулятору — по правилу CTA расчёт
 * обещают только hero и этот блок.
 */
const PricingCards = ({ data }: PricingCardsProps) => {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="prices"
      className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24"
    >
      <Wrapper>
        <div className="mb-10 flex flex-col items-start gap-4 text-left md:mb-12 md:items-center md:text-center">
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              CHIP[data.accent]
            }`}
          >
            {data.kicker}
          </span>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-color-black md:text-4xl lg:text-5xl">
            {data.title}
            <span className={TITLE_ACCENT[data.accent]}>{data.titleAccent}</span>
            {data.titleTail}
          </h2>

          {/* дисклеймер про залежність вартості живёт в подзаголовке */}
          <p className="max-w-3xl text-base leading-relaxed text-color-muted md:text-lg">
            {data.subtitleMobile ? (
              <>
                <span className="md:hidden">{data.subtitleMobile}</span>
                <span className="hidden md:inline">{data.subtitle}</span>
              </>
            ) : (
              data.subtitle
            )}
          </p>

          <ul className="flex flex-wrap gap-2 md:justify-center">
            {data.badges.map((badge, idx) => (
              <li
                key={badge}
                // третий и дальше не влезают в строку на мобильной
                className={`rounded-full border border-color-border bg-color-light-gray px-3 py-1.5 text-xs font-medium text-color-muted md:text-sm ${
                  idx > 1 ? 'hidden md:block' : ''
                }`}
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className={`grid grid-cols-1 gap-4 lg:gap-5 ${GRID[data.columns]}`}>
          {data.cards.map((card, idx) => (
            <PricingCard
              key={card.title}
              card={card}
              accent={data.accent}
              index={idx}
              inView={inView}
            />
          ))}
        </div>

        {data.notes && (
          <dl className="mt-4 flex flex-col gap-3 lg:mt-5">
            {data.notes.map((note) => (
              <div
                key={note.title}
                className="flex flex-col gap-1 rounded-2xl border border-color-border bg-color-light-gray p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-sm font-semibold text-color-black md:text-base">
                  {note.title}
                </dt>
                <dd
                  className={`text-sm font-semibold md:text-base ${
                    NOTE_VALUE[data.accent]
                  }`}
                >
                  {note.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex flex-col items-stretch gap-5 rounded-2xl border border-color-border bg-color-white p-6 shadow-soft md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
          <p className="max-w-2xl text-base leading-relaxed text-color-muted">
            {data.footerTextMobile ? (
              <>
                <span className="md:hidden">{data.footerTextMobile}</span>
                <span className="hidden md:inline">{data.footerText}</span>
              </>
            ) : (
              data.footerText
            )}
          </p>
          <Button
            format={CTA_FORMAT[data.accent]}
            size="wide"
            text={data.ctaText}
            className="shrink-0 whitespace-nowrap"
            onClick={() => scrollToId('calc')}
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default PricingCards;
