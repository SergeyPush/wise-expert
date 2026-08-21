import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { FaqChevron, IcQuestion } from '@/components/Faq/faqIcons';
import styles from '@/styles/Faq.module.scss';

interface FaqItemInterface {
  question: string;
  response: string;
}

const FaqItem = ({ question, response }: FaqItemInterface) => {
  // Independent open state per item (multiple can be open) — как было
  const [active, setActive] = useState(false);
  const id = useId();

  return (
    <div className={`${styles.item} ${active ? styles.itemOpen : ''}`}>
      <button
        type="button"
        className={styles.q}
        onClick={() => setActive((prev) => !prev)}
        aria-expanded={active}
        aria-controls={`${id}-answer`}
        id={`${id}-question`}
      >
        {/* один знак вопроса для всех пунктов */}
        <span className={styles.qIcon}>
          <IcQuestion />
        </span>
        <span className={styles.qText}>{question}</span>
        {/* chevron rotation via framer-motion */}
        <motion.span
          className={styles.qChev}
          animate={{ rotate: active ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <FaqChevron />
        </motion.span>
      </button>
      {/*
        Ответ всегда в DOM, сворачивается через CSS (grid-template-rows 0fr→1fr).
        Раньше был AnimatePresence с условным рендером — из-за него текста ответов
        не было в HTML, и краулеры AI-поисковиков (GPTBot, ClaudeBot, PerplexityBot),
        которые не выполняют JS, видели вопросы без ответов.
      */}
      {/*
        role="region" здесь намеренно нет: на /tov таких пунктов 12, и каждый
        стал бы отдельным ориентиром в навигации скринридера. Связки
        aria-controls + aria-labelledby аккордеону достаточно.
      */}
      <div
        className={styles.aWrap}
        id={`${id}-answer`}
        aria-labelledby={`${id}-question`}
      >
        <div className={styles.aInner}>
          <div
            className={styles.a}
            dangerouslySetInnerHTML={{ __html: response }}
          />
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
