import React from 'react';
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

  return (
    <section
      className={'pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24 bg-color-light-gray'}
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
  );
};

export default Faq;
