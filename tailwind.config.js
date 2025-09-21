/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  
      },
      screens: {
        '2xl': '1700px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
