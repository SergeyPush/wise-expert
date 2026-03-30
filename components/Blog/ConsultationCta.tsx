import React from 'react';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';

interface ConsultationCtaProps {
  onBook: () => void;
}

export default function ConsultationCta({ onBook }: ConsultationCtaProps) {
  return (
    <section className="bg-gradient-to-br from-color-black to-color-light-black py-20 md:py-24">
      <Wrapper>
        <div className="text-center max-w-2xl mx-auto">
          <span className="block text-xs font-semibold text-color-blue uppercase tracking-wider mb-5">
            Консультація зі спеціалістом
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-4 tracking-tight">
            Потрібна допомога з бухгалтерією?
          </h2>
          <p className="text-color-white/60 text-base md:text-lg mb-8 leading-relaxed">
            Наші спеціалісти допоможуть розібратись у будь-яких питаннях
            обліку, податків та звітності. Залиште заявку — ми
            зв&apos;яжемось з вами.
          </p>
          <Button
            format="primary"
            text="Отримати консультацію"
            size="wide"
            onClick={onBook}
          />
        </div>
      </Wrapper>
    </section>
  );
}
