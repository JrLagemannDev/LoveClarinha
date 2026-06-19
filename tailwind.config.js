/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff7fb',
          100: '#ffe8f3',
          200: '#ffcfe6',
          300: '#ffadd2',
          400: '#ff7db8',
          500: '#f84f9a',
          600: '#df2b7d',
        },
        cherry: '#c9184a',
        leaf: '#2f8f4e',
        ink: '#21161d',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(201, 24, 74, 0.16)',
        card: '0 14px 38px rgba(33, 22, 29, 0.10)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 420ms ease-in-out',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-10deg) scale(1.12)' },
          '75%': { transform: 'rotate(10deg) scale(1.12)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(1.1)' },
          '55%': { transform: 'scale(0.96)' },
        },
      },
    },
  },
  plugins: [],
};
