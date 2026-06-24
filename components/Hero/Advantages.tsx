import React from 'react';
import styles from '@/styles/Advantages.module.scss';

// Numeric metrics shown as large figures with thin dividers.
const STATS: { num: string; label: React.ReactNode }[] = [
  { num: '10+', label: 'років досвіду' },
  {
    num: '100+',
    label: (
      <>
        компаній
        <br />
        на супроводі
      </>
    ),
  },
  {
    num: '100%',
    label: (
      <>
        звітів подано
        <br />
        вчасно
      </>
    ),
  },
];

// Qualitative advantages rendered with checkmarks.
const QUALS: string[] = [
  'За Вами закріплюється персональний бухгалтер',
  'Працюємо по всій Україні',
];

// Inline check icon (matches design's stroked checkmark).
const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 13 4 4L19 7" />
  </svg>
);

const Advantages = () => {
  return (
    <div className={styles.root}>
      {/* Large numeric stats in a row with dividers */}
      <div className={styles.stats}>
        {STATS.map(({ num, label }) => (
          <div key={num} className={styles.stat}>
            <div className={styles.num}>{num}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </div>

      {/* Checkmark advantages */}
      <div className={styles.quals}>
        {QUALS.map((text) => (
          <div key={text} className={styles.qual}>
            <span className={styles.icon}>
              <CheckIcon />
            </span>
            <span className={styles.qualText}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
