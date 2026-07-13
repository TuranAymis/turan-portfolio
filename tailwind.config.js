/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './{components,pages,context,hooks,utils,data}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ide: {
          bg: '#0f172a', // slate-950
          sidebar: '#1e293b', // slate-800
          panel: '#1e293b',
          border: '#334155', // slate-700
          accent: '#3b82f6', // blue-500
          success: '#10b981', // emerald-500
          warning: '#f59e0b', // amber-500
          error: '#ef4444', // red-500
          text: '#e2e8f0', // slate-200
          muted: '#94a3b8', // slate-400
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typewriter': 'typewriter 2s steps(40, end) 1s 1 normal both',
        'blink': 'blink 1s step-end infinite',
        'float-up': 'floatUp 1s ease-out forwards',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-40px) scale(1.1)', opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
