module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f8f9fa',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#6c757d',
        700: '#495057',
        800: '#343a40',
        900: '#212529',
        950: '#0e1012',
      },
      blue: '#0002FC',
      red: '#D00000',
      orange: '#F48C06',
      yellow: '#FFBA08',
      green: '#67d15a',
      indigo: '#9a86fd',
      teal: '#50E3C2',
    },
    fontFamily: {
      sans: [
        'Runda',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'CalaWeb',
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'Fira Code VF',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    extend: {
      fontSize: {
        '2xl': '23px',
        '2.5xl': '26.5px',
      },
      rotate: {
        135: '135deg',
      },
      margin: {
        0.5: '2px',
        '1/4': '25%',
        '-1/4': '-25%',
        '1/2': '50%',
        '-1/2': '-50%',
      },
      borderWidth: {
        3: '3px',
      },
      maxWidth: {
        'screen-2xl': '1600px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInTop: {
          '0%': { opacity: 0, transform: 'translateY(50px)', },
          '100%': { opacity: 1, transform: 'translateY(0)', },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out both',
        fadeInTop: 'fadeInTop 0.5s ease-out both',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
