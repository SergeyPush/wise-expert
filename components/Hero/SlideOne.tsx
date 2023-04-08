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
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 138.24%), linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${image?.fields?.file?.url})`,
      }}
    >
      <Wrapper className="min-h-full flex flex-col justify-end md:justify-start">
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: makeBolder(title, 'WisеExpert') }}
        />
        <h2
          className={styles.subtitle}
          dangerouslySetInnerHTML={{ __html: subtitle ? subtitle : '' }}
        />

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Button
            format={'white'}
            text={'Розрахувати власність'}
            size={'wide'}
            className={''}
            onClick={() => scrollToId('calc')}
          />
          <Button
            format={'outlined'}
            text={'Дізнатися більше'}
            size={'wide'}
            onClick={() => scrollToId('useful')}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default SlideOne;
