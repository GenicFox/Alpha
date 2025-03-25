/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0A1929', // Darker blue
          800: '#0D2137', // Dark blue
          700: '#102C44', // Medium dark blue
        },
        accent: {
          500: '#60A5FA', // Light blue
          400: '#93C5FD', // Lighter blue
        }
      }
    },
  },
  plugins: [],
};