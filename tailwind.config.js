const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './docs/**/*.html',
    './docs/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bluegray: colors.blueGray,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}