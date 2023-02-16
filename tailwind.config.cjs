/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily:{
        "jose":['Josefin Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
