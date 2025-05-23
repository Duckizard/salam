/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ffcc',
          50: '#f0fff9',
          100: '#dcfff4',
          200: '#bafee8',
          300: '#86f9d5',
          400: '#4aeec0',
          500: '#22dba8',
          600: '#0ab389',
          700: '#058f70',
          800: '#07715b',
          900: '#085d4b',
        },
        accent: {
          DEFAULT: '#00ffcc',
        },
        background: {
          dark: '#000000',
          light: '#121212',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 204, 0.3)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};