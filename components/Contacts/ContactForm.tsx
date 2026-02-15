import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button/Button';
import { IContactForm, IDropdown } from '@/interfaces/form.interface';
import InputLabel from '@/components/Contacts/InputLabel';
import { formatData } from '@/utils/formatData.utils';
import InputMask from 'react-input-mask';
import { useGlobalContext } from '@/context/GlobalContext';
import { sendData } from '@/utils/emailjs.api';
import { sendTelegramMessage } from '@/utils/telegram.utils';

interface CalculatorData {
  [key: string]: string | IDropdown | IDropdown[];
}

interface ContactFormInterface {
  calculatorFormData?: CalculatorData;
  clearCalculatorForm?: () => void;
  className?: string;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactForm = ({
  calculatorFormData,
  clearCalculatorForm,
  className,
  setIsVisible,
}: ContactFormInterface) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({ mode: 'onBlur' });

  const { showConfirmation } = useGlobalContext();

  const handleForm = (data: IContactForm) => {
    console.log(data);

    sendTelegramMessage(formatData({ ...data, ...calculatorFormData }))
      .then(() => showConfirmation(true))
      .catch((err) => console.log(err));

    reset({ email: '', phone: '', question: '' });

    if (clearCalculatorForm) {
      clearCalculatorForm();
    }

    if (setIsVisible) {
      setIsVisible(false);
    }
  };

  return (
    <div className={`${className}`}>
      <form
        className={'p-6 md:p-8 bg-color-white rounded-2xl shadow-elevated'}
        onSubmit={handleSubmit(handleForm)}
      >
        <div className={'mb-6'}>
          <h3 className={'text-xl lg:text-2xl font-bold text-color-black mb-1'}>
            Отримайте персональну
          </h3>
          <p className={'text-xl lg:text-2xl font-bold text-color-blue'}>
            консультацію
          </p>
        </div>

        <div className={'flex flex-col gap-4 mb-4'}>
          <div className={'flex font-normal flex-col relative'}>
            <InputLabel text={'Email:'} htmlFor={'email'} />
            <input
              id="email"
              className={
                'font-normal px-4 py-3 border border-color-border rounded-xl placeholder:text-color-muted bg-color-light-gray focus:border-color-blue focus:bg-color-white focus:outline-none transition-all duration-200'
              }
              type="email"
              placeholder="Введіть email*"
              {...register('email', { required: 'email is required' })}
            />
            {errors?.email && (
              <span
                className={
                  'text-color-red text-sm absolute bottom-[-20px] ml-1'
                }
              >
                Email обов&apos;язковий
              </span>
            )}
          </div>

          <div className={'flex font-normal flex-col relative'}>
            <InputLabel text={'Телефон:'} htmlFor={'phone'} />
            <InputMask
              mask={'+38(099)999-99-99'}
              id="phone"
              className={
                'font-normal px-4 py-3 border border-color-border rounded-xl placeholder:text-color-muted bg-color-light-gray focus:border-color-blue focus:bg-color-white focus:outline-none transition-all duration-200'
              }
              type="text"
              placeholder="Введіть телефон*"
              {...register('phone', { required: 'Телефон is required' })}
            />
            {errors?.phone && (
              <span
                className={
                  'text-color-red text-sm absolute bottom-[-20px] ml-1'
                }
              >
                Телефон обов&apos;язковий
              </span>
            )}
          </div>
        </div>
        <div className={'flex font-normal flex-col relative mb-6'}>
          <InputLabel text={'Уточнююче питання:'} htmlFor={'question'} />
          <textarea
            rows={3}
            id="question"
            className={
              'font-normal px-4 py-3 border border-color-border rounded-xl placeholder:text-color-muted bg-color-light-gray focus:border-color-blue focus:bg-color-white focus:outline-none transition-all duration-200 resize-none'
            }
            placeholder="Ваше повідомлення"
            {...register('question')}
          />
        </div>

        <Button
          type={'submit'}
          format={'primary'}
          text={'Розрахувати вартість'}
          size={'wide'}
          className="w-full"
        />
      </form>
    </div>
  );
};

export default ContactForm;
