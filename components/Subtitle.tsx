import React, { ReactNode } from 'react';

interface SubtitleInterface {
  children: ReactNode;
  className?: string;
}
const Subtitle = ({ children, className }: SubtitleInterface) => {
  return (
    <p className={`text-center text-[24px] md:text-[48px] ${className}`}></p>
  );
};

export default Subtitle;
