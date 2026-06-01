import React, { useState } from 'react';
import styles from '@/styles/TelegramWidget.module.scss';

const TG_URL = 'https://t.me/wisexpert_bot';

const TelegramIcon = () => (
  <svg
    className={styles.tgIc}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
);

const TelegramWidget: React.FC = () => {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <div className={styles.dock}>
      {cardOpen && (
        <div className={styles.card}>
          <button
            className={styles.closeBtn}
            aria-label="Закрити"
            onClick={() => setCardOpen(false)}
          >
            ×
          </button>
          <div className={styles.cardTop}>
            <div className={styles.avatar}>
              <TelegramIcon />
              <span className={styles.onlineDot} />
            </div>
            <div className={styles.meta}>
              <div className={styles.name}>WisExpert</div>
              <div className={styles.status}>● Онлайн</div>
            </div>
          </div>
          <div className={styles.message}>
            Вітаємо! 👋 Маєте питання? Натисніть, щоб написати нам у Telegram
          </div>
          <a
            className={styles.cta}
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
            Написати нам
          </a>
        </div>
      )}
      <a
        className={`${styles.fab} ${!cardOpen ? styles.pulse : ''}`}
        href={TG_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написати нам у Telegram"
        onClick={(e) => {
          e.preventDefault();
          setCardOpen((v) => !v);
        }}
      >
        <TelegramIcon />
      </a>
    </div>
  );
};

export default TelegramWidget;
