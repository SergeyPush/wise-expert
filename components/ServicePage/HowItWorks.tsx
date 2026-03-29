import React from 'react';
import Wrapper from '@/components/Wrapper';
import { IHowItWorks } from '@/interfaces/how-it-works.interface';
import { useInView } from '@/hooks/useInView';

interface HowItWorksProps {
  data: IHowItWorks;
}

const HowItWorks = ({ data }: HowItWorksProps) => {
  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: gridRef, inView: gridVisible } = useInView(0.05);

  return (
    <section className="py-10 md:py-14 bg-color-light-gray">
      <Wrapper>
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`mb-10 text-center transition-all duration-700 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs font-semibold text-color-blue tracking-widest uppercase mb-3">
            {data.prefix}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-color-black">
            {data.title}
          </h2>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.tiles.map((step, idx) => (
            <div
              key={step.num}
              style={{ transitionDelay: gridVisible ? `${idx * 80}ms` : '0ms' }}
              className={`bg-white border border-color-border rounded-2xl p-8 flex flex-col gap-4 transition-all duration-500 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-color-black/5 flex items-center justify-center flex-shrink-0">
                <span className="text-color-black font-bold text-lg">
                  {step.num}
                </span>
              </div>
              <p className="text-lg font-semibold text-color-black">
                {step.title}
              </p>
              <p className="text-sm text-color-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default HowItWorks;
