module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}', 
    './pages/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontSize: {

      },
      colors: {
        DS_gray_1: 'var(--gray-1)',
        
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },
  plugins: [],
}