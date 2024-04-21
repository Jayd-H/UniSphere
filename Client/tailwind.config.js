module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muted-mint': '#B9DDCC',
        'mint': '#A6E1DB',
        'white': '#FAFDFF',
        'black': '#2E2E2E',
        'blue': '#168FE6',
        'dark-blue': '#1D7FD1',
        'light-blue': '#cceeff',
        'grey': '#8C8C8C',
        'light-grey': '#f2f8fa',
        'red': '#d9534f',
        'light-mint': '#ccf0e0',
        'dark-grey': '#4A4A5A',
        'white-mint': '#E0FBEE',
        'dark-mint': '#80DEEA',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'montserrat-alt': ['Montserrat Alternates', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem', // 12px
        'sm': '0.875rem', // 14px
        'base': '1rem', // 16px
        'md': '1.125rem', // 18px
        'lg': '1.25rem', // 20px
        'xl': '1.5rem', // 24px
        '2xl': '1.875rem', // 30px
        '3xl': '2.25rem', // 36px
        '4xl': '3rem', // 48px
        '5xl': '4rem', // 64px
      },
      boxShadow: {
        'card': '0px 0px 4px rgba(0, 0, 0, 0.25)',
        'card-hover': '0px 0px 8px #A6E1DB',
      },
      backgroundImage: {
        'mint-muted-mint-t2b': 'linear-gradient(to bottom, #A6E1DB, #B9DDCC)',
        'mint-muted-mint-l2r': 'linear-gradient(to right, #A6E1DB, #B9DDCC)',
        'mint-muted-mint-b2t': 'linear-gradient(to top, #A6E1DB, #B9DDCC)',
        'mint-muted-mint-r2l': 'linear-gradient(to left, #A6E1DB, #B9DDCC)',
        'mint-blue-t2b': 'linear-gradient(to bottom, #A6E1DB, #168FE6)',
        'mint-blue-l2r': 'linear-gradient(to right, #A6E1DB, #168FE6)',
        'mint-blue-b2t': 'linear-gradient(to top, #A6E1DB, #168FE6)',
        'mint-blue-r2l': 'linear-gradient(to left, #A6E1DB, #168FE6)',
        'muted-mint-blue-t2b': 'linear-gradient(to bottom, #B9DDCC, #168FE6)',
        'muted-mint-blue-l2r': 'linear-gradient(to right, #B9DDCC, #168FE6)',
        'muted-mint-blue-b2t': 'linear-gradient(to top, #B9DDCC, #168FE6)',
        'muted-mint-blue-r2l': 'linear-gradient(to left, #B9DDCC, #168FE6)',
        'blue-dark-blue-t2b': 'linear-gradient(to bottom, #168FE6, #1D7FD1)',
        'blue-dark-blue-l2r': 'linear-gradient(to right, #168FE6, #1D7FD1)',
        'blue-dark-blue-b2t': 'linear-gradient(to top, #168FE6, #1D7FD1)',
        'blue-dark-blue-r2l': 'linear-gradient(to left, #168FE6, #1D7FD1)',
        'light-blue-blue-t2b': 'linear-gradient(to bottom, #cceeff, #168FE6)',
        'light-blue-blue-l2r': 'linear-gradient(to right, #cceeff, #168FE6)',
        'light-blue-blue-b2t': 'linear-gradient(to top, #cceeff, #168FE6)',
        'light-blue-blue-r2l': 'linear-gradient(to left, #cceeff, #168FE6)',
        'light-mint-mint-t2b': 'linear-gradient(to bottom, #ccf0e0, #A6E1DB)',
        'light-mint-mint-l2r': 'linear-gradient(to right, #ccf0e0, #A6E1DB)',
        'light-mint-mint-b2t': 'linear-gradient(to top, #ccf0e0, #A6E1DB)',
        'light-mint-mint-r2l': 'linear-gradient(to left, #ccf0e0, #A6E1DB)',
        'mint-muted-white-mint-t2b': 'linear-gradient(to left, #A6E1DB, #E0FBEE)',
        'dark-mint-muted-mint-t2b': 'linear-gradient(to bottom, #80DEEA, #B9DDCC)',

       'background-gradient': 'radial-gradient(ellipse at center, #B9DDCC, #B2EBF2 30%, #80DEEA 60%, #4DD0E1 80%, #26C6DA)',
        'form-gradient': 'linear-gradient(135deg, #FAFDFF, #E0FBEE)',
      },
    },
  },
  plugins: [],
};