import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button/Button';
import { IContactForm } from '@/interfaces/form.interface';

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({ mode: 'onBlur' });
  const handleForm = (data: IContactForm) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <form
        className={'p-10 bg-color-white rounded-3xl'}
        onSubmit={handleSubmit(handleForm)}
      >
        <div
          className={'mb-6 text-xl lg:text-2xl uppercase text-left font-bold'}
        >
          <p>Отримайте персональну</p>
          <p>консультацію</p>
        </div>

        <div className={'flex font-normal flex-col relative mb-6'}>
          <label htmlFor="email" className={'mb-2 font-bold text-xl ml-2'}>
            Email:
          </label>
          <input
            id="email"
            className={
              'font-normal px-4 py-3 border border-color-light-blue rounded-3xl placeholder:text-color-black'
            }
            type="email"
            placeholder="Введіть email*"
            {...register('email', { required: 'email is required' })}
          />
          {errors?.email && (
            <span
              className={
                'text-color-red text-base absolute bottom-[-28px] ml-2'
              }
            >
              Email обов&apos;язковий
            </span>
          )}
        </div>

        <div className={'flex font-normal flex-col relative mb-6'}>
          <label htmlFor="phone" className={'mb-2 font-bold text-xl ml-2'}>
            Phone:
          </label>
          <input
            id="phone"
            className={
              'font-normal px-4 py-3 border border-color-light-blue rounded-3xl placeholder:text-color-black'
            }
            type="text"
            placeholder="Введіть телефон*"
            {...register('phone', { required: 'Телефон is required' })}
          />
        </div>
        <div className={'flex font-normal flex-col relative mb-8'}>
          <label htmlFor="question" className={'mb-2 font-bold text-xl ml-2'}>
            Уточнююче питання:
          </label>
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
