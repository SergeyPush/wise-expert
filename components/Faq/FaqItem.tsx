import React, { useState } from 'react';
import FaqTitle from '@/components/Faq/FaqTitle';
import FaqBody from '@/components/Faq/FaqBody';

interface FaqItemInterface {
  question: string;
  response: string;
}
const FaqItem = ({ question, response }: FaqItemInterface) => {
  const [active, setActive] = useState(false);

  return (
    <div className={'border-b border-color-gray pb-4 mb-4'}>
      <FaqTitle question={question} active={active} setActive={setActive} />
      <FaqBody response={response} active={active} />
    </div>
  );
};

export default FaqItem;
