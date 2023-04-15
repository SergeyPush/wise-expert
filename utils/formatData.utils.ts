import { IDropdown, IDropdownValue } from '@/interfaces/form.interface';

interface FormDataInterface {
  [key: string]: IDropdownValue;
}
export const formatData = (data: FormDataInterface) => {
  const arrayOfItems = Object.keys(data);
  return arrayOfItems.reduce((acc, item) => {
    const value = data[item];
    let formattedValue;
    if (typeof value === 'string') {
      formattedValue = value as string;
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        const arr = value as IDropdown[];
        formattedValue = arr.map((item) => item.value).join(', ');
      } else {
        const str = value as IDropdown;
        formattedValue = str.value;
      }
    }
    return { ...acc, [item]: formattedValue };
  }, {});
};
