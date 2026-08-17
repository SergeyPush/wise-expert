import { IconType } from 'react-icons';

export interface IIcon {
  Icon: IconType;
  link: string;
  text?: string;
  // подпись сети над значением (напр. "Telegram") — для карточек контактов
  label?: string;
}
