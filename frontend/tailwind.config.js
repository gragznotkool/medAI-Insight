/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-dark': '#0a0f1c',
        'medical-blue': '#1e3a8a',
        'medical-accent': '#3b82f6',
        'medical-cyan': '#06b6d4',
        'medical-purple': '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
