/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          100: '#0a0a0a',
          200: '#111111',
          300: '#171717',
          400: '#1d1d1d',
          500: '#262626'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        },
        invert: {
          css: {
            '--tw-prose-body': '#e5e7eb',
            '--tw-prose-headings': '#fff',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#fff',
            '--tw-prose-code': '#fff',
            '--tw-prose-pre-code': '#fff',
            '--tw-prose-pre-bg': '#000',
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}