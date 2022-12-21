/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#282A36',
        body: '#f8f8f2',
        blue: '#8BE9FD',
        green: '#50FA7B',
        orange: '#FFB86C',
        pink: '#FF79C6',
        purple: '#BD93F9',
        red: '#FF5555',
        yellow: '#F1FA8C',
      },
      fontFamily: {
        heading: ['abril-text', 'serif'],
        body: ['source-sans-pro', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/line-clamp'),
  ],
}
