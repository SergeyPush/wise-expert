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
        className={'p-5 lg:p-10 bg-color-white rounded-3xl'}
        onSubmit={handleSubmit(handleForm)}
      >
        <div
          className={'mb-6 text-xl lg:text-2xl uppercase text-left font-bold'}
        >
          <p>Отримайте персональну</p>
          <p>консультацію</p>
        </div>

        <div
          className={'flex flex-col md:flex-row gap-2 lg:gap-4 mb-2 lg:mb-6'}
        >
          <div className={'flex font-normal flex-col relative flex-1'}>
            <InputLabel text={'Email:'} htmlFor={'email'} />
            <input
              id="email"
              className={
                'font-normal px-4 py-2 border border-color-light-blue rounded-3xl placeholder:text-color-black'
              }
              type="email"
              placeholder="Введіть email*"
              {...register('email', { required: 'email is required' })}
            />
            {errors?.email && (
              <span
                className={
                  'text-color-red text-sm absolute bottom-[-22px] ml-2'
                }
              >
                Email обов&apos;язковий
              </span>
            )}
          </div>

          <div className={'flex font-normal flex-col relative flex-1'}>
            <InputLabel text={'Phone:'} htmlFor={'phone'} />
            <InputMask
              mask={'+38(099)999-99-99'}
              id="phone"
              className={
                'font-normal px-4 py-2 border border-color-light-blue rounded-3xl placeholder:text-color-black'
              }
              type="text"
              placeholder="Введіть телефон*"
              {...register('phone', { required: 'Телефон is required' })}
            />
            {errors?.phone && (
              <span
                className={
                  'text-color-red text-sm absolute bottom-[-22px] ml-2'
                }
              >
                Телефон обов&apos;язковий
              </span>
            )}
          </div>
        </div>
        <div className={'flex font-normal flex-col relative mb-8'}>
          <InputLabel text={'Уточнююче питання:'} htmlFor={'question'} />
          <textarea
            rows={3}
            id="question"
            className={
              'font-normal px-4 py-3 border border-color-light-blue rounded-3xl placeholder:text-color-black resize-none'
            }
            placeholder="Ваше повідомлення"
            {...register('question')}
          />
        </div>

        <Button
          type={'submit'}
          format={'black'}
          text={'Розрахувати вартість'}
          size={'wide'}
        />
      </form>
    </div>
  );
};

export default ContactForm;
