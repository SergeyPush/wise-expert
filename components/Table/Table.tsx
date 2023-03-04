import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import Title from '@/components/Title';
import TableHeader from '@/components/Table/TableHeader';
import { ITable } from '@/interfaces/table.interface';
import TableData from '@/components/Table/TableData';

interface TableInterface {
  table: ITable;
}

const Table = ({ table }: TableInterface) => {
  type ServiceTypes = 'tov' | 'fop' | 'services' | 'people';

  const [active, setActive] = useState<ServiceTypes>('fop');

  return (
    <div className={'pt-12 pb-12'}>
      <Wrapper>
        <Title text={`${table.title}`} />
        <p className={'text-center mb-10'}>{table.subtitle}</p>
        <TableHeader active={active} setActive={setActive} />
        <TableData data={table[active]} />
      </Wrapper>
    </div>
  );
};

export default Table;
