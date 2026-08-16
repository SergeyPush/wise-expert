export interface ILink {
  id: string;
  title: string;
  link: string;
  /** Вкладені пункти: «Послуги» розкриває ФОП і ТОВ */
  children?: ILink[];
}
