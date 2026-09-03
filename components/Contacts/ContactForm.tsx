import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from '@/components/Button/Button';
import { IContactForm, IDropdown } from '@/interfaces/form.interface';
import InputLabel from '@/components/Contacts/InputLabel';
import { formatData } from '@/utils/formatData.utils';
import InputMask from 'react-input-mask';
import { useGlobalContext } from '@/context/GlobalContext';
import { sendData } from '@/utils/emailjs.api';
import { sendTelegramMessage } from '@/utils/telegram.utils';
import { FormLocation, getPageType, pushEvent } from '@/utils/analytics';

interface CalculatorData {
  [key: string]: string | IDropdown | IDropdown[];
}

interface ContactFormInterface {
  // где на странице стоит форма — попадает в form_location события (R10)
  location: FormLocation;
  calculatorFormData?: CalculatorData;
  clearCalculatorForm?: () => void;
  className?: string;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactForm = ({
  location,
  calculatorFormData,
  clearCalculatorForm,
  className,
  setIsVisible,
}: ContactFormInterface) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IContactForm>({ mode: 'onBlur' });

  const { showConfirmation } = useGlobalContext();
  // признак страницы берём из роутера, а не хардкодим на каждый вызов формы
  const { pathname } = useRouter();
  const eventPayload = {
    form_location: location,
    page_type: getPageType(pathname),
    page_path: pathname,
  };
  // ошибка отправки на сервер (не валидации) — показывается под кнопкой
  const [submitError, setSubmitError] = React.useState(false);

  const handleForm = async (data: IContactForm) => {
    setSubmitError(false);

    try {
      await sendTelegramMessage(formatData({ ...data, ...calculatorFormData }));

      // Имя события не меняем — в GTM/Ads на form_success уже настроены цели
      pushEvent('form_success', eventPayload);

      showConfirmation(true);

      // очищаем и закрываем форму только после успешной отправки
      reset({ name: '', phone: '', question: '' });

      if (clearCalculatorForm) {
        clearCalculatorForm();
      }

      if (setIsVisible) {
        setIsVisible(false);
      }
    } catch (err) {
      // при ошибке данные формы сохраняются, пользователь может повторить
      console.error(err);
      setSubmitError(true);
      pushEvent('form_error', eventPayload);
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
            <InputLabel text={"Ім'я"} htmlFor={'name'} required />
            <input
              id="name"
              className={
                'font-normal px-4 py-3 border border-color-border rounded-xl placeholder:text-color-muted bg-color-light-gray focus:border-color-blue focus:bg-color-white focus:outline-none transition-all duration-200'
              }
              type="text"
              aria-required="true"
              placeholder="Введіть ім'я"
              {...register('name', { required: "ім'я is required" })}
            />
            {errors?.name && (
              <span
                className={
                  'text-color-red text-sm absolute bottom-[-20px] ml-1'
                }
              >
                Ім&apos;я обов&apos;язкове
              </span>
            )}
          </div>

          <div className={'flex font-normal flex-col relative'}>
            <InputLabel text={'Телефон'} htmlFor={'phone'} required />
            <InputMask
              mask={'+38(099)999-99-99'}
              id="phone"
              className={
                'font-normal px-4 py-3 border border-color-border rounded-xl placeholder:text-color-muted bg-color-light-gray focus:border-color-blue focus:bg-color-white focus:outline-none transition-all duration-200'
              }
              type="text"
              aria-required="true"
              placeholder="Введіть телефон"
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
          <InputLabel text={'Додаткова інформація'} htmlFor={'question'} />
          <textarea
            rows={3}
            id="question"
            className={
              'font-normal px-4 py-3 border border-color-border rounded-xl placeholder:text-color-muted bg-color-light-gray focus:border-color-blue focus:bg-color-white focus:outline-none transition-all duration-200 resize-none'
            }
            placeholder="Ваше повідомлення (не обов'язкове поле)"
            {...register('question')}
          />
        </div>

        <Button
          type={'submit'}
          format={'primary'}
          text={isSubmitting ? 'Відправляємо...' : 'Розрахувати вартість'}
          size={'wide'}
          className="w-full"
          disabled={isSubmitting}
        />
        {submitError && (
          <p className={'text-color-red text-sm text-center mt-3'} role="alert">
            Не вдалося відправити повідомлення. Спробуйте ще раз або
            зателефонуйте нам.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
