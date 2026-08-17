// ВРЕМЕННАЯ страница для просмотра секций. Удалить после ревью.
import Support from '@/components/Support/Support';
import TaxYear from '@/components/TaxYear/TaxYear';
import TrueCost from '@/components/TrueCost/TrueCost';
import WhyUs from '@/components/WhyUs/WhyUs';
import { FOP_SUPPORT, TOV_SUPPORT } from '@/constants/support.const';
import { FOP_TAX_YEAR, TOV_TAX_YEAR } from '@/constants/tax-year.const';
import { FOP_TRUE_COST, TOV_TRUE_COST } from '@/constants/true-cost.const';
import { FOP_WHY_US, TOV_WHY_US } from '@/constants/why-us.const';

export default function Preview() {
  return (
    <main>
      <Support data={FOP_SUPPORT} />
      <WhyUs data={FOP_WHY_US} />
      <TaxYear data={FOP_TAX_YEAR} />
      <TrueCost data={FOP_TRUE_COST} />
      <Support data={TOV_SUPPORT} />
      <WhyUs data={TOV_WHY_US} />
      <TaxYear data={TOV_TAX_YEAR} />
      <TrueCost data={TOV_TRUE_COST} />
    </main>
  );
}
