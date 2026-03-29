import React from 'react';
import {
  LuBuilding2,
  LuCalculator,
  LuBanknote,
  LuShieldCheck,
  LuTrendingUp,
  LuLockOpen,
  LuPackage,
  LuGlobe,
  LuBookOpen,
  LuMonitorSmartphone,
  LuShoppingCart,
  LuUserCheck,
  LuFileText,
  LuFactory,
  LuClipboardList,
  LuChartBar,
  LuDollarSign,
  LuStore,
  LuPiggyBank,
  LuUtensilsCrossed,
  LuAward,
  LuClock3,
  LuUsers,
} from 'react-icons/lu';
import Wrapper from '@/components/Wrapper';
import { IServiceCard } from '@/interfaces/service-page.interface';

export const ICON_MAP: Record<string, React.ElementType> = {
  Building2: LuBuilding2,
  Calculator: LuCalculator,
  Banknote: LuBanknote,
  ShieldCheck: LuShieldCheck,
  TrendingUp: LuTrendingUp,
  Unlock: LuLockOpen,
  Package: LuPackage,
  Globe: LuGlobe,
  BookOpen: LuBookOpen,
  MonitorSmartphone: LuMonitorSmartphone,
  ShoppingCart: LuShoppingCart,
  UserCheck: LuUserCheck,
  FileText: LuFileText,
  Factory: LuFactory,
  ClipboardList: LuClipboardList,
  BarChart2: LuChartBar,
  DollarSign: LuDollarSign,
  Store: LuStore,
  PiggyBank: LuPiggyBank,
  UtensilsCrossed: LuUtensilsCrossed,
  Award: LuAward,
  Clock3: LuClock3,
  Users: LuUsers,
};

interface WhatWeDoProps {
  prefix: string;
  title: string;
  subtitle: string;
  cards: IServiceCard[];
}

const WhatWeDo = ({ prefix, title, subtitle, cards }: WhatWeDoProps) => {
  return (
    <section className="py-10 md:py-14 bg-white">
      <Wrapper>
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold text-color-blue tracking-widest uppercase mb-3">
            {prefix}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-color-black mb-3">
            {title}
          </h2>
          <p className="text-color-muted text-base md:text-lg">{subtitle}</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-5">
          {cards.map((card, idx) => {
            const Icon = ICON_MAP[card.icon];
            const lgWidth =
              cards.length === 6
                ? 'lg:w-[calc(33.333%-14px)]'
                : 'lg:w-[calc(20%-16px)]';
            return (
              <li
                key={idx}
                className={`border border-color-border rounded-2xl p-6 flex flex-col gap-3 w-full sm:w-[calc(50%-10px)] ${lgWidth} min-w-[180px]`}
              >
                {Icon && (
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-color-blue" />
                  </div>
                )}
                <p className="text-sm font-semibold text-color-black">
                  {card.title}
                </p>
                <p className="text-xs text-color-muted leading-relaxed">
                  {card.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </section>
  );
};

export default WhatWeDo;
