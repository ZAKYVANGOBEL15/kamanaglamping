/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f4f7f5',
          100: '#e5ede7',
          200: '#cbe0cf',
          300: '#a3c7ad',
          400: '#75a681',
          500: '#528960',
          600: '#3e6d4a',
          700: '#33573c',
          800: '#2a4732',
          900: '#233b2a',
          950: '#111f15',
        },
        sand: {
          50: '#faf8f5',
          100: '#f4efe6',
          200: '#e8ddcb',
          300: '#d7c4a7',
          400: '#c2a57e',
          500: '#af895b',
          600: '#a1764c',
          700: '#865f3f',
          800: '#6d4c35',
          900: '#593f2e',
          950: '#2f2017',
        },
        gold: {
          50: '#fdfbf4',
          100: '#faf4e3',
          200: '#f2e4c1',
          300: '#e7ce93',
          400: '#d9b260',
          500: '#c59539',
          600: '#aa7a2a',
          700: '#8c5f21',
          800: '#724c1e',
          900: '#5e3f1c',
          950: '#36210c',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

