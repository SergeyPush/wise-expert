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
    extend: {},
    colors: {
      'color-black': '#161616',
      'color-blue': '#0050CE',
      'color-white': '#ffffff',
      'color-light-blue': '#e2eeff',
      'color-extra-black': '#000000',
    },
    letterSpacing: {
      'custom-wide': '1px',
    },
  },
  plugins: [],
};
