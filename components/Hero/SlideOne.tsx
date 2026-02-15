import React from 'react';
import { IHero } from '@/interfaces/hero.interface';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import styles from '@/styles/SlideOne.module.scss';
import { makeBolder } from '@/utils/bolder.utils';
import { scrollToId } from '@/utils/scroll.utils';

interface HeroInterface {
  data: IHero;
}
const SlideOne = ({ data: { image, title, subtitle } }: HeroInterface) => {
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${image?.fields?.file?.url})`,
      }}
    >
      <Wrapper className="relative z-10 min-h-screen flex flex-col justify-end pb-24 md:pb-28 lg:justify-center lg:pt-32 lg:pb-24">
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: makeBolder(title, 'WisExpert') }}
        />
        <h2
          className={styles.subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle ? subtitle : '' }}
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
        </div>
      </Wrapper>
    </div>
  );
};

export default SlideOne;
