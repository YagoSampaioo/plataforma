import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ffb400: '#ffb400',
        dark: {
          100: '#1a1a1a',
          200: '#2d2d2d',
          300: '#3d3d3d',
          400: '#525252',
          500: '#737373',
          600: '#969696',
          700: '#d4d4d4',
          800: '#f5f5f5',
          900: '#000000'
        }
      },
      fontFamily: {
        sans: ['axiforma', 'sans-serif']
      }
    },
  },
  plugins: [
    forms({
      strategy: 'class',
    }),
  ],
};