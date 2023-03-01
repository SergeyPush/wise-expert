import React, { ReactNode } from 'react';
import styles from '@/styles/TItle.module.scss';

interface TitleInterface {
  text: string;
  className?: string;
}

const Title = ({ text, className }: TitleInterface) => {
  return (
    <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export default Title;
