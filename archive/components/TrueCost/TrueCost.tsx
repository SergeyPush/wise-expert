import React from 'react';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import { useInView } from '@/hooks/useInView';
import { useGlobalContext } from '@/context/GlobalContext';
import { mono } from '@/styles/fonts';
import { ITrueCost } from '@/interfaces/true-cost.interface';

interface TrueCostProps {
  data: ITrueCost;
}

// Колір фону секції; дублюється в градієнті «зубчиків» чека нижче,
// тому винесений у константу — міняти в двох місцях одночасно
const SECTION_BG = '#EFF6FF'; // color-light-blue

const TrueCost = ({ data }: TrueCostProps) => {
  const { setBookCallIsVisible } = useGlobalContext();
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="true-cost"
      className="bg-color-light-blue py-16 md:py-24"
    >
      <Wrapper>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
          {/* Ліворуч: теза і зняті заперечення */}
          <div className="md:col-span-5">
            <p
              className={`${mono.className} mb-4 text-xs uppercase tracking-[0.2em] text-color-blue`}
            >
              {data.eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-color-black md:text-4xl">
              {data.title}
            </h2>
            <p className="mb-10 text-base leading-relaxed text-color-muted md:text-lg">
              {data.subtitle}
            </p>

            <ul className="flex flex-col gap-6">
              {data.guarantees.map((item) => (
                <li
                  key={item.title}
                  className="border-l-2 border-color-blue/60 pl-4"
                >
                  <p className="mb-1 font-semibold text-color-black">
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed text-color-muted">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button
                format="primary"
                size="wide"
                text={data.ctaText}
                onClick={() => setBookCallIsVisible(true)}
              />
            </div>
          </div>

          {/* Праворуч: чек */}
          <div className="md:col-span-7">
            <div className="mx-auto max-w-xl shadow-elevated">
              <div className="rounded-t-2xl bg-color-white px-6 pb-8 pt-8 md:px-9 md:pb-10 md:pt-10">
                {/* Шапка чека */}
                <div className="mb-7 border-b border-dashed border-color-gray pb-5">
                  <p
                    className={`${mono.className} text-xs uppercase tracking-[0.15em] text-color-black`}
                  >
                    {data.receiptTitle}
                  </p>
                  <p className={`${mono.className} mt-1 text-xs text-color-muted`}>
                    {data.receiptMeta}
                  </p>
                </div>

                {/* Рядки: «друкуються» каскадом при появі секції */}
                <ul className="flex flex-col gap-5">
                  {data.items.map((item, idx) => (
                    <li
                      key={item.label}
                      style={{
                        transitionDelay: inView ? `${idx * 90}ms` : '0ms',
                      }}
                      className={`transition-all duration-500 motion-reduce:transition-none ${
                        inView
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-semibold text-color-black md:text-base">
                          {item.label}
                        </span>
                        {/* Крапкова лінія-заповнювач, як у паперовому рахунку */}
                        <span className="mb-1 flex-1 border-b border-dotted border-color-gray" />
                        <span
                          className={`${mono.className} shrink-0 text-sm text-color-black md:text-base`}
                        >
                          {item.amount}
                        </span>
                      </div>
                      {item.note && (
                        <p className="mt-1 max-w-sm text-xs leading-relaxed text-color-muted">
                          {item.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Підсумок */}
                <div className="mt-7 flex items-baseline justify-between border-t border-color-black/10 pt-5">
                  <span
                    className={`${mono.className} text-xs uppercase tracking-[0.15em] text-color-muted`}
                  >
                    {data.totalLabel}
                  </span>
                  <span className="text-2xl font-bold text-color-black md:text-3xl">
                    {data.totalAmount}
                  </span>
                </div>

                {/* Відповідь на рахунок */}
                <div className="mt-6 rounded-xl bg-color-black p-5 md:p-6">
                  <p
                    className={`${mono.className} mb-2 text-xs uppercase tracking-[0.15em] text-color-blue-light`}
                  >
                    {data.offerLabel}
                  </p>
                  <p className="text-2xl font-bold text-color-white md:text-3xl">
                    {data.offerAmount}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-color-white/60">
                    {data.offerNote}
                  </p>
                </div>
              </div>

              {/* Зубчастий край — чек, а не картка */}
              <div
                aria-hidden
                className="h-4 w-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 8px 0, ${SECTION_BG} 8px, #ffffff 8.5px)`,
                  backgroundSize: '16px 16px',
                  backgroundRepeat: 'repeat-x',
                }}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default TrueCost;
