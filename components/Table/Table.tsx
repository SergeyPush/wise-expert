import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import Title from '@/components/Title';
import TableHeader from '@/components/Table/TableHeader';
import { ITable } from '@/interfaces/table.interface';
import TableData from '@/components/Table/TableData';
import ScrollReveal from '@/components/ScrollReveal';

interface TableInterface {
  table: ITable;
}

const Table = ({ table }: TableInterface) => {
  type ServiceTypes = 'tov' | 'fop' | 'services' | 'people';

  const [active, setActive] = useState<ServiceTypes>('fop');

  return (
    <section className={'pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-28 lg:pb-24'} id={'prices'}>
      <Wrapper>
        <ScrollReveal>
          <Title text={`${table.title}`} />
          <p className={'text-center text-color-muted mb-8 md:mb-12 max-w-2xl mx-auto'}>
            {table.subtitle}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <TableHeader active={active} setActive={setActive} />
          <TableData data={table[active]} />
        </ScrollReveal>
      </Wrapper>
    </section>
  );
};

export default Table;
