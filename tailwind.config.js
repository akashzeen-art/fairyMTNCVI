/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fairy: {
          deep:     '#05010F',
          dark:     '#0D0520',
          darker:   '#0A0318',
          purple:   '#6D28D9',
          violet:   '#8B5CF6',
          lavender: '#A78BFA',
          pink:     '#EC4899',
          rose:     '#F43F5E',
          gold:     '#F59E0B',
          amber:    '#FCD34D',
          blue:     '#3B82F6',
          sky:      '#0EA5E9',
          cyan:     '#06B6D4',
          white:    '#F8F0FF',
          mist:     '#E0D7FF',
        },
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
        title:  ['"Cinzel"', 'serif'],
        body:   ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 10s ease-in-out infinite',
        'float-fast':  'float 3.5s ease-in-out infinite',
        'twinkle':     'twinkle 2.5s ease-in-out infinite',
        'twinkle-fast':'twinkle 1.2s ease-in-out infinite',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite alternate',
        'sparkle':     'sparkle 2s ease-in-out infinite',
        'spin-slow':   'spin 12s linear infinite',
        'drift':       'drift 18s ease-in-out infinite',
        'shimmer':     'shimmer 3s linear infinite',
        'gradient-x':  'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-18px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':      { opacity: '0.2', transform: 'scale(0.6)' },
        },
        glowPulse: {
          from: { boxShadow: '0 0 15px #8B5CF680, 0 0 30px #8B5CF640' },
          to:   { boxShadow: '0 0 30px #EC489980, 0 0 60px #EC489940' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)   rotate(0deg)'   },
          '50%':      { opacity: '0.4', transform: 'scale(1.3) rotate(180deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '25%':      { transform: 'translate(20px, -15px) scale(1.05)' },
          '50%':      { transform: 'translate(-10px, -25px) scale(0.95)' },
          '75%':      { transform: 'translate(-20px, -10px) scale(1.02)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
