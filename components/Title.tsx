import React from 'react';
import styles from '@/styles/TItle.module.scss';

interface TitleInterface {
  text: string;
  className?: string;
  align?: 'left' | 'right' | 'center';
  color?: 'white' | 'black';
}

const Title = ({ text, align, color }: TitleInterface) => {
  return (
    <h2
      className={`${styles.title} ${align === 'left' && styles.left} ${
        color === 'white' && styles.white
      }`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default Title;
