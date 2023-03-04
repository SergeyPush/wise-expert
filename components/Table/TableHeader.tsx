import React, { Dispatch, SetStateAction } from 'react';
import styles from '@/styles/TableHeader.module.scss';

const tabsList = [
  {
    name: 'fop',
    label: 'ФОП',
    id: 1,
  },
  {
    name: 'tov',
    label: 'ТОВ',
    id: 2,
  },
  {
    name: 'people',
    label: 'Кадровий облік',
    id: 3,
  },
  {
    name: 'services',
    label: 'Разові послуги',
    id: 4,
  },
];

type ServiceTypes = 'tov' | 'fop' | 'services' | 'people';
interface TableHeaderInterface {
  active: ServiceTypes;
  setActive: Dispatch<SetStateAction<ServiceTypes>>;
}
const TableHeader = ({ active, setActive }: TableHeaderInterface) => {
  return (
    <div className={'flex mb-6'}>
      <div className={`${styles.tableHeader}`}>
        {tabsList.map((item) => (
          <div
            key={item.id}
            className={`${styles.headerItem} ${
              item.name === active ? styles.active : null
            }`}
            onClick={() => {
              setActive(item.name as ServiceTypes);
            }}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableHeader;
