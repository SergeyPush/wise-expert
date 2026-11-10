import React, { useState } from 'react';
import ContactForm from '@/components/Contacts/ContactForm';
import Title from '@/components/Title';
import CalculatorDropdown from '@/components/Calculator/CalculatorDropdown';
import {
  additional,
  diyaCityOptions,
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
    DiyaCity: '',
  };

  const [calculatorForm, setCalculatorForm] = useState(initialState);
  const clearCalculatorForm = () => {
    setCalculatorForm(() => initialState);
  };

  return (
    <div className={'flex flex-col lg:flex-row gap-8 lg:gap-12'}>
      <div className={'flex-1'}>
        {/* Заголовок секции: форма-запрос вместо калькулятора */}
        <Title text={'Запит на співпрацю'} align={'left'} color={'white'} />
        <p className={'text-color-white/70 text-base mb-8 max-w-lg'}>
          Заповніть коротку форму, щоб ми краще зрозуміли специфіку Вашого
          бізнесу та могли запропонувати оптимальний формат бухгалтерського
          обслуговування
        </p>
        <div className={'flex flex-col gap-5'}>
          <div className={'flex flex-col xl:flex-row gap-5'}>
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
          <div className={'flex flex-col xl:flex-row gap-5'}>
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
          <div className={'flex flex-col xl:flex-row gap-5'}>
            <CalculatorInput
              label={'Кількість співробітників'}
              placeholder={"Введіть значення (не обов'язкове поле)"}
              name={'NumberOfEmployees'}
              setState={setCalculatorForm}
              value={calculatorForm.NumberOfEmployees}
            />
            <CalculatorInput
              label={'Кількість документів/міс'}
              placeholder={"Введіть значення (не обов'язкове поле)"}
              name={'DocumentQuantity'}
              setState={setCalculatorForm}
              value={calculatorForm.DocumentQuantity}
            />
          </div>
          <div>
            <CalculatorDropdown
              options={diyaCityOptions}
              label={'Дія.City'}
              className={'flex-1'}
              name={'DiyaCity'}
              setState={setCalculatorForm}
              value={calculatorForm.DiyaCity}
            />
          </div>
        </div>
      </div>
      <ContactForm
        location="calculator"
        calculatorFormData={calculatorForm}
        clearCalculatorForm={clearCalculatorForm}
      />
    </div>
  );
};

export default CalculatorForm;
