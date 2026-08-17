import React from 'react';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import { useInView } from '@/hooks/useInView';
import { useGlobalContext } from '@/context/GlobalContext';
import { mono } from '@/styles/fonts';
import { IWhyUs } from '@/interfaces/why-us.interface';

interface WhyUsProps {
  data: IWhyUs;
}

/**
 * Специфікація послуги: заголовок ліворуч (липкий на десктопі),
 * праворуч — рядки «напрям / що робимо» з волосяними лініями.
 * Без іконок: секція навмисно тиха, бо поруч стоять «гучні»
 * TaxYear і TrueCost.
 */
const WhyUs = ({ data }: WhyUsProps) => {
  const { setBookCallIsVisible } = useGlobalContext();
  const { ref: listRef, inView } = useInView(0.05);

  return (
    <section id="why-us" className="bg-color-white py-16 md:py-24">
      <Wrapper>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Ліворуч: заголовок і CTA, тримаються поруч зі списком при скролі */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-color-black md:text-4xl lg:text-5xl">
                {data.title}
              </h2>
              {data.lead && (
                <p className="mt-4 text-base leading-relaxed text-color-muted md:text-lg">
                  {data.lead}
                </p>
              )}
              <div className="mt-8 hidden md:block">
                <Button
                  format="primary"
                  size="wide"
                  text={data.ctaText}
                  onClick={() => setBookCallIsVisible(true)}
                />
              </div>
            </div>
          </div>

          {/* Праворуч: рядки специфікації */}
          <ul
            ref={listRef as React.RefObject<HTMLUListElement>}
            className="md:col-span-8"
          >
            {data.items.map((item, idx) => (
              <li key={item.title} className="group relative">
                {/* Волосяна лінія «дописується» зліва направо при появі */}
                <span
                  aria-hidden
                  style={{ transitionDelay: inView ? `${idx * 120}ms` : '0ms' }}
                  className={`absolute inset-x-0 top-0 h-px origin-left bg-color-border transition-transform duration-700 motion-reduce:transition-none ${
                    inView ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                <div
                  style={{
                    transitionDelay: inView ? `${idx * 120 + 120}ms` : '0ms',
                  }}
                  className={`grid grid-cols-1 gap-x-6 gap-y-2 py-7 transition-all duration-500 motion-reduce:transition-none md:grid-cols-12 md:py-8 ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <div className="md:col-span-5">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`${mono.className} text-xs text-color-blue/50 transition-colors group-hover:text-color-blue`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold leading-snug text-color-black md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-color-muted md:col-span-7 md:text-base">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
            {/* Замикаюча лінія списку */}
            <li aria-hidden className="h-px bg-color-border" />
          </ul>

          {/* CTA для мобільної версії — під списком */}
          <div className="md:hidden">
            <Button
              format="primary"
              size="wide"
              text={data.ctaText}
              onClick={() => setBookCallIsVisible(true)}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default WhyUs;
