/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          500: "#13296A",
          400: "#152259",
          300: "#509CDB",
          200: "#73B0E2",
          100: "#B9D7F1",
          50: "#B9D7F1",
          25: "#D5E7F6",
          10: "#EBF6FF",
        },
        grey: {
          500: "#424242",
          400: "#4F4F4F",
          300: "#BDBDBD",
          200: "#8A8A8A",
          100: "#A7A7A7",
          50: "#C4C4C4",
          25: "#DCDCDC",
          10: "#F1F1F1",
          5: "#FCFAFA",
        },
      },
    },
  },
  plugins: [],
};
