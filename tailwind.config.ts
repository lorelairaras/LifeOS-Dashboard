import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy tokens — portfolio still uses these
        surface: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          light: '#a5b4fc',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#64748b',
        },
        // Life OS design system
        os: {
          bg:         '#0a0b12',
          surface:    '#10111c',
          card:       '#181929',
          border:     '#1e2035',
          bright:     '#2a2d45',
          cyan:       '#22d3ee',
          'cyan-dim': '#0e7490',
          lime:       '#86efac',
          'lime-dim': '#14532d',
          amber:      '#fbbf24',
          'amber-dim':'#78350f',
          rose:       '#fb7185',
          'rose-dim': '#881337',
          violet:     '#a78bfa',
          'violet-dim':'#3b0764',
          pri:        '#e8eaf6',
          sec:        '#7c80a0',
          dim:        '#3d4168',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float:      'float 6s ease-in-out infinite',
        'float-slow':'float-slow 8s ease-in-out infinite',
        'fade-in':  'fade-in 0.18s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
