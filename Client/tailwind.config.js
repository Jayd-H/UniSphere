module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'luni-blue': '#60879A',
        'luni-light-blue': '#D6E2EC',
        'luni-white': '#eaeaea',
        'luni-black': '#2E2E2E',
        'luni-grey': '#787878',
        'luni-blue-start': '#3B82F6', // Use a lighter blue for the gradient start
        'luni-blue-end': '#1E40AF', // Use a darker blue for the gradient ends
        'luni-dark-blue': '#1E3A8A',
      },
      fontFamily: {
        'arimo': ['Arimo', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },

    },
  },
  plugins: [],

};

