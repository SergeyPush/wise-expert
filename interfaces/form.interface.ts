export interface IContactForm {
  email: string;
  phone: string;
  question: string;
}

export interface IDropdown {
  value: string;
  label: string;
}

export type IDropdownValue = string | IDropdown | IDropdown[];
