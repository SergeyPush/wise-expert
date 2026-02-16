import React from 'react';
import { IHero } from '@/interfaces/hero.interface';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import styles from '@/styles/SlideOne.module.scss';
import { makeBolder } from '@/utils/bolder.utils';
import { scrollToId } from '@/utils/scroll.utils';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroInterface {
  data: IHero;
}
const SlideOne = ({ data: { image, title, subtitle } }: HeroInterface) => {
  const imageUrl = image?.fields?.file?.url;
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
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      }}
    >
      {/* Mobile image - visible only on small screens */}
      {imageUrl && (
        <div className={styles.mobileImage}>
          <img
            src={imageUrl}
            alt="WisExpert team"
            className={styles.mobileImg}
          />
          <div className={styles.mobileOverlay} />
        </div>
      )}

      <Wrapper className="relative z-10 min-h-screen flex flex-col justify-end pt-[52vh] pb-[116px] md:pt-0 md:pb-[132px] lg:justify-center lg:pb-0 lg:pt-20">
        <motion.h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: makeBolder(title, 'WisExpert') }}
          {...fadeUp(0.1)}
        />
        <motion.h2
          className={styles.subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle ? subtitle : '' }}
          {...fadeUp(0.25)}
        />

        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4" {...fadeUp(0.4)}>
          <Button
            format={'primary'}
            text={'Розрахувати вартість'}
            size={'wide'}
            className="w-full sm:w-auto"
            onClick={() => scrollToId('calc')}
          />
          <Button
            format={'outlined'}
            text={'Дізнатися більше'}
            size={'wide'}
            className="w-full sm:w-auto"
            onClick={() => scrollToId('useful')}
          />
        </motion.div>
      </Wrapper>
    </div>
  );
};

export default SlideOne;
