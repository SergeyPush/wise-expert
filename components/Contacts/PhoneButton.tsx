import { IconType } from 'react-icons';

interface PhoneButtonInterface {
  href: string; // tel: ссылка
  label: string; // надпись над номером, напр. "Зателефонуйте нам"
  phone: string; // отображаемый номер
  Icon: IconType;
  className?: string;
}

// Синяя CTA-кнопка с телефоном (левая колонка дизайна B)
const PhoneButton = ({ href, label, phone, Icon, className }: PhoneButtonInterface) => {
  return (
    <a
      href={href}
      className={`flex w-full lg:inline-flex lg:w-auto items-center gap-3.5 rounded-2xl bg-color-blue py-4 pl-4 pr-6 text-color-white shadow-elevated transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98] ${className || ''}`}
    >
      {/* плитка с иконкой телефона */}
      <span className="grid h-[46px] w-[46px] flex-shrink-0 place-items-center rounded-xl bg-color-white/20">
        <Icon className="h-[23px] w-[23px]" />
      </span>
      <span className="flex flex-col gap-0.5 leading-tight">
        <span className="text-xs font-medium text-color-white/80">{label}</span>
        <span className="text-xl font-extrabold tracking-tight">{phone}</span>
      </span>
    </a>
  );
};

export default PhoneButton;
