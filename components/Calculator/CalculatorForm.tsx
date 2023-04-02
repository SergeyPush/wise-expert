import React, { useState } from 'react';
import ContactForm from '@/components/Contacts/ContactForm';
import Title from '@/components/Title';
import CalculatorDropdown from '@/components/Calculator/CalculatorDropdown';
import {
  additional,
  organisationalForm,
  organizationalType,
  taxSystem,
} from '@/constants/calculator.const';
import CalculatorInput from '@/components/Calculator/CalculatorInput';
import { IDropdown } from '@/interfaces/form.interface';

const CalculatorForm = () => {
  interface calculatorFormInterface {
    [key: string]: string | IDropdown | IDropdown[];
  }

  const initialState: calculatorFormInterface = {
    OrganisationalForm: '',
    OrganizationalType: '',
    TaxSystem: '',
    AdditionalInfo: '',
    NumberOfEmployees: '',
    DocumentQuantity: '',
  };

  const [calculatorForm, setCalculatorForm] = useState(initialState);
  const clearCalculatorForm = () => {
    setCalculatorForm(() => initialState);
  };

  return (
    <div className={'flex flex-col lg:flex-row gap-8'}>
      <div className={'flex-1'}>
        <Title text={'Калькулятор вартості'} align={'left'} color={'white'} />
        <p className={'text-color-white font-extralight text-base mb-4'}>
          Ви можете приблизно розрахувати вартість робіт для Вашої компанії.
          Заповніть форму і ми зв’яжемось з Вами
        </p>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex flex-col xl:flex-row gap-4 lg:gap-3'}>
            <CalculatorDropdown
              options={organisationalForm}
              label={'Організаційна форма'}
              className={'flex-1'}
              name={'OrganisationalForm'}
              value={calculatorForm.OrganisationalForm}
              setState={setCalculatorForm}
            />
            <CalculatorDropdown
              options={organizationalType}
              label={'Вид діяльності'}
              isMulti={true}
              className={'flex-1'}
              name={'OrganizationalType'}
              setState={setCalculatorForm}
              value={calculatorForm.OrganizationalType}
            />
          </div>
          <div className={'flex flex-col xl:flex-row gap-4 lg:gap-3'}>
            <CalculatorDropdown
              options={taxSystem}
              label={'Система оподаткування'}
              className={'flex-1'}
              name={'TaxSystem'}
              setState={setCalculatorForm}
              value={calculatorForm.TaxSystem}
            />
            <CalculatorDropdown
              options={additional}
              label={'Додаткова інформація'}
              isMulti
              className={'flex-1'}
              name={'AdditionalInfo'}
              setState={setCalculatorForm}
              value={calculatorForm.AdditionalInfo}
            />
          </div>
          <div className={'flex flex-col xl:flex-row gap-4 lg:gap-3'}>
            <CalculatorInput
              label={'Кількість співробітників'}
              placeholder={'Введіть значення'}
              name={'NumberOfEmployees'}
              setState={setCalculatorForm}
              value={calculatorForm.NumberOfEmployees}
            />
            <CalculatorInput
              label={'Кількість документів/міс'}
              placeholder={'Введіть значення'}
              name={'DocumentQuantity'}
              setState={setCalculatorForm}
              value={calculatorForm.DocumentQuantity}
            />
          </div>
        </div>
      </div>
      <ContactForm
        calculatorFormData={calculatorForm}
        clearCalculatorForm={clearCalculatorForm}
      />
    </div>
  );
};

export default CalculatorForm;
