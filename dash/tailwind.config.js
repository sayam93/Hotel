/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.vue",
    "./templates/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

