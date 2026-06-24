import React from 'react';
import styles from '@/styles/Advantages.module.scss';
import { IAdvantages } from '@/interfaces/advantages.interface';

interface AdvantagesProps {
  data: IAdvantages;
}

// Render a label that may contain "\n" line breaks as separate lines.
const renderLabel = (label: string) =>
  label.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

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

const Advantages = ({ data }: AdvantagesProps) => {
  const { stats = [], quals = [] } = data ?? {};

  return (
    <div className={styles.root}>
      {/* Large numeric stats in a row with dividers */}
      <div className={styles.stats}>
        {stats.map(({ num, label }) => (
          <div key={num} className={styles.stat}>
            <div className={styles.num}>{num}</div>
            <div className={styles.label}>{renderLabel(label)}</div>
          </div>
        ))}
      </div>

      {/* Checkmark advantages */}
      <div className={styles.quals}>
        {quals.map((text) => (
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
