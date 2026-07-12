import { IIcon } from '@/interfaces/icon.interface';
import Link from 'next/link';

interface SocialCardInterface {
  item: IIcon;
}

// Плитка соцсети из сетки 2×2 (правая колонка дизайна B)
const SocialCard = ({ item: { Icon, link, label, text } }: SocialCardInterface) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex flex-col gap-3.5 rounded-2xl border border-color-border bg-color-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated"
    >
      {/* монохромная иконка на светло-синей плитке */}
      <span className="grid h-[50px] w-[50px] place-items-center rounded-xl bg-color-light-blue text-color-blue">
        <Icon className="h-[25px] w-[25px]" />
      </span>
      {label && (
        <span className="text-[13px] font-semibold text-color-muted">{label}</span>
      )}
      <span className="-mt-1.5 break-words text-lg font-bold text-color-black">
        {text}
      </span>
    </Link>
  );
};

export default SocialCard;
