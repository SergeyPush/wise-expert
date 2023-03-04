import React from 'react';

interface SubtitleInterface {
  text: string;
  className?: string;
}
const Subtitle = ({ text, className }: SubtitleInterface) => {
  return (
    <p
      className={`text-center text-[24px] md:text-[48px] ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default Subtitle;
