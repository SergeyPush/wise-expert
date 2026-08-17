import React, { useEffect, useState } from 'react';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import { useInView } from '@/hooks/useInView';
import { useGlobalContext } from '@/context/GlobalContext';
import { mono } from '@/styles/fonts';
import { ITaxYear } from '@/interfaces/tax-year.interface';
import { MONTHS_FULL, MONTHS_SHORT } from '@/constants/tax-year.const';

interface TaxYearProps {
  data: ITaxYear;
}

const MONTH_INDEXES = Array.from({ length: 12 }, (_, i) => i + 1);

const TaxYear = ({ data }: TaxYearProps) => {
  const { setBookCallIsVisible } = useGlobalContext();
  const { ref: sectionRef, inView } = useInView(0.1);

  // 0 = нічого не вибрано. Поточний місяць проставляємо після монтування,
  // інакше SSG-розмітка (місяць збірки) не збіжиться з клієнтською.
  const [activeMonth, setActiveMonth] = useState(0);
  useEffect(() => setActiveMonth(new Date().getMonth() + 1), []);

  // Обов'язки, згруповані по місяцях: [{month, duties}]
  const byMonth = MONTH_INDEXES.map((month) => ({
    month,
    duties: data.duties.filter((duty) => duty.months.includes(month)),
  }));

  const activeDuties = byMonth[activeMonth - 1]?.duties ?? [];
  const totalDuties = byMonth.reduce((sum, m) => sum + m.duties.length, 0);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="why-us"
      className="relative overflow-hidden bg-color-black py-16 md:py-24"
    >
      {/* М'яке синє свічення за календарем */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-color-blue/20 blur-[120px]"
      />

      <Wrapper>
        <div className="relative">
          {/* Заголовок: h2 ліворуч, підводка праворуч по нижньому краю */}
          <p
            className={`${mono.className} mb-4 text-xs uppercase tracking-[0.2em] text-color-blue-light`}
          >
            {data.eyebrow}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-10">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-color-white md:col-span-7 md:text-4xl lg:text-5xl">
              {data.title}
            </h2>
            <p className="text-base leading-relaxed text-color-white/60 md:col-span-5 md:text-lg">
              {data.subtitle}
            </p>
          </div>

          {/* Календар: висота стовпчика = навантаження місяця */}
          <div className="mt-12 md:mt-16">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <p className={`${mono.className} text-xs text-color-white/40`}>
                {data.legend}
              </p>
              <p className={`${mono.className} text-xs text-color-white/40`}>
                {totalDuties} дат на рік
              </p>
            </div>

            {/* items-end: висота стовпчика = кількість обов'язків, без порожнього повітря */}
            <div className="mt-4 grid grid-cols-12 items-end gap-x-1 border-b border-color-white/15 md:gap-x-3">
              {byMonth.map(({ month, duties }, monthIdx) => {
                const isActive = month === activeMonth;
                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => setActiveMonth(month)}
                    aria-pressed={isActive}
                    aria-label={`${MONTHS_FULL[monthIdx]}: ${duties.length} обов'язків`}
                    className="group flex min-h-[44px] flex-col justify-end pb-3"
                  >
                    <span className="flex flex-col-reverse items-center gap-1.5 md:gap-2">
                      {duties.map((duty, dutyIdx) => (
                        <span
                          key={duty.label}
                          style={{
                            transitionDelay: inView
                              ? `${monthIdx * 45 + dutyIdx * 35}ms`
                              : '0ms',
                          }}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-500 motion-reduce:transition-none md:h-3 md:w-3 ${
                            inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                          } ${
                            isActive
                              ? 'bg-color-blue-light'
                              : 'bg-color-white/25 group-hover:bg-color-white/50'
                          }`}
                        />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Підписи місяців під базовою лінією */}
            <div className="grid grid-cols-12 gap-x-1 pt-3 md:gap-x-3">
              {byMonth.map(({ month }, monthIdx) => (
                <span
                  key={month}
                  className={`${mono.className} text-center text-[10px] uppercase transition-colors md:text-xs ${
                    month === activeMonth
                      ? 'text-color-white'
                      : 'text-color-white/35'
                  }`}
                >
                  {MONTHS_SHORT[monthIdx]}
                </span>
              ))}
            </div>

            {/* Деталі вибраного місяця */}
            <div className="mt-8 min-h-[180px] rounded-2xl border border-color-white/10 bg-color-white/[0.03] p-5 md:p-7">
              {activeMonth === 0 ? (
                <p className="text-sm text-color-white/50">
                  Оберіть місяць, щоб побачити перелік обов’язків.
                </p>
              ) : (
                <>
                  <p
                    className={`${mono.className} mb-5 text-xs uppercase tracking-[0.15em] text-color-blue-light`}
                  >
                    {MONTHS_FULL[activeMonth - 1]}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {activeDuties.map((duty) => (
                      <li
                        key={duty.label}
                        className="flex flex-col gap-1 border-l-2 border-color-blue/60 pl-4 md:flex-row md:items-baseline md:justify-between md:gap-6"
                      >
                        <span className="text-sm font-semibold text-color-white md:text-base">
                          {duty.label}
                        </span>
                        <span
                          className={`${mono.className} shrink-0 text-xs text-color-white/50`}
                        >
                          {duty.when}
                        </span>
                      </li>
                    ))}
                    {activeDuties.length === 0 && (
                      <li className="text-sm text-color-white/50">
                        Звітів немає — місяць для роботи, а не для податкової.
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Обіцянки: тихий блок після гучного календаря */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
            {data.promises.map((promise) => (
              <div
                key={promise.title}
                className="border-t border-color-white/15 pt-5"
              >
                <p className="mb-2 text-lg font-semibold text-color-white">
                  {promise.title}
                </p>
                <p className="text-sm leading-relaxed text-color-white/55">
                  {promise.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12">
            <Button
              format="primary"
              size="wide"
              text={data.ctaText}
              onClick={() => setBookCallIsVisible(true)}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default TaxYear;
