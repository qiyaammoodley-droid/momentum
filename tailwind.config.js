/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        momentum: {
          green: '#167D63',
          mint: '#B9F3D0',
          background: '#F5F7F6',
          surface: '#FFFFFF',
          ink: '#17211D',
          muted: '#53635B',
          border: '#D8E2DC',
          danger: '#B42318',
          warning: '#9A6700',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(23,33,29,0.06)',
      },
      borderRadius: {
        card: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
