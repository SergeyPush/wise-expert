export interface IContactForm {
  name: string;
  phone: string;
  question: string;
  // honeypot-поле, у человека всегда пустое
  website?: string;
}

export interface IDropdown {
  value: string;
  label: string;
}

export type IDropdownValue = string | IDropdown | IDropdown[];
