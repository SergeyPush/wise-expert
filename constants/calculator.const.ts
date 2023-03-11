import { IDropdown } from '@/interfaces/form.interface';

export const organisationalForm: IDropdown[] = [
  {
    label: 'ФОП',
    value: 'ФОП',
  },
  {
    label: 'ТОВ',
    value: 'ТОВ',
  },
  {
    label: 'інше',
    value: 'інше',
  },
];

export const organizationalType: IDropdown[] = [
  {
    label: 'Продажі',
    value: 'Продажі',
  },
  {
    label: 'Виробництво',
    value: 'Виробництво',
  },
  {
    label: 'Послуги',
    value: 'Послуги',
  },
];

export const taxSystem: IDropdown[] = [
  {
    label: 'Загальна система',
    value: 'Загальна система',
  },
  {
    label: 'Єдиний податок, 2гр.',
    value: 'Єдиний податок, 2гр.',
  },
  {
    label: 'Єдиний податок, 3гр.',
    value: 'Єдиний податок, 3гр.',
  },
  {
    label: 'інше',
    value: 'інше',
  },
];

export const additional: IDropdown[] = [
  {
    label: 'ПДВ',
    value: 'ПДВ',
  },
  {
    label: 'Акциз',
    value: 'Акциз',
  },
  {
    label: 'ЗЕД',
    value: 'ЗЕД',
  },
  {
    label: 'Касові апарати',
    value: 'Касові апарати',
  },
];
