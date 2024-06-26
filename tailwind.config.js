/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-700': 'var(--primary-700)',
        'primary-300': 'var(--primary-300)',
        'neutral-100': 'var(--neutral-100)'
      },

    },
  },
  plugins: [],
}

