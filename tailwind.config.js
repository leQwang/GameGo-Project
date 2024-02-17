/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#161A1E',
        secondary: '#9A9A9A',
        orange: '#E58E27',
        orangeText: '#E87D0E',
        orangeLight: '#FA982F',
        orangeCard: '#ad6c1f',

        white: '#fbfbfb',
      },
      screens: {
        'md': '640px',
        // => @media (min-width: 640px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        'xxl': '1440px',
      },
    },
  },
  plugins: [],
});

