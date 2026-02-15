import { StylesConfig } from 'react-select';

const colorStyles: StylesConfig = {
  control: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '0.75rem',
    padding: '0.25rem 0.25rem',
    border: state.isFocused ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.15)',
    fontSize: '14px',
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  }),
  placeholder: (styles) => ({ ...styles, color: 'rgba(255, 255, 255, 0.5)' }),
  singleValue: (styles) => ({ ...styles, color: 'white', fontWeight: '400' }),
  dropdownIndicator: (styles) => ({ ...styles, color: 'rgba(255, 255, 255, 0.6)' }),
  input: (styles) => ({ ...styles, color: 'white' }),
  multiValue: (style) => ({
    ...style,
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    borderRadius: '0.5rem',
    paddingLeft: '4px',
    paddingRight: '2px',
    fontSize: '13px',
  }),
  multiValueLabel: (styles) => ({ ...styles, padding: '2px 4px', color: 'white' }),
  multiValueRemove: (style) => ({
    ...style,
    color: 'rgba(255, 255, 255, 0.7)',
    ':hover': {
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '0 0.5rem 0.5rem 0',
    },
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#1E293B',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  }),
  menuList: (styles) => ({
    ...styles,
    fontSize: '14px',
    padding: '4px',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? '#2563EB'
      : state.isFocused
      ? 'rgba(255, 255, 255, 0.1)'
      : 'transparent',
    color: 'white',
    borderRadius: '0.5rem',
    padding: '10px 12px',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#2563EB',
    },
  }),
  clearIndicator: (style) => ({
    ...style,
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    ':hover': {
      color: 'white',
    },
  }),
};
export default colorStyles;
