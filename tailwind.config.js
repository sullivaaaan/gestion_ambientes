/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Asegúrate de que esto incluya tus archivos HTML
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}