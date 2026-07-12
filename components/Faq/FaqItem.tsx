import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaqChevron, IcQuestion } from '@/components/Faq/faqIcons';
import styles from '@/styles/Faq.module.scss';

interface FaqItemInterface {
  question: string;
  response: string;
}

const FaqItem = ({ question, response }: FaqItemInterface) => {
  // Independent open state per item (multiple can be open) — как было
  const [active, setActive] = useState(false);

  return (
    <div className={`${styles.item} ${active ? styles.itemOpen : ''}`}>
      <button
        type="button"
        className={styles.q}
        onClick={() => setActive((prev) => !prev)}
        aria-expanded={active}
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
      {/* answer height animation via framer-motion */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={styles.aWrap}
          >
            <div
              className={styles.a}
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;
