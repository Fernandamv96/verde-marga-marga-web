/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040810',
          900: '#0A0F1E',
          800: '#0D1B2A',
          700: '#112240',
          600: '#1a3a5c',
        },
        cyan: {
          400: '#00D4FF',
          500: '#00B8D9',
          600: '#0099B3',
        },
        violet: {
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
        },
        emerald: {
          400: '#10F5A0',
          500: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}
