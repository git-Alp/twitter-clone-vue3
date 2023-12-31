/** @type {import('tailwindcss').Config} */

export default {
  content: [
    // Example content paths...
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media',
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        'blue': '#1DA1F2',
        'darkblue': '#2795D9',
        'lightblue': '#EFF9FF',
        'dark': '#657786',
        'light': '#AAB8C2',
        'lighter': '#E1E8ED',
        'lightest': '#F5F8FA',
        'silver': '#CCCCCC',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

