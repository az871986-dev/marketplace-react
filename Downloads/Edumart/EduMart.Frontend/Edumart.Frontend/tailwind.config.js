/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Dark Blue (from logo)
        primary: {
          DEFAULT: '#003D5C',
          50: '#E6F0F5',
          100: '#CCE0EB',
          200: '#99C2D7',
          300: '#66A3C3',
          400: '#3385AF',
          500: '#003D5C',
          600: '#00314A',
          700: '#002537',
          800: '#001825',
          900: '#000C12',
        },
        // Secondary - Coral Red (from logo)
        secondary: {
          DEFAULT: '#E85D75',
          50: '#FEF2F4',
          100: '#FDE5E9',
          200: '#FBCBD3',
          300: '#F9B1BD',
          400: '#F797A7',
          500: '#E85D75',
          600: '#E5405F',
          700: '#D12448',
          800: '#A61C39',
          900: '#7A152A',
        },
      },
    },
  },
  plugins: [],
}
