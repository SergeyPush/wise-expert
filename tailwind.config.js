/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
    },
    colors: {
      // Modern refined palette
      'color-black': '#0F172A',
      'color-blue': '#2563EB',
      'color-blue-dark': '#1D4ED8',
      'color-blue-light': '#3B82F6',
      'color-white': '#ffffff',
      'color-light-blue': '#EFF6FF',
      'color-light-gray': '#F8FAFC',
      'color-extra-black': '#020617',
      'color-red': '#EF4444',
      'color-light-black': '#1E293B',
      'color-gray': '#CBD5E1',
      'color-muted': '#64748B',
      'color-border': '#E2E8F0',
      'color-success': '#10B981',
      'transparent': 'transparent',
    },
    letterSpacing: {
      'custom-wide': '1px',
      'tight': '-0.025em',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.25rem',
      'DEFAULT': '0.375rem',
      'md': '0.5rem',
      'lg': '0.75rem',
      'xl': '1rem',
      '2xl': '1.25rem',
      '3xl': '1.5rem',
      'full': '9999px',
    },
  },
  plugins: [],
};
