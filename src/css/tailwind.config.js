const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  enabled: true,
  theme: {
    extend: {
      colors: {
        grey: {
          0: '#FFFFFF',
          5: '#F9FAFB',
          10: '#F3F4F6',
          20: '#E5E7EB',
          30: '#D1D5DB',
          40: '#9CA3AF',
          50: '#6B7280',
          60: '#4B5563',
          70: '#374151',
          80: '#1F2937',
          90: '#111827',
        },
        violet: {
          5: '#F5F3FF',
          10: '#EDE9FE',
          20: '#DDD6FE',
          30: '#C4B5FD',
          40: '#A78BFA',
          50: '#8B5CF6',
          60: '#7C3AED',
          70: '#6D28D9',
          80: '#5B21B6',
          90: '#4C1D95',
        },
      },
      boxShadow: {
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        cta: '0px 0px 0px 4px rgba(124, 58, 237, 0.1)',
        dropdown: '0px 2px 16px rgba(0, 0, 0, 0.08);',
        input: '0px 0px 0px 4px #8B5CF61A',
      },
      outline: {
        blue: '2px solid rgba(0, 112, 244, 0.5)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        xsmall: '10px',
        small: '12px',
        large: '16px',
        xlarge: '24px',
        '2xlarge': '30px',
        '3xlarge': '40px',
        '4xlarge': '48px',
        '5xlarge': '60px',
      },

      spacing: {
        '2xsmall': '0.25rem',
        xsmall: '0.5rem',
        small: '0.75rem',
        base: '1rem',
        large: '1.5rem',
        xlarge: '2rem',
        '2xlarge': '2.5rem',
        '3xlarge': '3rem',
        '4xlarge': '3.5rem',
        '5xlarge': '4rem',
        '6xlarge': '6rem',
        ...defaultTheme.spacing,
      },
      lineHeight: {
        xsmall: '1rem',
        small: '1.25rem',
        base: '1.5rem',
        large: '2.25rem',
        xlarge: '3rem',
        '2xlarge': '4rem',
        '3xlarge': '4.5rem',
        '4xlarge': '6rem',
        ...defaultTheme.lineHeight,
      },

      screens: {
        xs: '480px',
        xsmall: '0px',
        small: '769px',
        medium: '1025px',
        large: '1464px',
        ...defaultTheme.screens,
      },
      borderRadius: {
        none: '0px',
        soft: '2px',
        base: '4px',
        rounded: '8px',
        circle: '9999px',
        ...defaultTheme.borderRadius,
      },
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
      keyframes: {
        ring: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      transitionProperty: {
        width: 'width margin',
        height: 'height',
        display: 'display opacity',
      },
      animation: {
        ring: 'ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        'fade-in-right':
          'fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards',
      },
      lineClamp: {
        '[var(--lines)]': 'var(--lines)',
      },
    },
  },
  variants: {
    extend: {
      fill: ['hover', 'focus'],
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/line-clamp'),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`,
            )}`,
        );
      });
    }),
  ],
};
