/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          black: '#0B0B0F',
          dark: '#121217',
          card: '#1A1A21'
        }
      }
    }
  },
  plugins: []
};
