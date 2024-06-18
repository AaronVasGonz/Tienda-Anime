/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-purple': '#b200d6', 
        'main-purple-pastel': '#b07bdc',
        'hover-purple': '#87129e', 
        'bg-neutra-l950-transparent-50': 'rgba(10, 10, 10, 0.5)',
        'brand-dark': '#1E293B', 
        
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};