import React from 'react';
import Head from 'next/head';
import Wrapper from '@/components/Wrapper';
import FaqItem from '@/components/Faq/FaqItem';
import Button from '@/components/Button/Button';
import { IFAQ } from '@/interfaces/faq.interface';
import ScrollReveal from '@/components/ScrollReveal';
import { useGlobalContext } from '@/context/GlobalContext';
import styles from '@/styles/Faq.module.scss';

interface FaqInterface {
  faq: IFAQ;
}

// Blue-accent the last word of the title (skip when CMS title contains HTML)
const renderTitle = (title: string) => {
  if (title.includes('<')) {
    return <span dangerouslySetInnerHTML={{ __html: title }} />;
  }
  const words = title.trim().split(' ');
  const last = words.pop();
  return (
    <>
      {words.join(' ')} <span className={styles.accent}>{last}</span>
    </>
  );
};

const Faq = ({ faq }: FaqInterface) => {
  const { title, faqs } = faq;
  const questionList = faqs.map((item) => item.fields);
  // Открывает ту же модалку с формой, что и кнопка в хедере
  const { setBookCallIsVisible } = useGlobalContext();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questionList.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <section
        className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24 bg-color-white"
        id={'faq'}
      >
        <Wrapper>
          <ScrollReveal>
            <header className={styles.head}>
              <h2 className={styles.title}>{renderTitle(title)}</h2>
              <p className={styles.lead}>
                Зібрали відповіді на те, що найчастіше запитують перед початком
                співпраці.
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className={styles.card}>
              {questionList.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  response={item.answer}
                />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className={styles.cta}>
              <div className={styles.ctaTxt}>
                <span className={styles.ctaT}>Не знайшли відповідь?</span>
                <span className={styles.ctaS}>
                  Напишіть нам — відповімо протягом дня
                </span>
              </div>
              {/* Переиспользуем общий Button; открывает модалку с формой */}
              <Button
                format={'primary'}
                text={'Задати питання'}
                size={'wide'}
                className={'flex-shrink-0'}
                onClick={() => setBookCallIsVisible(true)}
              />
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default Faq;
