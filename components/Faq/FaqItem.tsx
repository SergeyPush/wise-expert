import React, { useState } from 'react';
import FaqTitle from '@/components/Faq/FaqTitle';
import FaqBody from '@/components/Faq/FaqBody';

interface FaqItemInterface {
  question: string;
  response: string;
  isLast?: boolean;
}
const FaqItem = ({ question, response, isLast }: FaqItemInterface) => {
  const [active, setActive] = useState(false);

  return (
    <div className={`${!isLast ? 'border-b border-color-border' : ''}`}>
      <FaqTitle question={question} active={active} setActive={setActive} />
      <FaqBody response={response} active={active} />
    </div>
  );
};

export default FaqItem;
