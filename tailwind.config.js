/* eslint-disable global-require */
const fontFamily = {
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
};

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
    fontFamily,
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
      typography: {
        DEFAULT: {
          css: {
            color: '#212529',
            maxWidth: '100%',
            p: {
              lineHeight: '1.618em',
              marginBottom: '23px',
            },
            pre: {
              backgroundColor: '#161821',
            },
            a: {
              color: '#0002FC',
              textDecoration: 'none',
              fontWeight: '400',
            },
            h2: {
              fontSize: '20px',
              lineHeight: '1.1em',
              fontFamily: fontFamily.sans.join(', '),
              fontWeight: 500,
              marginTop: '60px',
              marginBottom: '12px',
            },
            h3: {
              fontSize: '19px',
              lineHeight: '1.1em',
              fontFamily: fontFamily.sans.join(', '),
              fontWeight: 500,
              marginTop: '60px',
              marginBottom: '12px',
            },
            h4: {
              fontSize: '18px',
              lineHeight: '1.1em',
              fontFamily: fontFamily.sans.join(', '),
              fontWeight: 500,
              marginTop: '60px',
              marginBottom: '12px',
            },
            strong: {
              fontWeight: '500',
            },
            'ul > li::before': {
              backgroundColor: '#000',
            },
            code: {
              color: '#eb5757',
              backgroundColor: '#eef2f5',
              fontWeight: 400,
              fontFamily: fontFamily.mono.join(', '),
              padding: '0.1em 0.2em 0 0.2em',
              borderRadius: '0.2em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        xl: {
          css: [
            {
              fontSize: '21px',
              lineHeight: '1.618em',
              h2: {
                fontSize: '26px',
              },
              h3: {
                fontSize: '24px',
              },
              h4: {
                fontSize: '21px',
              },
            },
          ],
        },
        '2xl': {
          css: [
            {
              fontSize: '23px',
              h2: {
                fontSize: '28px',
              },
              h3: {
                fontSize: '27px',
              },
              h4: {
                fontSize: '25px',
              },
            },
          ],
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
