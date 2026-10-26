export interface IContactForm {
  name: string;
  phone: string;
  question: string;
  // honeypot-поле (имя — HONEYPOT_FIELD в utils/submit.utils.ts), у человека пустое
  xq_ref?: string;
}

export interface IDropdown {
  value: string;
  label: string;
}

export type IDropdownValue = string | IDropdown | IDropdown[];
