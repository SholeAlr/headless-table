import colors from './src/config/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
}
