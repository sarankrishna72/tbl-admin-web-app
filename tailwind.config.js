/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      "base": ['14px', '22px'],
      "sm": ['16px', '24px'],
      "2sm": ['18px', '26px'],
      "lg": ['20px', '28px'],
      "xl": ['24px', '32px'],
      "2xl": ['28px', '36px'],
    },
    extend: {
      colors: {
        'primary-800': 'var(--primary-800)',
        'primary-700': 'var(--primary-700)',
        'primary-500': 'var(--primary-500)',
        'primary-300': 'var(--primary-300)',
        'neutral-100': 'var(--neutral-100)',
        'neutral-300': 'var(--neutral-300)',
        'gray-400': 'var(--gray-400)',
      },

    },
  },
  plugins: [],
}

