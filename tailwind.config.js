/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/**"], // Updated content property
  // mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#c4ff43",
        secondary: "#00000",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'sm-white': '0 1px 2px 0 rgba(255, 255, 255, 0.5)',
        'md-white': '0 4px 6px -1px rgba(255, 255, 255, 0.5), 0 2px 4px -1px rgba(255, 255, 255, 0.5)',
        'lg-white': '0 10px 15px -3px rgba(255, 255, 255, 0.5), 0 4px 6px -2px rgba(255, 255, 255, 0.5)',
        'xl-white': '0 20px 25px -5px rgba(255, 255, 255, 0.5), 0 8px 10px -6px rgba(255, 255, 255, 0.5)',
        '2xl-white': '0 25px 50px -12px rgba(255, 255, 255, 0.5)'
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};