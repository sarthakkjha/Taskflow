/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#f4f4f5',
        card: {
          DEFAULT: '#121214',
          foreground: '#f4f4f5',
        },
        popover: {
          DEFAULT: '#09090b',
          foreground: '#f4f4f5',
        },
        primary: {
          DEFAULT: '#f4f4f5',
          foreground: '#09090b',
        },
        secondary: {
          DEFAULT: '#27272a',
          foreground: '#f4f4f5',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#27272a',
          foreground: '#f4f4f5',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f4f4f5',
        },
        border: '#27272a',
        input: '#27272a',
        ring: '#f4f4f5',
        success: '#22c55e',
        warning: '#eab308',
        info: '#3b82f6',
        jobTracker: '#a855f7',
        taskManager: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      boxShadow: {
        card: '0 0 0 1px rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.2)',
        glow: '0 0 20px -5px rgba(168,85,247,0.3)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
