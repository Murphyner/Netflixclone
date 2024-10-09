/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'Poppins, sans-serif'
      },
      colors: {
        'bg-custom': '#111111'
      }
    },
  },
  plugins: [],
}