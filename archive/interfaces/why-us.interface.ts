/** Пункт «Чому WisExpert» — назва напряму + що саме ми робимо */
export interface IWhyUsItem {
  title: string;
  text: string;
}

export interface IWhyUs {
  /** Заголовок секції — «Чому WisExpert?» */
  title: string;
  /** Один рядок під заголовком; необов'язковий */
  lead?: string;
  items: IWhyUsItem[];
  ctaText: string;
}
