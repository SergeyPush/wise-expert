import React, { Dispatch, SetStateAction, useEffect, useId, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { IDropdown } from '@/interfaces/form.interface';
import InputLabel from '@/components/Contacts/InputLabel';

const PLACEHOLDER = "Оберіть варіант (не обов'язкове поле)";

// Статическая копия закрытого react-select: те же размеры и цвета, что в
// CalculatorDropdownStyles (итоговая высота react-select — 45.5px, замерено),
// чтобы при подмене на настоящий Select форма не прыгала
const SelectPlaceholder = () => (
  <div
    aria-hidden="true"
    className="box-border flex min-h-[45.5px] items-center rounded-xl border border-solid border-color-white/15 bg-color-white/[0.08] p-1 text-[14px] leading-[22.4px]"
  >
    <span className="flex-1 px-2 py-0.5">
      <span className="mx-0.5 text-color-white/50">{PLACEHOLDER}</span>
    </span>
    {/* Шеврон react-select */}
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      className="m-2 shrink-0 fill-current text-color-white/60"
    >
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </svg>
  </div>
);

// react-select грузится только на клиенте и только по требованию;
// пока чанк качается — та же заглушка
const CalculatorSelect = dynamic(
  () => import('@/components/Calculator/CalculatorSelect'),
  { ssr: false, loading: SelectPlaceholder },
);

interface CalculatorDropdownInterface {
  options: IDropdown[];
  label: string;
  isMulti?: boolean;
  className?: string;
  name: string;
  setState: Dispatch<SetStateAction<{}>>;
  value: string | IDropdown | IDropdown[];
}

const CalculatorDropdown = ({
  options,
  label,
  isMulti,
  className,
  name,
  setState,
  value,
}: CalculatorDropdownInterface) => {
  const instanceId = useId();
  const ref = useRef<HTMLDivElement>(null);
  // true — пора подгружать настоящий Select
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Старые браузеры без IntersectionObserver — грузим сразу
    if (!('IntersectionObserver' in window)) {
      setIsNear(true);
      return;
    }
    // Начинаем загрузку заранее, за ~1.5 экрана до формы
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '1200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (data: IDropdown | IDropdown[]) => {
    setState((prevState) => ({ ...prevState, [name]: data }));
  };

  return (
    <div className={className} ref={ref}>
      <InputLabel text={label} className={'text-color-white'} />
      {/* все поля калькулятора необязательные — помечаем это в плейсхолдере */}
      {isNear ? (
        <CalculatorSelect
          value={value}
          isMulti={isMulti}
          options={options}
          instanceId={instanceId}
          placeholder={PLACEHOLDER}
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          onChange={(selected) =>
            handleChange(selected as IDropdown | IDropdown[])
          }
          name={name}
        />
      ) : (
        <SelectPlaceholder />
      )}
    </div>
  );
};

export default CalculatorDropdown;
