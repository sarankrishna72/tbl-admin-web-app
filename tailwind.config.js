/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      "xxs": ['11px', '19px'],
      "xs": ['12px', '20px'],
      "x-base": ['13px', '21px'],
      "base": ['14px', '22px'],
      "base-2": ['15px', '23px'],
      "sm": ['16px', '24px'],
      "md": ['17px', '25px'],
      "2sm": ['18px', '26px'],
      "lg": ['20px', '28px'],
      "xl": ['24px', '32px'],
      "xxl": ['28px', '36px'],
      "3xl": ['32px', '40px'],
      "4xl": ['36px', '44px'],
    },

    extend: {
      colors: {
        'primary-800': 'var(--primary-800)',
        'primary-700': 'var(--primary-700)',
        'primary-600': 'var(--primary-600)',
        'primary-500': 'var(--primary-500)',
        'primary-50': 'var(--primary-50)',
        'primary-300': 'var(--primary-300)',
        'neutral-100': 'var(--neutral-100)',
        'neutral-300': 'var(--neutral-300)',
        'gray-700': 'var(--gray-700)',
        'gray-600': 'var(--gray-600)',
        'gray-400': 'var(--gray-400)',
        'gray-300': 'var(--gray-300)',
        'gray-100': 'var(--gray-100)',
        'success-400': 'var(--success-400)',
        'success-500': 'var(--success-500)',
        'error-500': 'var(--error-500)',
        'error-600': 'var(--error-600)',
      },
      screens: {
        'mobile': '320px',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1400px',
      },
    },
  },
  plugins: [],
}

