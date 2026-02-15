import React from 'react';
import { IHero } from '@/interfaces/hero.interface';
import Wrapper from '@/components/Wrapper';
import styles from '@/styles/SlideTwo.module.scss';
import { makeBolder } from '@/utils/bolder.utils';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroInterface {
  data: IHero;
}
const SlideTwo = ({ data: { title, image, items } }: HeroInterface) => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          },
        };

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${image?.fields?.file?.url})`,
      }}
    >
      <Wrapper className="relative z-10 min-h-screen flex flex-col justify-end pb-24 md:pb-28 lg:justify-center lg:pb-0 lg:pt-20">
        <motion.h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: makeBolder(title, 'Чому') }}
          {...fadeUp(0.1)}
        />
        <ul
          className={
            'text-color-white flex flex-col gap-6 lg:flex-row lg:gap-12 xl:gap-16'
          }
        >
          {items?.map((item, idx) => (
            <motion.li key={idx} className={styles.item} {...fadeUp(0.2 + idx * 0.1)}>
              {item}
            </motion.li>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default SlideTwo;
