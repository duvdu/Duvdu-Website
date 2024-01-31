module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}', 
    './pages/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontSize: {

      },
      width: {
        '68%': '68%',
        '28%': '28%',
        '48%': '48%',
        },
      colors: {
        DS_gray_1: 'var(--gray-1)',
        DS_white: "var(--white)",
        DS_black: "var(--black)",
        primary: "var(--primary)",
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },
  plugins: [],
}