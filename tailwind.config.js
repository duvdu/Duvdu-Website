module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {

      },
      height: {
        'body': 'var(--body-height)',
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
        DS_borderColor: "var(--border-color)",
        primary: "var(--primary)",
        hover_primary: "var(--hover_primary)",
        borderColor: "var(--border-color)",
        red: "var(--red)",
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
    container: {
      screens: {
        '2xl': '1328px'
      },
    },
  },
  plugins: [],
}