import React from 'react';
import { LuUsers, LuClock4, LuFileCheck, LuHeadphones } from 'react-icons/lu';
import Wrapper from '@/components/Wrapper';
import { IWhyChooseUs } from '@/interfaces/why-choose-us.interface';
import { useInView } from '@/hooks/useInView';

const ICON_MAP: Record<string, React.ElementType> = {
  Users: LuUsers,
  Clock4: LuClock4,
  FileCheck: LuFileCheck,
  Headphones: LuHeadphones,
};

interface WhyChooseUsProps {
  data: IWhyChooseUs;
}

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: gridRef, inView: gridVisible } = useInView(0.05);

  return (
    <section className="py-10 md:py-14 bg-white">
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
          {data.tiles.map((ben, idx) => {
            const Icon = ICON_MAP[ben.icon];
            return (
              <div
                key={idx}
                style={{ transitionDelay: gridVisible ? `${idx * 80}ms` : '0ms' }}
                className={`flex flex-col items-center text-center gap-3 p-8 transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {Icon && (
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={28} className="text-color-blue" />
                  </div>
                )}
                <p className="text-lg font-semibold text-color-black">{ben.title}</p>
                <p className="text-sm text-color-muted leading-relaxed">{ben.description}</p>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </section>
  );
};

export default WhyChooseUs;
