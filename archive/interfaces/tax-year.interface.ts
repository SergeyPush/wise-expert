/** Один обов'язок платника: що здавати/сплачувати і в яких місяцях */
export interface ITaxDuty {
  /** Назва обов'язку — «Декларація платника ЄП» */
  label: string;
  /** Строк — «до 20-го числа». Рендериться моношрифтом */
  when: string;
  /** Місяці, в яких обов'язок настає (1 = січень) */
  months: number[];
}

/** Коротка обіцянка під календарем — «чому саме ми» */
export interface ITaxPromise {
  title: string;
  text: string;
}

/** Повний контент секції для одного варіанта (ФОП або ТОВ) */
export interface ITaxYear {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Підпис під рейкою календаря */
  legend: string;
  promises: ITaxPromise[];
  ctaText: string;
  duties: ITaxDuty[];
}
