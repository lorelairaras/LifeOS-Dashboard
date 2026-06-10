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
        // Accent updated to gothic pink — affects portfolio nav/buttons too
        accent: {
          DEFAULT: '#FF4FA3',
          hover:   '#E83D92',
          light:   '#FFB3D6',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger:  '#ef4444',
        text: {
          primary:   '#f8fafc',
          secondary: '#94a3b8',
          muted:     '#64748b',
        },

        // Phase 21 os.* tokens — kept for backward compat, unused after Phase 22
        os: {
          bg:          '#0a0b12',
          surface:     '#10111c',
          card:        '#181929',
          border:      '#1e2035',
          bright:      '#2a2d45',
          cyan:        '#22d3ee',
          'cyan-dim':  '#0e7490',
          lime:        '#86efac',
          'lime-dim':  '#14532d',
          amber:       '#fbbf24',
          'amber-dim': '#78350f',
          rose:        '#fb7185',
          'rose-dim':  '#881337',
          violet:      '#a78bfa',
          'violet-dim':'#3b0764',
          pri:         '#e8eaf6',
          sec:         '#7c80a0',
          dim:         '#3d4168',
        },

        // Phase 22 Rose Obsidian design system
        ro: {
          void:    '#080509',
          dark:    '#0D0710',
          surface: '#141018',
          card:    '#1D1422',
          pri:     '#FFF4FA',
          sec:     '#C8AFC0',
          muted:   '#806979',
          pink:    '#FF4FA3',
          bloom:   '#D946EF',
          oracle:  '#A855F7',
          gold:    '#F4B860',
          success: '#7CE7AC',
          danger:  '#FF4D6D',
          deep:    '#8B1E5A',
          blood:   '#B5174E',
        },
      },
      fontFamily: {
        // Body — clean and readable
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        // Display — gothic/serif for headings and brand moments only
        display: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        // Code/prompt text
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
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
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
      },
      animation: {
        float:        'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-in':    'fade-in 0.18s ease-out',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
