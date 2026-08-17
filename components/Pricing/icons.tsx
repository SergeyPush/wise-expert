import React from 'react';

export type PricingIconName =
  | 'shield-check'
  | 'shield'
  | 'doc-check'
  | 'percent'
  | 'doc-fold'
  | 'check-line'
  | 'briefcase'
  | 'doc-simple'
  | 'people'
  | 'person'
  | 'doc-list'
  | 'clock'
  | 'lines'
  | 'arrow-right';

interface PricingIconProps {
  name: PricingIconName;
  className?: string;
}

// Контури скопійовані з макета Claude Design («WisExpert Ціни ТОВ ФОП.html»),
// щоб іконки один в один збігалися з дизайном блоку цін.
const PATHS: Record<PricingIconName, React.ReactNode> = {
  'shield-check': (
    <>
      <path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  shield: <path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z" />,
  'doc-check': (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 15l2 2 3.5-3.5" />
    </>
  ),
  percent: (
    <>
      <path d="M19 5L5 19" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  'doc-fold': (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  'check-line': (
    <>
      <path d="M3 11l4-4 5 5 3-3 6 6" />
      <path d="M3 17h18" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  'doc-simple': (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h4a4.5 4.5 0 0 1 4.5 4.5V20" />
      <path d="M16.5 5.5a3 3 0 0 1 0 5.6M19 20v-1.6a4 4 0 0 0-2.4-3.6" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
    </>
  ),
  'doc-list': (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  lines: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="17" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
};

/** Іконка для бейджів/карток/приміток блоку цін — контурний стиль з макета */
const PricingIcon = ({ name, className }: PricingIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {PATHS[name]}
  </svg>
);

export default PricingIcon;
