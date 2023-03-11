import { StylesConfig } from 'react-select';

const colorStyles: StylesConfig = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#0050CE',
    borderRadius: '1.5rem',
    padding: '0.2rem 0.2rem',
    border: '0.4px solid white',
  }),
  placeholder: (styles) => ({ ...styles, color: 'white' }),
  singleValue: (styles) => ({ ...styles, color: 'white', fontWeight: '300' }),
  dropdownIndicator: (styles) => ({ ...styles, color: 'white' }),
  multiValue: (style) => ({
    ...style,
    backgroundColor: 'white',
    borderRadius: '.5rem',
    paddingLeft: '5px',
    paddingRight: '2px',
  }),
  multiValueLabel: (styles) => ({ ...styles, padding: '2px' }),
  multiValueRemove: (style) => ({
    ...style,
    // color: 'white',
    ':hover': {
      color: '#0050CE',
    },
  }),
  indicatorSeparator: () => ({}),
  clearIndicator: (style) => ({
    ...style,
    color: 'white',
    cursor: 'pointer',
  }),
};
export default colorStyles;
