/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"']
      },
      screens: {
        'half': '1000px'
      },
    },
  },
  plugins: [],
}



