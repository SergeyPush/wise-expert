import React from 'react';
import { IHero } from '@/interfaces/hero.interface';
import Wrapper from '@/components/Wrapper';
import styles from '@/styles/SlideTwo.module.scss';
import { makeBolder } from '@/utils/bolder.utils';

interface HeroInterface {
  data: IHero;
}
const SlideTwo = ({ data: { title, image, items } }: HeroInterface) => {
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${image?.fields?.file?.url})`,
      }}
    >
      <Wrapper className="min-h-full flex flex-col justify-center">
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: makeBolder(title, 'Чому') }}
        />
        <ul
          className={
            'text-color-white flex flex-col gap-5 lg:flex-row lg:gap-16'
          }
        >
          {items?.map((item, idx) => (
            <li key={idx} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default SlideTwo;
