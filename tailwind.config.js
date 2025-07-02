/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B21B6',
          50: '#F3F1FF',
          100: '#E8E3FF',
          200: '#D1C7FF',
          300: '#B1A0FF',
          400: '#8B5CF6',
          500: '#5B21B6',
          600: '#4C1D95',
          700: '#3F1375',
          800: '#330D54',
          900: '#280A40'
        },
        accent: {
          DEFAULT: '#EC4899',
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843'
        },
        surface: '#FAFAFA',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'float': '0 4px 20px rgba(91, 33, 182, 0.15)'
      },
      animation: {
        'task-complete': 'taskComplete 300ms ease-out',
        'bounce-gentle': 'bounceGentle 600ms ease-out',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        taskComplete: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.98)' },
          '100%': { opacity: '0.6', transform: 'scale(1)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' }
        }
      }
    },
  },
  plugins: [],
}