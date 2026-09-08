/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        airnote: {
          bg: '#070b10',
          surface: '#0d1219',
          panel: '#111820',
          border: '#1e2a3a',
          muted: '#5a6b7d',
          text: '#c8d4e0',
          accent: '#00d4aa',
          live: '#ff4d4d',
          amber: '#f5a623',
          cyan: '#38bdf8',
          phi: '#a78bfa',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
  'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
  flow: 'flow 2.5s ease-in-out infinite',
  scan: 'scan 3s linear infinite',
  'fade-in': 'fade-in 0.4s ease-out',
  'slide-up': 'slide-up 0.35s ease-out',
  'board-flash': 'board-flash 0.6s ease-out',
},
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        flow: {
          '0%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0.3' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'board-flash': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 212, 170, 0.6)' },
          '100%': { boxShadow: '0 0 0 12px rgba(0, 212, 170, 0)' },
        },
      },
      backgroundImage: {
        grid: `linear-gradient(rgba(30, 42, 58, 0.4) 1px, transparent 1px),
               linear-gradient(90deg, rgba(30, 42, 58, 0.4) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '24px 24px',
      },
    },
  },
  plugins: [],
};
