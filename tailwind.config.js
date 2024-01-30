module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}', 
    './pages/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontSize: {

      },
      margin :{
        "mb-21":"margin-bottom: 5.5rem"
      },
      width: {
        '68%': '68%',
        '28%': '28%',
        '48%': '48%',
        },
      colors: {
        DS_gray_1: 'var(--gray-1)',
        primary: "#1A73EB"
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },
  plugins: [],
}