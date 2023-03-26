import React from 'react';
import Wrapper from '@/components/Wrapper';
import Title from '@/components/Title';
import FaqItem from '@/components/Faq/FaqItem';
import { IFAQ } from '@/interfaces/faq.interface';

interface FaqInterface {
  faq: IFAQ;
}

const Faq = ({ faq }: FaqInterface) => {
  const { title, faqs } = faq;
  const questionList = faqs.map((item) => item.fields);

  return (
    <div
      className={'pt-20 pb-20'}
      style={{
        background:
          'radial-gradient(46.56% 196.35% at 6.15% 5.86%, rgba(0, 70, 250, 0.12) 0%, rgba(0, 130, 250, 0.03) 17.49%, rgba(255, 255, 255, 0.3) 79.11%)',
      }}
    >
      <Wrapper>
        <Title text={title} />
        {questionList.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            response={item.answer}
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default Faq;
