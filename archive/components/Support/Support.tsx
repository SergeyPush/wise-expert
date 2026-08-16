import React from 'react';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import { useInView } from '@/hooks/useInView';
import { useGlobalContext } from '@/context/GlobalContext';
import {
  ISupport,
  ISupportItem,
  SupportAccent,
  SupportIconName,
} from '@/interfaces/support.interface';

interface SupportProps {
  data: ISupport;
}

/**
 * Іконки з макета «WisExpert Супровід ФОП ТОВ». Тримаємо їх тут, а не в
 * константах, щоб дані секції лишалися серіалізовними (потім — Contentful).
 * react-icons не використовуємо: у наборі немає відповідників для ПДВ і
 * первинних документів, а мікс двох стилів помітний у ряду з чотирьох карток.
 */
const ICONS: Record<SupportIconName, React.ReactNode> = {
  tax: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 7h8M8 11h3M8 15h3M14.5 15.5l1.6 1.6 2.4-2.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 10h18M8.5 15l2 2 3.5-3.5" />
    </>
  ),
  question: (
    <>
      <path d="M21 12a8 8 0 1 0-3.2 6.4L21 20z" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2-2.4 3.4M12 16.6h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  vat: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="7.5" cy="7.5" r="2.6" />
      <circle cx="16.5" cy="16.5" r="2.6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h4a4.5 4.5 0 0 1 4.5 4.5V20" />
      <path d="M16.5 5.5a3 3 0 0 1 0 5.6M19 20v-1.6a4 4 0 0 0-2.4-3.6" />
    </>
  ),
  docs: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
};

// Класи прописані повністю: Tailwind не бачить рядки, зібрані конкатенацією
const CHIP: Record<SupportAccent, string> = {
  blue: 'bg-color-light-blue text-color-blue-dark',
  violet: 'bg-color-light-violet text-color-violet-dark',
};

const PIC: Record<SupportAccent, string> = {
  blue: 'bg-color-light-blue text-color-blue',
  violet: 'bg-color-light-violet text-color-violet',
};

const CARD_HOVER: Record<SupportAccent, string> = {
  blue: 'hover:border-color-blue-light/40',
  violet: 'hover:border-color-violet/30',
};

const TITLE_ACCENT: Record<SupportAccent, string> = {
  blue: 'text-color-blue',
  violet: 'text-color-violet',
};

const CTA_FORMAT: Record<SupportAccent, 'primary' | 'primary-violet'> = {
  blue: 'primary',
  violet: 'primary-violet',
};

/** Одна картка-зона відповідальності */
const SupportCard = ({
  item,
  index,
  inView,
}: {
  item: ISupportItem;
  index: number;
  inView: boolean;
}) => (
  <article
    style={{ transitionDelay: inView ? `${index * 90}ms` : '0ms' }}
    className={`flex flex-col gap-4 rounded-2xl border border-color-border bg-color-white p-6 shadow-soft transition-all duration-500 motion-reduce:transition-none md:p-7 hover:-translate-y-1 hover:shadow-elevated ${
      CARD_HOVER[item.accent]
    } ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
  >
    <span
      aria-hidden
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
        PIC[item.accent]
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        {ICONS[item.icon]}
      </svg>
    </span>
    <h3 className="text-lg font-bold leading-snug tracking-tight text-color-black md:text-xl">
      {item.title}
    </h3>
    <p className="text-sm leading-relaxed text-color-muted md:text-base">
      {item.text}
    </p>
  </article>
);

/**
 * Головний продающий блок сторінок /fop і /tov: що саме перестає бути
 * турботою клієнта. Дві розкладки з одного макета —
 * `grid` (ФОП: центрований хед + 4 картки в рядок) і
 * `split` (ТОВ: липкий текст ліворуч + сітка 2×2 праворуч).
 */
const Support = ({ data }: SupportProps) => {
  const { setBookCallIsVisible } = useGlobalContext();
  const { ref: sectionRef, inView } = useInView(0.1);

  const chip = (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        CHIP[data.accent]
      }`}
    >
      <i aria-hidden className="h-[7px] w-[7px] rounded-full bg-current" />
      {/* На мобільній довгий чип ламається на два рядки — показуємо короткий */}
      {data.kickerMobile ? (
        <>
          <span className="md:hidden">{data.kickerMobile}</span>
          <span className="hidden md:inline">{data.kicker}</span>
        </>
      ) : (
        data.kicker
      )}
    </span>
  );

  const heading = (
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-color-black md:text-4xl lg:text-5xl">
      {data.title}
      <span className={TITLE_ACCENT[data.accent]}>{data.titleAccent}</span>
      {data.titleTail}
    </h2>
  );

  const lead = (
    <p className="text-base leading-relaxed text-color-muted md:text-lg">
      {data.lead}
    </p>
  );

  const strip = (
    <div className="mt-6 flex flex-col items-stretch gap-5 rounded-2xl border border-color-border bg-color-white p-6 shadow-soft md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
      <p className="max-w-2xl text-base leading-relaxed text-color-muted">
        {data.stripTextMobile ? (
          <>
            <span className="md:hidden">{data.stripTextMobile}</span>
            <span className="hidden md:inline">{data.stripText}</span>
          </>
        ) : (
          data.stripText
        )}
      </p>
      <Button
        format={CTA_FORMAT[data.accent]}
        size="wide"
        text={data.ctaText}
        className="shrink-0 whitespace-nowrap"
        onClick={() => setBookCallIsVisible(true)}
      />
    </div>
  );

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="support"
      className="bg-color-light-gray py-16 md:py-24"
    >
      <Wrapper>
        {data.layout === 'grid' ? (
          <>
            {/* ФОП: хед по центру, під ним рівний ряд із чотирьох карток */}
            <div className="mb-10 flex flex-col items-start gap-4 text-left md:mb-12 md:items-center md:text-center">
              {chip}
              {heading}
              <div className="max-w-3xl">{lead}</div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {data.items.map((item, idx) => (
                <SupportCard
                  key={item.title}
                  item={item}
                  index={idx}
                  inView={inView}
                />
              ))}
            </div>
          </>
        ) : (
          /* ТОВ: текст ліворуч тримається в кадрі, поки читаються картки */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-5 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              {chip}
              {heading}
              {lead}
              {data.quote && (
                <div className="flex items-start gap-3 rounded-2xl border border-color-border bg-color-white p-5 shadow-soft">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      TITLE_ACCENT[data.accent]
                    }`}
                  >
                    <path d="M4 5h16v12H8l-4 3z" />
                    <path d="M9 11h6" />
                  </svg>
                  <p className="text-base font-medium leading-relaxed text-color-light-black">
                    {data.quote}
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
              {data.items.map((item, idx) => (
                <SupportCard
                  key={item.title}
                  item={item}
                  index={idx}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        )}
        {strip}
      </Wrapper>
    </section>
  );
};

export default Support;
