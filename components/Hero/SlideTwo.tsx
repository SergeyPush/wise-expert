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
        backgroundImage: `url(${image?.fields?.file?.url})`,
      }}
    >
      <Wrapper className="relative z-10 min-h-screen flex flex-col justify-end pb-24 md:pb-28 lg:justify-center lg:pb-0 lg:pt-20">
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: makeBolder(title, 'Чому') }}
        />
        <ul
          className={
            'text-color-white flex flex-col gap-6 lg:flex-row lg:gap-12 xl:gap-16'
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
