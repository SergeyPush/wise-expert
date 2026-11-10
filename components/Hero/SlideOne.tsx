import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IHero } from '@/interfaces/hero.interface';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import Advantages from '@/components/Hero/Advantages';
import { IAdvantages } from '@/interfaces/advantages.interface';
import styles from '@/styles/SlideOne.module.scss';
import { makeBolder } from '@/utils/bolder.utils';
import { scrollToId } from '@/utils/scroll.utils';
import { CONTACTS } from '@/constants/contact.const';
import { getPageType, pushEvent } from '@/utils/analytics';

interface HeroInterface {
  data: IHero;
  advantages: IAdvantages;
}
const SlideOne = ({
  data: { image, title, subtitle },
  advantages,
}: HeroInterface) => {
  const baseUrl = image?.fields?.file?.url;
  // URL картинки нужной ширины через Contentful Images API
  const sized = (w: number) => `${baseUrl}?w=${w}&q=80&fm=webp`;
  // Десктоп: фон на всю ширину экрана
  const imageUrl = baseUrl ? sized(1920) : undefined;
  // Мобильный: блок шириной в экран, 1920px (95 КБ) избыточно — браузер выберет по DPR
  const mobileSrcSet = baseUrl
    ? [640, 828, 1080].map((w) => `${sized(w)} ${w}w`).join(', ')
    : undefined;
  const { pathname } = useRouter();

  const handleCtaClick = () => {
    pushEvent('cta_click', {
      cta_location: 'hero',
      page_type: getPageType(pathname),
      page_path: pathname,
    });
    // Скрол до секції калькулятора (форма запиту на співпрацю)
    scrollToId('calc');
  };

  // Анимация появления на CSS: framer-motion отдавал в SSR opacity:0,
  // и первый экран был невидим до загрузки и гидрации JS
  const fadeUp = (delay: number) => ({
    style: { animationDelay: `${delay}s` },
  });

  return (
    <>
      {imageUrl && (
        <Head>
          {/* Preload только для десктопного фона: CSS background браузер
              находит поздно. Мобильный <img> есть в HTML с fetchpriority=high,
              а preload с imagesrcset Chrome качал и на десктопе, игнорируя media */}
          <link
            rel="preload"
            as="image"
            href={imageUrl}
            media="(min-width: 768px)"
            fetchPriority="high"
          />
        </Head>
      )}
      <div className={styles.background}>
        {/* Mobile: in-flow image block */}
        {imageUrl && (
          <div className={styles.mobileImageBlock}>
            <picture>
              {/* На десктопе блок скрыт, но <img> всё равно скачался бы —
                  отдаём прозрачный 1×1 gif вместо мобильной картинки */}
              <source
                media="(min-width: 768px)"
                srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              />
              <img
                src={sized(828)}
                srcSet={mobileSrcSet}
                sizes="100vw"
                alt={image?.fields?.title || 'WisExpert team'}
                className={styles.mobileImg}
                {...({ fetchpriority: 'high' } as object)}
              />
            </picture>
            <div className={styles.mobileOverlay} />
          </div>
        )}

        {/* Desktop: background image via inline style */}
        <div
          className={styles.desktopBg}
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
        />

        {/* pb уменьшен на десктопе — блок текста ниже, title не накрывает лица */}
        <Wrapper className="relative z-10 flex-1 flex flex-col justify-end pb-24 md:min-h-screen md:justify-end md:pb-[100px] lg:justify-end lg:pb-[60px] lg:pt-20 xl:pb-[64px]">
          <h1
            {...fadeUp(0.1)}
            className={`${styles.title} ${styles.fadeUp}`}
            dangerouslySetInnerHTML={{ __html: makeBolder(title, 'WisExpert') }}
          />
          {/* Render subtitle only when present — empty <h2> still holds margin */}
          {subtitle && (
            <h2
              {...fadeUp(0.25)}
              className={`${styles.subtitle} ${styles.fadeUp}`}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
          {/* Variant 6 advantages block: stats + checkmark benefits */}
          <div {...fadeUp(0.35)} className={styles.fadeUp}>
            <Advantages data={advantages} />
          </div>
          <div
            {...fadeUp(0.5)}
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${styles.fadeUp}`}
          >
            <Button
              format={'primary'}
              text={'Звʼязатись з нами'}
              size={'wide'}
              className="w-full sm:w-auto"
              onClick={handleCtaClick}
            />
            {/* Телефон вместо "Дізнатися більше" (CRO-правки): tel-ссылка для прямого звонка */}
            <Button
              format={'outlined'}
              text={CONTACTS.phoneDisp}
              size={'wide'}
              className="w-full sm:w-auto"
              href={CONTACTS.phone}
            />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SlideOne;
