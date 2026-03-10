import React from 'react';
import Head from 'next/head';
import Wrapper from '@/components/Wrapper';
import Title from '@/components/Title';
import FaqItem from '@/components/Faq/FaqItem';
import { IFAQ } from '@/interfaces/faq.interface';
import ScrollReveal from '@/components/ScrollReveal';

interface FaqInterface {
  faq: IFAQ;
}

const Faq = ({ faq }: FaqInterface) => {
  const { title, faqs } = faq;
  const questionList = faqs.map((item) => item.fields);

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
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>
      <section
        className={
          'pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24 bg-color-light-gray'
        }
        id={'faq'}
      >
        <Wrapper>
          <ScrollReveal>
            <Title text={title} />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-color-white rounded-2xl shadow-soft overflow-hidden">
              {questionList.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  response={item.answer}
                  isLast={index === questionList.length - 1}
                />
              ))}
            </div>
          </ScrollReveal>
        </Wrapper>
      </section>
    </>
  );
};

export default Faq;
