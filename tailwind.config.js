/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bravion: {
          black: '#0a0a0a',
          white: '#ffffff',
          red: '#E60000',
          gray: {
            900: '#141414',
            800: '#262626',
            700: '#404040',
            100: '#f5f5f5',
          }
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        headings: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace', 'ui-monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 rgba(230,0,0,1)',
      },
      backgroundImage: {
        'blueprint': 'linear-gradient(rgba(230,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(230,0,0,0.05) 1px, transparent 1px)',
        'blueprint-white': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'blueprint': '30px 30px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
